import { useParams } from 'react-router-dom';
import { ToolPageShell } from '../components/common/ToolPageShell';
import { useLanguage } from '../context/LanguageContext';
import { getToolBySlug } from '../data/tools';
import { usePageMeta } from '../hooks/usePageMeta';
import { AgeCalculatorTool } from '../tools/AgeCalculatorTool';
import { CaseConverterTool } from '../tools/CaseConverterTool';
import { GstCalculatorTool } from '../tools/GstCalculatorTool';
import { ImageCompressorTool } from '../tools/ImageCompressorTool';
import { PasswordGeneratorTool } from '../tools/PasswordGeneratorTool';
import { PercentageCalculatorTool } from '../tools/PercentageCalculatorTool';
import { QrCodeGeneratorTool } from '../tools/QrCodeGeneratorTool';
import { WordCounterTool } from '../tools/WordCounterTool';
import { NotFoundPage } from './NotFoundPage';

function renderToolComponent(slug: string) {
  switch (slug) {
    case 'word-counter':
      return <WordCounterTool />;
    case 'case-converter':
      return <CaseConverterTool />;
    case 'password-generator':
      return <PasswordGeneratorTool />;
    case 'percentage-calculator':
      return <PercentageCalculatorTool />;
    case 'gst-calculator':
      return <GstCalculatorTool />;
    case 'age-calculator':
      return <AgeCalculatorTool />;
    case 'qr-code-generator':
      return <QrCodeGeneratorTool />;
    case 'image-compressor':
      return <ImageCompressorTool />;
    default:
      return null;
  }
}

export function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const tool = slug ? getToolBySlug(slug) : undefined;

  usePageMeta({
    title: tool ? t(tool.metaTitle) : 'Tool Not Found | Toolora',
    description: tool ? t(tool.metaDescription) : 'Explore free browser-side tools on Toolora.',
    jsonLd: tool
      ? {
          '@type': 'SoftwareApplication',
          name: `${t(tool.name)} – Toolora`,
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web',
          description: t(tool.metaDescription),
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }
      : undefined,
  });

  if (!tool) {
    return <NotFoundPage />;
  }

  return <ToolPageShell tool={tool}>{renderToolComponent(tool.slug)}</ToolPageShell>;
}
