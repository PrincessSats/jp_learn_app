"use client";

import { AppShell } from "@/components/AppShell";
import { HomePage } from "@/components/HomePage";
import { DeckList } from "@/components/DeckList";
import { ImportView } from "@/components/ImportView";
import { QuizSession } from "@/components/QuizSession";
import { StatsView } from "@/components/StatsView";
import { useState, useEffect, useCallback, Component, type ReactNode } from "react";
import type { Deck } from "@/types";
import { getAllDecks, getDueCards } from "@/lib/db";
import { loadPresets } from "@/lib/presets";

/** Error boundary — shows glass error panel instead of white screen */
class ErrorFallback extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(e: Error) { return { error: e }; }
  render() {
    if (this.state.error) {
      return (
        <main className="app">
          <div className="col" style={{ padding: 24, gap: 16, flex: 1, justifyContent: "center" }}>
            <div className="glass" style={{ padding: 24 }}>
              <div className="title" style={{ fontSize: 18 }}>Something broke</div>
              <div className="dim" style={{ marginTop: 8, fontSize: 13, wordBreak: "break-word" }}>
                {this.state.error.message}
              </div>
              <button className="btn" style={{ marginTop: 16 }} onClick={() => this.setState({ error: null })}>
                Try again
              </button>
            </div>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

export default function Page() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [dues, setDues] = useState<Record<string, number>>({});
  const [quizDeckId, setQuizDeckId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const refreshDecks = useCallback(async () => {
    try {
      const all = await getAllDecks();
      setDecks(all);
      const now = Date.now();
      const counts: Record<string, number> = {};
      for (const d of all) {
        try { const cards = await getDueCards(d.id, now); counts[d.id] = cards.length; }
        catch { counts[d.id] = 0; }
      }
      setDues(counts);
    } catch { /* IndexedDB not ready */ }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        // Load presets first (blocking — shows loading screen)
        await loadPresets();
        if (cancelled) return;

        // Then load decks
        await refreshDecks();
        if (cancelled) return;

        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err.message : "Failed to load data");
        setLoading(false);
      }
    }

    init();
    return () => { cancelled = true; };
  }, [refreshDecks]);

  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "decks", label: "Decks", icon: "📚" },
    { id: "import", label: "Import", icon: "📥" },
    { id: "stats", label: "Stats", icon: "📊" },
  ];

  const renderPage = (tab: string) => {
    switch (tab) {
      case "home": return <HomePage decks={decks} dues={dues} onStartDeck={(id) => setQuizDeckId(id)} onNavigate={() => {}} />;
      case "decks": return <DeckList decks={decks} dueCounts={dues} onSelect={(id) => setQuizDeckId(id)} onDelete={(id) => setDecks((p) => p.filter((d) => d.id !== id))} filter={{}} />;
      case "import": return <ImportView onImportComplete={refreshDecks} />;
      case "stats": return <StatsView />;
      default: return null;
    }
  };

  // Quiz overlay
  if (quizDeckId) {
    return <QuizSession deckId={quizDeckId} onBack={() => { setQuizDeckId(null); refreshDecks().catch(() => {}); }} />;
  }

  // Loading screen — glass with spinner
  if (loading) {
    return (
      <main className="app">
        <div className="col" style={{ padding: 24, gap: 16, flex: 1, justifyContent: "center", alignItems: "center" }}>
          <div className="glass" style={{ padding: "32px 24px", textAlign: "center" }}>
            <div style={{
              width: 40, height: 40, border: "3px solid rgba(255,255,255,0.1)",
              borderTopColor: "var(--color-accent)", borderRadius: "50%",
              animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
            }} />
            <div className="title" style={{ fontSize: 18 }}>Loading decks...</div>
            <div className="dim" style={{ marginTop: 4, fontSize: 13 }}>
              {loadError || "Preparing preset content"}
            </div>
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    );
  }

  return (
    <ErrorFallback>
      <AppShell tabs={tabs}>{renderPage}</AppShell>
    </ErrorFallback>
  );
}
