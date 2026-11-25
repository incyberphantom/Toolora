import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { UI_STRINGS } from '../data/translations';
import { usePageMeta } from '../hooks/usePageMeta';

export function NotFoundPage() {
  const { t } = useLanguage();

  usePageMeta({
    title: 'Page Not Found | Toolora',
    description: 'The requested page was not found on Toolora.',
  });

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="font-mono text-sm font-semibold text-blue-600 dark:text-blue-400">404</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
        {t({ en: 'Page not found', hi: 'पृष्ठ नहीं मिला' })}
      </h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
        {t({
          en: 'The tool or page you requested does not exist. Explore our working browser tools on the Toolora homepage.',
          hi: 'आपने जो पृष्ठ खोजा है वह उपलब्ध नहीं है। कृपया Toolora होमपेज पर सभी टूल्स देखें।',
        })}
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t(UI_STRINGS.controls.backToHome)}
      </Link>
    </div>
  );
}
