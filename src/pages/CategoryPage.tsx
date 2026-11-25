import { ArrowLeft, ChevronRight, Mail } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { AdSlot } from '../components/common/AdSlot';
import { ToolCard } from '../components/common/ToolCard';
import { CategoryIcon } from '../components/common/ToolIcon';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES, getCategoryBySlug } from '../data/categories';
import { getToolsByCategory, TOOLS } from '../data/tools';
import { UI_STRINGS } from '../data/translations';
import { usePageMeta } from '../hooks/usePageMeta';
import { NotFoundPage } from './NotFoundPage';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const category = slug ? getCategoryBySlug(slug) : undefined;

  usePageMeta({
    title: category
      ? `${t(category.name)} – ${language === 'hi' ? 'मुफ्त ऑनलाइन टूल्स' : 'Free Online Tools'} | Toolora`
      : 'Category Not Found | Toolora',
    description: category
      ? t(category.description)
      : 'Browse free browser-side online tools by category on Toolora.',
  });

  if (!category) {
    return <NotFoundPage />;
  }

  const tools = getToolsByCategory(category.id);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
          {t(UI_STRINGS.nav.home)}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="font-medium text-slate-900 dark:text-slate-200">{t(category.name)}</span>
      </nav>

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
          <CategoryIcon name={category.iconName} className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t(category.name)}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t(category.description)}
          </p>
        </div>
      </div>

      {/* Category Tools or Transparent Planned Roadmap */}
      {tools.length > 0 ? (
        <section className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      ) : (
        <section className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {t(UI_STRINGS.categoryPage.plannedHeading)}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {t(UI_STRINGS.categoryPage.plannedBody)}
          </p>

          {category.plannedTools && category.plannedTools.length > 0 && (
            <ul className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {category.plannedTools.map((planned) => (
                <li
                  key={planned.en}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm text-slate-700 dark:text-slate-300"
                >
                  {t(planned)}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t(UI_STRINGS.categoryPage.suggestToolCta)}
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t(UI_STRINGS.controls.browseAll)} ({TOOLS.length})
            </Link>
          </div>
        </section>
      )}

      {/* AdSense Placement */}
      <div className="mt-10">
        <AdSlot format="leaderboard" slotId={`category-${category.slug}`} />
      </div>

      {/* Browse Other Categories */}
      <section className="mt-12 pt-10 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {t({ en: 'All Categories on Toolora', hi: 'Toolora पर सभी श्रेणियाँ' })}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
                cat.id === category.id
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-500'
              }`}
            >
              {t(cat.name)}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
