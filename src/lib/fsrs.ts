/* ─── FSRS-5 Engine ─── */

import type { Card, Grade } from "@/types";

/** Default FSRS-5 parameters (19 weights from Anki) */
export const DEFAULT_PARAMS: number[] = [
  0.40255, 1.18385, 3.173, 15.69105, 7.1949,
  0.5345, 1.4604, 0.0046, 1.54575, 0.1192,
  1.01925, 1.9395, 0.11, 0.29605, 2.2698,
  0.2315, 2.9898, 0.51655, 0.6621,
];

const w = DEFAULT_PARAMS;
const DESIRED_RETENTION = 0.9;

/** Forgetting curve: R(t,S) = (1 + 19/81 * t/S)^(-0.5) */
export function forgettingCurve(t: number, S: number): number {
  return Math.pow(1 + (19 / 81) * (t / S), -0.5);
}

/** Retrievability at elapsed days */
export function getRetrievability(card: Card, now: number = Date.now()): number {
  const elapsedDays = (now - card.lastReview) / (1000 * 60 * 60 * 24);
  if (elapsedDays <= 0) return 1;
  return forgettingCurve(elapsedDays, card.stability);
}

/** Mean reversion for difficulty */
function meanReversion(D: number): number {
  return w[7] * (w[4] - D);
}

/** Next difficulty after a review */
export function nextDifficulty(D: number, grade: Grade): number {
  const delta = -w[6] * (grade - 3);
  const D_prime = D + delta + meanReversion(D);
  return Math.max(1, Math.min(10, D_prime));
}

/** Stability after success */
function successStability(D: number, S: number, R: number): number {
  const factor = 1 + Math.exp(w[8]) *
    (11 - D) *
    Math.pow(S, -w[9]) *
    (Math.exp(w[10] * (1 - R)) - 1);
  return S * factor;
}

/** Stability after failure */
function failureStability(D: number, S: number, R: number): number {
  const factor = w[11] *
    Math.pow(D, -w[12]) *
    Math.pow(S + 1, w[13]) -
    w[14] * (1 - R);
  return Math.max(0.01, S * Math.max(0, factor));
}

/** Stability for same-day review */
function shortTermStability(S: number, grade: Grade): number {
  const factor = grade >= 3 ? 1.3 : 0.8;
  return S * factor;
}

/** Schedule a card after review */
export function scheduleCard(
  card: Card,
  grade: Grade,
  elapsedDays: number,
  now: number = Date.now()
): Card {
  const R = forgettingCurve(elapsedDays, card.stability);
  const D = nextDifficulty(card.difficulty, grade);
  let S: number;

  if (grade === 1) {
    // Failure
    S = failureStability(card.difficulty, card.stability, R);
  } else if (elapsedDays <= 0) {
    // Same-day review
    S = shortTermStability(card.stability, grade);
  } else {
    // Success
    S = successStability(card.difficulty, card.stability, R);
  }

  // Interval: S * desired retention factor
  const interval = S * (Math.pow(DESIRED_RETENTION, 1 / (1 - DESIRED_RETENTION)) - 1);

  return {
    ...card,
    difficulty: D,
    stability: S,
    interval: Math.max(1, Math.round(interval)),
    due: now + Math.max(1, Math.round(interval)) * 1000 * 60 * 60 * 24,
    lastReview: now,
    reps: card.reps + 1,
    lapses: grade === 1 ? card.lapses + 1 : card.lapses,
    streak: grade === 1 ? 0 : card.streak + 1,
  };
}

/** Init FSRS state for new card */
export function initCardState(): Pick<Card, "difficulty" | "stability" | "reps" | "lapses" | "lastReview" | "due" | "interval" | "streak"> {
  return {
    difficulty: 6,
    stability: 0.1,
    reps: 0,
    lapses: 0,
    lastReview: 0,
    due: Date.now(),
    interval: 0,
    streak: 0,
  };
}

/** Map quiz streak to FSRS grade: 0-1→Again, 2→Hard, 3-4→Good, 5+→Easy */
export function streakToGrade(streak: number, correct: boolean): Grade {
  if (!correct) return 1;
  if (streak <= 1) return 1;
  if (streak === 2) return 2;
  if (streak <= 4) return 3;
  return 4;
}

/** Format interval for display */
export function formatInterval(days: number): string {
  if (days < 1 / 24) return "<1 min";
  if (days < 1) return `${Math.round(days * 24 * 60)}min`;
  if (days < 30) return `${Math.round(days)}d`;
  if (days < 365) return `${Math.round(days / 30)}mo`;
  return `${(days / 365).toFixed(1)}yr`;
}
