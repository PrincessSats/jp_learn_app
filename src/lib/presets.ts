/* ─── Preset Deck Loader ───
 * Loads ALL_PRESETS from ./presets/data on first app launch.
 * No JSON fetch, no network — all data is inline TypeScript.
 */

import { ALL_PRESETS } from "./presets/data";
import { getDB, saveDeck, saveCards } from "./db";

const PRESET_VERSION = 1;

interface PresetVersionEntry {
  id: string;
  version: number;
}

async function getPresetVersion(): Promise<number> {
  const db = await getDB();
  const meta = (await db.get("user_stats", "preset_version")) as
    | PresetVersionEntry
    | undefined;
  return meta?.version ?? 0;
}

async function savePresetVersion(version: number): Promise<void> {
  const db = await getDB();
  await db.put("user_stats", { id: "preset_version", version } as PresetVersionEntry);
}

/** Import all preset decks into IndexedDB. Returns count of decks imported. */
export async function loadPresets(): Promise<number> {
  const current = await getPresetVersion();
  if (current >= PRESET_VERSION) return 0;

  const db = await getDB();
  let imported = 0;

  for (const factory of ALL_PRESETS) {
    const { deck, cards } = factory();
    const existing = await db.get("decks", deck.id);
    if (existing) continue;

    await saveDeck(deck);
    await saveCards(cards);
    imported++;
  }

  if (imported > 0) {
    await savePresetVersion(PRESET_VERSION);
  }

  return imported;
}
