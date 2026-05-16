/* ─── Preset Loader ─── */

import { ALL_PRESETS } from "./data";
import { getDB } from "../db";

let didClear = false;

export async function loadAllPresets(): Promise<number> {
  const db = await getDB();

  // Nuke old preset decks once per session
  if (!didClear) {
    didClear = true;
    const allDecks: any[] = await db.getAll("decks");
    const toDelete = allDecks.filter(
      (d: any) => String(d.id).startsWith("preset-"),
    );
    for (const d of toDelete) {
      try {
        const cards: any[] = await db.getAllFromIndex("cards", "deckId", d.id);
        for (const c of cards) await db.delete("cards", c.id);
        await db.delete("decks", d.id);
      } catch {}
    }
    console.log(`[preset] Cleared ${toDelete.length} old preset decks`);
  }

  // Import all presets
  const existingIds = new Set(
    ((await db.getAll("decks")) as any[]).map((d) => d.id),
  );

  let n = 0;
  for (const factory of ALL_PRESETS) {
    try {
      const { deck, cards } = factory();
      if (existingIds.has(deck.id)) continue;
      await db.put("decks", deck);
      for (const card of cards) await db.put("cards", card);
      n++;
    } catch {}
  }

  console.log(`[preset] Imported ${n}/${ALL_PRESETS.length}`);
  return n;
}
