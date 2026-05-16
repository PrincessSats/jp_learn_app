"use client";

import { useMemo, useState, useCallback } from "react";
import type { Deck, TestType, PracticeMode } from "@/types";

/* ─── Helpers (inlined from DeckCard) ─── */

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
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const confirmDelete = useCallback(() => {
    if (deletingId) {
      onDelete(deletingId);
      setDeletingId(null);
    }
  }, [deletingId, onDelete]);

  const cancelDelete = useCallback(() => {
    setDeletingId(null);
  }, []);

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
    return [...result].sort((a, b) => {
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
      <div
        className="col"
        style={{ gap: 16, padding: "40px 16px", alignItems: "center", textAlign: "center" }}
      >
        <div
          className="glass"
          style={{
            padding: "32px 20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 40, lineHeight: 1, opacity: 0.5 }}>
            {hasFilters ? "🔍" : "📚"}
          </div>
          <div className="title" style={{ fontSize: 20 }}>
            {hasFilters ? "No matching decks" : "No decks yet"}
          </div>
          <p className="dim" style={{ fontSize: 13, maxWidth: 260, margin: 0 }}>
            {hasFilters
              ? "Try changing your filters to see more decks."
              : "Create or import your first deck to start studying Japanese."}
          </p>
          {!hasFilters && (
            <button className="btn ghost" onClick={onImportClick} style={{ marginTop: 4 }}>
              <span className="row" style={{ gap: 6, alignItems: "center" }}>
                <span>📥</span>
                <span>Import Deck</span>
              </span>
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ─── Deck grid ─── */
  return (
    <div className="col" style={{ gap: 12 }}>
      <div className="eyebrow" style={{ paddingLeft: 4 }}>
        {filtered.length} deck{filtered.length !== 1 ? "s" : ""}
      </div>

      <div className="grid-c grid-2">
        {filtered.map((deck) => {
          const dueCount = dueCounts[deck.id] ?? 0;
          const colors = TEST_TYPE_COLORS[deck.testType] ?? TEST_TYPE_COLORS.N5;
          const reviewed = deck.cardCount - dueCount;
          const progressPct =
            deck.cardCount > 0 ? Math.min(1, reviewed / deck.cardCount) : 0;

          return (
            <div
              key={deck.id}
              className="glass press"
              style={{ padding: 14, borderRadius: 20 }}
              onClick={() => onSelect(deck.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect(deck.id);
              }}
              aria-label={`Deck: ${deck.name}`}
            >
              {/* Header row: thumb + name + test type badge */}
              <div className="row between" style={{ marginBottom: 10, alignItems: "flex-start" }}>
                <div
                  className="row"
                  style={{ gap: 10, alignItems: "center", flex: 1, minWidth: 0 }}
                >
                  <div className="deck-thumb">
                    {MODE_ICONS[deck.practiceMode]}
                  </div>
                  <div className="col" style={{ flex: 1, minWidth: 0, gap: 2 }}>
                    <div
                      className="title"
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {deck.name}
                    </div>
                    {deck.description && (
                      <div
                        className="dim"
                        style={{
                          fontSize: 11,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {deck.description}
                      </div>
                    )}
                  </div>
                </div>
                <span
                  className="pill"
                  style={{
                    background: colors.bg,
                    color: colors.text,
                    border: "none",
                    flexShrink: 0,
                  }}
                >
                  {deck.testType}
                </span>
              </div>

              {/* Meta row: mode pill + counts */}
              <div className="row" style={{ gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                <span className="pill">
                  <span style={{ fontSize: 13 }}>
                    {MODE_ICONS[deck.practiceMode]}
                  </span>
                  {MODE_LABELS[deck.practiceMode]}
                </span>
                <span className="mono dim" style={{ fontSize: 11 }}>
                  {deck.cardCount} cards
                </span>
                {dueCount > 0 && (
                  <span
                    className="mono"
                    style={{ fontSize: 11, color: "var(--color-accent)" }}
                  >
                    {dueCount} due
                  </span>
                )}
              </div>

              {/* Progress bar */}
              <div className="progress" style={{ marginBottom: 6 }}>
                <span style={{ transform: `scaleX(${progressPct})` }} />
              </div>

              {/* Progress label row */}
              <div className="row between" style={{ gap: 4 }}>
                <span className="mono faint" style={{ fontSize: 10 }}>
                  {reviewed}/{deck.cardCount} reviewed
                </span>
                <span className="mono faint" style={{ fontSize: 10 }}>
                  {Math.round(progressPct * 100)}%
                </span>
              </div>

              {/* Last studied + delete */}
              <div className="row between" style={{ marginTop: 10 }}>
                {deck.lastStudied ? (
                  <span className="faint" style={{ fontSize: 10.5 }}>
                    Studied {formatDate(deck.lastStudied)}
                  </span>
                ) : (
                  <span className="faint" style={{ fontSize: 10.5 }}>
                    Not studied yet
                  </span>
                )}
                <button
                  className="btn ghost"
                  style={{
                    fontSize: 11,
                    padding: "5px 10px",
                    background: "rgba(255,90,78,0.12)",
                    color: "var(--color-accent)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingId(deck.id);
                  }}
                  aria-label={`Delete ${deck.name}`}
                >
                  ✕ Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Delete confirmation overlay ─── */}
      {deletingId &&
        (() => {
          const deck = decks.find((d) => d.id === deletingId);
          if (!deck) return null;
          return (
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.6)",
              }}
              onClick={cancelDelete}
            >
              <div
                className="glass glass-strong"
                style={{
                  padding: 24,
                  margin: "0 16px",
                  maxWidth: 300,
                  width: "100%",
                  textAlign: "center",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>🗑️</div>
                <div className="title" style={{ fontSize: 16, marginBottom: 4 }}>
                  Delete &ldquo;{deck.name}&rdquo;?
                </div>
                <p className="dim" style={{ fontSize: 13, marginBottom: 16 }}>
                  This will remove the deck and all {deck.cardCount} cards inside
                  it.
                </p>
                <div className="row" style={{ gap: 10, justifyContent: "center" }}>
                  <button
                    className="btn ghost"
                    onClick={cancelDelete}
                    style={{ flex: 1, fontSize: 13, padding: "10px 0" }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn"
                    onClick={confirmDelete}
                    style={{
                      flex: 1,
                      fontSize: 13,
                      padding: "10px 0",
                      background: "rgba(255,90,78,0.85)",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
}