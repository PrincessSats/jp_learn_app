-- Japanese Test Prep App — Supabase Schema

-- Decks
CREATE TABLE IF NOT EXISTS decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  test_type TEXT NOT NULL CHECK (test_type IN ('N5', 'N4', 'N3', 'N2', 'N1', 'BJT')),
  practice_mode TEXT NOT NULL CHECK (practice_mode IN ('vocabulary', 'kanji', 'grammar', 'reading', 'listening')),
  card_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_studied TIMESTAMPTZ
);

CREATE INDEX idx_decks_user ON decks(user_id);
CREATE INDEX idx_decks_test_type ON decks(test_type);
CREATE INDEX idx_decks_practice_mode ON decks(practice_mode);

-- Cards
CREATE TABLE IF NOT EXISTS cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  furigana TEXT,
  tags TEXT[] DEFAULT '{}',
  -- FSRS state
  difficulty DOUBLE PRECISION NOT NULL DEFAULT 6.0,
  stability DOUBLE PRECISION NOT NULL DEFAULT 0.1,
  reps INTEGER NOT NULL DEFAULT 0,
  lapses INTEGER NOT NULL DEFAULT 0,
  last_review TIMESTAMPTZ,
  due TIMESTAMPTZ NOT NULL DEFAULT now(),
  interval_days DOUBLE PRECISION NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_cards_deck ON cards(deck_id);
CREATE INDEX idx_cards_user ON cards(user_id);
CREATE INDEX idx_cards_due ON cards(due);

-- Review Logs
CREATE TABLE IF NOT EXISTS review_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
  deck_id UUID NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  grade INTEGER NOT NULL CHECK (grade BETWEEN 1 AND 4),
  elapsed_days DOUBLE PRECISION NOT NULL DEFAULT 0,
  response_time INTEGER NOT NULL DEFAULT 0, -- ms
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reviews_user ON review_logs(user_id);
CREATE INDEX idx_reviews_deck ON review_logs(deck_id);
CREATE INDEX idx_reviews_timestamp ON review_logs(timestamp);

-- Kanji Dictionary Cache
CREATE TABLE IF NOT EXISTS kanji_cache (
  character TEXT PRIMARY KEY,
  meanings TEXT[] NOT NULL DEFAULT '{}',
  kun_readings TEXT[] NOT NULL DEFAULT '{}',
  on_readings TEXT[] NOT NULL DEFAULT '{}',
  jlpt INTEGER,
  cached_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Grammar Explanation Cache
CREATE TABLE IF NOT EXISTS grammar_cache (
  pattern TEXT PRIMARY KEY,
  explanation TEXT NOT NULL,
  examples TEXT[] NOT NULL DEFAULT '{}',
  cached_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User Stats
CREATE TABLE IF NOT EXISTS user_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_study_date DATE,
  total_reviews INTEGER NOT NULL DEFAULT 0,
  reviews_by_mode JSONB NOT NULL DEFAULT '{"vocabulary":0,"kanji":0,"grammar":0,"reading":0,"listening":0}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Row Level Security
ALTER TABLE decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Policies: users can only access their own data
CREATE POLICY "Users own decks" ON decks
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own cards" ON cards
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own reviews" ON review_logs
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own stats" ON user_stats
  FOR ALL USING (auth.uid() = user_id);

-- Kanji/grammar caches are shared read-only (public)
ALTER TABLE kanji_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE grammar_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read kanji cache" ON kanji_cache FOR SELECT USING (true);
CREATE POLICY "Anyone can insert kanji cache" ON kanji_cache FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read grammar cache" ON grammar_cache FOR SELECT USING (true);
CREATE POLICY "Anyone can insert grammar cache" ON grammar_cache FOR INSERT WITH CHECK (true);
