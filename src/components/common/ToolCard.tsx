import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getCategoryBySlug } from '../../data/categories';
import { UI_STRINGS } from '../../data/translations';
import { ToolDefinition } from '../../types/tool';
import { ToolIcon } from './ToolIcon';

interface ToolCardProps {
  tool: ToolDefinition;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { t } = useLanguage();
  const category = getCategoryBySlug(tool.category);

  return (
    <Link
      to={`/tools/${tool.slug}`}
      className="group flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 transition-colors duration-150 hover:border-blue-500/70 dark:hover:border-blue-500/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 transition-colors duration-150 group-hover:bg-blue-600 group-hover:text-white">
            <ToolIcon name={tool.iconName} className="w-5 h-5" />
          </div>
          {category && (
            <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
              {t(category.name)}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {t(tool.name)}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {t(tool.shortDescription)}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-medium text-blue-600 dark:text-blue-400">
        <span>{t(UI_STRINGS.controls.openTool)}</span>
        <ArrowRight
          className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
