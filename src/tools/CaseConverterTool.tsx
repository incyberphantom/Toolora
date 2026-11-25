import { Check, Copy, Download, FileText, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../data/translations';
import { analyzeText, CaseMode, convertCase } from '../utils/toolsLogic';

const CASE_ACTIONS: { mode: CaseMode; label: { en: string; hi: string }; example: string }[] = [
  { mode: 'upper', label: { en: 'UPPERCASE', hi: 'बड़े अक्षर (UPPERCASE)' }, example: 'HELLO WORLD' },
  { mode: 'lower', label: { en: 'lowercase', hi: 'छोटे अक्षर (lowercase)' }, example: 'hello world' },
  { mode: 'title', label: { en: 'Title Case', hi: 'टाइटल केस (Title Case)' }, example: 'Hello World' },
  { mode: 'sentence', label: { en: 'Sentence case', hi: 'वाक्य केस (Sentence case)' }, example: 'Hello world.' },
  { mode: 'camel', label: { en: 'camelCase', hi: 'camelCase' }, example: 'helloWorld' },
  { mode: 'pascal', label: { en: 'PascalCase', hi: 'PascalCase' }, example: 'HelloWorld' },
  { mode: 'snake', label: { en: 'snake_case', hi: 'snake_case' }, example: 'hello_world' },
  { mode: 'kebab', label: { en: 'kebab-case', hi: 'kebab-case' }, example: 'hello-world' },
  { mode: 'alternating', label: { en: 'aLtErNaTiNg', hi: 'वैकल्पिक (aLtErNaTiNg)' }, example: 'hElLo WoRlD' },
  { mode: 'inverse', label: { en: 'InVeRsE CaSe', hi: 'उल्टा केस (InVeRsE)' }, example: 'hELLO wORLD' },
];

export function CaseConverterTool() {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const [activeMode, setActiveMode] = useState<CaseMode | null>(null);
  const [copied, setCopied] = useState(false);

  const stats = analyzeText(text);

  const applyCase = (mode: CaseMode) => {
    setActiveMode(mode);
    setText((prev) => convertCase(prev, mode));
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore if clipboard blocked
    }
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toolora-converted-${activeMode ?? 'text'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label
          htmlFor="case-converter-input"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {t({ en: 'Text to convert', hi: 'बदलने के लिए टेक्स्ट' })}
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setText('welcome to toolora online tools. convert any text case in one click!');
              setActiveMode(null);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            {t(UI_STRINGS.controls.sampleText)}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!text}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
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
            onClick={handleDownload}
            disabled={!text}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            .txt
          </button>
          <button
            type="button"
            onClick={() => {
              setText('');
              setActiveMode(null);
            }}
            disabled={!text}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            {t(UI_STRINGS.controls.clear)}
          </button>
        </div>
      </div>

      <textarea
        id="case-converter-input"
        rows={7}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t({
          en: 'Paste your headline, paragraph, or variable names here, then select a case below...',
          hi: 'अपना शीर्षक, पैराग्राफ या टेक्स्ट यहाँ पेस्ट करें और नीचे केस विकल्प चुनें...',
        })}
        className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3.5 text-base leading-relaxed text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
      />

      {/* Action Buttons Grid */}
      <div>
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
          {t({ en: 'Choose transformation', hi: 'परिवर्तन चुनें' })}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {CASE_ACTIONS.map((item) => {
            const isActive = activeMode === item.mode;
            return (
              <button
                key={item.mode}
                type="button"
                onClick={() => applyCase(item.mode)}
                disabled={!text}
                className={`rounded-lg border px-3 py-2.5 text-left transition-colors cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed ${
                  isActive
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-800 dark:text-slate-200 hover:border-blue-500 dark:hover:border-blue-500'
                }`}
              >
                <div className="text-xs font-semibold truncate">{t(item.label)}</div>
                <div
                  className={`mt-0.5 text-[11px] font-mono truncate ${
                    isActive ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item.example}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Metadata Line */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span>
          {stats.words} {t({ en: 'words', hi: 'शब्द' })}
        </span>
        <span aria-hidden="true">·</span>
        <span>
          {stats.characters} {t({ en: 'characters', hi: 'अक्षर' })}
        </span>
        <span aria-hidden="true">·</span>
        <span>
          {stats.sentences} {t({ en: 'sentences', hi: 'वाक्य' })}
        </span>
      </div>
    </div>
  );
}
