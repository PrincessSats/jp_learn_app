"use client";

import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TestType, PracticeMode, Card } from "@/types";
import { parseCSV, parseAPKG, createDeckFromImport, extractAllKanji } from "@/lib/import";
import { saveDeck, saveCards } from "@/lib/db";
import { batchLookupKanji } from "@/lib/kanji";

// ─── Types ───

type ImportStep = "upload" | "preview" | "configure" | "success";

type FileType = "csv" | "apkg" | null;

interface ParsedData {
  cards: Omit<Card, "id" | "deckId" | "difficulty" | "stability" | "reps" | "lapses" | "lastReview" | "due" | "interval" | "streak">[];
  meta: Record<string, unknown>;
  deckName?: string;
  columns?: string[];
  fileType: FileType;
}

// ─── Constants ───

const TEST_TYPES: { value: TestType; label: string }[] = [
  { value: "N5", label: "N5" },
  { value: "N4", label: "N4" },
  { value: "N3", label: "N3" },
  { value: "N2", label: "N2" },
  { value: "N1", label: "N1" },
  { value: "BJT", label: "BJT" },
];

const PRACTICE_MODES: { value: PracticeMode; label: string }[] = [
  { value: "vocabulary", label: "Vocabulary" },
  { value: "kanji", label: "Kanji" },
  { value: "grammar", label: "Grammar" },
  { value: "reading", label: "Reading" },
];

// ─── Icons (inline SVG) ───

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

// ─── Motion Variants ───

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
} as const;

const checkmarkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut" as const },
  },
} as const;

// ─── Component ───

interface ImportViewProps {
  onImportComplete?: () => void;
}

