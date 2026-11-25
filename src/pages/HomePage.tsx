import { ArrowRight, Globe2, Lock, Search, X, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AdSlot } from '../components/common/AdSlot';
import { ToolCard } from '../components/common/ToolCard';
import { CategoryIcon } from '../components/common/ToolIcon';
import { useLanguage } from '../context/LanguageContext';
import { CATEGORIES } from '../data/categories';
import { getToolsByCategory, TOOLS } from '../data/tools';
import { UI_STRINGS } from '../data/translations';
import { usePageMeta } from '../hooks/usePageMeta';
import { CategoryId } from '../types/tool';

export function HomePage() {
  const { language, t } = useLanguage();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryId>('all');

  usePageMeta({
    title:
      language === 'hi'
        ? 'Toolora – मुफ्त ऑनलाइन टूल्स (वर्ड काउंटर, जीएसटी, QR कोड, इमेज कंप्रेसर)'
        : 'Toolora – Free Online Tools for Text, Calculators, QR & Images',
    description:
      language === 'hi'
        ? 'Toolora पर मुफ्त, तेज़ और सुरक्षित ऑनलाइन टूल्स का उपयोग करें जो सीधे आपके ब्राउज़र में काम करते हैं।'
        : 'Toolora offers free, fast, privacy-first online tools that run directly in your browser. Count words, convert case, calculate GST & age, generate QR codes, and compress images.',
    jsonLd: {
      '@type': 'WebApplication',
      name: 'Toolora',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  });

  // Support hash scrolling when navigated from header links on inner pages
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];
    return TOOLS.filter((tool) => {
      const haystack = [
        tool.name.en,
        tool.name.hi,
        tool.shortDescription.en,
        tool.shortDescription.hi,
        ...tool.keywords,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const visiblePopularTools = useMemo(() => {
    if (selectedCategory === 'all') return TOOLS;
    return TOOLS.filter((tool) => tool.category === selectedCategory);
  }, [selectedCategory]);

  const activeCategories = useMemo(
    () => CATEGORIES.filter((cat) => getToolsByCategory(cat.id).length > 0),
    []
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium tracking-wide text-blue-600 dark:text-blue-400">
              {t({
                en: 'Toolora · Free Browser-Side Utilities · No Sign-Up Required',
                hi: 'Toolora · मुफ्त ब्राउज़र-साइड टूल्स · बिना साइन-अप',
              })}
            </p>
            <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              {t(UI_STRINGS.home.heroTitle)}
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {t(UI_STRINGS.home.heroSubtitle)}
            </p>

            {/* Live Search Bar */}
            <div className="mt-8 mx-auto max-w-2xl">
              <label htmlFor="toolora-hero-search" className="sr-only">
                {t(UI_STRINGS.home.searchLabel)}
              </label>
              <div className="relative flex items-center">
                <Search
                  className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  id="toolora-hero-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t(UI_STRINGS.home.searchPlaceholder)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-3.5 pl-12 pr-11 text-sm sm:text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-600 focus:bg-white dark:focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label={t(UI_STRINGS.home.clearSearch)}
                    className="absolute right-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            {/* Clean unboxed quick-access links below search */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
              <span>{t({ en: 'Quick access:', hi: 'त्वरित लिंक:' })}</span>
              {TOOLS.slice(0, 4).map((tool, index) => (
                <span key={tool.id} className="inline-flex items-center gap-3 sm:gap-4">
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 underline-offset-4 hover:underline"
                  >
                    {t(tool.name)}
                  </Link>
                  {index < 3 && (
                    <span className="hidden sm:inline" aria-hidden="true">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Instant Search Results Panel */}
          {normalizedQuery && (
            <div
              data-testid="search-results"
              className="mt-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  {t(UI_STRINGS.home.matchingTools)} ({searchResults.length})
                </h2>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {t(UI_STRINGS.home.clearSearch)}
                </button>
              </div>
              {searchResults.length === 0 ? (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t(UI_STRINGS.home.searchNoResults)}
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {searchResults.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Top AdSense Leaderboard Placement */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6">
        <AdSlot format="leaderboard" slotId="home-top-leaderboard" />
      </div>

      {/* Popular Tools Section with Category Filter Tabs */}
      <section id="popular-tools" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t(UI_STRINGS.home.popularTitle)}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t(UI_STRINGS.home.popularSubtitle)}
            </p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div
            role="group"
            aria-label={t({ en: 'Filter tools by category', hi: 'श्रेणी के अनुसार टूल्स फ़िल्टर करें' })}
            className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-200/70 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800"
          >
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t(UI_STRINGS.home.allFilter)} ({TOOLS.length})
            </button>
            {activeCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t(cat.name)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {visiblePopularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Tool Categories Directory (All 7 Categories) */}
      <section
        id="categories"
        className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 py-14 sm:py-16"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t(UI_STRINGS.home.categoriesTitle)}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t(UI_STRINGS.home.categoriesSubtitle)}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {CATEGORIES.map((category) => {
              const count = getToolsByCategory(category.id).length;
              const statusText =
                count === 1
                  ? t(UI_STRINGS.home.liveToolsSingular)
                  : count > 1
                  ? `${count} ${t(UI_STRINGS.home.liveToolsPlural)}`
                  : t(UI_STRINGS.home.expandingSoon);

              return (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="group flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900 p-5 transition-colors hover:border-blue-500/70 hover:bg-white dark:hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">
                        <CategoryIcon name={category.iconName} className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                        {statusText}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {t(category.name)}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {t(category.description)}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                    <span>{t({ en: 'Explore category', hi: 'श्रेणी देखें' })}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Toolora Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t(UI_STRINGS.home.whyTitle)}
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {UI_STRINGS.home.whyPoints.map((point, idx) => {
            const Icon = idx === 0 ? Lock : idx === 1 ? Zap : Globe2;
            return (
              <div
                key={point.title.en}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
                  {t(point.title)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t(point.desc)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom AdSense Placement */}
        <div className="mt-12">
          <AdSlot format="leaderboard" slotId="home-bottom-leaderboard" />
        </div>
      </section>
    </div>
  );
}
