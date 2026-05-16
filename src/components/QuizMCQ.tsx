"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import type { Card, Grade } from "@/types";
import { KanjiPopup } from "./KanjiPopup";

interface QuizMCQProps {
  card: Card;
  allCards: Card[];
  onAnswer: (grade: Grade, correct: boolean) => void;
}

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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

export function QuizMCQ({ card, allCards, onAnswer }: QuizMCQProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [kanjiChar, setKanjiChar] = useState<string | null>(null);

  // Generate 4 shuffled options: correct answer + 3 distractors from other cards
  const optionList = useMemo(() => {
    const others = shuffle(allCards.filter((c) => c.id !== card.id));
    const distractors: string[] = [];
    for (const c of others) {
      if (distractors.length >= 3) break;
      if (c.back && c.back !== card.back && !distractors.includes(c.back)) {
        distractors.push(c.back);
      }
    }
    while (distractors.length < 3) {
      distractors.push("——");
    }

    const all = [card.back, ...distractors];
    return shuffle(all);
    // Shifts per render because allCards order is stable but shuffle is re-run
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.id, card.back, allCards]);

  const correctIndex = optionList.indexOf(card.back);

  const handleSelect = useCallback(
    (idx: number) => {
      if (answered) return;
      setSelectedIdx(idx);
      setAnswered(true);

      const isCorrect = optionList[idx] === card.back;

      // Auto-advance after 800ms
      setTimeout(() => {
        const grade: Grade = isCorrect ? 3 : 1;
        onAnswer(grade, isCorrect);
      }, 800);
    },
    [answered, optionList, card.back, onAnswer]
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Question (front) */}
      <motion.div
        className="glass p-5 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-lg font-jp leading-relaxed">
          {renderKanjiText(card.front, setKanjiChar)}
        </p>
      </motion.div>

      {/* Answer options */}
      <div className="flex flex-col gap-3">
        {optionList.map((opt, idx) => {
          const isCorrect = idx === correctIndex;
          const isSelected = selectedIdx === idx;
          let bg = "var(--color-glass-bg)";
          let border = "var(--color-glass-border)";

          if (answered) {
            if (isCorrect) {
              bg = "rgba(34, 197, 94, 0.18)";
              border = "#22c55e";
            } else if (isSelected) {
              bg = "rgba(239, 68, 68, 0.18)";
              border = "#ef4444";
            }
          }

          return (
            <motion.button
              key={`${card.id}-${idx}`}
              type="button"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.07, duration: 0.25 }}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className="glass w-full text-left px-4 py-3 text-sm transition-all duration-200 disabled:cursor-default"
              style={{
                background: bg,
                borderColor: border,
                minHeight: 48,
              }}
            >
              {renderKanjiText(opt, setKanjiChar)}
            </motion.button>
          );
        })}
      </div>

      {/* Kanji popup overlay */}
      {kanjiChar && (
        <KanjiPopup character={kanjiChar} onClose={() => setKanjiChar(null)} />
      )}
    </div>
  );
}
