import { Check, Copy, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../data/translations';
import {
  calcPercentageChange,
  calcPercentOf,
  calcWhatPercent,
} from '../utils/toolsLogic';

type TabMode = 'percent-of' | 'what-percent' | 'change';

export function PercentageCalculatorTool() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<TabMode>('percent-of');
  const [valA, setValA] = useState('15');
  const [valB, setValB] = useState('2500');
  const [copied, setCopied] = useState(false);

  const numA = parseFloat(valA);
  const numB = parseFloat(valB);
  const hasValidNumbers = Number.isFinite(numA) && Number.isFinite(numB);

  const result = useMemo(() => {
    if (!hasValidNumbers) return null;
    if (mode === 'percent-of') return calcPercentOf(numA, numB);
    if (mode === 'what-percent') return calcWhatPercent(numA, numB);
    return calcPercentageChange(numA, numB);
  }, [mode, numA, numB, hasValidNumbers]);

  const handleTabChange = (next: TabMode) => {
    setMode(next);
    setCopied(false);
    if (next === 'percent-of') {
      setValA('15');
      setValB('2500');
    } else if (next === 'what-percent') {
      setValA('45');
      setValB('180');
    } else {
      setValA('1200');
      setValB('1500');
    }
  };

  const handleCopy = async () => {
    if (!result || result.error) return;
    try {
      await navigator.clipboard.writeText(result.formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard failure
    }
  };

  const tabs: { id: TabMode; label: { en: string; hi: string } }[] = [
    { id: 'percent-of', label: { en: 'What is X% of Y?', hi: 'Y का X% कितना है?' } },
    { id: 'what-percent', label: { en: 'X is what % of Y?', hi: 'X, Y का कितना % है?' } },
    { id: 'change', label: { en: '% Increase / Decrease', hi: '% वृद्धि या कमी' } },
  ];

  const labels =
    mode === 'percent-of'
      ? {
          first: { en: 'Percentage (%)', hi: 'प्रतिशत (%)' },
          second: { en: 'Base Number', hi: 'मूल संख्या' },
        }
      : mode === 'what-percent'
      ? {
          first: { en: 'Part Value (X)', hi: 'भाग मान (X)' },
          second: { en: 'Whole Value (Y)', hi: 'कुल मान (Y)' },
        }
      : {
          first: { en: 'Original Value', hi: 'प्रारंभिक मान' },
          second: { en: 'New Value', hi: 'नया मान' },
        };

  return (
    <div className="space-y-6">
      {/* Interactive Mode Tabs */}
      <div
        role="tablist"
        aria-label={t({ en: 'Percentage calculation mode', hi: 'प्रतिशत गणना मोड' })}
        className="flex flex-wrap gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 p-1.5 border border-slate-200 dark:border-slate-800"
      >
        {tabs.map((tab) => {
          const active = mode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 min-w-[140px] rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t(tab.label)}
            </button>
          );
        })}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="pct-input-a"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {t(labels.first)}
          </label>
          <input
            id="pct-input-a"
            type="number"
            step="any"
            value={valA}
            onChange={(e) => setValA(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 font-mono tabular-nums text-base text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          />
        </div>
        <div>
          <label
            htmlFor="pct-input-b"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {t(labels.second)}
          </label>
          <input
            id="pct-input-b"
            type="number"
            step="any"
            value={valB}
            onChange={(e) => setValB(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 font-mono tabular-nums text-base text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          />
        </div>
      </div>

      {/* Result Card */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t({ en: 'Calculated Result', hi: 'गणना परिणाम' })}
            </div>
            {!hasValidNumbers ? (
              <div className="mt-1 text-base text-slate-500 dark:text-slate-400">
                {t({ en: 'Enter valid numbers above to calculate.', hi: 'गणना के लिए ऊपर मान्य संख्याएं दर्ज करें।' })}
              </div>
            ) : result?.error === 'division-by-zero' ? (
              <div className="mt-1 text-base font-medium text-rose-600 dark:text-rose-400">
                {t({
                  en: 'Cannot divide by zero. Enter a non-zero base value.',
                  hi: 'शून्य से भाग नहीं दिया जा सकता। कृपया गैर-शून्य संख्या दर्ज करें।',
                })}
              </div>
            ) : (
              <>
                <div
                  data-testid="percentage-result"
                  className="mt-1 text-3xl font-bold font-mono tabular-nums text-blue-600 dark:text-blue-400"
                >
                  {result?.formatted}
                </div>
                {result?.direction && (
                  <div className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                    {result.direction === 'increase'
                      ? t({ en: 'Direction: Increase', hi: 'दिशा: वृद्धि' })
                      : result.direction === 'decrease'
                      ? t({ en: 'Direction: Decrease', hi: 'दिशा: कमी' })
                      : t({ en: 'Direction: No change', hi: 'दिशा: कोई परिवर्तन नहीं' })}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!result || Boolean(result.error)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? t(UI_STRINGS.controls.copied) : t(UI_STRINGS.controls.copy)}
            </button>
            <button
              type="button"
              onClick={() => {
                setValA('');
                setValB('');
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t(UI_STRINGS.controls.reset)}
            </button>
          </div>
        </div>

        {result && !result.error && (
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400">
            {t({ en: 'Formula:', hi: 'सूत्र:' })} {result.formula}
          </div>
        )}
      </div>
    </div>
  );
}
