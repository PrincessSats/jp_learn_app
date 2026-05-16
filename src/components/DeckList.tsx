"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Deck, TestType, PracticeMode } from "@/types";
import { DeckCard } from "./DeckCard";

/* ─── Props ─── */

interface DeckListFilters {
  testType?: TestType | null;
  practiceMode?: PracticeMode | null;
}

interface DeckListProps {
  decks: Deck[];
  dueCounts: Record<string, number>;
  onSelect: (deckId: string) => void;
  onDelete: (deckId: string) => void;
  filter: DeckListFilters;
  onImportClick?: () => void;
}

/* ─── Component ─── */

export function DeckList({
  decks,
  dueCounts,
  onSelect,
  onDelete,
  filter,
  onImportClick,
}: DeckListProps) {
  /* ─── Apply filters ─── */
  const filtered = useMemo(() => {
    let result = decks;
    if (filter.testType) {
      result = result.filter((d) => d.testType === filter.testType);
    }
    if (filter.practiceMode) {
      result = result.filter((d) => d.practiceMode === filter.practiceMode);
    }
    // Sort: most recently studied first, then by name
    return result.sort((a, b) => {
      if (a.lastStudied && b.lastStudied) return b.lastStudied - a.lastStudied;
      if (a.lastStudied) return -1;
      if (b.lastStudied) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [decks, filter]);

  /* ─── Empty state ─── */
  if (filtered.length === 0) {
    const hasFilters = !!filter.testType || !!filter.practiceMode;
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-16 px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-5xl mb-4 opacity-50">
          {hasFilters ? "🔍" : "📚"}
        </div>
        <h3
          className="text-base font-semibold mb-1.5"
          style={{ color: "var(--color-ink)" }}
        >
          {hasFilters ? "No matching decks" : "No decks yet"}
        </h3>
        <p
          className="text-sm mb-5 max-w-[260px]"
          style={{ color: "var(--color-ink-dim)" }}
        >
          {hasFilters
            ? "Try changing your filters to see more decks."
            : "Create or import your first deck to start studying Japanese."}
        </p>
        {!hasFilters && (
          <motion.button
            className="glass-strong px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ color: "var(--color-ink)" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onImportClick}
          >
            <span className="flex items-center gap-2">
              <span>📥</span>
              <span>Import Deck</span>
            </span>
          </motion.button>
        )}
      </motion.div>
    );
  }

  /* ─── Deck grid ─── */
  return (
    <div className="flex flex-col gap-3">
      <div
        className="text-xs font-medium px-1 mb-1"
        style={{ color: "var(--color-ink-faint)" }}
      >
        {filtered.length} deck{filtered.length !== 1 ? "s" : ""}
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.map((deck, i) => (
          <motion.div
            key={deck.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 26,
              delay: i * 0.04,
            }}
          >
            <DeckCard
              deck={deck}
              dueCount={dueCounts[deck.id] ?? 0}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
