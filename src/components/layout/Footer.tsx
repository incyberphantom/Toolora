import { Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { CATEGORIES } from '../../data/categories';
import { TOOLS } from '../../data/tools';
import { UI_STRINGS } from '../../data/translations';

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Wrench className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-display">Toolora</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t(UI_STRINGS.footer.tagline)}
            </p>
          </div>

          {/* Popular Tools Column */}
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t(UI_STRINGS.footer.popularHeading)}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {TOOLS.map((tool) => (
                <li key={tool.id}>
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {t(tool.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t(UI_STRINGS.footer.categoriesHeading)}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {t(category.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {t(UI_STRINGS.footer.companyHeading)}
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t(UI_STRINGS.nav.about)}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t(UI_STRINGS.nav.contact)}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t(UI_STRINGS.nav.privacy)}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t(UI_STRINGS.nav.terms)}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © {year} {t(UI_STRINGS.footer.copyright)}
          </p>
          <p className="font-mono">toolora.app</p>
        </div>
      </div>
    </footer>
  );
}
