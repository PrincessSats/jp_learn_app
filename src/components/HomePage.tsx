"use client";

import { useEffect, useState, useMemo, type SVGProps } from "react";
import type { ReactElement } from "react";
import type { Deck, PracticeMode } from "@/types";
import { getUserStats } from "@/lib/db";
import { IconFlame, IconSparkle, IconBook, IconHeadphones, IconKanji, IconArrow } from "./Icons";

const PRACTICES: {
  id: PracticeMode;
  label: string;
  jp: string;
  duration: string;
  Icon: (p: SVGProps<SVGSVGElement>) => ReactElement;
  tint: string;
}[] = [
  { id: "vocabulary", label: "Vocabulary", jp: "単語",  duration: "~6 min", Icon: IconSparkle,    tint: "linear-gradient(140deg, rgba(255,90,78,0.85), rgba(255,150,120,0.55))" },
  { id: "kanji",      label: "Kanji",      jp: "漢字",  duration: "~5 min", Icon: IconKanji,      tint: "linear-gradient(140deg, rgba(251,146,60,0.8), rgba(253,186,116,0.55))" },
  { id: "grammar",    label: "Grammar",    jp: "文法",  duration: "~7 min", Icon: IconBook,       tint: "linear-gradient(140deg, rgba(122,61,240,0.7), rgba(180,120,255,0.5))" },
  { id: "reading",    label: "Reading",    jp: "読解",  duration: "~8 min", Icon: IconBook,       tint: "linear-gradient(140deg, rgba(52,211,153,0.7), rgba(110,231,183,0.45))" },
  { id: "listening",  label: "Listening",  jp: "聴解",  duration: "~5 min", Icon: IconHeadphones, tint: "linear-gradient(140deg, rgba(64,160,255,0.7), rgba(140,210,255,0.45))" },
];

interface HomePageProps {
  decks: Deck[];
  dues: Record<string, number>;
  onStartDeck: (deckId: string) => void;
  onNavigate: (tab: string) => void;
}

