/* ─── Preset Deck Loader ───
 * Loads ALL_PRESETS from ./presets/data on first app launch.
 * Bump PRESET_VERSION when data/schema changes to force reimport.
 *
 * Debug: open browser console → see "Presets: ..." logs.
 */

import { ALL_PRESETS } from "./presets/data";
import { getDB } from "./db";

// Bump this when preset data changes — forces full reimport
const PRESET_VERSION = 2;

async function getPresetVersion(): Promise<number> {
  try {
    const db = await getDB();
    const meta: any = await db.get("user_stats", "preset_version");
    return meta?.version ?? 0;
  } catch {
    return 0;
  }
}

async function savePresetVersion(v: number): Promise<void> {
  try {
    const db = await getDB();
    await db.put("user_stats", { id: "preset_version", version: v });
  } catch { /* best effort */ }
}

/** Import all preset decks into IndexedDB. Returns count imported. */
export async function loadPresets(): Promise<number> {
  const current = await getPresetVersion();
  console.log(`Presets: DB version=${current}, code version=${PRESET_VERSION}`);

  if (current >= PRESET_VERSION) return 0;

  const db = await getDB();

  // Nuke old presets (handles schema drift)
  try {
    const allDecks: any[] = await db.getAll("decks");
    const presetIds = allDecks
      .filter((d: any) => d.source === "preset" || String(d.id).startsWith("preset-"))
      .map((d: any) => d.id);

    console.log(`Presets: clearing ${presetIds.length} old preset decks`);

    for (const id of presetIds) {
      try {
        const cards: any[] = await db.getAllFromIndex("cards", "deckId", id);
        for (const c of cards) await db.delete("cards", c.id);
        await db.delete("decks", id);
      } catch { /* continue */ }
    }
  } catch { /* no old data is fine */ }

  // Import all
  console.log(`Presets: importing ${ALL_PRESETS.length} preset decks...`);
  let imported = 0;

  for (const factory of ALL_PRESETS) {
    try {
      const { deck, cards } = factory();
      await db.put("decks", deck);

      for (const card of cards) {
        await db.put("cards", card);
      }
      imported++;
    } catch (err) {
      console.warn("Presets: failed to import deck", err);
    }
  }

  console.log(`Presets: imported ${imported} decks`);

  if (imported > 0) {
    await savePresetVersion(PRESET_VERSION);
  }

  return imported;
}
