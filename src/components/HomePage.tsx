"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { Deck, TestType, PracticeMode, UserStats } from "@/types";
import { getAllDecks, getUserStats } from "@/lib/db";

/* ─── Constants ─── */

const TEST_TYPES: TestType[] = ["N5", "N4", "N3", "N2", "N1", "BJT"];

const TEST_TYPE_LABELS: Record<TestType, string> = {
  N5: "JLPT N5",
  N4: "JLPT N4",
  N3: "JLPT N3",
  N2: "JLPT N2",
  N1: "JLPT N1",
  BJT: "BJT",
};

const TEST_TYPE_COLORS: Record<TestType, { bg: string; text: string; accent: string }> = {
  N5:  { bg: "rgba(52,211,153,0.12)", text: "#34d399", accent: "rgba(52,211,153,0.25)" },
  N4:  { bg: "rgba(96,165,250,0.12)", text: "#60a5fa", accent: "rgba(96,165,250,0.25)" },
  N3:  { bg: "rgba(251,191,36,0.12)", text: "#fbbf24", accent: "rgba(251,191,36,0.25)" },
  N2:  { bg: "rgba(251,146,60,0.12)", text: "#fb923c", accent: "rgba(251,146,60,0.25)" },
  N1:  { bg: "rgba(248,113,113,0.12)", text: "#f87171", accent: "rgba(248,113,113,0.25)" },
  BJT: { bg: "rgba(167,139,250,0.12)", text: "#a78bfa", accent: "rgba(167,139,250,0.25)" },
};

const PRACTICE_MODE_ICONS: Record<PracticeMode, string> = {
  vocabulary: "📖",
  kanji: "漢",
  grammar: "📝",
  reading: "📄",
  listening: "🎧",
};

const PRACTICE_MODE_LABELS: Record<PracticeMode, string> = {
  vocabulary: "Vocab",
  kanji: "Kanji",
  grammar: "Grammar",
  reading: "Reading",
  listening: "Listening",
};

const ALL_PRACTICE_MODES: PracticeMode[] = [
  "vocabulary",
  "kanji",
  "grammar",
  "reading",
  "listening",
];

const DAILY_GOAL = 20;

/* ─── Props ─── */

interface HomePageProps {
  decks: Deck[];
  dues: Record<string, number>;
  onStartDeck: (deckId: string) => void;
  onNavigate: (tab: string) => void;
}

/* ─── Helpers ─── */

