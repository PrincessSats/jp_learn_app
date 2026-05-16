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

  const refreshDecks = useCallback(async () => {
    const all = await getAllDecks();
    setDecks(all);

    const now = Date.now();
    const counts: Record<string, number> = {};
    for (const d of all) {
      try {
        const cards = await getDueCards(d.id, now);
        counts[d.id] = cards.length;
      } catch {
        counts[d.id] = 0;
      }
    }
    setDues(counts);
  }, []);

  useEffect(() => {
    // Show app immediately, load presets + decks in background
    refreshDecks();

    // Load presets asynchronously — don't block UI
    const timer = setTimeout(() => {
      loadPresets().then((n) => {
        if (n > 0) refreshDecks();
      }).catch(() => { /* presets optional */ });
    }, 200); // small delay so UI renders first

    return () => clearTimeout(timer);
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
            onStartDeck={(id) => setQuizDeckId(id)}
            onNavigate={() => {}}
          />
        );
      case "decks":
        return (
          <DeckList
            decks={decks}
            dueCounts={dues}
            onSelect={(id) => setQuizDeckId(id)}
            onDelete={(id) => setDecks((prev) => prev.filter((d) => d.id !== id))}
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
  };

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

  return <AppShell tabs={tabs}>{renderPage}</AppShell>;
}
