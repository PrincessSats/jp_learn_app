"use client";

import { useState, useRef, useLayoutEffect, useEffect, type ReactNode } from "react";

type Tab = { id: string; label: string; icon: ReactNode };

export function AppShell({
  tabs,
  children,
  activeTab,
  onTabChange,
}: {
  tabs: Tab[];
  children: (activeTab: string) => ReactNode;
  activeTab?: string;
  onTabChange?: (id: string) => void;
}) {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id ?? "");
  const active = activeTab ?? internalActive;
  const tabbarRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [blob, setBlob] = useState({ x: 8, w: 62, morphing: false });
  const [pageKey, setPageKey] = useState(0);

  const positionBlob = (id: string, animate = true) => {
    const bar = tabbarRef.current;
    const tab = tabRefs.current[id];
    if (!bar || !tab) return;
    const barRect = bar.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    setBlob({
      x: tabRect.left - barRect.left,
      w: tabRect.width,
      morphing: animate,
    });
    if (animate) {
      setTimeout(() => setBlob((b) => ({ ...b, morphing: false })), 680);
    }
  };

  useLayoutEffect(() => {
    positionBlob(active, false);
    const onResize = () => positionBlob(active, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line
  }, []);

  useEffect(() => { positionBlob(active, true); }, [active]);

  const handleTab = (id: string) => {
    setInternalActive(id);
    onTabChange?.(id);
    setPageKey((k) => k + 1);
  };

  return (
    <main className="app">
      {/* Page content */}
      <div className="stretch" style={{ minHeight: 0 }}>
        <div key={pageKey} className="page">
          {children(active)}
        </div>
      </div>

      {/* Tab bar */}
      <div className="tabbar-wrap">
        <nav className="tabbar" ref={tabbarRef} aria-label="Primary">
          <div
            className="tab-blob-track"
            style={{
              transform: `translateX(${blob.x - 8}px)`,
              width: blob.w,
            }}
          >
            <div className={`tab-blob${blob.morphing ? " morphing" : ""}`} />
          </div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[tab.id] = el; }}
              className={`tab${active === tab.id ? " active" : ""}`}
              onClick={() => handleTab(tab.id)}
              aria-current={active === tab.id ? "page" : undefined}
            >
              {tab.icon}
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </main>
  );
}
