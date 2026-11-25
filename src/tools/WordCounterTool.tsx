import { Check, Copy, FileText, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../data/translations';
import { analyzeText } from '../utils/toolsLogic';

const SAMPLE_TEXT = {
  en: `Toolora is a modern collection of fast, free online tools that run directly inside your web browser. Whether you are counting words for an essay, formatting headings, calculating Indian GST invoices, or compressing images for your website, every operation stays private on your own device.\n\nNo accounts, no file uploads, and no paywalls—just crisp utilities designed for daily productivity.`,
  hi: `Toolora तेज़ और मुफ्त ऑनलाइन टूल्स का एक आधुनिक संग्रह है जो सीधे आपके ब्राउज़र में काम करता है। चाहे आप किसी लेख के शब्द गिन रहे हों, जीएसटी की गणना कर रहे हों, या इमेज का आकार कम कर रहे हों, आपकी सभी जानकारी आपके डिवाइस पर सुरक्षित रहती है।\n\nकोई अकाउंट नहीं, कोई फ़ाइल अपलोड नहीं—केवल दैनिक कार्य के लिए सरल और भरोसेमंद टूल्स।`,
};

export function WordCounterTool() {
  const { language, t } = useLanguage();
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => analyzeText(text), [text]);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard fallback ignored if blocked
    }
  };

  const metricItems = [
    { label: { en: 'Words', hi: 'शब्द' }, value: stats.words.toLocaleString() },
    { label: { en: 'Characters', hi: 'अक्षर (स्पेस सहित)' }, value: stats.characters.toLocaleString() },
    { label: { en: 'No Spaces', hi: 'बिना स्पेस अक्षर' }, value: stats.charactersNoSpaces.toLocaleString() },
    { label: { en: 'Sentences', hi: 'वाक्य' }, value: stats.sentences.toLocaleString() },
    { label: { en: 'Paragraphs', hi: 'पैराग्राफ' }, value: stats.paragraphs.toLocaleString() },
    {
      label: { en: 'Reading Time', hi: 'पढ़ने का समय' },
      value:
        stats.readingTimeMinutes === 0
          ? '0 min'
          : `${stats.readingTimeMinutes} ${language === 'hi' ? 'मिनट' : 'min'}`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Live Metric Strip */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        data-testid="word-counter-metrics"
      >
        {metricItems.map((item) => (
          <div
            key={item.label.en}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 px-3.5 py-3"
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {t(item.label)}
            </div>
            <div className="mt-1 text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label
          htmlFor="word-counter-input"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {t({ en: 'Enter or paste your text', hi: 'अपना टेक्स्ट लिखें या पेस्ट करें' })}
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setText(SAMPLE_TEXT[language])}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            {t(UI_STRINGS.controls.sampleText)}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!text}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {copied ? t(UI_STRINGS.controls.copied) : t(UI_STRINGS.controls.copy)}
          </button>
          <button
            type="button"
            onClick={() => setText('')}
            disabled={!text}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 disabled:opacity-40 transition-colors whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            {t(UI_STRINGS.controls.clear)}
          </button>
        </div>
      </div>

      {/* Main Textarea */}
      <textarea
        id="word-counter-input"
        rows={9}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t({
          en: 'Start typing or paste an article, essay, or paragraph here...',
          hi: 'यहाँ कोई लेख, निबंध या पैराग्राफ लिखें या पेस्ट करें...',
        })}
        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3.5 text-base leading-relaxed text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
      />

      {/* Secondary Stats + Keyword Density */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {t({ en: 'Reading & Speaking Estimates', hi: 'पढ़ने और बोलने का अनुमान' })}
          </h3>
          <dl className="mt-3 space-y-2.5 text-sm">
            <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/70">
              <dt className="text-slate-600 dark:text-slate-400">
                {t({ en: 'Speaking Time (130 wpm)', hi: 'बोलने का समय (130 शब्द/मिनट)' })}
              </dt>
              <dd className="font-mono tabular-nums font-medium text-slate-900 dark:text-slate-100">
                {stats.speakingTimeMinutes} {language === 'hi' ? 'मिनट' : 'min'}
              </dd>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/70">
              <dt className="text-slate-600 dark:text-slate-400">
                {t({ en: 'Average Word Length', hi: 'औसत शब्द लंबाई' })}
              </dt>
              <dd className="font-mono tabular-nums font-medium text-slate-900 dark:text-slate-100">
                {stats.averageWordLength} {language === 'hi' ? 'अक्षर' : 'chars'}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {t({ en: 'Top Keywords Density', hi: 'प्रमुख कीवर्ड डेंसिटी' })}
          </h3>
          {stats.topKeywords.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              {t({
                en: 'Type at least a few words to analyze keyword frequency.',
                hi: 'कीवर्ड आवृत्ति देखने के लिए कुछ शब्द दर्ज करें।',
              })}
            </p>
          ) : (
            <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-950/70 text-xs text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">
                      {t({ en: 'Keyword', hi: 'कीवर्ड' })}
                    </th>
                    <th className="px-3 py-2 text-right font-medium">
                      {t({ en: 'Count', hi: 'संख्या' })}
                    </th>
                    <th className="px-3 py-2 text-right font-medium">
                      {t({ en: 'Density', hi: 'डेंसिटी' })}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {stats.topKeywords.map((kw) => (
                    <tr key={kw.word}>
                      <td className="px-3 py-1.5 font-medium text-slate-800 dark:text-slate-200">
                        {kw.word}
                      </td>
                      <td className="px-3 py-1.5 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                        {kw.count}
                      </td>
                      <td className="px-3 py-1.5 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                        {kw.density}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
