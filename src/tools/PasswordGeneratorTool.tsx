import { Check, Copy, RefreshCw, Shield } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../data/translations';
import {
  evaluatePasswordStrength,
  generatePassword,
  PasswordOptions,
  PasswordStrengthLevel,
} from '../utils/toolsLogic';

const STRENGTH_META: Record<
  PasswordStrengthLevel,
  { label: { en: string; hi: string }; barColor: string; textColor: string }
> = {
  weak: {
    label: { en: 'Weak', hi: 'कमज़ोर' },
    barColor: 'bg-rose-600',
    textColor: 'text-rose-600 dark:text-rose-400',
  },
  fair: {
    label: { en: 'Fair', hi: 'सामान्य' },
    barColor: 'bg-amber-500',
    textColor: 'text-amber-600 dark:text-amber-400',
  },
  good: {
    label: { en: 'Good', hi: 'अच्छा' },
    barColor: 'bg-blue-600',
    textColor: 'text-blue-600 dark:text-blue-400',
  },
  strong: {
    label: { en: 'Strong', hi: 'मजबूत' },
    barColor: 'bg-emerald-600',
    textColor: 'text-emerald-600 dark:text-emerald-400',
  },
  'very-strong': {
    label: { en: 'Very Strong', hi: 'अत्यंत मजबूत' },
    barColor: 'bg-emerald-600',
    textColor: 'text-emerald-700 dark:text-emerald-400',
  },
};

export function PasswordGeneratorTool() {
  const { t } = useLanguage();
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  });
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const regenerate = useCallback(() => {
    const next: string[] = [];
    for (let i = 0; i < count; i++) {
      next.push(generatePassword(options));
    }
    setPasswords(next);
    setCopiedIndex(null);
  }, [options, count]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  const primaryPassword = passwords[0] ?? '';
  const strength = useMemo(() => evaluatePasswordStrength(primaryPassword), [primaryPassword]);
  const strengthInfo = STRENGTH_META[strength.level];

  const toggleOption = (key: keyof Omit<PasswordOptions, 'length'>) => {
    setOptions((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // Ensure at least one character class stays checked
      if (!next.uppercase && !next.lowercase && !next.numbers && !next.symbols) {
        return prev;
      }
      return next;
    });
  };

  const copyPassword = async (pwd: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(pwd);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 1800);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <div className="space-y-6">
      {/* Generated Password Output */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div
            data-testid="generated-password"
            className="font-mono text-lg sm:text-xl font-semibold tracking-wide text-slate-900 dark:text-white break-all select-all"
          >
            {primaryPassword}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => copyPassword(primaryPassword, 0)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              {copiedIndex === 0 ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
              )}
              {copiedIndex === 0 ? t(UI_STRINGS.controls.copied) : t(UI_STRINGS.controls.copy)}
            </button>
            <button
              type="button"
              onClick={regenerate}
              aria-label={t({ en: 'Generate new password', hi: 'नया पासवर्ड बनाएं' })}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              {t({ en: 'Regenerate', hi: 'नया बनाएं' })}
            </button>
          </div>
        </div>

        {/* Strength Bar with Explicit Label (never color-only) */}
        <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className={`inline-flex items-center gap-1.5 font-semibold ${strengthInfo.textColor}`}>
              <Shield className="h-3.5 w-3.5" aria-hidden="true" />
              {t({ en: 'Strength:', hi: 'मजबूती:' })} {t(strengthInfo.label)}
            </span>
            <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400">
              {strength.entropyBits} bits entropy
            </span>
          </div>
          <div className="mt-2 grid grid-cols-5 gap-1.5" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-1.5 rounded-full transition-colors ${
                  step <= strength.score
                    ? strengthInfo.barColor
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="pwd-length"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {t({ en: 'Password Length', hi: 'पासवर्ड की लंबाई' })}
              </label>
              <span className="font-mono tabular-nums text-sm font-bold text-blue-600 dark:text-blue-400">
                {options.length}
              </span>
            </div>
            <input
              id="pwd-length"
              type="range"
              min={6}
              max={64}
              value={options.length}
              onChange={(e) => setOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
              className="mt-2 w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>6</span>
              <span>16</span>
              <span>32</span>
              <span>64</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="pwd-count"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {t({ en: 'Quantity to Generate', hi: 'कितने पासवर्ड बनाएं' })}
              </label>
              <span className="font-mono tabular-nums text-sm font-semibold text-slate-900 dark:text-slate-100">
                {count}
              </span>
            </div>
            <input
              id="pwd-count"
              type="range"
              min={1}
              max={8}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="mt-2 w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        <fieldset className="space-y-2.5">
          <legend className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            {t({ en: 'Character Sets', hi: 'कैरेक्टर विकल्प' })}
          </legend>
          {(
            [
              { key: 'uppercase', label: { en: 'Uppercase Letters (A–Z)', hi: 'बड़े अक्षर (A–Z)' } },
              { key: 'lowercase', label: { en: 'Lowercase Letters (a–z)', hi: 'छोटे अक्षर (a–z)' } },
              { key: 'numbers', label: { en: 'Numbers (0–9)', hi: 'संख्याएं (0–9)' } },
              { key: 'symbols', label: { en: 'Symbols (!@#$%^&*)', hi: 'प्रतीक (!@#$%^&*)' } },
              {
                key: 'excludeAmbiguous',
                label: { en: 'Exclude Ambiguous (0, O, 1, l, I)', hi: 'भ्रमित करने वाले अक्षर हटाएं (0, O, 1, l, I)' },
              },
            ] as const
          ).map((item) => (
            <label
              key={item.key}
              className="flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={options[item.key]}
                onChange={() => toggleOption(item.key)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
              />
              <span>{t(item.label)}</span>
            </label>
          ))}
        </fieldset>
      </div>

      {/* Bulk List if count > 1 */}
      {passwords.length > 1 && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            {t({ en: 'Generated Batch', hi: 'सभी बनाए गए पासवर्ड' })}
          </h3>
          <ul className="divide-y divide-slate-200 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {passwords.map((pwd, idx) => (
              <li
                key={`${pwd}-${idx}`}
                className="flex items-center justify-between gap-4 bg-white dark:bg-slate-950 px-4 py-2.5"
              >
                <span className="font-mono text-sm text-slate-800 dark:text-slate-200 break-all">
                  {pwd}
                </span>
                <button
                  type="button"
                  onClick={() => copyPassword(pwd, idx)}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {copiedIndex === idx ? t(UI_STRINGS.controls.copied) : t(UI_STRINGS.controls.copy)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