export function HomePage({ decks, dues, onStartDeck, onNavigate }: HomePageProps) {
  const [streak, setStreak] = useState(0);
  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const s = await getUserStats();
      if (cancelled) return;
      setStreak(s?.streak ?? 0);
      try {
        const { openDB } = await import("idb");
        const db = await openDB("test-prep", 1);
        const all = await db.getAll("review_logs");
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        setTodayCount(all.filter((r: any) => r.timestamp >= start && r.timestamp < start + 86_400_000).length);
      } catch {}
    })();
    return () => { cancelled = true; };
  }, []);

  const now = new Date();
  const hour = now.getHours();
  const greetEn = hour < 5 ? "Good night" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const greetJp = hour < 5 ? "こんばんは" : hour < 11 ? "おはよう" : hour < 18 ? "こんにちは" : "こんばんは";

  const DAILY_GOAL = 20;
  const goalPct = Math.min(100, (todayCount / DAILY_GOAL) * 100);
  const r = 26; const c = 2 * Math.PI * r;

  // Group decks by mode
  const decksByMode = useMemo(() => {
    const map: Partial<Record<PracticeMode, Deck[]>> = {};
    for (const d of decks) {
      (map[d.practiceMode] ??= []).push(d);
    }
    return map;
  }, [decks]);

  // Top due decks for "continue learning"
  const dueDeckList = useMemo(() =>
    decks.filter((d) => (dues[d.id] ?? 0) > 0)
      .sort((a, b) => (dues[b.id] ?? 0) - (dues[a.id] ?? 0))
      .slice(0, 3),
  [decks, dues]);

  // Only show practices that have decks (or all if no decks)
  const activePractices = useMemo(() => {
    if (decks.length === 0) return PRACTICES.slice(0, 3);
    return PRACTICES.filter((p) => (decksByMode[p.id]?.length ?? 0) > 0);
  }, [decks, decksByMode]);

  return (
    <div className="col" style={{ gap: 22 }}>
      {/* ── Greeting ── */}
      <header className="col" style={{ gap: 14, paddingTop: 4 }}>
        <div className="row between">
          <div className="col" style={{ gap: 4 }}>
            <span className="faint" style={{ fontSize: 12 }}>{greetEn}</span>
            <span className="jp" style={{ fontSize: 32, fontWeight: 600, lineHeight: 1 }}>{greetJp}</span>
          </div>
          <div className="glass" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 999 }}>
            <IconFlame style={{ width: 18, height: 18, color: "#ff8e7a" }} />
            <div className="col">
              <span style={{ fontSize: 15, fontWeight: 600, lineHeight: 1 }}>{streak}</span>
              <span className="faint" style={{ fontSize: 9.5, letterSpacing: ".08em", textTransform: "uppercase" }}>day streak</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Daily Goal ── */}
      <div className="glass glass-strong" style={{ padding: 18 }}>
        <div className="row between" style={{ marginBottom: 14 }}>
          <div className="col" style={{ gap: 2 }}>
            <span className="eyebrow">Daily goal</span>
            <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}>
              {todayCount}{" "}
              <span className="dim" style={{ fontSize: 15, fontWeight: 400 }}>/ {DAILY_GOAL} reviews</span>
            </span>
          </div>
          <svg viewBox="0 0 64 64" className="ring" style={{ width: 56, height: 56, flexShrink: 0 }}>
            <defs>
              <linearGradient id="dailyGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff5a4e" />
                <stop offset="100%" stopColor="#ffa896" />
              </linearGradient>
            </defs>
            <circle className="track" cx="32" cy="32" r={r} />
            <circle className="fill" cx="32" cy="32" r={r}
              style={{ stroke: "url(#dailyGrad)" }}
              strokeDasharray={c}
              strokeDashoffset={c * (1 - goalPct / 100)}
            />
          </svg>
        </div>
        <div className="progress">
          <span style={{ width: goalPct + "%", animation: "none", transform: "none" }} />
        </div>
      </div>

      {/* ── Practice Suggestions ── */}
      {activePractices.length > 0 && (
        <section className="col" style={{ gap: 10 }}>
          <div className="row between">
            <span className="eyebrow">Today's practice</span>
            <span className="faint" style={{ fontSize: 12 }}>{activePractices.length} suggested</span>
          </div>
          <div className="col" style={{ gap: 12 }}>
            {activePractices.map((p, i) => {
              const modeDecks = decksByMode[p.id] ?? [];
              const withDue = modeDecks.filter((d) => (dues[d.id] ?? 0) > 0);
              const dueCount = withDue.reduce((s, d) => s + (dues[d.id] ?? 0), 0);
              const topDeck = withDue[0] ?? modeDecks[0];
              const desc = dueCount > 0
                ? `${dueCount} card${dueCount !== 1 ? "s" : ""} due`
                : modeDecks.length > 0
                  ? `${modeDecks.length} deck${modeDecks.length !== 1 ? "s" : ""}`
                  : "No decks yet";
              const streakDots = Math.min(5, Math.max(0, streak > 0 ? Math.ceil(streak / (i + 1)) : 0));
              return (
                <PracticeCard
                  key={p.id}
                  p={{ ...p, desc }}
                  streak={streakDots}
                  delay={i * 60}
                  onClick={() => topDeck ? onStartDeck(topDeck.id) : onNavigate("import")}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* ── Continue Learning ── */}
      {dueDeckList.length > 0 && (
        <section className="col" style={{ gap: 10 }}>
          <div className="row between">
            <span className="eyebrow">Continue learning</span>
            <span className="faint" style={{ fontSize: 12 }}>{dueDeckList.length} due</span>
          </div>
          <div className="glass" style={{ padding: 4 }}>
            {dueDeckList.map((deck, i) => {
              const due = dues[deck.id] ?? 0;
              const prog = Math.max(0.05, 1 - due / Math.max(deck.cardCount, 1));
              return (
                <button
                  key={deck.id}
                  onClick={() => onStartDeck(deck.id)}
                  style={{
                    appearance: "none", background: "transparent", border: 0,
                    color: "inherit", width: "100%", textAlign: "left", cursor: "pointer",
                    padding: "12px 14px", gap: 14, display: "flex", alignItems: "center",
                    borderBottom: i < dueDeckList.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "0",
                  }}
                >
                  <div className="deck-thumb">{deck.name.slice(0, 1)}</div>
                  <div className="col stretch" style={{ gap: 3, minWidth: 0 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {deck.name}
                    </span>
                    <span className="dim" style={{ fontSize: 11.5 }}>{due} cards due</span>
                    <div className="progress" style={{ width: 80 }}>
                      <span style={{ width: prog * 100 + "%", animation: "none", transform: "none" }} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Empty state ── */}
      {decks.length === 0 && (
        <div className="glass" style={{ padding: "32px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📥</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>No decks yet</div>
          <div className="dim" style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 18 }}>
            Import an Anki deck or CSV to get started.
          </div>
          <button className="btn" onClick={() => onNavigate("import")}>Import a deck</button>
        </div>
      )}
    </div>
  );
}

function PracticeCard({
  p,
  streak,
  delay,
  onClick,
}: {
  p: { label: string; jp: string; desc: string; duration: string; Icon: (props: SVGProps<SVGSVGElement>) => ReactElement; tint: string };
  streak: number;
  delay: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="glass press"
      style={{
        appearance: "none", textAlign: "left", color: "inherit",
        padding: 16, display: "flex", alignItems: "center", gap: 16,
        opacity: 0,
        animation: `pageIn .55s ${delay}ms cubic-bezier(.2,.7,.2,1) both`,
      }}
    >
      <div style={{
        width: 54, height: 54, borderRadius: 16, flexShrink: 0,
        background: p.tint, color: "white",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 6px rgba(0,0,0,0.15)",
      }}>
        <p.Icon style={{ width: 24, height: 24 }} />
      </div>
      <div className="col stretch" style={{ gap: 5, minWidth: 0 }}>
        <div className="row" style={{ gap: 8, alignItems: "baseline" }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>{p.label}</span>
          <span className="jp faint" style={{ fontSize: 12 }}>{p.jp}</span>
        </div>
        <span className="dim" style={{ fontSize: 12.5 }}>{p.desc}</span>
        <StreakDots count={streak} />
      </div>
      <div className="col" style={{ alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
        <span className="faint mono" style={{ fontSize: 11 }}>{p.duration}</span>
        <IconArrow style={{ width: 16, height: 16, color: "rgba(255,255,255,0.5)" }} />
      </div>
    </button>
  );
}

function StreakDots({ count, max = 5 }: { count: number; max?: number }) {
  const c = Math.min(count, max);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
      {Array.from({ length: max }).map((_, i) =>
        i < c ? (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 14, height: 14, color: "#ff8e7a",
            filter: "drop-shadow(0 0 4px rgba(255,142,122,0.45))",
          }}>
            <IconFlame style={{ width: 12, height: 12 }} />
          </span>
        ) : (
          <span key={i} style={{
            display: "inline-block", width: 6, height: 6,
            borderRadius: 999, background: "rgba(255,255,255,0.12)",
            alignSelf: "center", margin: "0 4px",
          }} />
        )
      )}
    </div>
  );
}
