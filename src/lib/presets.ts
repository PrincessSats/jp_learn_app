/* ─── Preset Deck Loader ───
 * Loads ALL_PRESETS from ./presets/data on first app launch.
 * No JSON fetch, no network — all data is inline TypeScript.
 */

import type { Deck, Card } from "@/types";
import { ALL_PRESETS } from "./presets/data";

const PRESET_VERSION = 1;

interface PresetVersionEntry {
  id: string;
  version: number;
}

/** Check if presets already imported */
async function getPresetVersion(): Promise<number> {
  try {
    const { openDB } = await import("idb");
    const db = await openDB("test-prep", 1);
    const meta = await db.get("user_stats", "preset_version") as PresetVersionEntry | undefined;
    return meta?.version ?? 0;
  } catch {
    return 0;
  }
}

/** Mark version — prevents re-import */
async function savePresetVersion(version: number): Promise<void> {
  try {
    const { openDB } = await import("idb");
    const db = await openDB("test-prep", 1);
    const tx = db.transaction("user_stats", "readwrite");
    await tx.store.put({ id: "preset_version", version } as PresetVersionEntry);
    await tx.done;
  } catch { /* best-effort */ }
}

/** Import all preset decks into IndexedDB. Returns count of decks imported. */
export async function loadPresets(): Promise<number> {
  const current = await getPresetVersion();
  if (current >= PRESET_VERSION) return 0;

  const { openDB } = await import("idb");
  const db = await openDB("test-prep", 1);

  let imported = 0;

  for (const factory of ALL_PRESETS) {
    try {
      const { deck, cards } = factory();

      // Skip if deck already exists (by id)
      const existing = await db.get("decks", deck.id);
      if (existing) continue;

      await db.put("decks", deck);

      const tx = db.transaction("cards", "readwrite");
      for (const card of cards) {
        await tx.store.put(card);
      }
      await tx.done;

      imported++;
    } catch {
      // Skip broken preset, continue others
    }
  }

  if (imported > 0) {
    await savePresetVersion(PRESET_VERSION);
  }

  return imported;
}
