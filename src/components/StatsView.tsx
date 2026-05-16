"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  getAllDecks,
  getReviewLogsByDeck,
  getCardsByDeck,
  getUserStats,
  getReviewCount,
} from "@/lib/db";
import type { UserStats, ReviewLog, Deck, Card, PracticeMode, Grade } from "@/types";

// ─── Constants ───

const ACCENT = "#ff5a4e";
const ACCENT_GRADIENT = "linear-gradient(90deg, #ff5a4e, #ff8a7a)";
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

// ─── Helpers ───

function fmtDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fmtDateShort(d: Date): string {
  return `${MONTH_LABELS[d.getMonth()]} ${d.getDate()}`;
}

// ─── Motion Variants ───

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

// ─── Animated Counter ───

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
      // ease-out quad
      const eased = t * (2 - t);
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

// ─── Streak Calendar (GitHub-style 90-day heatmap) ───

function StreakCalendar({
  dailyCounts,
  streak,
  studiedToday,
}: {
  dailyCounts: Record<string, number>;
  streak: number;
  studiedToday: boolean;
}) {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setDate(threeMonthsAgo.getDate() - 89);
  threeMonthsAgo.setHours(0, 0, 0, 0);

  // Walk back to the preceding Sunday so the grid starts on a Sunday
  const gridStart = new Date(threeMonthsAgo);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());
  gridStart.setHours(0, 0, 0, 0);

  // Build grid cells
  const cells: {
    date: Date;
    count: number;
    row: number;
    col: number;
    inRange: boolean;
    key: string;
  }[] = [];
  const cursor = new Date(gridStart);

  while (cursor <= today) {
    const key = fmtDate(cursor);
    const count = dailyCounts[key] || 0;
    const row = cursor.getDay();
    const col = Math.floor(
      (cursor.getTime() - gridStart.getTime()) / (7 * 86_400_000)
    );
    const inRange = cursor >= threeMonthsAgo;
    cells.push({
      date: new Date(cursor),
      count,
      row,
      col,
      inRange,
      key,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  const totalCols = cells.length > 0 ? cells[cells.length - 1].col + 1 : 13;

  function getIntensity(count: number): string {
    if (count === 0) return "rgba(255,255,255,0.04)";
    if (count <= 3) return "rgba(34, 197, 94, 0.25)";
    if (count <= 7) return "rgba(34, 197, 94, 0.45)";
    if (count <= 15) return "rgba(34, 197, 94, 0.65)";
    return "rgba(34, 197, 94, 0.88)";
  }

  // Determine which columns need a month label
  const monthLabels: { col: number; label: string }[] = [];
  for (const cell of cells) {
    if (cell.inRange && cell.date.getDate() <= 7) {
      const existing = monthLabels.find((m) => m.col === cell.col);
      if (!existing) {
        monthLabels.push({ col: cell.col, label: MONTH_LABELS[cell.date.getMonth()] });
      }
    }
  }

  return (
    <motion.div
      className="glass"
      variants={itemVariants}
      style={{ padding: "16px" }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>
          {streak > 0 && (
            <span>
              {streak} day streak{studiedToday ? " 🔥" : ""}
            </span>
          )}
          {streak === 0 && <span>Study streak</span>}
        </div>
        {/* Legend */}
        <div
          className="row"
          style={{ gap: 3, alignItems: "center", fontSize: 9, color: "var(--color-ink-faint)" }}
        >
          <span>Less</span>
          {[0, 3, 7, 15, 30].map((v) => (
            <div
              key={v}
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: getIntensity(v),
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Month labels row */}
      <div style={{ paddingLeft: 28, marginBottom: 3, display: "flex" }}>
        {Array.from({ length: totalCols }).map((_, colIdx) => {
          const ml = monthLabels.find((m) => m.col === colIdx);
          return (
            <div
              key={colIdx}
              style={{
                width: 12,
                fontSize: 8,
                color: "var(--color-ink-faint)",
                lineHeight: "12px",
                textAlign: "center",
              }}
            >
              {ml ? ml.label : ""}
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div style={{ display: "flex", gap: 2 }}>
        {/* Day-of-week labels */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginRight: 4,
          }}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((lbl, i) => (
            <div
              key={i}
              style={{
                fontSize: 8,
                color: "var(--color-ink-faint)",
                height: 12,
                lineHeight: "12px",
                width: 22,
                textAlign: "right",
                paddingRight: 4,
              }}
            >
              {i % 2 === 0 ? lbl.charAt(0) : ""}
            </div>
          ))}
        </div>

        {/* Day cells */}
        {Array.from({ length: totalCols }).map((_, colIdx) => (
          <div
            key={colIdx}
            style={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {Array.from({ length: 7 }).map((__, rowIdx) => {
              const cell = cells.find(
                (c) => c.col === colIdx && c.row === rowIdx
              );
              if (!cell || !cell.inRange) {
                return (
                  <div
                    key={rowIdx}
                    style={{ width: 12, height: 12, borderRadius: 2 }}
                  />
                );
              }
              return (
                <div
                  key={rowIdx}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 3,
                    background: getIntensity(cell.count),
                    transition: "background 0.15s",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  title={`${fmtDateShort(cell.date)}: ${cell.count} review${cell.count !== 1 ? "s" : ""}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Stat Card ───

function StatCard({
  label,
  value,
  suffix = "",
  decimals = 0,
  icon,
  delay = 0,
}: {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  icon?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="glass-strong"
      variants={itemVariants}
      style={{
        flex: 1,
        minWidth: 100,
        padding: "16px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      {icon && (
        <span style={{ fontSize: 22, lineHeight: 1 }}>{icon}</span>
      )}
      <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>
        <Counter value={value} suffix={suffix} decimals={decimals} />
      </div>
      <div
        style={{
          fontSize: 11,
          color: "var(--color-ink-dim)",
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

// ─── Mode Breakdown (CSS bar chart, vermilion gradient) ───

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
    <motion.div className="glass" variants={itemVariants} style={{ padding: "16px" }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
        Reviews by Mode
      </div>
      <div className="col" style={{ gap: 12 }}>
        {MODE_ORDER.map((mode, i) => {
          const count = reviewsByMode[mode] || 0;
          const pct = (count / maxVal) * 100;
          return (
            <div key={mode}>
              <div
                className="row"
                style={{
                  justifyContent: "space-between",
                  marginBottom: 5,
                  fontSize: 12,
                }}
              >
                <span style={{ fontWeight: 500 }}>{MODE_LABELS[mode]}</span>
                <span style={{ color: "var(--color-ink-dim)" }}>
                  {count}
                </span>
              </div>
              <div
                style={{
                  height: 12,
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.06)",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0.08 * i,
                  }}
                  style={{
                    height: "100%",
                    borderRadius: 8,
                    background: ACCENT_GRADIENT,
                    boxShadow: "0 0 8px rgba(255, 90, 78, 0.3)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Time Distribution (Today / This Week / This Month) ───

function TimeDistribution({ reviewLogs }: { reviewLogs: ReviewLog[] }) {
  const [tab, setTab] = useState<"today" | "week" | "month">("today");

  const counts = useMemo(() => {
    const now = new Date();

    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    ).getTime();

    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const weekStartTs = weekStart.getTime();

    const monthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).getTime();

    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;

    for (const log of reviewLogs) {
      if (log.timestamp >= todayStart) todayCount++;
      if (log.timestamp >= weekStartTs) weekCount++;
      if (log.timestamp >= monthStart) monthCount++;
    }

    return {
      today: todayCount,
      week: weekCount,
      month: monthCount,
    } as const;
  }, [reviewLogs]);

  const tabs: { key: "today" | "week" | "month"; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "week", label: "This Week" },
    { key: "month", label: "This Month" },
  ];

  const activeCount = counts[tab];

  return (
    <motion.div className="glass" variants={itemVariants} style={{ padding: "16px" }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
        Time Distribution
      </div>

      {/* Tabs */}
      <div
        className="row"
        style={{
          gap: 6,
          marginBottom: 16,
          background: "rgba(255,255,255,0.04)",
          borderRadius: 12,
          padding: 3,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: 10,
              border: "none",
              fontSize: 11.5,
              fontWeight: 600,
              cursor: "pointer",
              background:
                tab === t.key ? ACCENT : "transparent",
              color:
                tab === t.key ? "#fff" : "var(--color-ink-dim)",
              transition: "all 0.2s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Count display */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{ textAlign: "center", padding: "16px 0 8px" }}
      >
        <div style={{ fontSize: 38, fontWeight: 700, lineHeight: 1 }}>
          <Counter value={activeCount} duration={600} />
        </div>
        <div
          style={{
            fontSize: 12,
            color: "var(--color-ink-dim)",
            marginTop: 6,
          }}
        >
          reviews{" "}
          {tab === "today"
            ? "today"
            : tab === "week"
              ? "this week"
              : "this month"}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── FSRS Stats ───

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

  const gradeLabels: Record<Grade, string> = {
    1: "Again",
    2: "Hard",
    3: "Good",
    4: "Easy",
  };
  const gradeColors: Record<Grade, string> = {
    1: "#ef4444",
    2: "#f59e0b",
    3: "#22c55e",
    4: "#3b82f6",
  };
  const totalGrades =
    Object.values(stats.gradeDist).reduce((a, b) => a + b, 0) || 1;

  return (
    <motion.div className="glass" variants={itemVariants} style={{ padding: "16px" }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
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
          <div
            style={{
              fontSize: 10,
              color: "var(--color-ink-dim)",
              marginBottom: 4,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Avg Difficulty
          </div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>
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
          <div
            style={{
              fontSize: 10,
              color: "var(--color-ink-dim)",
              marginBottom: 4,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Avg Stability
          </div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            <Counter value={stats.avgStability} decimals={1} suffix="d" />
          </div>
        </div>
      </div>

      {/* Grade Distribution */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--color-ink-dim)",
          marginBottom: 10,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Grade Distribution
      </div>
      <div className="col" style={{ gap: 9 }}>
        {([1, 2, 3, 4] as Grade[]).map((grade) => {
          const count = stats.gradeDist[grade];
          const pct = (count / totalGrades) * 100;
          return (
            <div key={grade}>
              <div
                className="row"
                style={{
                  justifyContent: "space-between",
                  marginBottom: 4,
                  fontSize: 11.5,
                }}
              >
                <div className="row" style={{ gap: 6, alignItems: "center" }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      background: gradeColors[grade],
                      flexShrink: 0,
                    }}
                  />
                  <span>{gradeLabels[grade]}</span>
                </div>
                <span style={{ color: "var(--color-ink-dim)" }}>
                  {count}
                </span>
              </div>
              <div
                style={{
                  height: 8,
                  borderRadius: 5,
                  background: "rgba(255,255,255,0.06)",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: 0.05 * grade,
                  }}
                  style={{
                    height: "100%",
                    borderRadius: 5,
                    background: gradeColors[grade],
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
    </motion.div>
  );
}

// ─── Loading Skeleton ───

function StatsSkeleton() {
  return (
    <div className="col" style={{ gap: 16, maxWidth: 460, margin: "0 auto" }}>
      {/* Header skeleton */}
      <div style={{ marginBottom: 8 }}>
        <div
          style={{
            height: 12,
            width: "30%",
            borderRadius: 6,
            background: "rgba(255,255,255,0.06)",
            marginBottom: 8,
          }}
        />
        <div
          style={{
            height: 22,
            width: "60%",
            borderRadius: 8,
            background: "rgba(255,255,255,0.06)",
          }}
        />
      </div>

      {/* Streak calendar */}
      <div
        className="glass"
        style={{ padding: 16 }}
      >
        <div
          style={{
            height: 14,
            width: "40%",
            borderRadius: 6,
            background: "rgba(255,255,255,0.06)",
            marginBottom: 12,
          }}
        />
        <div style={{ display: "flex", gap: 3 }}>
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {Array.from({ length: 7 }).map((__, j) => (
                <div
                  key={j}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 3,
                    background:
                      Math.random() > 0.4
                        ? `rgba(255,255,255,${0.02 + Math.random() * 0.1})`
                        : "transparent",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stat cards row */}
      <div className="row" style={{ gap: 8 }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="glass-strong"
            style={{
              flex: 1,
              padding: "16px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                height: 16,
                width: 16,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
              }}
            />
            <div
              style={{
                height: 24,
                width: "60%",
                borderRadius: 6,
                background: "rgba(255,255,255,0.06)",
              }}
            />
            <div
              style={{
                height: 10,
                width: "80%",
                borderRadius: 4,
                background: "rgba(255,255,255,0.06)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Mode breakdown */}
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
              className="row"
              style={{ justifyContent: "space-between", marginBottom: 5 }}
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
                height: 12,
                borderRadius: 8,
                background: "rgba(255,255,255,0.04)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Time distribution */}
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
        <div
          className="row"
          style={{ gap: 6, marginBottom: 20, height: 34 }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: "100%",
                borderRadius: 10,
                background: "rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              height: 36,
              width: "40%",
              borderRadius: 8,
              background: "rgba(255,255,255,0.06)",
              margin: "0 auto 8px",
            }}
          />
        </div>
      </div>

      {/* FSRS stats */}
      <div className="glass" style={{ padding: 16 }}>
        <div
          style={{
            height: 14,
            width: "35%",
            borderRadius: 6,
            background: "rgba(255,255,255,0.06)",
            marginBottom: 14,
          }}
        />
        <div className="row" style={{ gap: 10, marginBottom: 16 }}>
          {[1, 2].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: 14,
                borderRadius: 14,
                background: "rgba(255,255,255,0.04)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  height: 10,
                  width: "70%",
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.06)",
                  margin: "0 auto 6px",
                }}
              />
              <div
                style={{
                  height: 20,
                  width: "40%",
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.06)",
                  margin: "0 auto",
                }}
              />
            </div>
          ))}
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ marginBottom: 9 }}>
            <div
              className="row"
              style={{ justifyContent: "space-between", marginBottom: 4 }}
            >
              <div
                style={{
                  height: 10,
                  width: 50,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.06)",
                }}
              />
              <div
                style={{
                  height: 10,
                  width: 25,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.06)",
                }}
              />
            </div>
            <div
              style={{
                height: 8,
                borderRadius: 5,
                background: "rgba(255,255,255,0.04)",
              }}
            />
          </div>
        ))}
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

  const studiedToday = useMemo(() => {
    const todayKey = fmtDate(new Date());
    return (dailyCounts[todayKey] || 0) > 0;
  }, [dailyCounts]);

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
        className="col"
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
          <div
            style={{
              fontSize: 11,
              color: "var(--color-ink-dim)",
              marginBottom: 2,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Your progress
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
            }}
          >
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
      <motion.div
        className="col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          gap: 16,
          maxWidth: 460,
          margin: "0 auto",
          paddingTop: 4,
          paddingBottom: 20,
        }}
      >
        <motion.div variants={itemVariants} style={{ marginBottom: 4 }}>
          <div
            style={{
              fontSize: 11,
              color: "var(--color-ink-dim)",
              marginBottom: 2,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Your progress
          </div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>Statistics</div>
        </motion.div>

        <motion.div
          className="glass"
          variants={itemVariants}
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
            style={{
              fontSize: 13,
              color: "var(--color-ink-dim)",
              lineHeight: 1.5,
            }}
          >
            Start studying to see your progress and statistics here.
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // ─── Render ───

  const effectiveStreak = userStats?.streak ?? 0;

  return (
    <motion.div
      className="col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        gap: 16,
        maxWidth: 460,
        margin: "0 auto",
        paddingTop: 4,
        paddingBottom: 20,
      }}
    >
      {/* Header */}
      <motion.div variants={itemVariants} style={{ marginBottom: 4 }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--color-ink-dim)",
            marginBottom: 2,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Your progress
        </div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>Statistics</div>
      </motion.div>

      {/* 1. Streak Calendar */}
      <StreakCalendar
        dailyCounts={dailyCounts}
        streak={effectiveStreak}
        studiedToday={studiedToday}
      />

      {/* 2. Stats Cards Row */}
      <div
        className="row"
        style={{
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <StatCard
          label="Total Reviews"
          value={totalReviewCount || (userStats?.totalReviews ?? 0)}
          icon="📝"
        />
        <StatCard
          label="Cards Learned"
          value={cardsLearned}
          icon="🎴"
        />
        <StatCard
          label="Accuracy"
          value={accuracyPct}
          suffix="%"
          decimals={0}
          icon="🎯"
        />
        <StatCard
          label="Study Streak"
          value={effectiveStreak}
          icon="🔥"
        />
      </div>

      {/* 3. Mode Breakdown */}
      {userStats?.reviewsByMode && (
        <ModeBreakdown reviewsByMode={userStats.reviewsByMode} />
      )}

      {/* 4. Time Distribution */}
      <TimeDistribution reviewLogs={reviewLogs} />

      {/* 5. FSRS Stats */}
      <FSRSStats cards={allCards} reviewLogs={reviewLogs} />
    </motion.div>
  );
}
