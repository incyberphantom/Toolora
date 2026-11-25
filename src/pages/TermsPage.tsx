import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';

export function TermsPage() {
  const { language, t } = useLanguage();

  usePageMeta({
    title: language === 'hi' ? 'नियम और शर्तें | Toolora' : 'Terms & Conditions | Toolora',
    description:
      language === 'hi'
        ? 'Toolora मुफ्त ऑनलाइन टूल्स वेबसाइट के उपयोग के नियम और शर्तें पढ़ें।'
        : 'Read the Terms & Conditions governing your use of Toolora free online browser utilities.',
  });

  const sections = [
    {
      title: { en: '1. Acceptance of Terms', hi: '1. शर्तों की स्वीकृति' },
      body: {
        en: 'By accessing or using Toolora, you agree to be bound by these Terms & Conditions. Toolora provides free browser-based online utilities for personal, educational, and commercial productivity.',
        hi: 'Toolora का उपयोग करके, आप इन नियमों और शर्तों से सहमत होते हैं। Toolora व्यक्तिगत, शैक्षिक और व्यावसायिक उत्पादकता के लिए मुफ्त ब्राउज़र-आधारित ऑनलाइन टूल्स प्रदान करता है।',
      },
    },
    {
      title: { en: '2. Free Service & No Sales', hi: '2. मुफ्त सेवा' },
      body: {
        en: 'Toolora does not sell products, subscriptions, or paid consulting services. All tools on the website are provided free of charge, supported by transparent advertising placements.',
        hi: 'Toolora कोई उत्पाद, सब्सक्रिप्शन या पेड सेवा नहीं बेचता। वेबसाइट पर सभी टूल्स पूरी तरह मुफ्त प्रदान किए जाते हैं।',
      },
    },
    {
      title: { en: '3. Accuracy & Financial Disclaimer', hi: '3. सटीकता और वित्तीय अस्वीकरण' },
      body: {
        en: 'While Toolora tests all calculators—including GST, Percentage, and Age calculators—for mathematical accuracy, results are provided on an “as-is” basis for informational convenience. Always verify tax filings, invoices, and official calculations with a qualified accountant or official authority.',
        hi: 'यद्यपि Toolora सभी कैलकुलेटर (जीएसटी, प्रतिशत और आयु सहित) की गणितीय सटीकता की जांच करता है, परिणाम केवल सामान्य जानकारी के लिए प्रदान किए जाते हैं। टैक्स फाइलिंग या आधिकारिक बिलों की पुष्टि हमेशा योग्य विशेषज्ञ से करें।',
      },
    },
    {
      title: { en: '4. Acceptable Use', hi: '4. उचित उपयोग' },
      body: {
        en: 'You agree not to misuse Toolora, attempt to disrupt website availability, scrape automated content abusively, or use generated outputs (such as QR codes) for unlawful or deceptive purposes.',
        hi: 'आप सहमत हैं कि आप Toolora का दुरुपयोग नहीं करेंगे, वेबसाइट की सेवा बाधित करने का प्रयास नहीं करेंगे, और बनाए गए आउटपुट का किसी अवैध उद्देश्य के लिए उपयोग नहीं करेंगे।',
      },
    },
    {
      title: { en: '5. Intellectual Property', hi: '5. बौद्धिक संपदा' },
      body: {
        en: 'The Toolora name, design layout, and original source code are protected under applicable copyright laws. Output you create using Toolora tools—such as converted text, compressed images, or QR codes—belongs entirely to you.',
        hi: 'Toolora का नाम, डिज़ाइन और स्रोत कोड कॉपीराइट कानूनों के तहत सुरक्षित हैं। Toolora टूल्स से आपके द्वारा बनाया गया आउटपुट (टेक्स्ट, कंप्रेस्ड इमेज या QR कोड) पूरी तरह आपका है।',
      },
    },
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <header className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
          {t({ en: 'Toolora Legal', hi: 'Toolora कानूनी दस्तावेज़' })}
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t({ en: 'Terms & Conditions', hi: 'नियम और शर्तें' })}
        </h1>
        <p className="mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          {t({ en: 'Last updated: November 2026', hi: 'अंतिम अपडेट: नवंबर 2026' })}
        </p>
      </header>

      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <section key={section.title.en}>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t(section.title)}
            </h2>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {t(section.body)}
            </p>
          </section>
        ))}
      </div>
    </article>
  );
}
