"use client";

import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = { id: string; label: string; icon: ReactNode };

export function AppShell({
  tabs,
  children,
}: {
  tabs: Tab[];
  children: (activeTab: string) => ReactNode;
}) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const barRef = useRef<HTMLDivElement>(null);
  const [blob, setBlob] = useState({ x: 0, w: 0 });

  const updateBlob = useCallback((id: string) => {
    const bar = barRef.current;
    const tab = tabRefs.current[id];
    if (!bar || !tab) return;
    const barRect = bar.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    setBlob({ x: tabRect.left - barRect.left, w: tabRect.width });
  }, []);

  useEffect(() => {
    updateBlob(active);
  }, [active, updateBlob]);

  return (
    <div className="app-shell">
      <div style={{ flex: 1, overflow: "hidden auto", paddingBottom: 8 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {children(active)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Tab bar */}
      <div ref={barRef} className="tab-bar">
        <div
          className="tab-blob"
          style={{ left: blob.x, width: blob.w || 54 }}
        />
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[tab.id] = el; }}
            onClick={() => setActive(tab.id)}
            className="relative z-10 flex flex-col items-center gap-0.5 px-3 py-1 transition-colors duration-200"
            style={{
              color: active === tab.id ? "var(--color-ink)" : "var(--color-ink-faint)",
              minWidth: 54,
            }}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-[10px] font-medium leading-none">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
