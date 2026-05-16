/* ─── CSV + APKG Import ─── */

import type { Card, Deck, TestType, PracticeMode } from "@/types";
import { initCardState } from "./fsrs";
import { extractKanji } from "./kanji";

// ─── UUID generator ───
function uid(): string {
  return crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

// ─── CSV Import ───

export interface ParsedCSV {
  cards: Omit<Card, "id" | "deckId" | "difficulty" | "stability" | "reps" | "lapses" | "lastReview" | "due" | "interval" | "streak">[];
  meta: { columns: string[]; rowCount: number };
}

export function parseCSV(text: string): ParsedCSV {
  // Simple CSV parser (lightweight, no papaparse needed for predictable format)
  const lines = text.trim().split("\n");
  if (lines.length < 2) {
    return { cards: [], meta: { columns: [], rowCount: 0 } };
  }

  const headers = parseCSVLine(lines[0]);
  const cards: ParsedCSV["cards"] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === 0) continue;

    // Map columns: front, back, furigana, tags, ...extra
    const front = values[0] || "";
    const back = values[1] || "";
    const furigana = values[2] || undefined;
    const tagsRaw = values[3] || "";

    if (!front || !back) continue;

    cards.push({
      front: front.trim(),
      back: back.trim(),
      furigana: furigana?.trim() || undefined,
      tags: tagsRaw
        .split(/,;/)
        .map((t) => t.trim())
        .filter(Boolean),
    });
  }

  return { cards, meta: { columns: headers, rowCount: cards.length } };
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (const ch of line) {
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

// ─── APKG Import (zip + sqlite) ───

export interface ParsedAPKG {
  cards: Omit<Card, "id" | "deckId" | "difficulty" | "stability" | "reps" | "lapses" | "lastReview" | "due" | "interval" | "streak">[];
  deckName: string;
  meta: { cardCount: number; noteCount: number };
}

export async function parseAPKG(file: ArrayBuffer): Promise<ParsedAPKG> {
  const JSZip = (await import("jszip")).default;
  const initSqlJs = (await import("sql.js")).default;

  const zip = await JSZip.loadAsync(file);
  const SQL = await initSqlJs();

  // Find collection.anki2 (main db)
  const dbFile = zip.file("collection.anki2") || zip.file("collection.anki21");
  if (!dbFile) {
    throw new Error("Not a valid Anki package: collection.anki2 not found");
  }

  const dbData = await dbFile.async("uint8array");
  const db = new SQL.Database(dbData);

  // Read deck name
  let deckName = "Imported Deck";
  try {
    const decks = db.exec("SELECT name FROM decks LIMIT 1");
    if (decks.length > 0 && decks[0].values.length > 0) {
      deckName = String(decks[0].values[0][0] || deckName);
    }
  } catch { /* ignore */ }

  // Read notes (fields separated by \x1f)
  let notes: { id: number; front: string; back: string }[] = [];
  try {
    const noteRows = db.exec("SELECT id, flds FROM notes");
    if (noteRows.length > 0) {
      notes = noteRows[0].values.map((row) => {
        const fields = String(row[1] || "").split("\x1f");
        return {
          id: Number(row[0]),
          front: (fields[0] || "").trim(),
          back: (fields[1] || "").trim(),
        };
      });
    }
  } catch { /* ignore */ }

  // Read cards to get ordering / note mapping
  let noteOrder = notes.map((n) => n.id);
  try {
    const cardRows = db.exec("SELECT nid FROM cards ORDER BY ord");
    if (cardRows.length > 0) {
      noteOrder = cardRows[0].values.map((row) => Number(row[0]));
    }
  } catch { /* ignore */ }

  // Build cards preserving Anki order
  const noteMap = new Map(notes.map((n) => [n.id, n]));
  const cards = noteOrder
    .map((nid) => noteMap.get(nid))
    .filter((n): n is typeof notes[0] => !!n)
    .filter((n) => n.front && n.back)
    .map((n) => ({
      front: n.front,
      back: n.back,
      furigana: undefined as string | undefined,
      tags: [] as string[],
    }));

  return {
    cards,
    deckName,
    meta: { cardCount: cards.length, noteCount: notes.length },
  };
}

// ─── Create Deck from Import ───

export function createDeckFromImport(
  name: string,
  testType: TestType,
  practiceMode: PracticeMode,
  cards: ParsedCSV["cards"]
): { deck: Deck; cards: Card[] } {
  const deckId = uid();
  const deck: Deck = {
    id: deckId,
    name,
    testType,
    practiceMode,
    cardCount: cards.length,
    createdAt: Date.now(),
  };

  const now = Date.now();
  const cardRecords: Card[] = cards.map((c, i) => ({
    id: uid(),
    deckId,
    front: c.front,
    back: c.back,
    furigana: c.furigana,
    tags: c.tags,
    ...initCardState(),
    due: now + i * 1000 * 60, // stagger by 1min to avoid avalanche
  }));

  return { deck, cards: cardRecords };
}

/** Pre-cache all kanji found in imported cards */
export function extractAllKanji(cards: { front: string; back: string }[]): string[] {
  const all = new Set<string>();
  for (const c of cards) {
    for (const ch of extractKanji(c.front + c.back)) {
      all.add(ch);
    }
  }
  return [...all];
}
