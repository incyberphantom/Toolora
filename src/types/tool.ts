export type Language = 'en' | 'hi';
export type Theme = 'light' | 'dark';

export type CategoryId =
  | 'text-tools'
  | 'calculators'
  | 'image-tools'
  | 'developer-tools'
  | 'internet-tools'
  | 'pdf-tools'
  | 'seo-tools';

export interface LocalizedText {
  en: string;
  hi: string;
}

export interface CategoryDefinition {
  id: CategoryId;
  slug: CategoryId;
  name: LocalizedText;
  description: LocalizedText;
  iconName:
    | 'FileText'
    | 'Calculator'
    | 'Image'
    | 'Code2'
    | 'Globe'
    | 'FileSpreadsheet'
    | 'Search';
  plannedTools?: LocalizedText[];
}

export interface ToolFaq {
  question: LocalizedText;
  answer: LocalizedText;
}

export interface ToolDefinition {
  id: string;
  slug: string;
  category: CategoryId;
  name: LocalizedText;
  shortDescription: LocalizedText;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  iconName:
    | 'AlignLeft'
    | 'Type'
    | 'KeyRound'
    | 'Percent'
    | 'ReceiptIndianRupee'
    | 'CalendarDays'
    | 'QrCode'
    | 'ImageDown';
  keywords: string[];
  popular: boolean;
  howToUse: LocalizedText[];
  faqs: ToolFaq[];
}
