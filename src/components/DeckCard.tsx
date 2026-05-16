"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { Deck, PracticeMode } from "@/types";

/* ─── Helpers ─── */

const MODE_ICONS: Record<PracticeMode, string> = {
  vocabulary: "📖",
  kanji: "漢",
  grammar: "📝",
  reading: "📄",
  listening: "🎧",
};

const MODE_LABELS: Record<PracticeMode, string> = {
  vocabulary: "Vocabulary",
  kanji: "Kanji",
  grammar: "Grammar",
  reading: "Reading",
  listening: "Listening",
};

const TEST_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  N5: { bg: "rgba(52,211,153,0.18)", text: "#34d399" },
  N4: { bg: "rgba(96,165,250,0.18)", text: "#60a5fa" },
  N3: { bg: "rgba(251,191,36,0.18)", text: "#fbbf24" },
  N2: { bg: "rgba(251,146,60,0.18)", text: "#fb923c" },
  N1: { bg: "rgba(248,113,113,0.18)", text: "#f87171" },
  BJT: { bg: "rgba(167,139,250,0.18)", text: "#a78bfa" },
};

function formatDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/* ─── Props ─── */

interface DeckCardProps {
  deck: Deck;
  dueCount: number;
  onSelect: (deckId: string) => void;
  onDelete: (deckId: string) => void;
}

/* ─── Component ─── */

export function DeckCard({ deck, dueCount, onSelect, onDelete }: DeckCardProps) {
  const [showDelete, setShowDelete] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isHeld, setIsHeld] = useState(false);

  const colors = TEST_TYPE_COLORS[deck.testType] ?? TEST_TYPE_COLORS.N5;
  const reviewed = deck.cardCount - dueCount;
  const progressPct = deck.cardCount > 0 ? Math.min(1, reviewed / deck.cardCount) : 0;

  /* ─── Animated progress bar width ─── */
  const widthMotion = useMotionValue(0);
  const widthPct = useTransform(widthMotion, [0, 1], ["0%", "100%"]);

  /* ─── Long-press handlers ─── */
  const handlePointerDown = useCallback(() => {
    longPressTimer.current = setTimeout(() => {
      setIsHeld(true);
      setShowDelete(true);
    }, 600);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (!isHeld) {
      onSelect(deck.id);
    }
    setIsHeld(false);
  }, [isHeld, onSelect, deck.id]);

  const handlePointerLeave = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setIsHeld(false);
  }, []);

  /* ─── Animate bar on mount ─── */
  const [hasAnimated, setHasAnimated] = useState(false);
  if (!hasAnimated) {
    requestAnimationFrame(() => {
      widthMotion.set(progressPct);
    });
    setHasAnimated(true);
  }

  return (
    <>
      <motion.button
        className="glass w-full text-left cursor-pointer select-none"
        style={{
          padding: "14px 16px",
          borderRadius: 20,
          outline: "none",
          border: isHeld ? "1px solid var(--color-accent)" : undefined,
        }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowDelete(true);
        }}
        aria-label={`Deck: ${deck.name}`}
      >
        {/* Header row */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0 mr-2">
            <h3
              className="text-sm font-semibold truncate"
              style={{ color: "var(--color-ink)" }}
            >
              {deck.name}
            </h3>
            {deck.description && (
              <p
                className="text-xs mt-0.5 line-clamp-1"
                style={{ color: "var(--color-ink-dim)" }}
              >
                {deck.description}
              </p>
            )}
          </div>

          {/* Test type badge */}
          <span
            className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full leading-tight"
            style={{
              background: colors.bg,
              color: colors.text,
            }}
          >
            {deck.testType}
          </span>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 mb-2.5 text-xs" style={{ color: "var(--color-ink-dim)" }}>
          {/* Mode icon */}
          <span className="flex items-center gap-1" title={MODE_LABELS[deck.practiceMode]}>
            <span className="text-sm">{MODE_ICONS[deck.practiceMode]}</span>
            <span>{MODE_LABELS[deck.practiceMode]}</span>
          </span>

          {/* Card count */}
          <span>{deck.cardCount} cards</span>

          {/* Due count */}
          {dueCount > 0 && (
            <span style={{ color: "var(--color-accent)" }}>
              {dueCount} due
            </span>
          )}

          {/* Last studied */}
          {deck.lastStudied && (
            <span className="ml-auto" style={{ color: "var(--color-ink-faint)" }}>
              {formatDate(deck.lastStudied)}
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div
          className="relative w-full h-1.5 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: widthPct,
              background:
                progressPct >= 1
                  ? "linear-gradient(90deg, #34d399, #6ee7b7)"
                  : "linear-gradient(90deg, var(--color-accent), var(--color-accent-2))",
            }}
          />
        </div>

        {/* Progress label */}
        <div
          className="flex justify-between mt-1 text-[10px]"
          style={{ color: "var(--color-ink-faint)" }}
        >
          <span>
            {reviewed}/{deck.cardCount} reviewed
          </span>
          <span>{Math.round(progressPct * 100)}%</span>
        </div>
      </motion.button>

      {/* Delete confirmation overlay */}
      {showDelete && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.6)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowDelete(false)}
        >
          <motion.div
            className="glass-strong p-6 mx-4 max-w-xs w-full text-center"
            style={{ borderRadius: 20 }}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-2xl mb-2">🗑️</div>
            <h3
              className="text-base font-semibold mb-1"
              style={{ color: "var(--color-ink)" }}
            >
              Delete &ldquo;{deck.name}&rdquo;?
            </h3>
            <p
              className="text-xs mb-4"
              style={{ color: "var(--color-ink-dim)" }}
            >
              This will remove the deck and all {deck.cardCount} cards inside it.
            </p>
            <div className="flex gap-3">
              <button
                className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: "var(--color-ink)",
                }}
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  background: "rgba(255,90,78,0.25)",
                  color: "var(--color-accent)",
                }}
                onClick={() => {
                  setShowDelete(false);
                  onDelete(deck.id);
                }}
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
