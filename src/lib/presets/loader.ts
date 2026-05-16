/* ─── Preset Loader — Installs preset decks on first visit ─── */

import { saveDeck, getAllDecks, saveCards } from "../db";
import { ALL_PRESETS, PRESET_COUNT } from "./data";
import type { Deck, Card } from "@/types";

const PRESET_FLAG_KEY = "presets_loaded_v1";

/** Check if presets have already been installed */
export async function arePresetsLoaded(): Promise<boolean> {
  try {
    const flag = localStorage.getItem(PRESET_FLAG_KEY);
    return flag === "true";
  } catch {
    return false;
  }
}

/** Load all preset decks into IndexedDB. Skips if already loaded. */
export async function loadAllPresets(): Promise<{
  decks: Deck[];
  cards: Card[];
  skipped: boolean;
}> {
  if (await arePresetsLoaded()) {
    return { decks: [], cards: [], skipped: true };
  }

  const decks: Deck[] = [];
  const cards: Card[] = [];

  for (const factory of ALL_PRESETS) {
    const preset = factory();

    // Skip if deck already exists (id collision — already loaded)
    const existing = await getAllDecks();
    const conflict = existing.find((d) => d.id === preset.deck.id || d.name === preset.deck.name);
    if (conflict) {
      // Deck already exists — skip this preset
      continue;
    }

    await saveDeck(preset.deck);
    await saveCards(preset.cards);

    decks.push(preset.deck);
    cards.push(...preset.cards);
  }

  // Mark as loaded
  try {
    localStorage.setItem(PRESET_FLAG_KEY, "true");
  } catch { /* localStorage might be unavailable */ }

  return { decks, cards, skipped: false };
}

/** Reset presets flag — forces reload on next visit */
export function resetPresetsFlag(): void {
  try {
    localStorage.removeItem(PRESET_FLAG_KEY);
  } catch { /* ignore */ }
}

/** Get preset count */
export { PRESET_COUNT };
