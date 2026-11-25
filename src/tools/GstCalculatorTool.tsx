import { Check, Copy, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../data/translations';
import { calculateGst, GstMode } from '../utils/toolsLogic';

const STANDARD_SLABS = [5, 12, 18, 28];

function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function GstCalculatorTool() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<GstMode>('exclusive');
  const [amountStr, setAmountStr] = useState('10000');
  const [rateStr, setRateStr] = useState('18');
  const [copied, setCopied] = useState(false);

  const amount = parseFloat(amountStr);
  const rate = parseFloat(rateStr);
  const isValid = Number.isFinite(amount) && amount >= 0 && Number.isFinite(rate) && rate >= 0;

  const result = useMemo(
    () => calculateGst(isValid ? amount : 0, isValid ? rate : 0, mode),
    [amount, rate, mode, isValid]
  );

  const handleCopySummary = async () => {
    const summary = [
      `Toolora GST Calculation (${mode === 'exclusive' ? 'Add GST' : 'Remove GST'} @ ${result.rate}%)`,
      `Base Amount: ${formatInr(result.baseAmount)}`,
      `Total GST (${result.rate}%): ${formatInr(result.gstAmount)}`,
      `CGST (${result.rate / 2}%): ${formatInr(result.cgstAmount)}`,
      `SGST (${result.rate / 2}%): ${formatInr(result.sgstAmount)}`,
      `Total Amount: ${formatInr(result.totalAmount)}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard restriction
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div
        role="tablist"
        aria-label={t({ en: 'GST calculation mode', hi: 'जीएसटी गणना मोड' })}
        className="grid grid-cols-2 gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 p-1.5 border border-slate-200 dark:border-slate-800"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'exclusive'}
          onClick={() => setMode('exclusive')}
          className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
            mode === 'exclusive'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t({ en: 'Add GST (Exclusive)', hi: 'जीएसटी जोड़ें (एक्सक्लूसिव)' })}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'inclusive'}
          onClick={() => setMode('inclusive')}
          className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
            mode === 'inclusive'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t({ en: 'Remove GST (Inclusive)', hi: 'जीएसटी हटाएं (इनक्लूसिव)' })}
        </button>
      </div>

      {/* Amount & Rate Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="gst-amount"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {mode === 'exclusive'
              ? t({ en: 'Net Price / Base Amount (₹)', hi: 'मूल राशि (₹)' })
              : t({ en: 'GST-Inclusive Total Amount (₹)', hi: 'जीएसटी सहित कुल राशि (₹)' })}
          </label>
          <input
            id="gst-amount"
            type="number"
            min={0}
            step="any"
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 font-mono tabular-nums text-base text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          />
        </div>

        <div>
          <label
            htmlFor="gst-rate"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {t({ en: 'GST Rate (%)', hi: 'जीएसटी दर (%)' })}
          </label>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            {STANDARD_SLABS.map((slab) => {
              const selected = Number(rateStr) === slab;
              return (
                <button
                  key={slab}
                  type="button"
                  onClick={() => setRateStr(String(slab))}
                  className={`rounded-lg border px-3.5 py-2.5 text-sm font-mono font-semibold transition-colors cursor-pointer ${
                    selected
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 hover:border-blue-500'
                  }`}
                >
                  {slab}%
                </button>
              );
            })}
            <input
              id="gst-rate"
              type="number"
              min={0}
              max={100}
              step="0.1"
              value={rateStr}
              onChange={(e) => setRateStr(e.target.value)}
              aria-label={t({ en: 'Custom GST Rate', hi: 'कस्टम जीएसटी दर' })}
              className="w-24 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2.5 font-mono tabular-nums text-sm text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            />
          </div>
        </div>
      </div>

      {/* Primary Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {t({ en: 'Base Amount', hi: 'मूल राशि' })}
          </div>
          <div
            data-testid="gst-base"
            className="mt-1 text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white"
          >
            {formatInr(result.baseAmount)}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {t({ en: 'Total GST', hi: 'कुल जीएसटी' })} ({result.rate}%)
          </div>
          <div
            data-testid="gst-tax"
            className="mt-1 text-xl font-bold font-mono tabular-nums text-blue-600 dark:text-blue-400"
          >
            {formatInr(result.gstAmount)}
          </div>
        </div>

        <div className="rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/30 p-4">
          <div className="text-xs font-medium text-blue-700 dark:text-blue-300">
            {t({ en: 'Final Total Amount', hi: 'अंतिम कुल राशि' })}
          </div>
          <div
            data-testid="gst-total"
            className="mt-1 text-xl font-bold font-mono tabular-nums text-blue-900 dark:text-white"
          >
            {formatInr(result.totalAmount)}
          </div>
        </div>
      </div>

      {/* Tax Component Breakdown Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-950/80 text-xs text-slate-500 dark:text-slate-400">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium">
                {t({ en: 'Tax Component', hi: 'टैक्स घटक' })}
              </th>
              <th className="px-4 py-2.5 text-left font-medium">
                {t({ en: 'Applicability', hi: 'लागू क्षेत्र' })}
              </th>
              <th className="px-4 py-2.5 text-right font-medium">
                {t({ en: 'Rate', hi: 'दर' })}
              </th>
              <th className="px-4 py-2.5 text-right font-medium">
                {t({ en: 'Amount', hi: 'राशि' })}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            <tr>
              <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">CGST</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                {t({ en: 'Intra-state (Central)', hi: 'राज्य के भीतर (केंद्र)' })}
              </td>
              <td className="px-4 py-3 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                {(result.rate / 2).toFixed(2)}%
              </td>
              <td className="px-4 py-3 text-right font-mono tabular-nums font-medium text-slate-900 dark:text-slate-100">
                {formatInr(result.cgstAmount)}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">SGST / UTGST</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                {t({ en: 'Intra-state (State)', hi: 'राज्य के भीतर (राज्य)' })}
              </td>
              <td className="px-4 py-3 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                {(result.rate / 2).toFixed(2)}%
              </td>
              <td className="px-4 py-3 text-right font-mono tabular-nums font-medium text-slate-900 dark:text-slate-100">
                {formatInr(result.sgstAmount)}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">IGST</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                {t({ en: 'Inter-state Supply', hi: 'अंतर-राज्यीय आपूर्ति' })}
              </td>
              <td className="px-4 py-3 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                {result.rate.toFixed(2)}%
              </td>
              <td className="px-4 py-3 text-right font-mono tabular-nums font-medium text-slate-900 dark:text-slate-100">
                {formatInr(result.igstAmount)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={handleCopySummary}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors cursor-pointer"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied
            ? t(UI_STRINGS.controls.copied)
            : t({ en: 'Copy GST Summary', hi: 'जीएसटी विवरण कॉपी करें' })}
        </button>
        <button
          type="button"
          onClick={() => {
            setAmountStr('10000');
            setRateStr('18');
            setMode('exclusive');
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {t(UI_STRINGS.controls.reset)}
        </button>
      </div>
    </div>
  );
}
