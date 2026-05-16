"use client";

import { useState, useCallback, useEffect } from "react";
import type { Card, Grade } from "@/types";
import { scheduleCard, streakToGrade } from "@/lib/fsrs";
import { saveCard, saveReviewLog } from "@/lib/db";

/* ─── Props ─── */

interface FlashcardDeckProps {
  cards: Card[];
  onComplete: () => void;
}

/* ─── Component ─── */

export function FlashcardDeck({ cards, onComplete }: FlashcardDeckProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [streak, setStreak] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const currentCard = cards[currentIdx];
  const isLast = currentIdx >= cards.length - 1;

  /* ─── Flip front → back ─── */

  const handleFlip = useCallback(() => {
    if (!flipped && !transitioning) {
      setFlipped(true);
    }
  }, [flipped, transitioning]);

  /* ─── Grade click handler ─── */

  const handleGrade = useCallback(
    async (grade: Grade) => {
      if (!currentCard || !flipped || transitioning) return;

      const now = Date.now();
      const elapsedDays =
        currentCard.lastReview > 0
          ? (now - currentCard.lastReview) / (1000 * 60 * 60 * 24)
          : 0;

      // FSRS schedule
      const updated = scheduleCard(currentCard, grade, elapsedDays, now);
      await saveCard(updated);

      // Update streak
      setStreak((s) => (grade === 1 ? 0 : s + 1));

      // Persist review log
      await saveReviewLog({
        id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
        cardId: currentCard.id,
        deckId: currentCard.deckId,
        grade,
        elapsedDays,
        responseTime: 0,
        timestamp: now,
      });

      // Flip back & transition out
      setFlipped(false);
      setTransitioning(true);

      setTimeout(() => {
        setTransitioning(false);
        if (isLast) {
          onComplete();
        } else {
          setCurrentIdx((i) => i + 1);
        }
      }, 400);
    },
    [currentCard, flipped, transitioning, isLast, onComplete]
  );

  /* ─── Reset flip when advancing to next card ─── */

  useEffect(() => {
    setFlipped(false);
    setTransitioning(false);
  }, [currentIdx]);

  /* ─── Empty state ─── */

  if (!currentCard) {
    return (
      <div
        className="col"
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <div className="dim" style={{ fontSize: 14 }}>
          No cards to review
        </div>
      </div>
    );
  }

  /* ─── Render ─── */

  return (
    <div
      className="col page"
      style={{
        flex: 1,
        gap: 16,
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? "translateY(8px)" : "none",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* ─── Top bar: card counter + streak ─── */}
      <div className="row between">
        <div className="mono faint" style={{ fontSize: 12 }}>
          {currentIdx + 1}/{cards.length}
        </div>
        {streak > 0 && (
          <div className="mono row" style={{ fontSize: 12, color: "var(--accent-2)", gap: 4 }}>
            <span>🔥</span>
            <span>{streak}</span>
          </div>
        )}
      </div>

      {/* ─── Flip card ─── */}
      <div
        className={`glass flip${flipped ? " flipped" : ""}`}
        style={{
          flex: 1,
          minHeight: 260,
          cursor: flipped ? "default" : "pointer",
        }}
        onClick={!flipped ? handleFlip : undefined}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (!flipped && (e.key === "Enter" || e.key === " ")) {
            handleFlip();
          }
        }}
        aria-label={flipped ? "Card back" : "Tap to flip"}
      >
        <div className="flip-inner">
          {/* ─── Front face ─── */}
          <div className="flip-face" style={{ padding: 24, gap: 12 }}>
            <div
              className="jp title"
              style={{ fontSize: 28, textAlign: "center" }}
            >
              {currentCard.front}
            </div>
            <div
              className="faint"
              style={{
                fontSize: 11,
                marginTop: "auto",
                paddingBottom: 8,
              }}
            >
              Tap to reveal
            </div>
          </div>

          {/* ─── Back face ─── */}
          <div className="flip-face flip-back" style={{ padding: 24, gap: 12 }}>
            <div className="jp" style={{ fontSize: 24, textAlign: "center" }}>
              {currentCard.back}
            </div>

            {currentCard.furigana && (
              <div
                className="dim"
                style={{ fontSize: 14, textAlign: "center" }}
              >
                {currentCard.furigana}
              </div>
            )}

            {currentCard.tags.length > 0 && (
              <div
                className="row"
                style={{
                  gap: 4,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginTop: "auto",
                }}
              >
                {currentCard.tags.map((tag) => (
                  <span key={tag} className="pill" style={{ fontSize: 10 }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Grade buttons (visible on back face) ─── */}
      {flipped && (
        <div
          className="row"
          style={{
            gap: 6,
            justifyContent: "center",
            paddingBottom: 8,
          }}
        >
          <button className="grade-btn again" onClick={() => handleGrade(1)}>
            Again
          </button>
          <button className="grade-btn hard" onClick={() => handleGrade(2)}>
            Hard
          </button>
          <button className="grade-btn good" onClick={() => handleGrade(3)}>
            Good
          </button>
          <button className="grade-btn easy" onClick={() => handleGrade(4)}>
            Easy
          </button>
        </div>
      )}
    </div>
  );
}