"use client";

import { useState, useEffect, useCallback } from "react";
import type { KanjiEntry } from "@/types";
import { batchLookupKanji } from "@/lib/kanji";

/* ─── Props ─── */

interface KanjiPopupProps {
  character: string;
  onClose: () => void;
}

/* ─── Component ─── */

export function KanjiPopup({ character, onClose }: KanjiPopupProps) {
  const [entry, setEntry] = useState<KanjiEntry | null>(null);
  const [loading, setLoading] = useState(true);

  /* ─── Lookup kanji on mount ─── */

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const map = await batchLookupKanji([character]);
      if (!cancelled) {
        const found = map.get(character);
        if (found) setEntry(found);
        setLoading(false);
      }
    }
    load();

    return () => {
      cancelled = true;
    };
  }, [character]);

  /* ─── Close on background tap ─── */

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  /* ─── Render ─── */

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: 16,
      }}
      onClick={handleBackdropClick}
    >
      <div
        className="glass glass-strong"
        style={{
          width: "100%",
          maxWidth: 340,
          padding: 28,
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── Loading state ─── */}
        {loading && (
          <div className="dim mono" style={{ fontSize: 13, padding: 20 }}>
            Loading…
          </div>
        )}

        {/* ─── Entry found ─── */}
        {!loading && entry && (
          <div className="col" style={{ gap: 16, alignItems: "center" }}>
            {/* Large kanji character */}
            <div className="jp" style={{ fontSize: 48, lineHeight: 1 }}>
              {entry.character}
            </div>

            {/* Meanings */}
            <div className="col" style={{ gap: 4, alignItems: "center" }}>
              <div className="eyebrow" style={{ marginBottom: 2 }}>
                Meanings
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: "var(--ink)",
                }}
              >
                {entry.meanings.join(", ")}
              </div>
            </div>

            {/* On'yomi readings */}
            {entry.on_readings.length > 0 && (
              <div className="col" style={{ gap: 6, alignItems: "center" }}>
                <div className="eyebrow" style={{ marginBottom: 2 }}>
                  On&apos;yomi
                </div>
                <div
                  className="row"
                  style={{
                    gap: 4,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {entry.on_readings.map((r) => (
                    <span key={r} className="pill accent">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Kun'yomi readings */}
            {entry.kun_readings.length > 0 && (
              <div className="col" style={{ gap: 6, alignItems: "center" }}>
                <div className="eyebrow" style={{ marginBottom: 2 }}>
                  Kun&apos;yomi
                </div>
                <div
                  className="row"
                  style={{
                    gap: 4,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {entry.kun_readings.map((r) => (
                    <span key={r} className="pill accent">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* JLPT level badge */}
            {entry.jlpt && (
              <div className="mono dim" style={{ fontSize: 11 }}>
                JLPT N{entry.jlpt}
              </div>
            )}
          </div>
        )}

        {/* ─── No data ─── */}
        {!loading && !entry && (
          <div className="col" style={{ gap: 12, alignItems: "center" }}>
            <div className="jp" style={{ fontSize: 36, opacity: 0.5 }}>
              {character}
            </div>
            <div className="dim" style={{ fontSize: 13 }}>
              No data available
            </div>
          </div>
        )}
      </div>
    </div>
  );
}