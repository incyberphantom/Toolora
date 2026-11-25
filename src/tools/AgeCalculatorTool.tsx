import { Cake, Calendar, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { calculateAge } from '../utils/toolsLogic';

const WEEKDAYS = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  hi: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
};

function getTodayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function AgeCalculatorTool() {
  const { language, t } = useLanguage();
  const todayIso = useMemo(() => getTodayIso(), []);
  const [dob, setDob] = useState('1998-08-15');
  const [targetDate, setTargetDate] = useState(todayIso);

  const age = useMemo(() => calculateAge(dob, targetDate), [dob, targetDate]);

  return (
    <div className="space-y-6">
      {/* Date Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="age-dob"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {t({ en: 'Date of Birth', hi: 'जन्म तिथि' })}
          </label>
          <input
            id="age-dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 font-mono text-base text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          />
        </div>
        <div>
          <label
            htmlFor="age-target"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {t({ en: 'Calculate Age On', hi: 'आयु गणना की तिथि' })}
          </label>
          <input
            id="age-target"
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 font-mono text-base text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          />
        </div>
      </div>

      {/* Validation Error or Live Results */}
      {!age.valid ? (
        <div
          role="alert"
          className="rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/30 p-4 text-sm text-rose-700 dark:text-rose-300"
        >
          {age.error === 'dob-in-future'
            ? t({
                en: 'Date of birth cannot be later than the target date. Please choose an earlier date of birth.',
                hi: 'जन्म तिथि लक्ष्य तिथि के बाद की नहीं हो सकती। कृपया सही जन्म तिथि चुनें।',
              })
            : t({
                en: 'Please enter valid calendar dates in both fields.',
                hi: 'कृपया दोनों फ़ील्ड में मान्य तिथियाँ दर्ज करें।',
              })}
        </div>
      ) : (
        <>
          {/* Exact Age Primary Display */}
          <div className="rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/30 p-5 sm:p-6">
            <div className="text-xs font-medium text-blue-700 dark:text-blue-300">
              {t({ en: 'Exact Chronological Age', hi: 'सटीक आयु' })}
            </div>
            <div
              data-testid="age-primary-result"
              className="mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-2"
            >
              <div>
                <span className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  {age.years}
                </span>{' '}
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {t({ en: 'Years', hi: 'वर्ष' })}
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  {age.months}
                </span>{' '}
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {t({ en: 'Months', hi: 'महीने' })}
                </span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  {age.days}
                </span>{' '}
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {t({ en: 'Days', hi: 'दिन' })}
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              <span>
                {t({ en: 'Born on a', hi: 'जन्म का दिन:' })}{' '}
                <strong className="font-semibold text-slate-800 dark:text-slate-200">
                  {WEEKDAYS[language][age.bornDayOfWeek]}
                </strong>
              </span>
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: { en: 'Total Months', hi: 'कुल महीने' }, value: age.totalMonths.toLocaleString() },
              { label: { en: 'Total Weeks', hi: 'कुल सप्ताह' }, value: age.totalWeeks.toLocaleString() },
              { label: { en: 'Total Days', hi: 'कुल दिन' }, value: age.totalDays.toLocaleString() },
              { label: { en: 'Total Hours', hi: 'कुल घंटे' }, value: age.totalHours.toLocaleString() },
            ].map((item) => (
              <div
                key={item.label.en}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4"
              >
                <div className="text-xs text-slate-500 dark:text-slate-400">{t(item.label)}</div>
                <div className="mt-1 text-lg font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Next Birthday Countdown */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400">
                <Cake className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {age.isBirthdayToday
                    ? t({ en: 'Happy Birthday! Today is your birthday.', hi: 'जन्मदिन की शुभकामनाएँ! आज आपका जन्मदिन है।' })
                    : t({ en: 'Next Birthday Countdown', hi: 'अगले जन्मदिन की गिनती' })}
                </div>
                {!age.isBirthdayToday && (
                  <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-slate-100">
                      {age.nextBirthdayInMonths}
                    </span>{' '}
                    {t({ en: 'months and', hi: 'महीने और' })}{' '}
                    <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-slate-100">
                      {age.nextBirthdayInDays}
                    </span>{' '}
                    {t({ en: 'days remaining', hi: 'दिन शेष' })} (
                    <span className="font-mono tabular-nums">{age.nextBirthdayDaysTotal}</span>{' '}
                    {t({ en: 'days total', hi: 'कुल दिन' })} · {WEEKDAYS[language][age.nextBirthdayDayOfWeek]})
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setTargetDate(todayIso)}
              className="inline-flex items-center gap-1.5 self-start sm:self-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t({ en: 'Set to Today', hi: 'आज की तिथि' })}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
