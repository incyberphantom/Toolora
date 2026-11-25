import {
  AlignLeft,
  Calculator,
  CalendarDays,
  Code2,
  FileSpreadsheet,
  FileText,
  Globe,
  Image,
  ImageDown,
  KeyRound,
  Percent,
  QrCode,
  ReceiptIndianRupee,
  Search,
  Type,
} from 'lucide-react';
import { CategoryDefinition, ToolDefinition } from '../../types/tool';

export function ToolIcon({
  name,
  className = 'w-5 h-5',
}: {
  name: ToolDefinition['iconName'];
  className?: string;
}) {
  switch (name) {
    case 'AlignLeft':
      return <AlignLeft className={className} aria-hidden="true" />;
    case 'Type':
      return <Type className={className} aria-hidden="true" />;
    case 'KeyRound':
      return <KeyRound className={className} aria-hidden="true" />;
    case 'Percent':
      return <Percent className={className} aria-hidden="true" />;
    case 'ReceiptIndianRupee':
      return <ReceiptIndianRupee className={className} aria-hidden="true" />;
    case 'CalendarDays':
      return <CalendarDays className={className} aria-hidden="true" />;
    case 'QrCode':
      return <QrCode className={className} aria-hidden="true" />;
    case 'ImageDown':
      return <ImageDown className={className} aria-hidden="true" />;
  }
}

export function CategoryIcon({
  name,
  className = 'w-5 h-5',
}: {
  name: CategoryDefinition['iconName'];
  className?: string;
}) {
  switch (name) {
    case 'FileText':
      return <FileText className={className} aria-hidden="true" />;
    case 'Calculator':
      return <Calculator className={className} aria-hidden="true" />;
    case 'Image':
      return <Image className={className} aria-hidden="true" />;
    case 'Code2':
      return <Code2 className={className} aria-hidden="true" />;
    case 'Globe':
      return <Globe className={className} aria-hidden="true" />;
    case 'FileSpreadsheet':
      return <FileSpreadsheet className={className} aria-hidden="true" />;
    case 'Search':
      return <Search className={className} aria-hidden="true" />;
  }
}
