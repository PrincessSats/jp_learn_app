"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type {
  Card,
  Deck,
  Grade,
  PracticeMode,
  QuestionType,
  ReviewLog,
  UserStats,
} from "@/types";
import {
  getDeck,
  getDueCards,
  saveCard,
  saveReviewLog,
  getUserStats,
  saveUserStats,
} from "@/lib/db";
import { scheduleCard, streakToGrade } from "@/lib/fsrs";
import { QuizMCQ } from "./QuizMCQ";
import { QuizFill } from "./QuizFill";
import { FlashcardDeck } from "./FlashcardDeck";

interface QuizSessionProps {
  deckId: string;
  onBack: () => void;
}

/** Map PracticeMode → QuestionType for component selection */
const modeToQuestionType: Record<PracticeMode, QuestionType> = {
  vocabulary: "mcq",
  kanji: "flashcard",
  grammar: "fill",
  reading: "fill",
  listening: "mcq",
};

/** Yield yesterday&apos;s date as YYYY-MM-DD */
function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

/** Today as YYYY-MM-DD */
function today(): string {
  return new Date().toISOString().split("T")[0];
}

export function QuizSession({ deckId, onBack }: QuizSessionProps) {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  // Session tracking
  const sessionStart = useRef(Date.now());
  const [reviewedCount, setReviewedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const totalCards = cards.length;
  const answeringRef = useRef(false);

  // Track response time per card
  const cardStartTime = useRef<Map<string, number>>(new Map());

  // ─── Load data ───────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [deckData, dueCards] = await Promise.all([
        getDeck(deckId),
        getDueCards(deckId),
      ]);
      if (cancelled) return;
      if (!deckData) {
        setLoading(false);
        return;
      }
      setDeck(deckData);

      // Shuffle due cards so order is randomised each session
      const shuffled = [...dueCards].sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [deckId]);

  // Record when each card is shown
  useEffect(() => {
    if (cards[currentIdx]) {
      cardStartTime.current.set(cards[currentIdx].id, Date.now());
    }
  }, [currentIdx, cards]);

  // ─── Save ReviewLog & update UserStats ──────────────────────
  const persistReview = useCallback(
    async (
      card: Card,
      grade: Grade,
      responseTime: number,
      now: number
    ) => {
      const elapsedDays =
        card.lastReview > 0
          ? (now - card.lastReview) / (1000 * 60 * 60 * 24)
          : 0;

      const log: ReviewLog = {
        id: crypto.randomUUID(),
        cardId: card.id,
        deckId,
        grade,
        elapsedDays: Math.round(elapsedDays * 100) / 100,
        responseTime,
        timestamp: now,
      };
      await saveReviewLog(log);

      // Update / create user stats
      const stats: UserStats = await getUserStats();
      stats.totalReviews += 1;
      if (deck) {
        stats.reviewsByMode[deck.practiceMode] =
          (stats.reviewsByMode[deck.practiceMode] || 0) + 1;
      }

      // Streak logic (calendar-based)
      const d = today();
      if (stats.lastStudyDate === d) {
        // already counted today → no-op
      } else if (stats.lastStudyDate === yesterday()) {
        stats.streak += 1;
      } else {
        stats.streak = 1;
      }
      stats.lastStudyDate = d;
      if (stats.streak > stats.longestStreak) {
        stats.longestStreak = stats.streak;
      }

      await saveUserStats(stats);
    },
    [deck, deckId]
  );

  // ─── Handle MCQ / Fill answer ───────────────────────────────
  const handleAnswer = useCallback(
    async (card: Card, grade: Grade, correct: boolean) => {
      if (answeringRef.current) return;
      answeringRef.current = true;

      // Update local tracking
      setReviewedCount((c) => c + 1);
      if (correct) setCorrectCount((c) => c + 1);

      // Compute FSRS grade from streak
      const newStreak = correct ? streak + 1 : 0;
      setStreak(newStreak);
      const fsrsGrade = streakToGrade(newStreak, correct);

      // Schedule card with FSRS
      const now = Date.now();
      const elapsedDays =
        card.lastReview > 0
          ? (now - card.lastReview) / (1000 * 60 * 60 * 24)
          : 0;
      const updatedCard = scheduleCard(card, fsrsGrade, elapsedDays, now);
      await saveCard(updatedCard);

      // Persist ReviewLog & UserStats
      const responseTime =
        cardStartTime.current.get(card.id) ?? now;
      await persistReview(updatedCard, fsrsGrade, now - responseTime, now);

      // Advance to next card
      setCurrentIdx((i) => i + 1);
      answeringRef.current = false;
    },
    [streak, persistReview]
  );

  // ─── Handle FlashcardDeck onGrade callback ─────────────────
  const handleFlashcardGrade = useCallback(
    async (card: Card, grade: Grade, correct: boolean) => {
      // Track stats locally (FSRS scheduling is done inside FlashcardDeck)
      setReviewedCount((c) => c + 1);
      if (correct) setCorrectCount((c) => c + 1);
      setStreak((s) => (grade === 1 ? 0 : s + 1));

      // Persist ReviewLog & UserStats
      const now = Date.now();
      const responseTime =
        cardStartTime.current.get(card.id) ?? now;
      await persistReview(card, grade, now - responseTime, now);
    },
    [persistReview]
  );

  // ─── Render ─────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div
          className="animate-pulse text-sm"
          style={{ color: "var(--color-ink-dim)" }}
        >
          Loading session…
        </div>
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div style={{ color: "var(--color-ink-dim)" }}>Deck not found</div>
        <button
          type="button"
          onClick={onBack}
          className="glass px-4 py-2 text-sm"
          style={{ minHeight: 44 }}
        >
          Go back
        </button>
      </div>
    );
  }

  // ─── End screen ────────────────────────────────────────────
  if (reviewedCount >= totalCards && totalCards > 0) {
    return <EndScreen
      reviewedCount={reviewedCount}
      correctCount={correctCount}
      streak={streak}
      sessionStart={sessionStart.current}
      onBack={onBack}
    />;
  }

  const progressPct =
    totalCards > 0 ? (reviewedCount / totalCards) * 100 : 0;
  const questionType: QuestionType =
    modeToQuestionType[deck.practiceMode] ?? "mcq";
  const currentCard: Card | undefined = cards[currentIdx];

  return (
    <div className="flex flex-col h-full gap-4">
      {/* ─── Progress header ─────────────────────────────────── */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="glass flex items-center justify-center shrink-0"
          style={{ width: 40, height: 40, minWidth: 40 }}
          aria-label="Back"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <div
            className="text-xs mb-1"
            style={{ color: "var(--color-ink-dim)" }}
          >
            Card {Math.min(reviewedCount + 1, totalCards)}/{totalCards}
          </div>
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--color-glass-bg)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progressPct}%`,
                background: "var(--color-accent)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ─── Quiz content ────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentCard && questionType === "mcq" && (
            <motion.div
              key={currentCard.id}
              initial={{ x: 280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
            >
              <QuizMCQ
                card={currentCard}
                allCards={cards}
                onAnswer={(grade, correct) =>
                  handleAnswer(currentCard, grade, correct)
                }
              />
            </motion.div>
          )}

          {currentCard && questionType === "fill" && (
            <motion.div
              key={currentCard.id}
              initial={{ x: 280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
            >
              <QuizFill
                card={currentCard}
                onAnswer={(grade, correct) =>
                  handleAnswer(currentCard, grade, correct)
                }
              />
            </motion.div>
          )}

          {questionType === "flashcard" && (
            <motion.div
              key="flashcard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <FlashcardDeck
                cards={cards.slice(currentIdx)}
                onComplete={() => setReviewedCount(totalCards)}
                onGrade={handleFlashcardGrade}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── End Screen ──────────────────────────────────────────── */

interface EndScreenProps {
  reviewedCount: number;
  correctCount: number;
  streak: number;
  sessionStart: number;
  onBack: () => void;
}

function EndScreen({
  reviewedCount,
  correctCount,
  streak,
  sessionStart,
  onBack,
}: EndScreenProps) {
  const accuracy =
    reviewedCount > 0
      ? Math.round((correctCount / reviewedCount) * 100)
      : 0;

  const elapsed = Math.round((Date.now() - sessionStart) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <motion.div
        className="glass-strong p-8 w-full max-w-sm text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 22, stiffness: 260 }}
      >
        <h2 className="text-xl font-bold mb-6">Session Complete! 🎉</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span style={{ color: "var(--color-ink-dim)" }}>Accuracy</span>
            <span className="font-medium">{accuracy}%</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--color-ink-dim)" }}>Time</span>
            <span className="font-medium">{timeStr}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--color-ink-dim)" }}>Best Streak</span>
            <span className="font-medium">🔥 {streak}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--color-ink-dim)" }}>Cards Reviewed</span>
            <span className="font-medium">{reviewedCount}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--color-ink-dim)" }}>Cards Learned</span>
            <span className="font-medium">{correctCount}</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={onBack}
            className="glass px-6 py-2 text-sm font-medium transition-all duration-200 hover:brightness-110"
            style={{ minHeight: 44 }}
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
