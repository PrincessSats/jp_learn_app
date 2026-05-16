"use client";

import { AppShell } from "@/components/AppShell";
import { HomePage } from "@/components/HomePage";
import { DeckList } from "@/components/DeckList";
import { ImportView } from "@/components/ImportView";
import { QuizSession } from "@/components/QuizSession";
import { StatsView } from "@/components/StatsView";
import { IconHome, IconBook, IconChart, IconImport } from "@/components/Icons";
import { useState, useEffect, useCallback } from "react";
import type { Deck } from "@/types";
import { getDB } from "@/lib/db";
import { loadAllPresets } from "@/lib/presets/loader";

// Clear IndexedDB and reload
function resetAll() {
  try { indexedDB.deleteDatabase("test-prep"); } catch {}
  window.location.reload();
}

export default function Page() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [dues, setDues] = useState<Record<string, number>>({});
  const [quizDeckId, setQuizDeckId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("home");
  const [dbg, setDbg] = useState("init");
  const [err, setErr] = useState("");

  const refreshDecks = useCallback(async () => {
    try {
      const db = await getDB();
      const all = (await db.getAll("decks")) as Deck[];
      setDecks(all);
      setDbg(`decks:${all.length}`);
      const now = Date.now();
      const c: Record<string, number> = {};
      for (const d of all) {
        try {
          const cards: any[] = await db.getAllFromIndex("cards", "deckId", d.id);
          c[d.id] = cards.filter((x) => x.due <= now).length;
        } catch {
          c[d.id] = 0;
        }
      }
      setDues(c);
    } catch (e: any) {
      setErr(e?.message || String(e));
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const n = await loadAllPresets();
        setDbg(`presets:${n}`);
        await refreshDecks();
      } catch (e: any) {
        setErr(e?.message || String(e));
        setDbg("fail");
      }
    })();
  }, [refreshDecks]);

  if (err) {
    return (
      <div className="stage"><div className="orb o1" /><div className="orb o2" /><div className="orb o3" /><main className="app">
        <div
          className="col"
          style={{
            padding: 40,
            gap: 16,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="glass"
            style={{
              padding: 32,
              maxWidth: 320,
              width: "100%",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 8 }}>⚠️</div>
            <div className="title" style={{ fontSize: 16, marginBottom: 8 }}>
              Error
            </div>
            <div
              className="mono dim"
              style={{ fontSize: 11, wordBreak: "break-word", marginBottom: 16 }}
            >
              {err}
            </div>
            <button className="btn" onClick={resetAll}>
              Clear Data &amp; Reload
            </button>
          </div>
        </div>
      </main></div>
    );
  }

  const tabs = [
    { id: "home",   label: "Main",   icon: <IconHome /> },
    { id: "decks",  label: "Study",  icon: <IconBook /> },
    { id: "stats",  label: "Stats",  icon: <IconChart /> },
    { id: "import", label: "Import", icon: <IconImport /> },
  ];

  return (
    <div className="stage">
      <div className="orb o1" />
      <div className="orb o2" />
      <div className="orb o3" />

      {quizDeckId ? (
        <main className="app">
          <QuizSession
            deckId={quizDeckId}
            onBack={() => {
              setQuizDeckId(null);
              refreshDecks();
            }}
          />
        </main>
      ) : (
        <AppShell tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
          {(tab) => {
            switch (tab) {
              case "home":
                return (
                  <HomePage
                    decks={decks}
                    dues={dues}
                    onStartDeck={(id) => setQuizDeckId(id)}
                    onNavigate={(t) => setActiveTab(t)}
                  />
                );
              case "decks":
                return (
                  <DeckList
                    decks={decks}
                    dueCounts={dues}
                    onSelect={(id) => setQuizDeckId(id)}
                    onDelete={(id) =>
                      setDecks((p) => p.filter((d) => d.id !== id))
                    }
                    filter={{}}
                  />
                );
              case "import":
                return <ImportView onImportComplete={refreshDecks} />;
              case "stats":
                return <StatsView />;
              default:
                return null;
            }
          }}
        </AppShell>
      )}
    </div>
  );
}
