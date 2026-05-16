"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { batchLookupKanji } from "@/lib/kanji";
import type { KanjiEntry } from "@/types";

interface KanjiPopupProps {
  character: string;
  onClose: () => void;
}

export function KanjiPopup({ character, onClose }: KanjiPopupProps) {
  const [entry, setEntry] = useState<KanjiEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    batchLookupKanji([character]).then((results) => {
      const found = results.get(character);
      setEntry(found ?? null);
      setLoading(false);
    });
  }, [character]);

  // Tap outside → close
  useEffect(() => {
    const handleTap = (e: MouseEvent | TouchEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleTap);
    document.addEventListener("touchstart", handleTap, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleTap);
      document.removeEventListener("touchstart", handleTap);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={popupRef}
        className="glass-strong p-6 w-full max-w-xs text-center"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <div
              className="w-16 h-16 rounded-xl animate-pulse"
              style={{ background: "var(--color-glass-bg-strong)" }}
            />
            <div
              className="w-32 h-4 rounded animate-pulse"
              style={{ background: "var(--color-glass-bg-strong)" }}
            />
            <div
              className="w-24 h-3 rounded animate-pulse"
              style={{ background: "var(--color-glass-bg-strong)" }}
            />
          </div>
        ) : entry ? (
          <>
            <div className="text-5xl font-jp mb-2">{entry.character}</div>
            <div
              className="text-sm mb-3"
              style={{ color: "var(--color-ink-dim)" }}
            >
              {entry.meanings.join(", ")}
            </div>
            {entry.on_readings.length > 0 && (
              <div
                className="text-xs mb-1"
                style={{ color: "var(--color-ink-dim)" }}
              >
                <span style={{ color: "var(--color-ink-faint)" }}>ON </span>
                {entry.on_readings.join("、")}
              </div>
            )}
            {entry.kun_readings.length > 0 && (
              <div
                className="text-xs mb-1"
                style={{ color: "var(--color-ink-dim)" }}
              >
                <span style={{ color: "var(--color-ink-faint)" }}>KUN </span>
                {entry.kun_readings.join("、")}
              </div>
            )}
            {entry.jlpt && (
              <div className="text-xs mt-2" style={{ color: "var(--color-accent)" }}>
                JLPT N{entry.jlpt}
              </div>
            )}
          </>
        ) : (
          <div className="text-sm py-4" style={{ color: "var(--color-ink-dim)" }}>
            No data available
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
