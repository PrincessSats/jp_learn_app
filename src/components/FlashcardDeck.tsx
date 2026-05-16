"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Card, Grade } from "@/types";
import { scheduleCard } from "@/lib/fsrs";
import { saveCard } from "@/lib/db";

interface FlashcardDeckProps {
  cards: Card[];
  onComplete: () => void;
  /** Optional callback fired each time a card is graded (for stat tracking) */
  onGrade?: (card: Card, grade: Grade, correct: boolean) => void;
}

/** Map swipe direction to grade: right → Good(3), left → Again(1) */
function swipeToGrade(offsetX: number): Grade {
  return offsetX > 0 ? 3 : 1;
}

export function FlashcardDeck({
  cards,
  onComplete,
  onGrade,
}: FlashcardDeckProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [streak, setStreak] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("right");
  const advancingRef = useRef(false);

  const currentCard: Card | undefined = cards[currentIdx];

  /** Advance to the next card after grading */
  const advance = useCallback(
    (grade: Grade) => {
      if (!currentCard || advancingRef.current) return;
      advancingRef.current = true;
      setExiting(true);
      setSlideDir(grade >= 3 ? "right" : "left");

      // FSRS scheduling & persistence
      const now = Date.now();
      const elapsedDays =
        currentCard.lastReview > 0
          ? (now - currentCard.lastReview) / (1000 * 60 * 60 * 24)
          : 0;
      const updated = scheduleCard(currentCard, grade, elapsedDays, now);

      // Fire onGrade BEFORE the async save so the parent can track immediately
      const isCorrect = grade >= 2;
      onGrade?.(updated, grade, isCorrect);

      // Persist asynchronously (don't block the animation)
      saveCard(updated).catch(console.error);

      // Animated streak counter
      setStreak((s) => (grade === 1 ? 0 : s + 1));

      // Allow flip-back to start, then slide to next card
      setTimeout(() => {
        setFlipped(false);
        setTimeout(() => {
          if (currentIdx + 1 >= cards.length) {
            onComplete();
          } else {
            setCurrentIdx((i) => i + 1);
            setExiting(false);
            advancingRef.current = false;
          }
        }, 100);
      }, 400);
    },
    [currentCard, currentIdx, cards.length, onComplete, onGrade]
  );

  const handleGrade = useCallback(
    (grade: Grade) => {
      if (exiting || advancingRef.current) return;
      advance(grade);
    },
    [exiting, advance]
  );

  const handleDragEnd = useCallback(
    (_: any, info: { offset: { x: number } }) => {
      if (!flipped || exiting || advancingRef.current) return;
      if (Math.abs(info.offset.x) > 80) {
        const grade = swipeToGrade(info.offset.x);
        advance(grade);
      }
    },
    [flipped, exiting, advance]
  );

  const handleFrontTap = useCallback(() => {
    if (!flipped && !exiting) setFlipped(true);
  }, [flipped, exiting]);

  if (cards.length === 0) {
    return (
      <div
        className="flex items-center justify-center h-full"
        style={{ color: "var(--color-ink-dim)" }}
      >
        No cards to review.
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div
        className="flex items-center justify-center h-full"
        style={{ color: "var(--color-ink-dim)" }}
      >
        Done!
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 flex-1">
      {/* Streak counter with spring animation */}
      <motion.div
        key={`streak-${streak}`}
        className="text-sm"
        style={{ color: "var(--color-ink-dim)" }}
        initial={{ scale: 1.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 14, stiffness: 200 }}
      >
        {streak > 0 ? `🔥 ×${streak}` : "　"}
      </motion.div>

      {/* Card area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard.id}
          className="flex-1 w-full"
          drag={flipped ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          onDragEnd={handleDragEnd}
          initial={{ x: slideDir === "right" ? 260 : -260, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: slideDir === "right" ? -260 : 260, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 280 }}
          style={{ touchAction: flipped ? "pan-y" : "manipulation" }}
        >
          <div
            className="card-3d w-full h-full"
            style={{ minHeight: 320 }}
          >
            <div
              className={`card-3d-inner ${flipped ? "flipped" : ""}`}
              style={{ height: "100%" }}
            >
              {/* ─── Front ─── */}
              <div
                className="card-3d-front glass flex items-center justify-center p-6 cursor-pointer select-none"
                onClick={handleFrontTap}
              >
                <p className="text-xl font-jp text-center leading-relaxed">
                  {currentCard.front}
                </p>
              </div>

              {/* ─── Back ─── */}
              <div
                className="card-3d-back glass-strong flex flex-col items-center justify-center p-6 select-none"
                style={{ touchAction: "none" }}
              >
                <div className="flex flex-col items-center gap-3 w-full">
                  <p className="text-2xl font-jp text-center">
                    {currentCard.back}
                  </p>

                  {currentCard.furigana && (
                    <p
                      className="text-sm"
                      style={{ color: "var(--color-ink-dim)" }}
                    >
                      {currentCard.furigana}
                    </p>
                  )}

                  {/* Grade buttons */}
                  <div className="flex gap-2 mt-3 w-full max-w-sm">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGrade(1);
                      }}
                      className="glass flex-1 py-2 text-xs font-medium transition-all duration-200 active:scale-95 hover:brightness-110"
                      style={{
                        background: "rgba(239, 68, 68, 0.2)",
                        borderColor: "#ef4444",
                        minHeight: 44,
                      }}
                    >
                      Again
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGrade(2);
                      }}
                      className="glass flex-1 py-2 text-xs font-medium transition-all duration-200 active:scale-95 hover:brightness-110"
                      style={{
                        background: "rgba(249, 115, 22, 0.2)",
                        borderColor: "#f97316",
                        minHeight: 44,
                      }}
                    >
                      Hard
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGrade(3);
                      }}
                      className="glass flex-1 py-2 text-xs font-medium transition-all duration-200 active:scale-95 hover:brightness-110"
                      style={{
                        background: "rgba(34, 197, 94, 0.2)",
                        borderColor: "#22c55e",
                        minHeight: 44,
                      }}
                    >
                      Good
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGrade(4);
                      }}
                      className="glass flex-1 py-2 text-xs font-medium transition-all duration-200 active:scale-95 hover:brightness-110"
                      style={{
                        background: "rgba(59, 130, 246, 0.2)",
                        borderColor: "#3b82f6",
                        minHeight: 44,
                      }}
                    >
                      Easy
                    </button>
                  </div>

                  {/* Swipe hint */}
                  <p
                    className="text-[10px] mt-1"
                    style={{ color: "var(--color-ink-faint)" }}
                  >
                    ← swipe left · swipe right →
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress */}
      <div
        className="text-xs"
        style={{ color: "var(--color-ink-faint)" }}
      >
        {currentIdx + 1} / {cards.length}
      </div>
    </div>
  );
}
