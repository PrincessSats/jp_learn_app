/* ─── IndexedDB Wrapper (via idb) ─── */

import { openDB, type IDBPDatabase } from "idb";
import type { Card, Deck, ReviewLog, KanjiEntry, UserStats } from "@/types";

const DB_NAME = "test-prep";
const DB_VERSION = 2;

let dbPromise: Promise<IDBPDatabase> | null = null;

export function getDB(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Decks store
        if (!db.objectStoreNames.contains("decks")) {
          const deckStore = db.createObjectStore("decks", { keyPath: "id" });
          deckStore.createIndex("testType", "testType");
          deckStore.createIndex("practiceMode", "practiceMode");
          deckStore.createIndex("createdAt", "createdAt");
        }
        // Cards store
        if (!db.objectStoreNames.contains("cards")) {
          const cardStore = db.createObjectStore("cards", { keyPath: "id" });
          cardStore.createIndex("deckId", "deckId");
          cardStore.createIndex("due", "due");
          cardStore.createIndex("difficulty", "difficulty");
        }
        // Review logs store
        if (!db.objectStoreNames.contains("review_logs")) {
          const reviewStore = db.createObjectStore("review_logs", { keyPath: "id" });
          reviewStore.createIndex("cardId", "cardId");
          reviewStore.createIndex("deckId", "deckId");
          reviewStore.createIndex("timestamp", "timestamp");
        }
        // Kanji cache store
        if (!db.objectStoreNames.contains("kanji_cache")) {
          db.createObjectStore("kanji_cache", { keyPath: "character" });
        }
        // User stats store
        if (!db.objectStoreNames.contains("user_stats")) {
          db.createObjectStore("user_stats", { keyPath: "id" });
        }
      },
    });
  }
  return dbPromise;
}

// ─── Decks ───

export async function getAllDecks(): Promise<Deck[]> {
  const db = await getDB();
  return db.getAll("decks");
}

export async function getDeck(id: string): Promise<Deck | undefined> {
  const db = await getDB();
  return db.get("decks", id);
}

export async function saveDeck(deck: Deck): Promise<void> {
  const db = await getDB();
  await db.put("decks", deck);
}

export async function deleteDeck(id: string): Promise<void> {
  const db = await getDB();
  await db.delete("decks", id);
  // Delete all cards in deck
  const cards = await db.getAllFromIndex("cards", "deckId", id);
  for (const card of cards) {
    await db.delete("cards", card.id);
  }
}

// ─── Cards ───

export async function getCardsByDeck(deckId: string): Promise<Card[]> {
  const db = await getDB();
  return db.getAllFromIndex("cards", "deckId", deckId);
}

export async function getDueCards(deckId: string, now: number = Date.now()): Promise<Card[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex("cards", "deckId", deckId);
  return all
    .filter((c) => c.due <= now)
    .sort((a, b) => a.due - b.due);
}

export async function getCard(id: string): Promise<Card | undefined> {
  const db = await getDB();
  return db.get("cards", id);
}

export async function saveCard(card: Card): Promise<void> {
  const db = await getDB();
  await db.put("cards", card);
}

export async function saveCards(cards: Card[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction("cards", "readwrite");
  for (const card of cards) {
    await tx.store.put(card);
  }
  await tx.done;
}

export async function deleteCard(id: string): Promise<void> {
  const db = await getDB();
  await db.delete("cards", id);
}

// ─── Review Logs ───

export async function saveReviewLog(log: ReviewLog): Promise<void> {
  const db = await getDB();
  await db.put("review_logs", log);
}

export async function getReviewLogsByDeck(deckId: string, limit = 100): Promise<ReviewLog[]> {
  const db = await getDB();
  const all = await db.getAllFromIndex("review_logs", "deckId", deckId);
  return all.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
}

export async function getReviewCount(): Promise<number> {
  const db = await getDB();
  return db.count("review_logs");
}

// ─── Kanji Cache ───

export async function getKanjiCache(char: string): Promise<KanjiEntry | undefined> {
  const db = await getDB();
  return db.get("kanji_cache", char);
}

export async function saveKanjiCache(entry: KanjiEntry): Promise<void> {
  const db = await getDB();
  await db.put("kanji_cache", entry);
}

// ─── User Stats ───

export async function getUserStats(): Promise<UserStats> {
  const db = await getDB();
  const stats = await db.get("user_stats", "main");
  if (stats) return stats;
  return {
    streak: 0,
    longestStreak: 0,
    lastStudyDate: "",
    totalReviews: 0,
    reviewsByMode: { vocabulary: 0, kanji: 0, grammar: 0, reading: 0, listening: 0 },
  };
}

export async function saveUserStats(stats: UserStats): Promise<void> {
  const db = await getDB();
  await db.put("user_stats", { ...stats, id: "main" });
}
