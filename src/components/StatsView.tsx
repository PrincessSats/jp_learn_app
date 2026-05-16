"use client";

import { useState, useEffect, useMemo } from "react";
import {
  getAllDecks,
  getReviewLogsByDeck,
  getCardsByDeck,
  getUserStats,
  getReviewCount,
} from "@/lib/db";
import type { UserStats, ReviewLog, Deck, Card, PracticeMode, Grade } from "@/types";

// ─── Constants ───

const MODE_LABELS: Record<PracticeMode, string> = {
  vocabulary: "Vocabulary",
  kanji: "Kanji",
  grammar: "Grammar",
  reading: "Reading",
  listening: "Listening",
};
const MODE_ORDER: PracticeMode[] = [
  "vocabulary",
  "kanji",
  "grammar",
  "reading",
  "listening",
];
const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const GRADE_LABELS: Record<Grade, string> = {
  1: "Again",
  2: "Hard",
  3: "Good",
  4: "Easy",
};
const GRADE_COLORS: Record<Grade, string> = {
  1: "#ef4444",
  2: "#f59e0b",
  3: "#22c55e",
  4: "#3b82f6",
};

// ─── Helpers ───

function fmtDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// ─── Animated Counter (no framer-motion) ───

function Counter({
  value,
  suffix = "",
  decimals = 0,
  duration = 800,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setDisplay(0);
      return;
    }
    const from = display || 0;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t * (2 - t); // ease-out quad
      setDisplay(from + (value - from) * eased);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// ─── 1. Streak Section ───

function StreakSection({
  streak,
  longestStreak,
}: {
  streak: number;
  longestStreak: number;
}) {
  return (
    <div className="glass" style={{ padding: 20, textAlign: "center" }}>
      <div className="col" style={{ gap: 6, alignItems: "center" }}>
        <div className="title">
          {streak}
          <span style={{ marginLeft: 8 }}>🔥</span>
        </div>
        <div className="dim" style={{ fontSize: 13, lineHeight: 1.3 }}>
          day streak
        </div>
        <div className="dim" style={{ fontSize: 12 }}>
          longest: {longestStreak}
        </div>
      </div>
    </div>
  );
}

// ─── 2. Stats Cards Row ───

function StatsCards({
  totalReviews,
  cardsLearned,
  accuracyPct,
}: {
  totalReviews: number;
  cardsLearned: number;
  accuracyPct: number;
}) {
  return (
    <div className="row" style={{ gap: 8 }}>
      <div
        className="glass press"
        style={{
          flex: 1,
          padding: "16px 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          borderRadius: 20,
        }}
      >
        <div className="title" style={{ fontSize: 22 }}>
          <Counter value={totalReviews} />
        </div>
        <div className="dim" style={{ fontSize: 11, textAlign: "center", lineHeight: 1.3 }}>
          Total Reviews
        </div>
      </div>
      <div
        className="glass press"
        style={{
          flex: 1,
          padding: "16px 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          borderRadius: 20,
        }}
      >
        <div className="title" style={{ fontSize: 22 }}>
          <Counter value={cardsLearned} />
        </div>
        <div className="dim" style={{ fontSize: 11, textAlign: "center", lineHeight: 1.3 }}>
          Cards Learned
        </div>
      </div>
      <div
        className="glass press"
        style={{
          flex: 1,
          padding: "16px 10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          borderRadius: 20,
        }}
      >
        <div className="title" style={{ fontSize: 22 }}>
          <Counter value={accuracyPct} suffix="%" />
        </div>
        <div className="dim" style={{ fontSize: 11, textAlign: "center", lineHeight: 1.3 }}>
          Accuracy
        </div>
      </div>
    </div>
  );
}

// ─── 3. Mode Breakdown ───

function ModeBreakdown({
  reviewsByMode,
}: {
  reviewsByMode: Record<PracticeMode, number>;
}) {
  const maxVal = Math.max(
    ...MODE_ORDER.map((m) => reviewsByMode[m] || 0),
    1
  );

  return (
    <div className="glass" style={{ padding: 16 }}>
      <div className="eyebrow" style={{ marginBottom: 14 }}>
        Reviews by Mode
      </div>
      <div className="col" style={{ gap: 12 }}>
        {MODE_ORDER.map((mode) => {
          const count = reviewsByMode[mode] || 0;
          const pct = count / maxVal;
          return (
            <div key={mode}>
              <div
                className="row between"
                style={{ marginBottom: 5, fontSize: 12 }}
              >
                <span className="dim" style={{ fontWeight: 500 }}>
                  {MODE_LABELS[mode]}
                </span>
                <span className="dim">{count}</span>
              </div>
              <div className="progress">
                <span style={{ transform: `scaleX(${pct})` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 4. Time Tabs ───

function TimeTabs({ reviewLogs }: { reviewLogs: ReviewLog[] }) {
  const [tab, setTab] = useState<"today" | "week" | "month">("today");

  const counts = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(), now.getMonth(), now.getDate(),
      0, 0, 0, 0
    ).getTime();
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const weekStartTs = weekStart.getTime();
    const monthStart = new Date(
      now.getFullYear(), now.getMonth(), 1
    ).getTime();

    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;
    for (const log of reviewLogs) {
      if (log.timestamp >= todayStart) todayCount++;
      if (log.timestamp >= weekStartTs) weekCount++;
      if (log.timestamp >= monthStart) monthCount++;
    }
    return { today: todayCount, week: weekCount, month: monthCount } as const;
  }, [reviewLogs]);

  const tabs: { key: "today" | "week" | "month"; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "week", label: "Week" },
    { key: "month", label: "Month" },
  ];

  const activeCount = counts[tab];

  return (
    <div className="glass" style={{ padding: 16 }}>
      <div className="eyebrow" style={{ marginBottom: 12 }}>
        Time Distribution
      </div>

      {/* Segmented tabs */}
      <div className="seg" style={{ marginBottom: 16 }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            className={tab === t.key ? "on" : ""}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Count display */}
      <div style={{ textAlign: "center", padding: "12px 0 4px" }}>
        <div className="title" style={{ fontSize: 38 }}>
          <Counter value={activeCount} duration={600} />
        </div>
        <div className="dim" style={{ fontSize: 12, marginTop: 6 }}>
          reviews{" "}
          {tab === "today"
            ? "today"
            : tab === "week"
              ? "this week"
              : "this month"}
        </div>
      </div>
    </div>
  );
}

// ─── 5. Heatmap Calendar ───

function HeatmapCalendar({
  dailyCounts,
}: {
  dailyCounts: Record<string, number>;
}) {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setDate(threeMonthsAgo.getDate() - 89);
  threeMonthsAgo.setHours(0, 0, 0, 0);

  // Walk back to preceding Sunday so grid starts on a Sunday
  const gridStart = new Date(threeMonthsAgo);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());
  gridStart.setHours(0, 0, 0, 0);

  // Build flat list of day cells
  const cells: {
    date: Date;
    count: number;
    key: string;
    inRange: boolean;
  }[] = [];
  const cursor = new Date(gridStart);
  while (cursor <= today) {
    const key = fmtDate(cursor);
    const count = dailyCounts[key] || 0;
    const inRange = cursor >= threeMonthsAgo;
    cells.push({
      date: new Date(cursor),
      count,
      key,
      inRange,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  // Map count to heat level
  function heatLevel(count: number): string {
    if (count === 0) return "";
    if (count <= 3) return "l1";
    if (count <= 7) return "l2";
    if (count <= 15) return "l3";
    return "l4";
  }

  return (
    <div className="glass" style={{ padding: 16 }}>
      <div className="row between" style={{ marginBottom: 12 }}>
        <div className="eyebrow" style={{ letterSpacing: 0 }}>
          Study Activity (90 days)
        </div>
        {/* Legend */}
        <div className="row" style={{ gap: 3, alignItems: "center", fontSize: 9 }}>
          <span className="faint">Less</span>
          <div className="heat-cell" />
          <div className="heat-cell l1" />
          <div className="heat-cell l2" />
          <div className="heat-cell l3" />
          <div className="heat-cell l4" />
          <span className="faint">More</span>
        </div>
      </div>

      {/* Month labels row */}
      <div className="row" style={{ gap: 4, marginBottom: 3, paddingLeft: 2 }}>
        {(() => {
          const labels: { col: number; label: string }[] = [];
          for (const cell of cells) {
            if (cell.inRange && cell.date.getDate() <= 7) {
              const colIdx = Math.floor(
                (cell.date.getTime() - gridStart.getTime()) / (7 * 86_400_000)
              );
              if (!labels.find((l) => l.col === colIdx)) {
                labels.push({ col: colIdx, label: MONTH_LABELS[cell.date.getMonth()] });
              }
            }
          }
          const totalCols = cells.length > 0
            ? Math.floor((cells[cells.length - 1].date.getTime() - gridStart.getTime()) / (7 * 86_400_000)) + 1
            : 13;
          return Array.from({ length: totalCols }).map((_, idx) => {
            const ml = labels.find((l) => l.col === idx);
            return (
              <div
                key={idx}
                className="faint"
                style={{
                  width: 12,
                  fontSize: 8,
                  lineHeight: "12px",
                  textAlign: "center",
                }}
              >
                {ml ? ml.label : ""}
              </div>
            );
          });
        })()}
      </div>

      {/* Grid */}
      <div
        className="heat-grid"
        style={{
          gridTemplateColumns: `repeat(${
            cells.length > 0
              ? Math.floor(
                  (cells[cells.length - 1].date.getTime() - gridStart.getTime()) /
                    (7 * 86_400_000)
                ) + 1
              : 13
          }, 1fr)`,
        }}
      >
        {cells.map((cell) => {
          const level = cell.inRange ? heatLevel(cell.count) : "";
          const cls = level ? `heat-cell ${level}` : "heat-cell";
          return (
            <div
              key={cell.key}
              className={cls}
              title={
                cell.inRange
                  ? `${cell.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}: ${cell.count} review${cell.count !== 1 ? "s" : ""}`
                  : ""
              }
              style={
                !cell.inRange
                  ? { background: "transparent", border: "none" }
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── 6. FSRS Stats ───

function FSRSStats({
  cards,
  reviewLogs,
}: {
  cards: Card[];
  reviewLogs: ReviewLog[];
}) {
  const stats = useMemo(() => {
    const avgDifficulty =
      cards.length > 0
        ? cards.reduce((s, c) => s + c.difficulty, 0) / cards.length
        : 0;
    const avgStability =
      cards.length > 0
        ? cards.reduce((s, c) => s + c.stability, 0) / cards.length
        : 0;
    const gradeDist: Record<Grade, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (const log of reviewLogs) {
      if (log.grade >= 1 && log.grade <= 4) {
        gradeDist[log.grade as Grade]++;
      }
    }
    return { avgDifficulty, avgStability, gradeDist };
  }, [cards, reviewLogs]);

  const totalGrades =
    Object.values(stats.gradeDist).reduce((a, b) => a + b, 0) || 1;

  return (
    <div className="glass" style={{ padding: 16 }}>
      <div className="eyebrow" style={{ marginBottom: 14 }}>
        FSRS Stats
      </div>

      {/* Avg Difficulty & Stability */}
      <div className="row" style={{ gap: 10, marginBottom: 18 }}>
        <div
          className="glass-strong"
          style={{
            flex: 1,
            padding: "14px 10px",
            textAlign: "center",
            borderRadius: 14,
          }}
        >
          <div className="dim" style={{ fontSize: 10, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Avg Difficulty
          </div>
          <div className="mono title" style={{ fontSize: 22 }}>
            <Counter value={stats.avgDifficulty} decimals={1} />
          </div>
        </div>
        <div
          className="glass-strong"
          style={{
            flex: 1,
            padding: "14px 10px",
            textAlign: "center",
            borderRadius: 14,
          }}
        >
          <div className="dim" style={{ fontSize: 10, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Avg Stability
          </div>
          <div className="mono title" style={{ fontSize: 22 }}>
            <Counter value={stats.avgStability} decimals={1} suffix="d" />
          </div>
        </div>
      </div>

      {/* Grade Distribution */}
      <div className="dim" style={{ fontSize: 11, fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        Grade Distribution
      </div>
      <div className="col" style={{ gap: 9 }}>
        {([1, 2, 3, 4] as Grade[]).map((grade) => {
          const count = stats.gradeDist[grade];
          const pct = count / totalGrades;
          return (
            <div key={grade}>
              <div
                className="row between"
                style={{ marginBottom: 4, fontSize: 11.5 }}
              >
                <div className="row" style={{ gap: 6, alignItems: "center" }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      background: GRADE_COLORS[grade],
                      flexShrink: 0,
                    }}
                  />
                  <span>{GRADE_LABELS[grade]}</span>
                </div>
                <span className="dim">{count}</span>
              </div>
              <div className="progress" style={{ height: 8 }}>
                <span
                  style={{
                    transform: `scaleX(${pct})`,
                    background: GRADE_COLORS[grade],
                    boxShadow:
                      grade === 3
                        ? "0 0 6px rgba(34, 197, 94, 0.35)"
                        : "none",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Loading Skeleton ───

function StatsSkeleton() {
  return (
    <div className="col" style={{ gap: 16, maxWidth: 460, margin: "0 auto" }}>
      {/* Streak skeleton */}
      <div className="glass" style={{ padding: 20, textAlign: "center" }}>
        <div
          style={{
            height: 32,
            width: "30%",
            borderRadius: 8,
            background: "rgba(255,255,255,0.06)",
            margin: "0 auto 8px",
          }}
        />
        <div
          style={{
            height: 14,
            width: "40%",
            borderRadius: 6,
            background: "rgba(255,255,255,0.06)",
            margin: "0 auto",
          }}
        />
      </div>

      {/* Stats cards skeleton */}
      <div className="row" style={{ gap: 8 }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="glass"
            style={{
              flex: 1,
              padding: "16px 10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                height: 22,
                width: "50%",
                borderRadius: 6,
                background: "rgba(255,255,255,0.06)",
              }}
            />
            <div
              style={{
                height: 10,
                width: "70%",
                borderRadius: 4,
                background: "rgba(255,255,255,0.06)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Mode breakdown skeleton */}
      <div className="glass" style={{ padding: 16 }}>
        <div
          style={{
            height: 14,
            width: "50%",
            borderRadius: 6,
            background: "rgba(255,255,255,0.06)",
            marginBottom: 14,
          }}
        />
        {MODE_ORDER.map((m) => (
          <div key={m} style={{ marginBottom: 12 }}>
            <div
              className="row between"
              style={{ marginBottom: 5 }}
            >
              <div
                style={{
                  height: 10,
                  width: 70,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.06)",
                }}
              />
              <div
                style={{
                  height: 10,
                  width: 30,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.06)",
                }}
              />
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 999,
                background: "rgba(255,255,255,0.04)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Time tabs skeleton */}
      <div className="glass" style={{ padding: 16 }}>
        <div
          style={{
            height: 14,
            width: "45%",
            borderRadius: 6,
            background: "rgba(255,255,255,0.06)",
            marginBottom: 12,
          }}
        />
        <div className="row" style={{ gap: 6, marginBottom: 16, height: 32 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: "100%",
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              height: 36,
              width: "30%",
              borderRadius: 8,
              background: "rgba(255,255,255,0.06)",
              margin: "0 auto 8px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main StatsView Component ───

export function StatsView() {
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [reviewLogs, setReviewLogs] = useState<ReviewLog[]>([]);
  const [allCards, setAllCards] = useState<Card[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const [stats, decks, reviewCount] = await Promise.all([
          getUserStats(),
          getAllDecks(),
          getReviewCount(),
        ]);

        if (cancelled) return;

        // Fetch review logs and cards for all decks in parallel
        const logPromises = decks.map((d) =>
          getReviewLogsByDeck(d.id, 5000).catch(() => [] as ReviewLog[])
        );
        const cardPromises = decks.map((d) =>
          getCardsByDeck(d.id).catch(() => [] as Card[])
        );

        const [logsResults, cardsResults] = await Promise.all([
          Promise.all(logPromises),
          Promise.all(cardPromises),
        ]);

        if (cancelled) return;

        setUserStats(stats);
        setTotalReviewCount(reviewCount);
        setReviewLogs(logsResults.flat());
        setAllCards(cardsResults.flat());
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  // ─── Derived Data ───

  const dailyCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const log of reviewLogs) {
      const key = fmtDate(new Date(log.timestamp));
      counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }, [reviewLogs]);

  const cardsLearned = useMemo(
    () => allCards.filter((c) => c.reps >= 1).length,
    [allCards]
  );

  const accuracyPct = useMemo(() => {
    if (reviewLogs.length === 0) return 0;
    const correct = reviewLogs.filter((l) => l.grade >= 2).length;
    return Math.round((correct / reviewLogs.length) * 100);
  }, [reviewLogs]);

  // ─── Loading State ───

  if (loading) {
    return (
      <div
        className="col page"
        style={{
          gap: 16,
          maxWidth: 460,
          margin: "0 auto",
          paddingTop: 4,
          paddingBottom: 20,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 4 }}>
          <div className="eyebrow" style={{ marginBottom: 2 }}>
            Your progress
          </div>
          <div className="title" style={{ fontSize: 22 }}>
            Statistics
          </div>
        </div>
        <StatsSkeleton />
      </div>
    );
  }

  // ─── Empty State ───

  const hasData =
    reviewLogs.length > 0 ||
    allCards.length > 0 ||
    (userStats && userStats.totalReviews > 0);

  if (!hasData) {
    return (
      <div
        className="col page"
        style={{
          gap: 16,
          maxWidth: 460,
          margin: "0 auto",
          paddingTop: 4,
          paddingBottom: 20,
        }}
      >
        <div style={{ marginBottom: 4 }}>
          <div className="eyebrow" style={{ marginBottom: 2 }}>
            Your progress
          </div>
          <div className="title" style={{ fontSize: 22 }}>
            Statistics
          </div>
        </div>

        <div
          className="glass"
          style={{
            padding: "40px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>
            No stats yet
          </div>
          <div
            className="dim"
            style={{ fontSize: 13, lineHeight: 1.5 }}
          >
            Start studying to see your progress and statistics here.
          </div>
        </div>
      </div>
    );
  }

  // ─── Render ───

  const effectiveStreak = userStats?.streak ?? 0;
  const longestStreak = userStats?.longestStreak ?? 0;

  return (
    <div
      className="col page"
      style={{
        gap: 16,
        maxWidth: 460,
        margin: "0 auto",
        paddingTop: 4,
        paddingBottom: 20,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 4 }}>
        <div className="eyebrow" style={{ marginBottom: 2 }}>
          Your progress
        </div>
        <div className="title" style={{ fontSize: 22 }}>
          Statistics
        </div>
      </div>

      {/* 1. Streak Section */}
      <StreakSection
        streak={effectiveStreak}
        longestStreak={longestStreak}
      />

      {/* 2. Stats Cards Row */}
      <StatsCards
        totalReviews={totalReviewCount || (userStats?.totalReviews ?? 0)}
        cardsLearned={cardsLearned}
        accuracyPct={accuracyPct}
      />

      {/* 3. Mode Breakdown */}
      {userStats?.reviewsByMode && (
        <ModeBreakdown reviewsByMode={userStats.reviewsByMode} />
      )}

      {/* 4. Time Tabs */}
      <TimeTabs reviewLogs={reviewLogs} />

      {/* 5. Heatmap Calendar */}
      <HeatmapCalendar dailyCounts={dailyCounts} />

      {/* 6. FSRS Stats */}
      <FSRSStats cards={allCards} reviewLogs={reviewLogs} />
    </div>
  );
}