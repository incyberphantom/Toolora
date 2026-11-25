import { useLanguage } from '../../context/LanguageContext';
import { UI_STRINGS } from '../../data/translations';

interface AdSlotProps {
  format: 'leaderboard' | 'rectangle' | 'inline';
  slotId: string;
  className?: string;
}

const FORMAT_META: Record<
  AdSlotProps['format'],
  { dimensions: string; minHeightClass: string }
> = {
  leaderboard: {
    dimensions: '728 × 90 · Responsive Display',
    minHeightClass: 'min-h-[96px]',
  },
  rectangle: {
    dimensions: '300 × 250 · Medium Rectangle',
    minHeightClass: 'min-h-[250px]',
  },
  inline: {
    dimensions: 'Responsive In-Content Unit',
    minHeightClass: 'min-h-[112px]',
  },
};

/**
 * Clearly marked placeholder for future Google AdSense ad units.
 * Does not render fake ads or fake click targets.
 */
export function AdSlot({ format, slotId, className = '' }: AdSlotProps) {
  const { t } = useLanguage();
  const meta = FORMAT_META[format];

  return (
    <aside
      aria-label={`${t(UI_STRINGS.adSlot.label)} ${slotId}`}
      data-ad-slot={slotId}
      className={`w-full rounded-xl border border-dashed border-slate-300 dark:border-slate-700/80 bg-slate-100/70 dark:bg-slate-900/50 px-5 py-4 flex flex-col items-center justify-center text-center select-none ${meta.minHeightClass} ${className}`}
    >
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {t(UI_STRINGS.adSlot.label)} · {t(UI_STRINGS.adSlot.placeholder)}
      </span>
      <span className="mt-1 text-xs font-mono tabular-nums text-slate-400 dark:text-slate-500">
        {meta.dimensions} · Slot #{slotId}
      </span>
    </aside>
  );
}
