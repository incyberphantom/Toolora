import { CategoryDefinition } from '../types/tool';

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: 'text-tools',
    slug: 'text-tools',
    name: { en: 'Text Tools', hi: 'टेक्स्ट टूल्स' },
    description: {
      en: 'Count words, analyze keyword density, and convert text capitalization instantly.',
      hi: 'शब्द गिनें, कीवर्ड डेंसिटी जांचें और टेक्स्ट का केस तुरंत बदलें।',
    },
    iconName: 'FileText',
  },
  {
    id: 'calculators',
    slug: 'calculators',
    name: { en: 'Calculators', hi: 'कैलकुलेटर' },
    description: {
      en: 'Accurate daily calculators for percentages, Indian GST breakdowns, and exact age.',
      hi: 'प्रतिशत, भारतीय जीएसटी और सटीक आयु की गणना के लिए विश्वसनीय कैलकुलेटर।',
    },
    iconName: 'Calculator',
  },
  {
    id: 'image-tools',
    slug: 'image-tools',
    name: { en: 'Image Tools', hi: 'इमेज टूल्स' },
    description: {
      en: 'Compress and optimize images privately inside your browser with zero server uploads.',
      hi: 'बिना सर्वर अपलोड के अपने ब्राउज़र में ही इमेज का आकार कम और ऑप्टिमाइज़ करें।',
    },
    iconName: 'Image',
  },
  {
    id: 'developer-tools',
    slug: 'developer-tools',
    name: { en: 'Developer Tools', hi: 'डेवलपर टूल्स' },
    description: {
      en: 'Security and developer utilities built with native browser cryptography.',
      hi: 'नेटिव ब्राउज़र क्रिप्टोग्राफ़ी के साथ बनाए गए सुरक्षा और डेवलपर यूटिलिटी टूल्स।',
    },
    iconName: 'Code2',
  },
  {
    id: 'internet-tools',
    slug: 'internet-tools',
    name: { en: 'Internet Tools', hi: 'इंटरनेट टूल्स' },
    description: {
      en: 'Create scannable QR codes for links, Wi-Fi networks, emails, and contact numbers.',
      hi: 'लिंक, वाई-फ़ाई, ईमेल और फ़ोन नंबर के लिए स्कैन करने योग्य QR कोड बनाएं।',
    },
    iconName: 'Globe',
  },
  {
    id: 'pdf-tools',
    slug: 'pdf-tools',
    name: { en: 'PDF Tools', hi: 'पीडीएफ टूल्स' },
    description: {
      en: 'Client-side PDF utilities designed for merging, splitting, and inspecting documents safely.',
      hi: 'दस्तावेज़ों को सुरक्षित रूप से मर्ज, स्प्लिट और जांचने के लिए ब्राउज़र-आधारित पीडीएफ टूल्स।',
    },
    iconName: 'FileSpreadsheet',
    plannedTools: [
      { en: 'Merge PDF (Browser-side)', hi: 'पीडीएफ मर्ज करें (ब्राउज़र-साइड)' },
      { en: 'Split PDF Pages', hi: 'पीडीएफ पेज अलग करें' },
      { en: 'Image to PDF Converter', hi: 'इमेज से पीडीएफ कन्वर्टर' },
    ],
  },
  {
    id: 'seo-tools',
    slug: 'seo-tools',
    name: { en: 'SEO Tools', hi: 'एसईओ टूल्स' },
    description: {
      en: 'Search optimization utilities for meta tags, slug generation, and snippet previews.',
      hi: 'मेटा टैग्स, स्लग जनरेशन और सर्च स्निपेट प्रीव्यू के लिए एसईओ टूल्स।',
    },
    iconName: 'Search',
    plannedTools: [
      { en: 'Meta Tag Preview & Generator', hi: 'मेटा टैग प्रीव्यू और जनरेटर' },
      { en: 'URL Slug Cleaner', hi: 'यूआरएल स्लग क्लीनर' },
      { en: 'Robots.txt Builder', hi: 'Robots.txt बिल्डर' },
    ],
  },
];

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