/** Get today's YYYY-MM-DD string in local timezone */
function todayStr(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/** Count today's review logs from IndexedDB */
async function getTodayReviewCount(): Promise<number> {
  try {
    const { openDB } = await import("idb");
    const db = await openDB("test-prep", 1);
    const all = await db.getAll("review_logs");
    const today = todayStr();
    const todayTs = new Date(today).getTime();
    const tomorrowTs = todayTs + 86_400_000;
    return all.filter(
      (r: { timestamp: number }) =>
        r.timestamp >= todayTs && r.timestamp < tomorrowTs
    ).length;
  } catch {
    return 0;
  }
}

/* ─── Animated Counter ─── */

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 800;
    const step = Math.max(1, Math.ceil(end / (duration / 16)));
    let current = start;

    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setDisplay(end);
        clearInterval(timer);
      } else {
        setDisplay(current);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

/* ─── Component ─── */

export function HomePage({ decks, dues, onStartDeck, onNavigate }: HomePageProps) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [todayReviews, setTodayReviews] = useState(0);
  const [loaded, setLoaded] = useState(false);

  /* ─── Load data ─── */
  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [userStats, todayCount] = await Promise.all([
        getUserStats(),
        getTodayReviewCount(),
      ]);
      if (cancelled) return;
      setStats(userStats);
      setTodayReviews(todayCount);
      setLoaded(true);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ─── Quick start deck (most recently studied / first) ─── */
  const quickStartDeck = useMemo(() => {
    if (decks.length === 0) return null;
    const sorted = [...decks].sort((a, b) => {
      if (a.lastStudied && b.lastStudied) return b.lastStudied - a.lastStudied;
      if (a.lastStudied) return -1;
      if (b.lastStudied) return 1;
      return b.createdAt - a.createdAt;
    });
    return sorted[0];
  }, [decks]);

  /* ─── Test type availability ─── */
  const testTypeModes = useMemo(() => {
    const map = new Map<TestType, Set<PracticeMode>>();
    for (const tt of TEST_TYPES) {
      map.set(tt, new Set());
    }
    for (const d of decks) {
      const modes = map.get(d.testType);
      if (modes) modes.add(d.practiceMode);
    }
    return map;
  }, [decks]);

  /* ─── Streak emoji ─── */
  const streakEmoji =
    (stats?.streak ?? 0) >= 7 ? "🔥" : (stats?.streak ?? 0) >= 3 ? "💪" : "✨";

  /* ─── Progress fraction ─── */
  const progressPct = Math.min(1, todayReviews / DAILY_GOAL);

  /* ─── Render ─── */
  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-32">
        <motion.div
          className="w-8 h-8 rounded-full"
          style={{
            border: "2px solid var(--color-glass-border)",
            borderTopColor: "var(--color-accent)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-4">
      {/* ─── Header / Streak ─── */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1
            className="text-lg font-bold"
            style={{ color: "var(--color-ink)" }}
          >
            こんにちは
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--color-ink-dim)" }}>
            Ready to study?
          </p>
        </div>

        {/* Streak badge */}
        <motion.div
          className="glass-strong flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            border: "1px solid rgba(255,90,78,0.2)",
            fontSize: 13,
          }}
          whileHover={{ scale: 1.05 }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        >
          <span className="text-base">{streakEmoji}</span>
          <span className="font-bold" style={{ color: "var(--color-accent)" }}>
            <AnimatedCounter value={stats?.streak ?? 0} />
          </span>
          <span style={{ color: "var(--color-ink-dim)" }}>day streak</span>
        </motion.div>
      </motion.div>

      {/* ─── Daily Progress ─── */}
      <motion.div
        className="glass p-4"
        style={{ borderRadius: 20 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs font-semibold"
            style={{ color: "var(--color-ink-dim)" }}
          >
            Today&apos;s Progress
          </span>
          <span className="text-xs font-bold" style={{ color: "var(--color-accent)" }}>
            <AnimatedCounter value={todayReviews} />
            <span style={{ color: "var(--color-ink-dim)" }}>/{DAILY_GOAL}</span>
          </span>
        </div>
        <div
          className="relative w-full h-2 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background:
                progressPct >= 1
                  ? "linear-gradient(90deg, #34d399, #6ee7b7)"
                  : "linear-gradient(90deg, var(--color-accent), var(--color-accent-2))",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${progressPct * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          />
        </div>
        <div
          className="flex items-center justify-between mt-2 text-[10px]"
          style={{ color: "var(--color-ink-faint)" }}
        >
          <span>
            Total reviews: <strong>{stats?.totalReviews ?? 0}</strong>
          </span>
          {progressPct >= 1 && (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ color: "#34d399" }}
            >
              Goal reached! 🎉
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* ─── Quick Start ─── */}
      {quickStartDeck && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <motion.button
            className="glass-strong w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer"
            style={{ border: "1px solid rgba(255,90,78,0.25)" }}
            onClick={() => onStartDeck(quickStartDeck.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <span
              className="flex items-center justify-center w-10 h-10 rounded-xl text-lg"
              style={{ background: "rgba(255,90,78,0.15)" }}
            >
              ▶️
            </span>
            <div className="flex-1 text-left">
              <div
                className="text-sm font-semibold"
                style={{ color: "var(--color-ink)" }}
              >
                Quick Start
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ color: "var(--color-ink-dim)" }}
              >
                {quickStartDeck.name} · {quickStartDeck.testType}
              </div>
            </div>
            <span style={{ color: "var(--color-accent)" }} className="text-lg">
              →
            </span>
          </motion.button>
        </motion.div>
      )}

      {/* ─── Filter Chips ─── */}
      {/* Will be controlled via parent/DeckList filter — this section
          lets users navigate to the deck list filtered by test type */}
      <div>
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-2.5 px-1"
          style={{ color: "var(--color-ink-faint)" }}
        >
          Study by Level
        </h2>

        <div className="flex flex-wrap gap-2">
          {TEST_TYPES.map((tt, i) => {
            const colors = TEST_TYPE_COLORS[tt];
            const modes = testTypeModes.get(tt) ?? new Set();
            return (
              <motion.button
                key={tt}
                className="glass-strong flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl cursor-pointer min-w-[80px]"
                style={{
                  flex: "1 0 calc(33.33% - 6px)",
                  maxWidth: "calc(33.33% - 6px)",
                  background: colors.bg,
                  border: `1px solid ${colors.accent}`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.05, duration: 0.35 }}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavigate("decks")}
              >
                <span className="text-base font-bold" style={{ color: colors.text }}>
                  {tt}
                </span>
                <span
                  className="text-[10px] leading-tight text-center"
                  style={{ color: "var(--color-ink-faint)" }}
                >
                  {modes.size > 0
                    ? `${modes.size} mode${modes.size !== 1 ? "s" : ""}`
                    : "No decks"}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ─── Practice Mode Quick Links ─── */}
      <div>
        <h2
          className="text-xs font-semibold uppercase tracking-wider mb-2.5 px-1"
          style={{ color: "var(--color-ink-faint)" }}
        >
          Practice Mode
        </h2>

        <div className="flex flex-wrap gap-2">
          {ALL_PRACTICE_MODES.map((mode, i) => {
            const deckCount = decks.filter((d) => d.practiceMode === mode).length;
            return (
              <motion.button
                key={mode}
                className="glass flex items-center gap-2 px-3.5 py-2.5 rounded-xl cursor-pointer"
                style={{ flex: "1 0 calc(50% - 5px)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.05, duration: 0.35 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavigate("decks")}
              >
                <span className="text-base">{PRACTICE_MODE_ICONS[mode]}</span>
                <div className="flex-1 text-left">
                  <div
                    className="text-xs font-semibold"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {PRACTICE_MODE_LABELS[mode]}
                  </div>
                  <div
                    className="text-[10px]"
                    style={{ color: "var(--color-ink-faint)" }}
                  >
                    {deckCount > 0
                      ? `${deckCount} deck${deckCount !== 1 ? "s" : ""}`
                      : "No decks"}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ─── Total reviews footer ─── */}
      <motion.div
        className="text-center py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-[10px]" style={{ color: "var(--color-ink-faint)" }}>
          {stats?.totalReviews ?? 0} total reviews · Longest streak:{" "}
          {stats?.longestStreak ?? 0} days
        </p>
      </motion.div>
    </div>
  );
}
