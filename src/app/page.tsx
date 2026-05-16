"use client";

import { AppShell } from "@/components/AppShell";
import { HomePage } from "@/components/HomePage";
import { DeckList } from "@/components/DeckList";
import { ImportView } from "@/components/ImportView";
import { QuizSession } from "@/components/QuizSession";
import { StatsView } from "@/components/StatsView";
import { useState, useEffect, useCallback } from "react";
import type { Deck } from "@/types";
import { getAllDecks, getDueCards } from "@/lib/db";
import { loadPresets } from "@/lib/presets";

export default function Page() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [dues, setDues] = useState<Record<string, number>>({});
  const [quizDeckId, setQuizDeckId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const refreshDecks = useCallback(async () => {
    const all = await getAllDecks();
    setDecks(all);

    const now = Date.now();
    const counts: Record<string, number> = {};
    for (const d of all) {
      const cards = await getDueCards(d.id, now);
      counts[d.id] = cards.length;
    }
    setDues(counts);
  }, []);

  useEffect(() => {
    async function init() {
      // Import preset decks on first launch
      await loadPresets();
      await refreshDecks();
      setReady(true);
    }
    init();
  }, [refreshDecks]);

  const tabs = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "decks", label: "Decks", icon: "📚" },
    { id: "import", label: "Import", icon: "📥" },
    { id: "stats", label: "Stats", icon: "📊" },
  ];

  const renderPage = (tab: string) => {
    switch (tab) {
      case "home":
        return (
          <HomePage
            decks={decks}
            dues={dues}
            onStartDeck={(id) => {
              setQuizDeckId(id);
            }}
            onNavigate={() => {}}
          />
        );
      case "decks":
        return (
          <DeckList
            decks={decks}
            dueCounts={dues}
            onSelect={(id) => {
              setQuizDeckId(id);
            }}
            onDelete={(id) => {
              setDecks((prev) => prev.filter((d) => d.id !== id));
            }}
            filter={{}}
          />
        );
      case "import":
        return (
          <ImportView
            onImportComplete={refreshDecks}
          />
        );
      case "stats":
        return <StatsView />;
      default:
        return null;
    }
  };

  // Quiz overlay
  if (quizDeckId) {
    return (
      <QuizSession
        deckId={quizDeckId}
        onBack={() => {
          setQuizDeckId(null);
          refreshDecks();
        }}
      />
    );
  }

  // Show nothing while loading presets
  if (!ready) {
    return null;
  }

  return <AppShell tabs={tabs}>{renderPage}</AppShell>;
}
