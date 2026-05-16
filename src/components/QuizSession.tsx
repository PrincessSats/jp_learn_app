"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { Card, Deck, Grade, PracticeMode, QuestionType } from "@/types";
import { getDeck, getDueCards } from "@/lib/db";
import { QuizMCQ } from "./QuizMCQ";
import { QuizFill } from "./QuizFill";
import { FlashcardDeck } from "./FlashcardDeck";

/* ─── Props ─── */

interface QuizSessionProps {
  deckId: string;
  onBack: () => void;
}

/* ─── Helpers ─── */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function practiceModeToQuestionType(mode: PracticeMode): QuestionType {
  switch (mode) {
    case "vocabulary":
      return "mcq";
    case "kanji":
      return "flashcard";
    case "grammar":
      return "fill";
    case "reading":
      return "mcq";
    case "listening":
      return "mcq";
  }
}

/* ─── Component ─── */

export function QuizSession({ deckId, onBack }: QuizSessionProps) {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [startTime] = useState(Date.now());
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ─── Load data ─── */

  useEffect(() => {
    async function load() {
      const [d, dueCards] = await Promise.all([
        getDeck(deckId),
        getDueCards(deckId),
      ]);
      if (d) setDeck(d);
      setCards(shuffle(dueCards));
      setLoading(false);
    }
    load();
  }, [deckId]);

  /* ─── Answer handler ─── */

  const handleAnswer = useCallback(
    (_grade: Grade, correct: boolean) => {
      if (correct) {
        setCorrectCount((c) => c + 1);
        setQuizStreak((s) => s + 1);
      } else {
        setQuizStreak(0);
      }

      const nextIdx = currentIdx + 1;
      if (nextIdx >= cards.length) {
        setFinished(true);
      } else {
        setCurrentIdx(nextIdx);
      }
    },
    [currentIdx, cards.length]
  );

  /* ─── Elapsed time display ─── */

  const elapsed = useMemo(() => {
    const s = Math.floor((Date.now() - startTime) / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished, startTime]);

  const accuracy = cards.length > 0 ? Math.round((correctCount / cards.length) * 100) : 0;

  /* ─── Loading state ─── */

  if (loading) {
    return (
      <div
        className="col"
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: 12,
          paddingTop: 60,
        }}
      >
        <div className="dim mono" style={{ fontSize: 13 }}>
          Loading session…
        </div>
      </div>
    );
  }

  /* ─── Deck not found ─── */

  if (!deck) {
    return (
      <div
        className="col"
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: 12,
          paddingTop: 60,
        }}
      >
        <div className="dim" style={{ fontSize: 14 }}>
          Deck not found
        </div>
        <button className="btn ghost" onClick={onBack}>
          Back
        </button>
      </div>
    );
  }

  /* ─── End screen ─── */

  if (finished) {
    return (
      <div
        className="page col"
        style={{
          gap: 24,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          paddingTop: 40,
        }}
      >
        <div
          className="glass"
          style={{ padding: "32px 24px", textAlign: "center", width: "100%", maxWidth: 340 }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
          <div className="title" style={{ fontSize: 20, marginBottom: 12 }}>
            Session Complete!
          </div>

          <div className="col" style={{ gap: 8, alignItems: "center" }}>
            <div
              className="mono"
              style={{ fontSize: 36, fontWeight: 700, color: "var(--accent)" }}
            >
              {accuracy}%
            </div>
            <div className="dim" style={{ fontSize: 13 }}>
              accuracy
            </div>
          </div>

          <div className="row" style={{ justifyContent: "center", gap: 24, marginTop: 16 }}>
            <div className="col" style={{ alignItems: "center", gap: 2 }}>
              <div className="mono" style={{ fontSize: 18, fontWeight: 600 }}>
                {elapsed}
              </div>
              <div className="faint" style={{ fontSize: 11 }}>
                time
              </div>
            </div>
            <div className="col" style={{ alignItems: "center", gap: 2 }}>
              <div className="mono" style={{ fontSize: 18, fontWeight: 600 }}>
                {cards.length}
              </div>
              <div className="faint" style={{ fontSize: 11 }}>
                reviewed
              </div>
            </div>
            <div className="col" style={{ alignItems: "center", gap: 2 }}>
              <div className="mono" style={{ fontSize: 18, fontWeight: 600 }}>
                {correctCount}
              </div>
              <div className="faint" style={{ fontSize: 11 }}>
                correct
              </div>
            </div>
          </div>

          <button
            className="btn ghost"
            onClick={onBack}
            style={{ marginTop: 20, width: "100%" }}
          >
            Back to decks
          </button>
        </div>
      </div>
    );
  }

  /* ─── Active session ─── */

  const questionType = practiceModeToQuestionType(deck.practiceMode);
  const isFlashcard = questionType === "flashcard";

  return (
    <div className="col page" style={{ flex: 1, gap: 16 }}>
      {/* Progress header — hidden for flashcard mode (FlashcardDeck manages its own) */}
      {!isFlashcard && (
        <div className="col" style={{ gap: 6 }}>
          <div className="row between">
            <div className="dim" style={{ fontSize: 13 }}>
              Card {currentIdx + 1}/{cards.length}
            </div>
            <button
              className="btn ghost"
              onClick={onBack}
              style={{ fontSize: 12, padding: "4px 12px" }}
              aria-label="Quit session"
            >
              ✕
            </button>
          </div>
          <div className="progress">
            <span style={{ transform: `scaleX(${currentIdx / cards.length})` }} />
          </div>
        </div>
      )}

      {/* Question content */}
      {isFlashcard ? (
        <FlashcardDeck cards={cards} onComplete={() => setFinished(true)} />
      ) : questionType === "mcq" ? (
        <QuizMCQ card={cards[currentIdx]} allCards={cards} onAnswer={handleAnswer} />
      ) : (
        <QuizFill card={cards[currentIdx]} onAnswer={handleAnswer} />
      )}
    </div>
  );
}
