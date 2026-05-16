/* ─── Kanji Dictionary Service ─── */

import type { KanjiEntry } from "@/types";
import { getKanjiCache, saveKanjiCache } from "./db";

const JISHO_API = "https://jisho.org/api/v1/search/words";
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days

/** Extract unique kanji characters from text */
export function extractKanji(text: string): string[] {
  const matches = text.match(/[\u4e00-\u9faf\u3400-\u4dbf]/g);
  if (!matches) return [];
  return [...new Set(matches)];
}

/** Look up a single kanji character */
export async function lookupKanji(char: string): Promise<KanjiEntry | null> {
  // Check cache first
  const cached = await getKanjiCache(char);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL) {
    return cached;
  }

  try {
    const res = await fetch(`${JISHO_API}?keyword=${encodeURIComponent(char)}`);
    if (!res.ok) return null;
    const data = await res.json();

    const entry: KanjiEntry = {
      character: char,
      meanings: [],
      kun_readings: [],
      on_readings: [],
      jlpt: null,
      cachedAt: Date.now(),
    };

    // First result that contains the kanji
    for (const item of data.data || []) {
      const japanese = item.japanese?.[0];
      if (japanese?.word?.includes(char) || japanese?.reading) {
        // Collect readings
        for (const j of item.japanese || []) {
          if (j.word?.includes(char) && j.reading) {
            if (/[\u3040-\u309f]/.test(j.reading)) {
              if (!entry.kun_readings.includes(j.reading)) {
                entry.kun_readings.push(j.reading);
              }
            } else {
              if (!entry.on_readings.includes(j.reading)) {
                entry.on_readings.push(j.reading);
              }
            }
          }
        }
        // Collect meanings
        for (const sense of item.senses || []) {
          for (const eng of sense.english_definitions || []) {
            if (!entry.meanings.includes(eng)) {
              entry.meanings.push(eng);
            }
          }
        }
        // JLPT level
        for (const tag of item.jlpt || []) {
          const level = tag.match(/\d+/);
          if (level) entry.jlpt = parseInt(level[0]);
        }
      }
    }

    // If no Jisho data, return basic entry
    if (entry.meanings.length === 0) {
      entry.meanings = ["(no data)"];
    }

    await saveKanjiCache(entry);
    return entry;
  } catch {
    return null;
  }
}

/** Batch lookup multiple kanji with dedup */
export async function batchLookupKanji(chars: string[]): Promise<Map<string, KanjiEntry>> {
  const results = new Map<string, KanjiEntry>();
  const unique = [...new Set(chars)];

  // Fetch in parallel (rate-limited by browser)
  const entries = await Promise.all(unique.map((c) => lookupKanji(c)));

  for (let i = 0; i < unique.length; i++) {
    if (entries[i]) {
      results.set(unique[i], entries[i]!);
    }
  }

  return results;
}

/** Check if a character is a kanji */
export function isKanji(char: string): boolean {
  return /^[\u4e00-\u9faf\u3400-\u4dbf]$/.test(char);
}
