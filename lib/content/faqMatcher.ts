import { FAQ_DATA, FAQ_FALLBACK_ANSWER, type FaqEntry } from "./faqdata";

// Minimum score (0-1) required to treat a FAQ entry as a genuine match
// rather than falling back to the generic "contact us" answer.
const MATCH_THRESHOLD = 0.28;

const STOPWORDS = new Set([
    "a", "an", "the", "is", "are", "was", "were", "do", "does", "did",
    "you", "your", "yours", "i", "we", "us", "our", "to", "of", "for",
    "in", "on", "at", "and", "or", "how", "what", "which", "who",
    "can", "could", "would", "will", "please", "with", "about", "me",
    "it", "this", "that", "have", "has", "be", "as", "so", "if",
]);

function tokenize(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

// Precompute token sets for each FAQ entry (question + keywords) once.
const indexed = FAQ_DATA.map((entry) => {
    const text = [entry.question, ...(entry.keywords ?? [])].join(" ");
    return { entry, tokens: new Set(tokenize(text)) };
});

// Jaccard-style overlap score between the user's message tokens and an
// entry's tokens, weighted slightly toward covering the entry's tokens
// (so short questions matching a long user message still score well).
function scoreEntry(userTokens: Set<string>, entryTokens: Set<string>): number {
    if (userTokens.size === 0 || entryTokens.size === 0) return 0;

    let overlap = 0;
    for (const t of userTokens) {
        if (entryTokens.has(t)) overlap += 1;
    }
    if (overlap === 0) return 0;

    const coverageOfEntry = overlap / entryTokens.size; // did we hit most of the entry's key terms?
    const coverageOfUser = overlap / userTokens.size; // did the entry explain most of what the user said?

    return coverageOfEntry * 0.6 + coverageOfUser * 0.4;
}

export interface FaqMatchResult {
    entry: FaqEntry | null;
    score: number;
    answer: string;
}

export function findFaqAnswer(userMessage: string): FaqMatchResult {
    const userTokens = new Set(tokenize(userMessage));

    let best: { entry: FaqEntry; score: number } | null = null;
    for (const { entry, tokens } of indexed) {
        const score = scoreEntry(userTokens, tokens);
        if (!best || score > best.score) {
            best = { entry, score };
        }
    }

    if (best && best.score >= MATCH_THRESHOLD) {
        return { entry: best.entry, score: best.score, answer: best.entry.answer };
    }

    return { entry: null, score: best?.score ?? 0, answer: FAQ_FALLBACK_ANSWER };
}