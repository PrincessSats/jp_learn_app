"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { Card, Grade } from "@/types";
import { KanjiPopup } from "./KanjiPopup";

interface QuizFillProps {
  card: Card;
  onAnswer: (grade: Grade, correct: boolean) => void;
}

/** Strip punctuation, trim, lowercase for fuzzy comparison */
function normalize(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:()「」『』【】、。・？！；：…—～""''・\s]+/g, "");
}

/**
 * Replace the first occurrence of `back` in `front` with a blank indicator.
 * If the answer text isn't found verbatim, return the front as-is.
 */
function buildPrompt(front: string, back: string): string {
  const idx = front.indexOf(back);
  if (idx !== -1) {
    return front.slice(0, idx) + "______" + front.slice(idx + back.length);
  }
  return front;
}

/**
 * Split text into segments, rendering individual kanji characters as
 * clickable accent-coloured buttons that open KanjiPopup.
 */
function renderKanjiText(
  text: string,
  onKanjiClick: (char: string) => void
): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /([\u4e00-\u9faf\u3400-\u4dbf])/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }
    const char = match[0];
    parts.push(
      <button
        key={key++}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onKanjiClick(char);
        }}
        className="inline-flex items-center justify-center underline decoration-dotted underline-offset-2 transition-colors hover:brightness-125"
        style={{
          color: "var(--color-accent)",
          minHeight: 44,
          minWidth: 44,
        }}
      >
        {char}
      </button>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }

  return <>{parts}</>;
}

export function QuizFill({ card, onAnswer }: QuizFillProps) {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [kanjiChar, setKanjiChar] = useState<string | null>(null);

  const prompt = buildPrompt(card.front, card.back);

  const handleSubmit = useCallback(() => {
    if (submitted) return;

    const correct = normalize(input) === normalize(card.back);
    setIsCorrect(correct);
    setSubmitted(true);

    // Brief delay so user sees feedback before advancing
    setTimeout(() => {
      const grade: Grade = correct ? 3 : 1;
      onAnswer(grade, correct);
    }, 1500);
  }, [input, card.back, submitted, onAnswer]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !submitted && input.trim()) {
        handleSubmit();
      }
    },
    [handleSubmit, submitted, input]
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Sentence with blank */}
      <motion.div
        className="glass p-5 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-lg font-jp leading-relaxed">
          {renderKanjiText(prompt, setKanjiChar)}
        </p>
      </motion.div>

      {/* Text input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.25 }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={submitted}
          placeholder="答えを入力…"
          autoFocus
          className="glass w-full px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-ink-faint"
          style={{
            border: `1px solid ${
              submitted
                ? isCorrect
                  ? "#22c55e"
                  : "#ef4444"
                : "var(--color-glass-border)"
            }`,
            minHeight: 48,
          }}
          onFocus={(e) => {
            if (!submitted) {
              e.currentTarget.style.borderColor = "var(--color-accent)";
            }
          }}
          onBlur={(e) => {
            if (!submitted) {
              e.currentTarget.style.borderColor = "var(--color-glass-border)";
            }
          }}
        />
      </motion.div>

      {/* Submit button */}
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.25 }}
        onClick={handleSubmit}
        disabled={submitted || !input.trim()}
        className="glass-strong w-full py-3 text-sm font-medium transition-all duration-200 disabled:opacity-40"
        style={{ minHeight: 48 }}
      >
        {submitted ? (isCorrect ? "✓ 正解！" : "✗ 不正解") : "確認"}
      </motion.button>

      {/* Correct answer revealed on wrong guess */}
      {submitted && !isCorrect && (
        <motion.div
          className="text-center text-sm"
          style={{ color: "var(--color-ink-dim)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          正解:{" "}
          <span className="font-jp" style={{ color: "var(--color-accent)" }}>
            {card.back}
          </span>
        </motion.div>
      )}

      {/* Kanji popup overlay */}
      {kanjiChar && (
        <KanjiPopup character={kanjiChar} onClose={() => setKanjiChar(null)} />
      )}
    </div>
  );
}
