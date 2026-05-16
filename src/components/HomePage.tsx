"use client";

import { useEffect, useState, useMemo } from "react";
import type { Deck, TestType, PracticeMode, UserStats } from "@/types";
import { getUserStats, getAllDecks, getDueCards } from "@/lib/db";

const TEST_TYPES: TestType[] = ["N5", "N4", "N3", "N2", "N1", "BJT"];

const TEST_TYPE_LABELS: Record<TestType, string> = {
  N5: "JLPT N5", N4: "JLPT N4", N3: "JLPT N3",
  N2: "JLPT N2", N1: "JLPT N1", BJT: "BJT",
};

const MODE_ICONS: Record<PracticeMode, string> = {
  vocabulary: "📖", kanji: "漢", grammar: "📝", reading: "📄", listening: "🎧",
};

const MODE_LABELS: Record<PracticeMode, string> = {
  vocabulary: "Vocab", kanji: "Kanji", grammar: "Grammar",
  reading: "Reading", listening: "Listening",
};

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

interface HomePageProps {
  decks: Deck[];
  dues: Record<string, number>;
  onStartDeck: (deckId: string) => void;
  onNavigate: (tab: string) => void;
}

export function HomePage({ decks, dues, onStartDeck, onNavigate }: HomePageProps) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [s] = await Promise.all([getUserStats()]);
      if (cancelled) return;
      setStats(s);

      // count today's reviews from log
      try {
        const { openDB } = await import("idb");
        const db = await openDB("test-prep", 1);
        const all = await db.getAll("review_logs");
        const today = todayStr();
        const start = new Date(today).getTime();
        const end = start + 86_400_000;
        setTodayCount(all.filter((r: any) => r.timestamp >= start && r.timestamp < end).length);
      } catch { /* ignore */ }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Quick start: most recently studied deck with due cards
  const quickDeck = useMemo(() => {
    const withDues = decks.filter((d) => (dues[d.id] ?? 0) > 0);
    if (withDues.length === 0) return null;
    withDues.sort((a, b) => (b.lastStudied ?? 0) - (a.lastStudied ?? 0));
    return withDues[0];
  }, [decks, dues]);

  // Total due across all decks
  const totalDue = useMemo(
    () => Object.values(dues).reduce((s, c) => s + c, 0),
    [dues],
  );

  // Decks by mode for quick filter
  const modesWithDecks = useMemo(() => {
    const set = new Set(decks.map((d) => d.practiceMode));
    return (["vocabulary", "kanji", "grammar", "reading", "listening"] as PracticeMode[]).filter(
      (m) => set.has(m),
    );
  }, [decks]);

  return (
    <div className="col" style={{ gap: 18 }}>
      {/* Greeting + streak */}
      <div className="row between">
        <div>
          <div className="eyebrow">Welcome back</div>
          <div className="title" style={{ marginTop: 4 }}>
            {stats && stats.streak >= 7 ? "🔥 " : stats && stats.streak >= 3 ? "💪 " : "✨ "}
            {stats ? `${stats.streak} day streak` : "Let's study"}
          </div>
        </div>
        {quickDeck && totalDue > 0 && (
          <button className="btn" onClick={() => onStartDeck(quickDeck.id)}>
            Study ({totalDue})
          </button>
        )}
      </div>

      {/* Stats row */}
      <div className="row" style={{ gap: 10 }}>
        <div className="glass press col" style={{ flex: 1, padding: "14px 16px", alignItems: "flex-start" }}>
          <div className="eyebrow">Today</div>
          <div className="title" style={{ fontSize: 24 }}>{todayCount}</div>
          <div className="dim" style={{ fontSize: 12 }}>reviews</div>
        </div>
        <div className="glass press col" style={{ flex: 1, padding: "14px 16px", alignItems: "flex-start" }}>
          <div className="eyebrow">Total</div>
          <div className="title" style={{ fontSize: 24 }}>{stats?.totalReviews ?? 0}</div>
          <div className="dim" style={{ fontSize: 12 }}>reviews</div>
        </div>
        <div className="glass press col" style={{ flex: 1, padding: "14px 16px", alignItems: "flex-start" }}>
          <div className="eyebrow">Decks</div>
          <div className="title" style={{ fontSize: 24 }}>{decks.length}</div>
          <div className="dim" style={{ fontSize: 12 }}>loaded</div>
        </div>
      </div>

      {/* Due cards bar */}
      {totalDue > 0 && (
        <div className="glass" style={{ padding: "16px 18px" }}>
          <div className="row between" style={{ marginBottom: 10 }}>
            <span className="dim" style={{ fontSize: 13 }}>Due cards</span>
            <span className="mono dim" style={{ fontSize: 13 }}>{totalDue}</span>
          </div>
          <div className="progress">
            <span style={{
              transform: `scaleX(${Math.min(totalDue / 50, 1)})`,
              animation: "none",
            }} />
          </div>
        </div>
      )}

      {/* Test types */}
      <div>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Test types</div>
        <div className="grid-c grid-2">
          {TEST_TYPES.map((tt) => {
            const count = decks.filter((d) => d.testType === tt).length;
            return (
              <div
                key={tt}
                className="glass press col"
                style={{ padding: "16px", gap: 6, alignItems: "flex-start" }}
                onClick={() => onNavigate("decks")}
              >
                <div className="row between" style={{ width: "100%" }}>
                  <span className="pill accent">{TEST_TYPE_LABELS[tt]}</span>
                  <span className="mono dim" style={{ fontSize: 12 }}>{count}</span>
                </div>
                <div className="dim" style={{ fontSize: 12 }}>
                  {count > 0 ? `${count} deck${count > 1 ? "s" : ""}` : "No decks"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Practice modes quick links */}
      {modesWithDecks.length > 0 && (
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Practice modes</div>
          <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
            {modesWithDecks.map((m) => (
              <button
                key={m}
                className="pill"
                style={{ cursor: "pointer", padding: "8px 14px", fontSize: 13 }}
                onClick={() => onNavigate("decks")}
              >
                <span>{MODE_ICONS[m]}</span>
                <span>{MODE_LABELS[m]}</span>
                <span className="dim" style={{ fontSize: 11 }}>
                  {decks.filter((d) => d.practiceMode === m).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
