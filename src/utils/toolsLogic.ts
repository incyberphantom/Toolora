// Pure, browser-side calculation and transformation utilities for all Toolora tools.
// Decoupled from React UI so every algorithm is deterministically unit-testable.

// 1. WORD COUNTER
export interface KeywordEntry {
  word: string;
  count: number;
  density: number;
}

export interface WordCounterStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  averageWordLength: number;
  topKeywords: KeywordEntry[];
}

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
  'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
  'may', 'might', 'shall', 'can', 'it', 'its', 'this', 'that', 'these', 'those',
  'i', 'you', 'he', 'she', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my',
  'your', 'his', 'our', 'their', 'not', 'no', 'so', 'if', 'into', 'about', 'up',
  'out', 'over', 'after', 'all', 'also', 'just', 'than', 'then', 'when', 'what',
  'which', 'who', 'how', 'more', 'most', 'very',
]);

export function analyzeText(input: string): WordCounterStats {
  const characters = input.length;
  const charactersNoSpaces = input.replace(/\s/g, '').length;
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
      averageWordLength: 0,
      topKeywords: [],
    };
  }

  // Match words including Unicode letters (supports English & Hindi Devanagari words)
  const wordMatches = trimmed.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) ?? [];
  const words = wordMatches.length;

  // Sentences split on ., !, ?, or Hindi poorna viram (।)
  const sentenceParts = trimmed
    .split(/[.!?।]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const sentences = sentenceParts.length;

  // Paragraphs separated by one or more blank lines or newlines
  const paragraphs = trimmed
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean).length;

  const totalWordChars = wordMatches.reduce((sum, w) => sum + w.length, 0);
  const averageWordLength = words > 0 ? Number((totalWordChars / words).toFixed(1)) : 0;

  // Standard averages: 200 WPM reading, 130 WPM speaking
  const readingTimeMinutes = words > 0 ? Math.max(0.1, Number((words / 200).toFixed(1))) : 0;
  const speakingTimeMinutes = words > 0 ? Math.max(0.1, Number((words / 130).toFixed(1))) : 0;

  const freqMap = new Map<string, number>();
  for (const raw of wordMatches) {
    const normalized = raw.toLowerCase();
    if (normalized.length < 3 || STOP_WORDS.has(normalized) || /^\d+$/.test(normalized)) {
      continue;
    }
    freqMap.set(normalized, (freqMap.get(normalized) ?? 0) + 1);
  }

  const topKeywords: KeywordEntry[] = Array.from(freqMap.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([word, count]) => ({
      word,
      count,
      density: words > 0 ? Number(((count / words) * 100).toFixed(1)) : 0,
    }));

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingTimeMinutes,
    speakingTimeMinutes,
    averageWordLength,
    topKeywords,
  };
}

// 2. CASE CONVERTER
export type CaseMode =
  | 'upper'
  | 'lower'
  | 'title'
  | 'sentence'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'kebab'
  | 'alternating'
  | 'inverse';

