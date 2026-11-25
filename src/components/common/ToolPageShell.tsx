import { ChevronRight, ShieldCheck } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getCategoryBySlug } from '../../data/categories';
import { TOOLS } from '../../data/tools';
import { UI_STRINGS } from '../../data/translations';
import { ToolDefinition } from '../../types/tool';
import { AdSlot } from './AdSlot';
import { ToolCard } from './ToolCard';
import { ToolIcon } from './ToolIcon';

interface ToolPageShellProps {
  tool: ToolDefinition;
  children: React.ReactNode;
}

export function ToolPageShell({ tool, children }: ToolPageShellProps) {
  const { t } = useLanguage();
  const category = getCategoryBySlug(tool.category);
  const relatedTools = TOOLS.filter((item) => item.id !== tool.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {t(UI_STRINGS.nav.home)}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        {category && (
          <>
            <Link
              to={`/category/${category.slug}`}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {t(category.name)}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </>
        )}
        <span className="font-medium text-slate-900 dark:text-slate-200">{t(tool.name)}</span>
      </nav>

      {/* Tool Page Header */}
      <div className="mb-8 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
            <ToolIcon name={tool.iconName} className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t(tool.name)}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              {category && <span>{t(category.name)}</span>}
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {t(UI_STRINGS.toolShell.browserProcessed)}
              </span>
            </div>
          </div>
        </div>
        <p className="max-w-3xl text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {t(tool.shortDescription)}
        </p>
      </div>

      {/* Main Tool Workspace + Desktop Sidebar AdSense Placement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <section
          aria-label={t(tool.name)}
          className="lg:col-span-9 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-7"
        >
          {children}
        </section>

        <div className="lg:col-span-3 space-y-6">
          <AdSlot format="rectangle" slotId={`tool-sidebar-${tool.slug}`} />
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t(UI_STRINGS.toolShell.howToUseTitle)}
            </h2>
            <ol className="mt-3 space-y-2.5 text-sm text-slate-600 dark:text-slate-400 list-decimal list-inside leading-relaxed">
              {tool.howToUse.map((step, idx) => (
                <li key={idx}>{t(step)}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Horizontal AdSense Leaderboard below tool workspace */}
      <div className="mt-10">
        <AdSlot format="leaderboard" slotId={`tool-bottom-${tool.slug}`} />
      </div>

      {/* FAQs */}
      {tool.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t(UI_STRINGS.toolShell.faqTitle)}
          </h2>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            {tool.faqs.map((faq, idx) => (
              <article
                key={idx}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"
              >
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  {t(faq.question)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {t(faq.answer)}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Related Tools */}
      <section className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {t(UI_STRINGS.toolShell.relatedToolsTitle)}
        </h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedTools.map((rel) => (
            <ToolCard key={rel.id} tool={rel} />
          ))}
        </div>
      </section>
    </div>
  );
}
