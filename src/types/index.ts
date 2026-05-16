/* ─── Japanese Test Prep — Types ─── */

/** JLPT levels */
export type JLPTLevel = "N5" | "N4" | "N3" | "N2" | "N1";

/** Test types */
export type TestType = JLPTLevel | "BJT";

/** Practice modes */
export type PracticeMode = "vocabulary" | "kanji" | "grammar" | "reading" | "listening";

/** Question formats */
export type QuestionType = "mcq" | "fill" | "flashcard";

/** FSRS grade (1=Again, 2=Hard, 3=Good, 4=Easy) */
export type Grade = 1 | 2 | 3 | 4;

/** A single flashcard */
export interface Card {
  id: string;
  deckId: string;
  front: string;
  back: string;
  furigana?: string;
  tags: string[];
  /** FSRS state */
  difficulty: number;   // D, starts ~6
  stability: number;     // S, starts ~0.1
  reps: number;
  lapses: number;
  lastReview: number;    // timestamp
  due: number;           // timestamp
  interval: number;      // days
  streak: number;
}

/** A deck of cards */
export interface Deck {
  id: string;
  name: string;
  description?: string;
  testType: TestType;
  practiceMode: PracticeMode;
  cardCount: number;
  createdAt: number;
  lastStudied?: number;
}

/** A review log entry */
export interface ReviewLog {
  id: string;
  cardId: string;
  deckId: string;
  grade: Grade;
  elapsedDays: number;
  responseTime: number; // ms
  timestamp: number;
}

/** Kanji dictionary cache */
export interface KanjiEntry {
  character: string;
  meanings: string[];
  kun_readings: string[];
  on_readings: string[];
  jlpt: number | null;
  cachedAt: number;
}

/** Grammar explanation cache */
export interface GrammarEntry {
  pattern: string;
  explanation: string;
  examples: string[];
  cachedAt: number;
}

/** A quiz question */
export interface QuizQuestion {
  card: Card;
  options: string[];   // for MCQ
  questionType: QuestionType;
}

/** User stats */
export interface UserStats {
  streak: number;
  longestStreak: number;
  lastStudyDate: string; // YYYY-MM-DD
  totalReviews: number;
  reviewsByMode: Record<PracticeMode, number>;
}