function splitWordsForIdentifier(text: string): string[] {
  return text
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function convertCase(input: string, mode: CaseMode): string {
  if (!input) return '';

  switch (mode) {
    case 'upper':
      return input.toUpperCase();
    case 'lower':
      return input.toLowerCase();
    case 'title':
      return input
        .toLowerCase()
        .replace(/(^|[\s\-_/(\["'])(\p{L})/gu, (_, sep: string, char: string) => sep + char.toUpperCase());
    case 'sentence':
      return input
        .toLowerCase()
        .replace(/(^\s*|[.!?]\s+|\n+\s*)(\p{L})/gu, (_, sep: string, char: string) => sep + char.toUpperCase());
    case 'camel': {
      return input
        .split('\n')
        .map((line) => {
          const words = splitWordsForIdentifier(line);
          return words
            .map((w, i) =>
              i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
            )
            .join('');
        })
        .join('\n');
    }
    case 'pascal': {
      return input
        .split('\n')
        .map((line) => {
          const words = splitWordsForIdentifier(line);
          return words
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join('');
        })
        .join('\n');
    }
    case 'snake': {
      return input
        .split('\n')
        .map((line) => splitWordsForIdentifier(line).map((w) => w.toLowerCase()).join('_'))
        .join('\n');
    }
    case 'kebab': {
      return input
        .split('\n')
        .map((line) => splitWordsForIdentifier(line).map((w) => w.toLowerCase()).join('-'))
        .join('\n');
    }
    case 'alternating': {
      let toggle = false;
      return Array.from(input)
        .map((ch) => {
          if (/\p{L}/u.test(ch)) {
            toggle = !toggle;
            return toggle ? ch.toLowerCase() : ch.toUpperCase();
          }
          return ch;
        })
        .join('');
    }
    case 'inverse': {
      return Array.from(input)
        .map((ch) => {
          const lower = ch.toLowerCase();
          const upper = ch.toUpperCase();
          if (ch === lower && ch !== upper) return upper;
          if (ch === upper && ch !== lower) return lower;
          return ch;
        })
        .join('');
    }
  }
}

// 3. PASSWORD GENERATOR
export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

export type PasswordStrengthLevel = 'weak' | 'fair' | 'good' | 'strong' | 'very-strong';

export interface PasswordStrength {
  entropyBits: number;
  level: PasswordStrengthLevel;
  score: number; // 1 to 5
}

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?';
const AMBIGUOUS = new Set(['0', 'O', 'o', '1', 'l', 'I']);

function filterAmbiguous(chars: string, exclude: boolean): string {
  if (!exclude) return chars;
  return Array.from(chars)
    .filter((c) => !AMBIGUOUS.has(c))
    .join('');
}

function secureRandomInt(max: number): number {
  if (max <= 1) return 0;
  const randomBuffer = new Uint32Array(1);
  const limit = Math.floor(0xffffffff / max) * max;
  let value = 0;
  do {
    globalThis.crypto.getRandomValues(randomBuffer);
    value = randomBuffer[0];
  } while (value >= limit);
  return value % max;
}

export function generatePassword(options: PasswordOptions): string {
  const length = Math.max(4, Math.min(128, Math.floor(options.length)));
  const pools: string[] = [];

  if (options.uppercase) pools.push(filterAmbiguous(UPPER, options.excludeAmbiguous));
  if (options.lowercase) pools.push(filterAmbiguous(LOWER, options.excludeAmbiguous));
  if (options.numbers) pools.push(filterAmbiguous(NUMBERS, options.excludeAmbiguous));
  if (options.symbols) pools.push(SYMBOLS);

  if (pools.length === 0) {
    pools.push(filterAmbiguous(LOWER, options.excludeAmbiguous));
  }

  const combined = pools.join('');
  const result: string[] = [];

  // Guarantee at least one character from each selected character set (when length allows)
  for (let i = 0; i < pools.length && result.length < length; i++) {
    const pool = pools[i];
    result.push(pool[secureRandomInt(pool.length)]);
  }

  while (result.length < length) {
    result.push(combined[secureRandomInt(combined.length)]);
  }

  // Fisher-Yates shuffle using crypto RNG
  for (let i = result.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    const tmp = result[i];
    result[i] = result[j];
    result[j] = tmp;
  }

  return result.join('');
}

export function evaluatePasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { entropyBits: 0, level: 'weak', score: 1 };
  }
  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  const entropyBits = Math.round(password.length * Math.log2(Math.max(poolSize, 1)));

  if (entropyBits < 36) return { entropyBits, level: 'weak', score: 1 };
  if (entropyBits < 52) return { entropyBits, level: 'fair', score: 2 };
  if (entropyBits < 70) return { entropyBits, level: 'good', score: 3 };
  if (entropyBits < 95) return { entropyBits, level: 'strong', score: 4 };
  return { entropyBits, level: 'very-strong', score: 5 };
}

// 4. PERCENTAGE CALCULATOR
export interface PercentageResult {
  value: number;
  formatted: string;
  formula: string;
  direction?: 'increase' | 'decrease' | 'no-change';
  error?: string;
}

export function roundSmart(n: number, decimals = 4): number {
  const factor = Math.pow(10, decimals);
  return Math.round((n + Number.EPSILON) * factor) / factor;
}

export function calcPercentOf(percent: number, total: number): PercentageResult {
  const value = roundSmart((percent / 100) * total, 4);
  return {
    value,
    formatted: value.toLocaleString('en-US', { maximumFractionDigits: 4 }),
    formula: `(${percent} ÷ 100) × ${total} = ${value}`,
  };
}

export function calcWhatPercent(part: number, whole: number): PercentageResult {
  if (whole === 0) {
    return { value: 0, formatted: '—', formula: '', error: 'division-by-zero' };
  }
  const value = roundSmart((part / whole) * 100, 4);
  return {
    value,
    formatted: `${value.toLocaleString('en-US', { maximumFractionDigits: 4 })}%`,
    formula: `(${part} ÷ ${whole}) × 100 = ${value}%`,
  };
}

export function calcPercentageChange(fromVal: number, toVal: number): PercentageResult {
  if (fromVal === 0) {
    return { value: 0, formatted: '—', formula: '', error: 'division-by-zero' };
  }
  const diff = toVal - fromVal;
  const value = roundSmart((diff / Math.abs(fromVal)) * 100, 4);
  const direction = diff > 0 ? 'increase' : diff < 0 ? 'decrease' : 'no-change';
  const sign = value > 0 ? '+' : '';
  return {
    value,
    formatted: `${sign}${value.toLocaleString('en-US', { maximumFractionDigits: 4 })}%`,
    formula: `((${toVal} − ${fromVal}) ÷ |${fromVal}|) × 100 = ${sign}${value}%`,
    direction,
  };
}

// 5. GST CALCULATOR
export type GstMode = 'exclusive' | 'inclusive';

export interface GstResult {
  baseAmount: number;
  gstAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalAmount: number;
  rate: number;
}

export function calculateGst(amount: number, rate: number, mode: GstMode): GstResult {
  const safeAmount = Math.max(0, Number.isFinite(amount) ? amount : 0);
  const safeRate = Math.max(0, Number.isFinite(rate) ? rate : 0);

  let baseAmount: number;
  let gstAmount: number;
  let totalAmount: number;

  if (mode === 'exclusive') {
    baseAmount = safeAmount;
    gstAmount = (safeAmount * safeRate) / 100;
    totalAmount = baseAmount + gstAmount;
  } else {
    totalAmount = safeAmount;
    baseAmount = safeRate === 0 ? safeAmount : (safeAmount * 100) / (100 + safeRate);
    gstAmount = totalAmount - baseAmount;
  }

  const r2 = (v: number) => Math.round((v + Number.EPSILON) * 100) / 100;
  const roundedBase = r2(baseAmount);
  const roundedGst = r2(gstAmount);
  const roundedTotal = r2(totalAmount);
  const halfGst = r2(gstAmount / 2);

  return {
    baseAmount: roundedBase,
    gstAmount: roundedGst,
    cgstAmount: halfGst,
    sgstAmount: halfGst,
    igstAmount: roundedGst,
    totalAmount: roundedTotal,
    rate: safeRate,
  };
}

// 6. AGE CALCULATOR
export interface AgeResult {
  valid: boolean;
  error?: 'dob-in-future' | 'invalid-date';
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  bornDayOfWeek: number; // 0 = Sunday ... 6 = Saturday
  nextBirthdayInMonths: number;
  nextBirthdayInDays: number;
  nextBirthdayDaysTotal: number;
  nextBirthdayDayOfWeek: number;
  isBirthdayToday: boolean;
}

function daysInMonth(year: number, monthIndex0: number): number {
  return new Date(Date.UTC(year, monthIndex0 + 1, 0)).getUTCDate();
}

export function parseIsoDateUTC(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]) - 1;
  const d = Number(match[3]);
  const dt = new Date(Date.UTC(y, m, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m || dt.getUTCDate() !== d) {
    return null;
  }
  return dt;
}

export function calculateAge(dobIso: string, targetIso: string): AgeResult {
  const empty: AgeResult = {
    valid: false,
    years: 0,
    months: 0,
    days: 0,
    totalMonths: 0,
    totalWeeks: 0,
    totalDays: 0,
    totalHours: 0,
    bornDayOfWeek: 0,
    nextBirthdayInMonths: 0,
    nextBirthdayInDays: 0,
    nextBirthdayDaysTotal: 0,
    nextBirthdayDayOfWeek: 0,
    isBirthdayToday: false,
  };

  const dob = parseIsoDateUTC(dobIso);
  const target = parseIsoDateUTC(targetIso);
  if (!dob || !target) return { ...empty, error: 'invalid-date' };
  if (dob.getTime() > target.getTime()) return { ...empty, error: 'dob-in-future' };

  const birthY = dob.getUTCFullYear();
  const birthM = dob.getUTCMonth();
  const birthD = dob.getUTCDate();

  const targetY = target.getUTCFullYear();
  const targetM = target.getUTCMonth();
  const targetD = target.getUTCDate();

  let years = targetY - birthY;
  let months = targetM - birthM;
  let days = targetD - birthD;

  if (days < 0) {
    months -= 1;
    const prevMonthYear = targetM === 0 ? targetY - 1 : targetY;
    const prevMonthIndex = targetM === 0 ? 11 : targetM - 1;
    days += daysInMonth(prevMonthYear, prevMonthIndex);
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const msPerDay = 86_400_000;
  const totalDays = Math.round((target.getTime() - dob.getTime()) / msPerDay);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;

  // Next birthday calculation relative to target date
  const isBirthdayToday = birthM === targetM && birthD === targetD;
  let nextBdayYear = targetY;
  const clampDay = (y: number) => Math.min(birthD, daysInMonth(y, birthM));
  let nextBday = new Date(Date.UTC(nextBdayYear, birthM, clampDay(nextBdayYear)));
  if (nextBday.getTime() <= target.getTime()) {
    nextBdayYear += 1;
    nextBday = new Date(Date.UTC(nextBdayYear, birthM, clampDay(nextBdayYear)));
  }

  const nextBirthdayDaysTotal = isBirthdayToday
    ? 0
    : Math.round((nextBday.getTime() - target.getTime()) / msPerDay);

  let nbMonths = nextBday.getUTCMonth() - targetM + (nextBday.getUTCFullYear() - targetY) * 12;
  let nbDays = nextBday.getUTCDate() - targetD;
  if (nbDays < 0) {
    nbMonths -= 1;
    const prevM = nextBday.getUTCMonth() === 0 ? 11 : nextBday.getUTCMonth() - 1;
    const prevY = nextBday.getUTCMonth() === 0 ? nextBday.getUTCFullYear() - 1 : nextBday.getUTCFullYear();
    nbDays += daysInMonth(prevY, prevM);
  }

  return {
    valid: true,
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    totalHours,
    bornDayOfWeek: dob.getUTCDay(),
    nextBirthdayInMonths: isBirthdayToday ? 0 : nbMonths,
    nextBirthdayInDays: isBirthdayToday ? 0 : nbDays,
    nextBirthdayDaysTotal,
    nextBirthdayDayOfWeek: nextBday.getUTCDay(),
    isBirthdayToday,
  };
}

// 7. QR CODE PAYLOAD FORMATTER
export type QrMode = 'text' | 'wifi' | 'email' | 'phone';

export interface WifiPayload {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

function escapeWifiField(val: string): string {
  return val.replace(/([\\;,:"])/g, '\\$1');
}

export function buildWifiQrString(wifi: WifiPayload): string {
  if (!wifi.ssid.trim()) return '';
  const enc = wifi.encryption;
  const passPart = enc === 'nopass' ? '' : escapeWifiField(wifi.password);
  return `WIFI:T:${enc};S:${escapeWifiField(wifi.ssid.trim())};P:${passPart};H:${wifi.hidden ? 'true' : 'false'};;`;
}

export function buildEmailQrString(email: EmailPayload): string {
  if (!email.to.trim()) return '';
  const params = new URLSearchParams();
  if (email.subject.trim()) params.set('subject', email.subject.trim());
  if (email.body.trim()) params.set('body', email.body.trim());
  const query = params.toString();
  return `mailto:${email.to.trim()}${query ? `?${query}` : ''}`;
}

export function buildPhoneQrString(phone: string): string {
  const cleaned = phone.trim().replace(/[^+\d]/g, '');
  if (!cleaned) return '';
  return `tel:${cleaned}`;
}

// 8. BYTE FORMATTING (for Image Compressor)
export function formatBytes(bytes: number): string {
  if (bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const val = bytes / Math.pow(1024, i);
  return `${val.toFixed(i === 0 ? 0 : 2)} ${units[i]}`;
}

export function calculateSavingsPercent(originalBytes: number, compressedBytes: number): number {
  if (originalBytes <= 0) return 0;
  return Number((((originalBytes - compressedBytes) / originalBytes) * 100).toFixed(1));
}
