"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import type { Card, Grade } from "@/types";
import { streakToGrade } from "@/lib/fsrs";

/* ─── Props ─── */

interface QuizMCQProps {
  card: Card;
  allCards: Card[];
  onAnswer: (grade: Grade, correct: boolean) => void;
}

/* ─── Component ─── */

export function QuizMCQ({ card, allCards, onAnswer }: QuizMCQProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);

  /* ─── Generate 4 options (correct back + 3 unique distractors) ─── */

  const options = useMemo(() => {
    const distractors = allCards
      .filter((c) => c.id !== card.id && c.back !== card.back)
      .map((c) => c.back)
      .filter((b, i, arr) => arr.indexOf(b) === i); // deduplicate

    // Shuffle, take up to 3, add correct, shuffle again
    const shuffled = distractors.sort(() => Math.random() - 0.5).slice(0, 3);
    const all = [card.back, ...shuffled].sort(() => Math.random() - 0.5);
    return all;
  }, [card.id, card.back, allCards]);

  /* ─── Reset on new card ─── */

  useEffect(() => {
    setSelected(null);
    setAnsweredCorrectly(null);
  }, [card.id]);

  /* ─── Option tap handler ─── */

  const handleSelect = useCallback(
    (option: string) => {
      if (selected !== null) return; // already answered this card

      const correct = option === card.back;
      setSelected(option);
      setAnsweredCorrectly(correct);

      const grade = streakToGrade(card.streak, correct);

      setTimeout(() => {
        onAnswer(grade, correct);
      }, 800);
    },
    [selected, card.back, card.streak, onAnswer]
  );

  /* ─── Render ─── */

  return (
    <div className="col" style={{ flex: 1, gap: 20 }}>
      {/* ─── Front (Japanese text) ─── */}
      <div className="glass" style={{ padding: "28px 20px", textAlign: "center" }}>
        <div className="jp title" style={{ fontSize: 32 }}>
          {card.front}
        </div>
      </div>

      {/* ─── Options ─── */}
      <div className="col" style={{ gap: 10 }}>
        {options.map((option, i) => {
          const isSelected = selected === option;
          const isCorrectOption = option === card.back;

          // Border styling based on answer state
          let borderStyle: React.CSSProperties = {};
          if (isSelected) {
            borderStyle = {
              borderColor: isCorrectOption
                ? "rgba(52, 211, 153, 0.6)"
                : "rgba(239, 68, 68, 0.6)",
              boxShadow: isCorrectOption
                ? "0 0 16px rgba(52, 211, 153, 0.25)"
                : "0 0 16px rgba(239, 68, 68, 0.25)",
            };
          } else if (selected !== null && isCorrectOption) {
            // Reveal correct answer after selection
            borderStyle = {
              borderColor: "rgba(52, 211, 153, 0.4)",
              boxShadow: "0 0 12px rgba(52, 211, 153, 0.15)",
            };
          }

          return (
            <div
              key={i}
              className={`glass${selected === null ? " press" : ""}`}
              style={{
                padding: "16px 18px",
                cursor: selected === null ? "pointer" : "default",
                transition: "border-color 0.3s, box-shadow 0.3s",
                ...borderStyle,
              }}
              onClick={() => handleSelect(option)}
              role="button"
              tabIndex={selected === null ? 0 : -1}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && selected === null) {
                  handleSelect(option);
                }
              }}
              aria-label={`Option ${String.fromCharCode(65 + i)}`}
            >
              <div className="row" style={{ gap: 12, alignItems: "center" }}>
                {/* Letter badge */}
                <span
                  className="mono faint"
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 600,
                    background: "rgba(255,255,255,0.06)",
                    flexShrink: 0,
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>

                {/* Answer text */}
                <span style={{ fontSize: 15, fontWeight: 500 }}>{option}</span>

                {/* Result icon */}
                {isSelected && (
                  <span style={{ marginLeft: "auto", fontSize: 18 }}>
                    {isCorrectOption ? "✓" : "✗"}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
