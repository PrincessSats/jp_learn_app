import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const IconHome = (p: P) => <svg viewBox="0 0 24 24" {...base} {...p}><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v9.5h13V10" /><path d="M10 19.5v-5h4v5" /></svg>;
export const IconBook = (p: P) => <svg viewBox="0 0 24 24" {...base} {...p}><path d="M4 5.5c2-1 5-1.5 8-.5v14c-3-1-6-.5-8 .5z" /><path d="M20 5.5c-2-1-5-1.5-8-.5v14c3-1 6-.5 8 .5z" /></svg>;
export const IconChart = (p: P) => <svg viewBox="0 0 24 24" {...base} {...p}><path d="M4 20h16" /><rect x="6" y="12" width="3" height="7" rx="1" /><rect x="11" y="8" width="3" height="11" rx="1" /><rect x="16" y="14" width="3" height="5" rx="1" /></svg>;
export const IconImport = (p: P) => <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 4v11" /><path d="M7.5 10.5 12 15l4.5-4.5" /><path d="M5 18.5h14" /></svg>;
export const IconFlame = (p: P) => <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 21c3.5 0 6-2.4 6-5.6 0-3-2-4.4-3-6.4-.4 1.5-1.4 2.4-2.6 2.4-.6-2.6-1-3.9-3-6.4-.4 2.8-1.6 3.8-2.7 5.6C5.6 12 5 13.5 5 15.4 5 18.6 7.5 21 12 21z" /><path d="M12 17.5c-.8 0-1.5-.6-1.5-1.5 0-.6.3-1 .7-1.4.2 1 1 1 1.6 1.4.4.4.7.8.7 1.4 0 .9-.7 1.5-1.5 1.5z" /></svg>;
export const IconSparkle = (p: P) => <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 4v5M12 15v5M4 12h5M15 12h5" /><path d="M6.5 6.5 9 9M15 15l2.5 2.5M6.5 17.5 9 15M15 9l2.5-2.5" /></svg>;
export const IconHeadphones = (p: P) => <svg viewBox="0 0 24 24" {...base} {...p}><path d="M4 13.5V12a8 8 0 0 1 16 0v1.5" /><rect x="3" y="13.5" width="4" height="6" rx="1.5" /><rect x="17" y="13.5" width="4" height="6" rx="1.5" /></svg>;
export const IconArrow = (p: P) => <svg viewBox="0 0 24 24" {...base} {...p}><path d="M9 18l6-6-6-6" /></svg>;
export const IconClock = (p: P) => <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>;
export const IconTarget = (p: P) => <svg viewBox="0 0 24 24" {...base} {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /></svg>;
export const IconKanji = (p: P) => <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 3v18M5 8h14M5 16h14" /></svg>;
