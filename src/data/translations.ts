import { Language } from '../types/tool';

export const UI_STRINGS = {
  brandName: { en: 'Toolora', hi: 'Toolora' },
  nav: {
    home: { en: 'Home', hi: 'होम' },
    tools: { en: 'Tools', hi: 'टूल्स' },
    categories: { en: 'Categories', hi: 'श्रेणियाँ' },
    about: { en: 'About', hi: 'हमारे बारे में' },
    contact: { en: 'Contact', hi: 'संपर्क करें' },
    privacy: { en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
    terms: { en: 'Terms & Conditions', hi: 'नियम और शर्तें' },
  },
  controls: {
    switchToDark: { en: 'Switch to dark mode', hi: 'डार्क मोड चालू करें' },
    switchToLight: { en: 'Switch to light mode', hi: 'लाइट मोड चालू करें' },
    switchLanguage: { en: 'Switch language to Hindi', hi: 'भाषा अंग्रेज़ी में बदलें' },
    openMenu: { en: 'Open navigation menu', hi: 'नेविगेशन मेनू खोलें' },
    closeMenu: { en: 'Close navigation menu', hi: 'नेविगेशन मेनू बंद करें' },
    copy: { en: 'Copy', hi: 'कॉपी करें' },
    copied: { en: 'Copied', hi: 'कॉपी किया गया' },
    clear: { en: 'Clear', hi: 'साफ़ करें' },
    reset: { en: 'Reset', hi: 'रीसेट' },
    download: { en: 'Download', hi: 'डाउनलोड' },
    sampleText: { en: 'Load Sample', hi: 'नमूना टेक्स्ट' },
    openTool: { en: 'Open Tool', hi: 'टूल खोलें' },
    browseAll: { en: 'Browse All Tools', hi: 'सभी टूल्स देखें' },
    backToHome: { en: 'Back to Home', hi: 'होम पर वापस जाएं' },
  },
  home: {
    heroTitle: {
      en: 'Fast, privacy-first online tools that work right in your browser',
      hi: 'तेज़ और सुरक्षित ऑनलाइन टूल्स जो सीधे आपके ब्राउज़र में काम करते हैं',
    },
    heroSubtitle: {
      en: 'Everyday utilities for writing, finance, security, QR codes, and image optimization. Completely free, zero sign-up required, and your files stay on your device.',
      hi: 'लेखन, गणना, सुरक्षा, QR कोड और इमेज कम्प्रेशन के लिए दैनिक ऑनलाइन टूल्स। पूरी तरह मुफ्त, बिना साइन-अप, और आपकी फ़ाइलें केवल आपके डिवाइस पर रहती हैं।',
    },
    searchPlaceholder: {
      en: 'Search tools (e.g. Word Counter, GST, QR Code, Image Compressor)...',
      hi: 'टूल्स खोजें (जैसे वर्ड काउंटर, जीएसटी, QR कोड, इमेज कंप्रेसर)...',
    },
    searchLabel: { en: 'Search Toolora tools', hi: 'Toolora टूल्स खोजें' },
    searchNoResults: {
      en: 'No tools matched your search. Try another keyword or browse categories below.',
      hi: 'आपकी खोज से कोई टूल मेल नहीं खाया। दूसरा शब्द आज़माएं या नीचे श्रेणियाँ देखें।',
    },
    clearSearch: { en: 'Clear search', hi: 'खोज साफ़ करें' },
    matchingTools: { en: 'Search Results', hi: 'खोज परिणाम' },
    popularTitle: { en: 'Popular Tools', hi: 'लोकप्रिय टूल्स' },
    popularSubtitle: {
      en: 'Ready-to-use browser utilities crafted for speed and accuracy.',
      hi: 'तेज़ी और सटीकता के लिए तैयार ब्राउज़र यूटिलिटी टूल्स।',
    },
    categoriesTitle: { en: 'Browse by Category', hi: 'श्रेणी के अनुसार ब्राउज़ करें' },
    categoriesSubtitle: {
      en: 'Organized collections covering text, math, media, developer, and web workflows.',
      hi: 'टेक्स्ट, गणित, इमेज, डेवलपर और वेब कार्यों के लिए व्यवस्थित श्रेणियाँ।',
    },
    whyTitle: { en: 'Built for speed, clarity, and privacy', hi: 'तेज़ी, सरलता और गोपनीयता के लिए निर्मित' },
    whyPoints: [
      {
        title: { en: '100% Browser-Side Processing', hi: '100% ब्राउज़र-साइड प्रोसेसिंग' },
        desc: {
          en: 'Your text, passwords, calculations, and images are processed locally on your device—never uploaded to external servers.',
          hi: 'आपका टेक्स्ट, पासवर्ड, गणनाएं और इमेज सीधे आपके डिवाइस पर प्रोसेस होते हैं—कभी बाहरी सर्वर पर अपलोड नहीं होते।',
        },
      },
      {
        title: { en: 'Free Forever, Zero Paywalls', hi: 'हमेशा के लिए मुफ्त, कोई शुल्क नहीं' },
        desc: {
          en: 'Toolora does not sell subscriptions or lock features behind accounts. Every tool is freely accessible to everyone.',
          hi: 'Toolora कोई सब्सक्रिप्शन नहीं बेचता और न ही किसी टूल के लिए अकाउंट मांगता है। हर टूल सबके लिए मुफ्त है।',
        },
      },
      {
        title: { en: 'Clean Bilingual Workspace', hi: 'स्वच्छ द्विभाषी अनुभव' },
        desc: {
          en: 'Switch effortlessly between English and Hindi, or Light and Dark themes, across desktop, tablet, and mobile.',
          hi: 'डेस्कटॉप, टैबलेट और मोबाइल पर अंग्रेज़ी और हिंदी तथा लाइट और डार्क मोड के बीच आसानी से स्विच करें।',
        },
      },
    ],
    liveToolsSingular: { en: '1 live tool', hi: '1 सक्रिय टूल' },
    liveToolsPlural: { en: 'live tools', hi: 'सक्रिय टूल्स' },
    expandingSoon: { en: 'Expanding soon', hi: 'जल्द आ रहा है' },
    allFilter: { en: 'All', hi: 'सभी' },
  },
  toolShell: {
    browserProcessed: { en: 'Runs locally in your browser', hi: 'आपके ब्राउज़र में लोकली चलता है' },
    howToUseTitle: { en: 'How to use', hi: 'कैसे उपयोग करें' },
    faqTitle: { en: 'Frequently Asked Questions', hi: 'अक्सर पूछे जाने वाले प्रश्न' },
    relatedToolsTitle: { en: 'More Free Tools on Toolora', hi: 'Toolora पर अन्य मुफ्त टूल्स' },
  },
  adSlot: {
    label: { en: 'Advertisement', hi: 'विज्ञापन स्थान' },
    placeholder: { en: 'Google AdSense Placement', hi: 'Google AdSense विज्ञापन स्लॉट' },
  },
  categoryPage: {
    plannedHeading: { en: 'Upcoming Browser-Side Tools', hi: 'आगामी ब्राउज़र-साइड टूल्स' },
    plannedBody: {
      en: 'Toolora is actively expanding this category with zero-upload, browser-side utilities. We only publish tools once they work reliably offline inside your browser—never non-functional demos.',
      hi: 'Toolora इस श्रेणी में बिना अपलोड वाले ब्राउज़र-साइड टूल्स जोड़ रहा है। हम केवल तभी टूल्स प्रकाशित करते हैं जब वे पूरी तरह और सुरक्षित रूप से काम करें।',
    },
    suggestToolCta: { en: 'Suggest a Tool via Contact Us', hi: 'संपर्क पृष्ठ से टूल सुझाएं' },
  },
  footer: {
    tagline: {
      en: 'Free, privacy-respecting online utilities that execute directly in your browser. No accounts, no uploads, no subscriptions.',
      hi: 'मुफ्त और गोपनीयता-केंद्रित ऑनलाइन टूल्स जो सीधे आपके ब्राउज़र में चलते हैं। कोई अकाउंट नहीं, कोई अपलोड नहीं।',
    },
    popularHeading: { en: 'Popular Tools', hi: 'लोकप्रिय टूल्स' },
    categoriesHeading: { en: 'Categories', hi: 'श्रेणियाँ' },
    companyHeading: { en: 'Toolora & Legal', hi: 'Toolora और कानूनी' },
    copyright: {
      en: 'Toolora. All rights reserved. Built for fast, private browser-side productivity.',
      hi: 'Toolora. सर्वाधिकार सुरक्षित। तेज़ और निजी ब्राउज़र उत्पादकता के लिए निर्मित।',
    },
  },
} as const;

export function pickText(text: { en: string; hi: string }, lang: Language): string {
  return text[lang];
}