export function ImportView({ onImportComplete }: ImportViewProps = {}) {
  const [step, setStep] = useState<ImportStep>("upload");
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState<FileType>(null);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  // Configure form state
  const [deckName, setDeckName] = useState("");
  const [testType, setTestType] = useState<TestType>("N5");
  const [practiceMode, setPracticeMode] = useState<PracticeMode>("vocabulary");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── File handling ───

  const detectFileType = useCallback((name: string, mime?: string): FileType => {
    const ext = name.split(".").pop()?.toLowerCase();
    if (ext === "csv" || mime === "text/csv" || mime === "application/csv") return "csv";
    if (ext === "apkg" || mime === "application/apkg" || mime === "application/octet-stream") return "apkg";
    return null;
  }, []);

  const processFile = useCallback(async (file: File) => {
    setError(null);
    setParsedData(null);
    setFileName(file.name);

    const detected = detectFileType(file.name, file.type);
    if (!detected) {
      setError("Unsupported file format. Please upload a .csv or .apkg file.");
      return;
    }
    setFileType(detected);

    if (file.size === 0) {
      setError("The file is empty. Please choose a file with content.");
      return;
    }

    try {
      if (detected === "csv") {
        const text = await file.text();
        const result = parseCSV(text);

        if (result.cards.length === 0) {
          setError("No valid cards found in the CSV. Make sure it has at least a front and back column.");
          return;
        }

        setParsedData({
          cards: result.cards,
          meta: { rowCount: result.meta.rowCount },
          columns: result.meta.columns,
          fileType: "csv",
        });
        setDeckName(file.name.replace(/\.csv$/i, ""));
        setStep("preview");
      } else {
        const buffer = await file.arrayBuffer();
        const result = await parseAPKG(buffer);

        if (result.cards.length === 0) {
          setError("No valid cards found in the APKG file.");
          return;
        }

        setParsedData({
          cards: result.cards,
          meta: { cardCount: result.meta.cardCount, noteCount: result.meta.noteCount },
          deckName: result.deckName,
          fileType: "apkg",
        });
        setDeckName(result.deckName || file.name.replace(/\.apkg$/i, ""));
        setStep("preview");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to parse file.";
      setError(message);
    }
  }, [detectFileType]);

  // ─── Drag & Drop ───

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleBrowse = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // Reset so the same file can be re-selected
    e.target.value = "";
  }, [processFile]);

  // ─── Import execution ───

  const handleImport = useCallback(async () => {
    if (!parsedData || !deckName.trim()) return;
    setImporting(true);
    setError(null);

    try {
      const { deck, cards: fullCards } = createDeckFromImport(
        deckName.trim(),
        testType,
        practiceMode,
        parsedData.cards,
      );

      await saveDeck(deck);
      await saveCards(fullCards);

      // Pre-cache kanji in background (don't block)
      const kanjiChars = extractAllKanji(parsedData.cards);
      if (kanjiChars.length > 0) {
        batchLookupKanji(kanjiChars).catch(() => {
          // Silently fail — kanji caching is best-effort
        });
      }

      setStep("success");
      onImportComplete?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Import failed. Please try again.";
      setError(message);
    } finally {
      setImporting(false);
    }
  }, [parsedData, deckName, testType, practiceMode]);

  // ─── Reset ───

  const handleReset = useCallback(() => {
    setStep("upload");
    setFileName("");
    setFileType(null);
    setParsedData(null);
    setError(null);
    setDeckName("");
    setTestType("N5");
    setPracticeMode("vocabulary");
  }, []);

  // ─── Render helpers ───

  const cardCount = parsedData?.cards?.length ?? 0;

  return (
    <div className="page col" style={{ gap: 18, maxWidth: 460, margin: "0 auto", paddingTop: 4 }}>
      {/* Header */}
      <motion.div className="col" style={{ gap: 4 }} variants={itemVariants} initial="hidden" animate="visible">
        <span className="eyebrow">Bring your own</span>
        <span className="title">Import</span>
        <span className="dim" style={{ fontSize: 13, marginTop: 2 }}>
          Add decks, articles or word lists to study from.
        </span>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* ─── STEP: Upload ─── */}
        {step === "upload" && (
          <motion.div
            key="upload"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="col"
            style={{ gap: 18 }}
          >
            {/* Drop zone */}
            <motion.div
              variants={itemVariants}
              className={`glass ${dragOver ? "dropzone-hot" : ""}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleBrowse}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleBrowse(); }}
              style={{
                padding: "36px 24px",
                cursor: "pointer",
                textAlign: "center",
                border: `2px dashed ${dragOver ? "var(--color-accent)" : "var(--color-glass-border)"}`,
                transition: "border-color 0.25s, background 0.25s",
                background: dragOver ? "rgba(255, 90, 78, 0.08)" : undefined,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 18,
                  margin: "0 auto 14px",
                  background: "linear-gradient(140deg, rgba(255,90,78,0.85), rgba(255,150,120,0.55))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)",
                }}
              >
                <UploadIcon className="" />
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                Drop CSV or APKG file here
              </div>
              <div className="dim" style={{ fontSize: 12.5, marginBottom: 14 }}>
                or click to browse — Anki .apkg or .csv word lists
              </div>
              <button
                type="button"
                className="btn ghost"
                style={{ fontSize: 12.5, padding: "9px 16px" }}
                onClick={(e) => { e.stopPropagation(); handleBrowse(); }}
              >
                <span style={{ marginRight: 6, fontSize: 16, lineHeight: 1 }}>+</span>
                Browse files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.apkg,text/csv,application/apkg,application/octet-stream"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </motion.div>

            {/* Supported formats hint */}
            <motion.div
              variants={itemVariants}
              className="row"
              style={{ gap: 12, justifyContent: "center", fontSize: 12, color: "var(--color-ink-faint)" }}
            >
              <span className="row" style={{ gap: 4, alignItems: "center" }}>
                <FileIcon className="" />
                .csv
              </span>
              <span className="row" style={{ gap: 4, alignItems: "center" }}>
                <FileIcon className="" />
                .apkg
              </span>
            </motion.div>
          </motion.div>
        )}

        {/* ─── STEP: Preview ─── */}
        {step === "preview" && parsedData && (
          <motion.div
            key="preview"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="col"
            style={{ gap: 16 }}
          >
            {/* File info badge */}
            <motion.div variants={itemVariants} className="row" style={{ gap: 8, alignItems: "center" }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "3px 8px",
                  borderRadius: 6,
                  background: fileType === "csv"
                    ? "rgba(255, 90, 78, 0.2)"
                    : "rgba(122, 61, 240, 0.2)",
                  color: fileType === "csv" ? "var(--color-accent)" : "#b388ff",
                }}
              >
                {fileType === "csv" ? "CSV" : "APKG"}
              </span>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{fileName}</span>
            </motion.div>

            {/* CSV Preview */}
            {fileType === "csv" && (
              <>
                {/* Column mapping summary */}
                <motion.div variants={itemVariants} className="glass" style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, color: "var(--color-ink-dim)" }}>
                    Detected Columns
                  </div>
                  <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
                    {parsedData.columns?.map((col, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: 12,
                          padding: "3px 10px",
                          borderRadius: 8,
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: col === "front" ? "var(--color-accent)" : undefined,
                          fontWeight: col === "front" ? 600 : 400,
                        }}
                      >
                        {col}
                        {col === "front" && " ★"}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: 11.5, marginTop: 8, color: "var(--color-ink-faint)" }}>
                    {parsedData.meta.rowCount as number} card{parsedData.meta.rowCount !== 1 ? "s" : ""} detected
                  </div>
                </motion.div>

                {/* Preview table */}
                <motion.div variants={itemVariants} className="glass-strong" style={{ padding: 0, overflow: "hidden" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", padding: "12px 16px 8px", color: "var(--color-ink-dim)" }}>
                    Preview (first {Math.min(5, cardCount)} cards)
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                          <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-ink-dim)", whiteSpace: "nowrap" }}>Front</th>
                          <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-ink-dim)", whiteSpace: "nowrap" }}>Back</th>
                          <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-ink-dim)", whiteSpace: "nowrap" }}>Furigana</th>
                          <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-ink-dim)", whiteSpace: "nowrap" }}>Tags</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parsedData.cards.slice(0, 5).map((card, i) => (
                          <tr key={i} style={{ borderBottom: i < Math.min(5, cardCount) - 1 ? "1px solid rgba(255,255,255,0.04)" : undefined }}>
                            <td style={{ padding: "8px 12px", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {card.front}
                            </td>
                            <td style={{ padding: "8px 12px", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {card.back}
                            </td>
                            <td style={{ padding: "8px 12px", color: "var(--color-ink-faint)" }}>
                              {card.furigana || "—"}
                            </td>
                            <td style={{ padding: "8px 12px", color: "var(--color-ink-faint)" }}>
                              {card.tags?.length ? card.tags.slice(0, 2).join(", ") : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </>
            )}

            {/* APKG Preview */}
            {fileType === "apkg" && (
              <>
                <motion.div variants={itemVariants} className="glass" style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, color: "var(--color-ink-dim)" }}>
                    Deck Info
                  </div>
                  <div className="col" style={{ gap: 6 }}>
                    <div className="row" style={{ justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "var(--color-ink-dim)" }}>Deck name</span>
                      <span style={{ fontWeight: 600 }}>{parsedData.deckName || "Imported Deck"}</span>
                    </div>
                    <div className="row" style={{ justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "var(--color-ink-dim)" }}>Cards</span>
                      <span style={{ fontWeight: 600 }}>{(parsedData.meta as { cardCount: number }).cardCount}</span>
                    </div>
                    <div className="row" style={{ justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "var(--color-ink-dim)" }}>Notes</span>
                      <span style={{ fontWeight: 600 }}>{(parsedData.meta as { noteCount: number }).noteCount}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Sample cards */}
                <motion.div variants={itemVariants} className="glass-strong" style={{ padding: 0, overflow: "hidden" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", padding: "12px 16px 8px", color: "var(--color-ink-dim)" }}>
                    Sample Cards (first {Math.min(3, cardCount)})
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                      <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                          <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-ink-dim)" }}>Front</th>
                          <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: 600, color: "var(--color-ink-dim)" }}>Back</th>
                        </tr>
                      </thead>
                      <tbody>
                        {parsedData.cards.slice(0, 3).map((card, i) => (
                          <tr key={i} style={{ borderBottom: i < Math.min(3, cardCount) - 1 ? "1px solid rgba(255,255,255,0.04)" : undefined }}>
                            <td style={{ padding: "8px 12px", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {card.front}
                            </td>
                            <td style={{ padding: "8px 12px", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {card.back}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </>
            )}

            {/* Continue button */}
            <motion.div variants={itemVariants}>
              <button
                type="button"
                className="btn primary"
                onClick={() => setStep("configure")}
                style={{ width: "100%", padding: "14px 0", fontSize: 14, fontWeight: 600 }}
              >
                Continue — {cardCount} card{cardCount !== 1 ? "s" : ""}
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ─── STEP: Configure ─── */}
        {step === "configure" && parsedData && (
          <motion.div
            key="configure"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="col"
            style={{ gap: 18 }}
          >
            {/* Deck name */}
            <motion.div variants={itemVariants} className="col" style={{ gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-ink-dim)" }}>
                Deck Name
              </label>
              <input
                type="text"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                placeholder="My Deck"
                className="glass"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "var(--color-ink)",
                  background: "var(--color-glass-bg-strong)",
                  border: "1px solid var(--color-glass-border)",
                  borderRadius: 12,
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
            </motion.div>

            {/* Test type */}
            <motion.div variants={itemVariants} className="col" style={{ gap: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-ink-dim)" }}>
                Test Type
              </label>
              <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
                {TEST_TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setTestType(t.value)}
                    className="glass"
                    style={{
                      flex: 1,
                      minWidth: 56,
                      padding: "10px 6px",
                      fontSize: 13,
                      fontWeight: 600,
                      textAlign: "center",
                      cursor: "pointer",
                      border: testType === t.value
                        ? "1px solid var(--color-accent)"
                        : "1px solid var(--color-glass-border)",
                      background: testType === t.value
                        ? "rgba(255, 90, 78, 0.15)"
                        : "var(--color-glass-bg)",
                      color: testType === t.value ? "var(--color-accent)" : "var(--color-ink-dim)",
                      transition: "all 0.2s",
                      borderRadius: 12,
                      fontFamily: "inherit",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Practice mode */}
            <motion.div variants={itemVariants} className="col" style={{ gap: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-ink-dim)" }}>
                Practice Mode
              </label>
              <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
                {PRACTICE_MODES.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setPracticeMode(m.value)}
                    className="glass"
                    style={{
                      flex: 1,
                      minWidth: 80,
                      padding: "10px 6px",
                      fontSize: 13,
                      fontWeight: 600,
                      textAlign: "center",
                      cursor: "pointer",
                      border: practiceMode === m.value
                        ? "1px solid var(--color-accent)"
                        : "1px solid var(--color-glass-border)",
                      background: practiceMode === m.value
                        ? "rgba(255, 90, 78, 0.15)"
                        : "var(--color-glass-bg)",
                      color: practiceMode === m.value ? "var(--color-accent)" : "var(--color-ink-dim)",
                      transition: "all 0.2s",
                      borderRadius: 12,
                      fontFamily: "inherit",
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Import button */}
            <motion.div variants={itemVariants} style={{ marginTop: 4 }}>
              <button
                type="button"
                className="btn primary"
                disabled={importing || !deckName.trim()}
                onClick={handleImport}
                style={{
                  width: "100%",
                  padding: "14px 0",
                  fontSize: 14,
                  fontWeight: 600,
                  opacity: importing || !deckName.trim() ? 0.5 : 1,
                  cursor: importing || !deckName.trim() ? "not-allowed" : "pointer",
                }}
              >
                {importing ? (
                  <span className="row" style={{ gap: 8, alignItems: "center", justifyContent: "center" }}>
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "white",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "spin 0.6s linear infinite",
                      }}
                    />
                    Importing…
                  </span>
                ) : (
                  `Import ${cardCount} card${cardCount !== 1 ? "s" : ""}`
                )}
              </button>
            </motion.div>

            {/* Back link */}
            <motion.div variants={itemVariants} style={{ textAlign: "center" }}>
              <button
                type="button"
                onClick={() => setStep("preview")}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--color-ink-faint)",
                  fontSize: 12.5,
                  cursor: "pointer",
                  padding: "6px 12px",
                  fontFamily: "inherit",
                }}
              >
                ← Back to preview
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* ─── STEP: Success ─── */}
        {step === "success" && (
          <motion.div
            key="success"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="col"
            style={{ gap: 24, alignItems: "center", paddingTop: 40 }}
          >
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(140deg, rgba(255,90,78,0.85), rgba(255,150,120,0.55))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 40px rgba(255, 90, 78, 0.3)",
              }}
            >
              <motion.svg
                viewBox="0 0 24 24"
                width={36}
                height={36}
                fill="none"
                stroke="white"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial="hidden"
                animate="visible"
                variants={checkmarkVariants}
              >
                <motion.polyline
                  points="20 6 9 17 4 12"
                  variants={checkmarkVariants}
                />
              </motion.svg>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="col"
              style={{ gap: 4, textAlign: "center" }}
            >
              <div style={{ fontSize: 20, fontWeight: 700 }}>Deck created!</div>
              <div className="dim" style={{ fontSize: 13 }}>
                {deckName} — {cardCount} card{cardCount !== 1 ? "s" : ""} ready to study
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="col" style={{ gap: 10, width: "100%" }}>
              <button
                type="button"
                className="btn primary"
                onClick={handleReset}
                style={{ width: "100%", padding: "14px 0", fontSize: 14, fontWeight: 600 }}
              >
                Import another
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Error Panel ─── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass"
            style={{
              padding: "16px 18px",
              border: "1px solid rgba(255, 90, 78, 0.3)",
              background: "rgba(255, 90, 78, 0.08)",
            }}
          >
            <div className="row" style={{ gap: 10, alignItems: "flex-start" }}>
              <AlertIcon className="" />
              <div className="col stretch" style={{ gap: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-accent)" }}>Import Error</div>
                <div style={{ fontSize: 12.5, color: "var(--color-ink-dim)", lineHeight: 1.5 }}>{error}</div>
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    if (step === "upload") {
                      // Stay on upload — user can retry
                    } else {
                      setStep("upload");
                      setParsedData(null);
                      setFileName("");
                    }
                  }}
                  className="btn ghost"
                  style={{
                    alignSelf: "flex-start",
                    fontSize: 12,
                    padding: "6px 14px",
                    marginTop: 2,
                    color: "var(--color-accent)",
                    border: "1px solid rgba(255, 90, 78, 0.25)",
                  }}
                >
                  Retry
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spinner keyframes */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .dropzone-hot {
          background: rgba(255, 90, 78, 0.08) !important;
          border-color: var(--color-accent) !important;
        }
      `}</style>
    </div>
  );
}