"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import type { Card, Grade } from "@/types";
import { streakToGrade } from "@/lib/fsrs";

/* ─── Props ─── */

interface QuizFillProps {
  card: Card;
  onAnswer: (grade: Grade, correct: boolean) => void;
}

/* ─── Fuzzy matching (Levenshtein distance ≤ 1) ─── */

function fuzzyMatch(input: string, target: string): boolean {
  const a = input.toLowerCase().trim();
  const b = target.toLowerCase().trim();

  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;

  const dp: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    dp[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[a.length][b.length] <= 1;
}

/* ─── Component ─── */

export function QuizFill({ card, onAnswer }: QuizFillProps) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ─── Build sentence with blank ─── */

  const sentence = useMemo(() => {
    const front = card.front;
    const back = card.back;
    // Replace the first occurrence of the answer text with "_____"
    if (front.includes(back)) {
      return front.replace(back, "_____");
    }
    // Fallback: append blank
    return `${front} (_____)`;
  }, [card.front, card.back]);

  /* ─── Reset on new card ─── */

  useEffect(() => {
    setAnswer("");
    setSubmitted(false);
    setIsCorrect(null);
    inputRef.current?.focus();
  }, [card.id]);

  /* ─── Submit handler ─── */

  const handleSubmit = useCallback(() => {
    if (submitted || !answer.trim()) return;

    const correct = fuzzyMatch(answer, card.back);
    setIsCorrect(correct);
    setSubmitted(true);

    const grade = streakToGrade(card.streak, correct);

    setTimeout(() => {
      onAnswer(grade, correct);
    }, 1200);
  }, [submitted, answer, card.back, card.streak, onAnswer]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  /* ─── Render ─── */

  return (
    <div className="col" style={{ flex: 1, gap: 20 }}>
      {/* ─── Sentence with blank ─── */}
      <div className="glass" style={{ padding: "28px 20px", textAlign: "center" }}>
        <div className="jp" style={{ fontSize: 20, lineHeight: 1.6 }}>
          {sentence}
        </div>
      </div>

      {/* ─── Input area ─── */}
      <div className="col" style={{ gap: 10 }}>
        <input
          ref={inputRef}
          className="input"
          type="text"
          placeholder="Type your answer…"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={submitted}
          autoComplete="off"
          autoFocus
          style={{
            borderColor: submitted
              ? isCorrect
                ? "rgba(52, 211, 153, 0.6)"
                : "rgba(239, 68, 68, 0.6)"
              : undefined,
            transition: "border-color 0.3s",
          }}
        />

        {/* Submit button (before answer) */}
        {!submitted && (
          <button
            className="btn"
            onClick={handleSubmit}
            disabled={!answer.trim()}
            style={{
              opacity: answer.trim() ? 1 : 0.5,
              cursor: answer.trim() ? "pointer" : "not-allowed",
            }}
          >
            Check answer
          </button>
        )}

        {/* Result panel (after submit) */}
        {submitted && (
          <div
            className="glass"
            style={{
              padding: "14px 16px",
              textAlign: "center",
              borderColor: isCorrect
                ? "rgba(52, 211, 153, 0.4)"
                : "rgba(239, 68, 68, 0.4)",
              transition: "border-color 0.3s",
            }}
          >
            {isCorrect ? (
              <div style={{ color: "#6ee7b7", fontWeight: 600, fontSize: 14 }}>
                ✓ Correct!
              </div>
            ) : (
              <div className="col" style={{ gap: 4, alignItems: "center" }}>
                <div style={{ color: "#fca5a5", fontWeight: 600, fontSize: 14 }}>
                  ✗ Incorrect
                </div>
                <div className="jp dim" style={{ fontSize: 15 }}>
                  Correct answer:{" "}
                  <strong style={{ color: "var(--ink)" }}>{card.back}</strong>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
