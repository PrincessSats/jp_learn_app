"use client";

import { useState, useEffect, useMemo, type ReactElement } from "react";
import {
  getAllDecks,
  getReviewLogsByDeck,
  getCardsByDeck,
  getUserStats,
  getReviewCount,
} from "@/lib/db";
import type { UserStats, ReviewLog, Deck, Card, PracticeMode, Grade } from "@/types";
import { IconFlame, IconClock, IconSparkle, IconTarget } from "./Icons";

// ─── Helpers ───

const MODE_LABELS: Record<PracticeMode, string> = {
  vocabulary: "Vocabulary", kanji: "Kanji", grammar: "Grammar",
  reading: "Reading", listening: "Listening",
};
const MODE_ORDER: PracticeMode[] = ["vocabulary", "kanji", "grammar", "reading", "listening"];
const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const GRADE_LABELS: Record<Grade, string> = { 1: "Again", 2: "Hard", 3: "Good", 4: "Easy" };
const GRADE_COLORS: Record<Grade, string> = { 1: "#ef4444", 2: "#f59e0b", 3: "#22c55e", 4: "#3b82f6" };

function fmtDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

// ─── Animated Counter ───

function Counter({ value, suffix = "", decimals = 0, duration = 800 }: {
  value: number; suffix?: string; decimals?: number; duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (value === 0) { setDisplay(0); return; }
    const from = display || 0;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(from + (value - from) * (t * (2 - t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);
  return <span>{display.toFixed(decimals)}{suffix}</span>;
}

// ─── 1. Stat Cards (2×2 grid) ───

function StatCard({ icon: Icon, label, v, unit, sub, tint }: {
  icon: (p: React.SVGProps<SVGSVGElement>) => ReactElement;
  label: string; v: string | number; unit: string; sub: string; tint: string;
}) {
  return (
    <div className="glass" style={{ padding: 16, position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: -20, right: -20, width: 90, height: 90,
        borderRadius: "50%", background: tint, opacity: 0.18, filter: "blur(24px)",
      }} />
      <Icon style={{ width: 18, height: 18, color: tint, marginBottom: 14 }} />
      <div className="col" style={{ gap: 2 }}>
        <div className="row" style={{ gap: 4, alignItems: "baseline" }}>
          <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>{v}</span>
          <span className="dim" style={{ fontSize: 12 }}>{unit}</span>
        </div>
        <span className="eyebrow" style={{ marginTop: 2 }}>{label}</span>
        <span className="faint" style={{ fontSize: 11 }}>{sub}</span>
      </div>
    </div>
  );
}

// ─── 2. Activity Heatmap ───

function HeatmapCalendar({ dailyCounts }: { dailyCounts: Record<string, number> }) {
  const today = new Date(); today.setHours(23,59,59,999);
  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setDate(threeMonthsAgo.getDate() - 89);
  threeMonthsAgo.setHours(0,0,0,0);
  const gridStart = new Date(threeMonthsAgo);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());
  gridStart.setHours(0,0,0,0);

  const cells: { date: Date; count: number; key: string; inRange: boolean }[] = [];
  const cursor = new Date(gridStart);
  while (cursor <= today) {
    const key = fmtDate(cursor);
    cells.push({ date: new Date(cursor), count: dailyCounts[key] || 0, key, inRange: cursor >= threeMonthsAgo });
    cursor.setDate(cursor.getDate() + 1);
  }

  function heatLevel(count: number) {
    if (count === 0) return "";
    if (count <= 3) return "l1";
    if (count <= 7) return "l2";
    if (count <= 15) return "l3";
    return "l4";
  }

  const totalCols = cells.length > 0
    ? Math.floor((cells[cells.length-1].date.getTime() - gridStart.getTime()) / (7*86_400_000)) + 1
    : 13;

  return (
    <div className="glass" style={{ padding: 18 }}>
      <div className="row between" style={{ marginBottom: 14 }}>
        <span className="eyebrow">Activity · last 20 weeks</span>
        <div className="row" style={{ gap: 4, alignItems: "center" }}>
          <span className="faint" style={{ fontSize: 10.5 }}>less</span>
          {[0,1,2,3,4].map((l) => (
            <span key={l} className={"heat-cell" + (l ? " l"+l : "")} style={{ width: 9, height: 9, display: "block", borderRadius: 2 }} />
          ))}
          <span className="faint" style={{ fontSize: 10.5 }}>more</span>
        </div>
      </div>
      <div className="heat-grid" style={{ gridTemplateColumns: `repeat(${totalCols}, 1fr)` }}>
        {cells.map((cell) => {
          const level = cell.inRange ? heatLevel(cell.count) : "";
          return (
            <div
              key={cell.key}
              className={"heat-cell" + (level ? " "+level : "")}
              title={cell.inRange ? `${cell.date.toLocaleDateString("en-US",{month:"short",day:"numeric"})}: ${cell.count} reviews` : ""}
              style={!cell.inRange ? { background: "transparent", border: "none" } : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── 3. Minutes Line Chart (7 days) ───

function MinutesChart({ dailyCounts }: { dailyCounts: Record<string, number> }) {
  const data = useMemo(() => {
    const days: number[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      days.push(dailyCounts[fmtDate(d)] || 0);
    }
    return days;
  }, [dailyCounts]);

  const labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const W = 320, H = 120, P = 16;
  const maxVal = Math.max(...data, 8);
  const xs = data.map((_, i) => P + (i * (W - P*2)) / (data.length - 1));
  const ys = data.map((v) => H - P - (v / maxVal) * (H - P*2 - 12));
  const goalY = H - P - (6 / maxVal) * (H - P*2 - 12);

  let d = `M ${xs[0]} ${ys[0]}`;
  for (let i = 1; i < xs.length; i++) {
    const cx = (xs[i-1] + xs[i]) / 2;
    d += ` Q ${cx} ${ys[i-1]}, ${cx} ${(ys[i-1]+ys[i])/2} T ${xs[i]} ${ys[i]}`;
  }
  const area = d + ` L ${xs[xs.length-1]} ${H-P} L ${xs[0]} ${H-P} Z`;

  return (
    <div className="glass" style={{ padding: 18 }}>
      <div className="row between" style={{ marginBottom: 4 }}>
        <span className="eyebrow">Reviews per day</span>
        <span className="pill">
          <IconClock style={{ width: 12, height: 12 }} /> goal 6/day
        </span>
      </div>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <svg viewBox={`0 0 ${W} ${H+22}`} style={{ width: "100%", height: "auto", display: "block" }}>
          <defs>
            <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineStrokeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent-2)" />
            </linearGradient>
          </defs>
          <line x1={P} y1={H-P} x2={W-P} y2={H-P} stroke="rgba(255,255,255,0.08)" />
          <line x1={P} y1={goalY} x2={W-P} y2={goalY} stroke="rgba(255,255,255,0.16)" strokeDasharray="3 4" />
          <text x={W-P} y={goalY-5} textAnchor="end" fill="rgba(245,238,228,0.4)" fontSize="9" fontFamily="ui-monospace,monospace">goal</text>
          <path d={area} fill="url(#lineAreaGrad)" />
          <path d={d} fill="none" stroke="url(#lineStrokeGrad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 2px 6px rgba(255,90,78,0.45))" }} />
          {xs.map((x, i) => (
            <g key={i}>
              <circle cx={x} cy={ys[i]} r={i === todayIdx ? 5 : 3}
                fill="#0a0612" stroke="var(--accent)" strokeWidth={i === todayIdx ? 2.5 : 1.5} />
              {i === todayIdx && (
                <circle cx={x} cy={ys[i]} r="5" fill="none" stroke="var(--accent)" strokeOpacity="0.4">
                  <animate attributeName="r" from="5" to="14" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" from="0.5" to="0" dur="1.8s" repeatCount="indefinite" />
                </circle>
              )}
              <text x={x} y={H+14} textAnchor="middle" fill="rgba(245,238,228,0.45)" fontSize="10" fontFamily="ui-sans-serif">
                {labels[i]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

// ─── 4. Words Bar Chart (8 weeks) ───

function WordsChart({ reviewLogs }: { reviewLogs: ReviewLog[] }) {
  const data = useMemo(() => {
    const weeks: number[] = Array(8).fill(0);
    const now = Date.now();
    for (const log of reviewLogs) {
      const weeksAgo = Math.floor((now - log.timestamp) / (7*86_400_000));
      if (weeksAgo < 8) weeks[7 - weeksAgo]++;
    }
    return weeks;
  }, [reviewLogs]);

  const thisWeek = data[data.length - 1];
  const W = 320, H = 110, P = 14;
  const maxVal = Math.max(...data, 1);
  const slot = (W - P*2) / data.length;
  const barW = slot - 8;

  return (
    <div className="glass" style={{ padding: 18 }}>
      <div className="row between" style={{ marginBottom: 4 }}>
        <span className="eyebrow">Reviews · last 8 weeks</span>
        <span className="pill accent">+{thisWeek} this week</span>
      </div>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <svg viewBox={`0 0 ${W} ${H+18}`} style={{ width: "100%", height: "auto", display: "block" }}>
          <defs>
            <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          {data.map((v, i) => {
            const x = P + i * slot + 4;
            const barH = (v / maxVal) * (H - P - 4);
            const y = H - P - barH;
            const isCurrent = i === data.length - 1;
            return (
              <g key={i}>
                <rect x={x} y={y} width={barW} height={barH} rx="4"
                  fill={isCurrent ? "url(#barGrad)" : "rgba(255,255,255,0.1)"}
                  style={isCurrent ? { filter: "drop-shadow(0 4px 8px rgba(255,90,78,0.3))" } : undefined}
                />
                <text x={x + barW/2} y={H+12} textAnchor="middle" fill="rgba(245,238,228,0.45)" fontSize="9" fontFamily="ui-monospace,monospace">
                  {i === data.length-1 ? "now" : `${data.length-1-i}w`}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ─── 5. JLPT Progress Rings ───

function JLPTProgress({ decks, allCards }: { decks: Deck[]; allCards: Card[] }) {
  const levels = useMemo(() => {
    const jlptLevels = ["N5","N4","N3","N2","N1"] as const;
    return jlptLevels.map((level) => {
      const levelDecks = decks.filter((d) => d.testType === level);
      if (levelDecks.length === 0) return null;
      const deckIds = new Set(levelDecks.map((d) => d.id));
      const levelCards = allCards.filter((c) => deckIds.has(c.deckId));
      const total = levelCards.length;
      const learned = levelCards.filter((c) => c.reps >= 2).length;
      const v = total > 0 ? learned / total : 0;
      return { name: level, v, label: total > 0 ? `${Math.round(v*100)}%` : "0%" };
    }).filter(Boolean) as { name: string; v: number; label: string }[];
  }, [decks, allCards]);

  if (levels.length === 0) return null;

  const r = 32; const c = 2 * Math.PI * r;

  return (
    <div className="glass" style={{ padding: 18 }}>
      <div className="row between" style={{ marginBottom: 18 }}>
        <span className="eyebrow">JLPT readiness</span>
        <span className="pill accent">Learning</span>
      </div>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff5a4e" />
            <stop offset="100%" stopColor="#ffa896" />
          </linearGradient>
        </defs>
      </svg>
      <div className="row" style={{ justifyContent: "space-around" }}>
        {levels.slice(0, 5).map((l) => (
          <div key={l.name} className="col" style={{ alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative", width: 80, height: 80 }}>
              <svg viewBox="0 0 80 80" className="ring" style={{ width: 80, height: 80 }}>
                <circle className="track" cx="40" cy="40" r={r} />
                <circle className="fill" cx="40" cy="40" r={r}
                  strokeDasharray={c} strokeDashoffset={c * (1 - l.v)} />
              </svg>
              <span style={{
                position: "absolute", inset: 0, display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 600,
              }}>{l.label}</span>
            </div>
            <span className="faint" style={{ fontSize: 11, letterSpacing: ".1em" }}>{l.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 6. Mode Breakdown ───

function ModeBreakdown({ reviewsByMode }: { reviewsByMode: Record<PracticeMode, number> }) {
  const maxVal = Math.max(...MODE_ORDER.map((m) => reviewsByMode[m] || 0), 1);
  return (
    <div className="glass" style={{ padding: 16 }}>
      <div className="eyebrow" style={{ marginBottom: 14 }}>Reviews by mode</div>
      <div className="col" style={{ gap: 12 }}>
        {MODE_ORDER.map((mode) => {
          const count = reviewsByMode[mode] || 0;
          return (
            <div key={mode}>
              <div className="row between" style={{ marginBottom: 5, fontSize: 12 }}>
                <span className="dim" style={{ fontWeight: 500 }}>{MODE_LABELS[mode]}</span>
                <span className="dim">{count}</span>
              </div>
              <div className="progress">
                <span style={{ transform: `scaleX(${count / maxVal})` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 7. FSRS Stats ───

function FSRSStats({ cards, reviewLogs }: { cards: Card[]; reviewLogs: ReviewLog[] }) {
  const stats = useMemo(() => {
    const avgDifficulty = cards.length > 0 ? cards.reduce((s,c) => s+c.difficulty, 0)/cards.length : 0;
    const avgStability = cards.length > 0 ? cards.reduce((s,c) => s+c.stability, 0)/cards.length : 0;
    const gradeDist: Record<Grade, number> = {1:0, 2:0, 3:0, 4:0};
    for (const log of reviewLogs) if (log.grade >= 1 && log.grade <= 4) gradeDist[log.grade as Grade]++;
    return { avgDifficulty, avgStability, gradeDist };
  }, [cards, reviewLogs]);

  const totalGrades = Object.values(stats.gradeDist).reduce((a,b) => a+b, 0) || 1;

  return (
    <div className="glass" style={{ padding: 16 }}>
      <div className="eyebrow" style={{ marginBottom: 14 }}>FSRS stats</div>
      <div className="row" style={{ gap: 10, marginBottom: 18 }}>
        {[
          { label: "Avg Difficulty", v: stats.avgDifficulty, d: 1, s: "" },
          { label: "Avg Stability",  v: stats.avgStability,  d: 1, s: "d" },
        ].map((item) => (
          <div key={item.label} className="glass-strong" style={{ flex:1, padding:"14px 10px", textAlign:"center", borderRadius:14 }}>
            <div className="dim" style={{ fontSize:10, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.05em" }}>{item.label}</div>
            <div className="mono title" style={{ fontSize:22 }}>
              <Counter value={item.v} decimals={item.d} suffix={item.s} />
            </div>
          </div>
        ))}
      </div>
      <div className="dim" style={{ fontSize:11, fontWeight:600, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.05em" }}>Grade distribution</div>
      <div className="col" style={{ gap: 9 }}>
        {([1,2,3,4] as Grade[]).map((grade) => {
          const count = stats.gradeDist[grade];
          return (
            <div key={grade}>
              <div className="row between" style={{ marginBottom:4, fontSize:11.5 }}>
                <div className="row" style={{ gap:6, alignItems:"center" }}>
                  <div style={{ width:8, height:8, borderRadius:4, background: GRADE_COLORS[grade], flexShrink:0 }} />
                  <span>{GRADE_LABELS[grade]}</span>
                </div>
                <span className="dim">{count}</span>
              </div>
              <div className="progress" style={{ height:8 }}>
                <span style={{ transform:`scaleX(${count/totalGrades})`, background: GRADE_COLORS[grade],
                  boxShadow: grade===3 ? "0 0 6px rgba(34,197,94,0.35)" : "none" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main StatsView ───

export function StatsView() {
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [totalReviewCount, setTotalReviewCount] = useState(0);
  const [reviewLogs, setReviewLogs] = useState<ReviewLog[]>([]);
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [allDecks, setAllDecks] = useState<Deck[]>([]);
  const [scope, setScope] = useState("Week");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [stats, decks, reviewCount] = await Promise.all([
          getUserStats(), getAllDecks(), getReviewCount(),
        ]);
        if (cancelled) return;
        const [logsResults, cardsResults] = await Promise.all([
          Promise.all(decks.map((d) => getReviewLogsByDeck(d.id, 5000).catch(() => [] as ReviewLog[]))),
          Promise.all(decks.map((d) => getCardsByDeck(d.id).catch(() => [] as Card[]))),
        ]);
        if (cancelled) return;
        setUserStats(stats); setTotalReviewCount(reviewCount);
        setReviewLogs(logsResults.flat()); setAllCards(cardsResults.flat());
        setAllDecks(decks);
      } catch (err) { console.error("Failed to load stats:", err); }
      finally { if (!cancelled) setLoading(false); }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const dailyCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const log of reviewLogs) {
      const key = fmtDate(new Date(log.timestamp));
      counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }, [reviewLogs]);

  const cardsLearned = useMemo(() => allCards.filter((c) => c.reps >= 1).length, [allCards]);

  const accuracyPct = useMemo(() => {
    if (reviewLogs.length === 0) return 0;
    return Math.round((reviewLogs.filter((l) => l.grade >= 2).length / reviewLogs.length) * 100);
  }, [reviewLogs]);

  const studiedHrs = useMemo(() => {
    const countThisScope = (() => {
      const now = Date.now();
      const ms = scope === "Week" ? 7*86_400_000 : scope === "Month" ? 30*86_400_000 : 365*86_400_000;
      return reviewLogs.filter((l) => l.timestamp >= now - ms).length;
    })();
    return (countThisScope * 0.75 / 60).toFixed(1);
  }, [reviewLogs, scope]);

  if (loading) {
    return (
      <div className="col page" style={{ gap: 16, paddingTop: 4, paddingBottom: 20 }}>
        <div className="row between" style={{ paddingTop: 4 }}>
          <div className="col" style={{ gap: 4 }}>
            <span className="eyebrow">Your progress</span>
            <span className="title">Stats</span>
          </div>
        </div>
        <div className="grid-c grid-2" style={{ gap: 12 }}>
          {[1,2,3,4].map((i) => (
            <div key={i} className="glass" style={{ padding:16, height:100 }}>
              <div style={{ height:18, width:"60%", borderRadius:6, background:"rgba(255,255,255,0.06)", marginBottom:14 }} />
              <div style={{ height:28, width:"50%", borderRadius:8, background:"rgba(255,255,255,0.06)" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const hasData = reviewLogs.length > 0 || allCards.length > 0 || (userStats && userStats.totalReviews > 0);

  if (!hasData) {
    return (
      <div className="col page" style={{ gap: 16, paddingTop: 4, paddingBottom: 20 }}>
        <div className="row between" style={{ paddingTop: 4 }}>
          <div className="col" style={{ gap: 4 }}>
            <span className="eyebrow">Your progress</span>
            <span className="title">Stats</span>
          </div>
        </div>
        <div className="glass" style={{ padding:"40px 24px", textAlign:"center" }}>
          <div style={{ fontSize:40, marginBottom:12 }}>📊</div>
          <div style={{ fontSize:15, fontWeight:600, marginBottom:6 }}>No stats yet</div>
          <div className="dim" style={{ fontSize:13, lineHeight:1.5 }}>
            Start studying to see your progress here.
          </div>
        </div>
      </div>
    );
  }

  const streak = userStats?.streak ?? 0;
  const longestStreak = userStats?.longestStreak ?? 0;
  const total = totalReviewCount || (userStats?.totalReviews ?? 0);

  return (
    <div className="col page" style={{ gap: 18, paddingTop: 4, paddingBottom: 20 }}>
      {/* Header */}
      <div className="row between" style={{ paddingTop: 4 }}>
        <div className="col" style={{ gap: 4 }}>
          <span className="eyebrow">Your progress</span>
          <span className="title">Stats</span>
        </div>
        <div className="seg">
          {["Week","Month","Year"].map((s) => (
            <button key={s} className={scope === s ? "on" : ""} onClick={() => setScope(s)}>{s}</button>
          ))}
        </div>
      </div>

      {/* 1. Stat tiles 2×2 */}
      <div className="grid-c grid-2" style={{ gap: 12 }}>
        <StatCard icon={IconFlame}   label="Streak"   v={streak}       unit="days" sub={`Best: ${longestStreak}`}     tint="rgba(255,142,122,1)" />
        <StatCard icon={IconClock}   label="Studied"  v={studiedHrs}   unit="hrs"  sub={`this ${scope.toLowerCase()}`} tint="rgba(180,140,255,1)" />
        <StatCard icon={IconSparkle} label="Known"    v={cardsLearned} unit="cards" sub={`${total} total reviews`}    tint="rgba(120,200,255,1)" />
        <StatCard icon={IconTarget}  label="Accuracy" v={`${accuracyPct}`} unit="%" sub="last 100 reviews"            tint="rgba(140,230,180,1)" />
      </div>

      {/* 2. Activity heatmap */}
      <HeatmapCalendar dailyCounts={dailyCounts} />

      {/* 3. Daily reviews line chart */}
      <MinutesChart dailyCounts={dailyCounts} />

      {/* 4. Weekly bar chart */}
      <WordsChart reviewLogs={reviewLogs} />

      {/* 5. JLPT rings */}
      <JLPTProgress decks={allDecks} allCards={allCards} />

      {/* 6. Mode breakdown */}
      {userStats?.reviewsByMode && <ModeBreakdown reviewsByMode={userStats.reviewsByMode} />}

      {/* 7. FSRS */}
      <FSRSStats cards={allCards} reviewLogs={reviewLogs} />
    </div>
  );
}
