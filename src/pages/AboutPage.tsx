import { Globe2, Lock, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdSlot } from '../components/common/AdSlot';
import { useLanguage } from '../context/LanguageContext';
import { TOOLS } from '../data/tools';
import { UI_STRINGS } from '../data/translations';
import { usePageMeta } from '../hooks/usePageMeta';

export function AboutPage() {
  const { language, t } = useLanguage();

  usePageMeta({
    title: language === 'hi' ? 'हमारे बारे में | Toolora' : 'About Us – Free Browser-Side Online Tools | Toolora',
    description:
      language === 'hi'
        ? 'Toolora के मिशन, गोपनीयता-प्रथम दृष्टिकोण और मुफ्त ऑनलाइन टूल्स के बारे में जानें।'
        : 'Learn about Toolora, our mission to build fast, free, privacy-first online tools that run directly in your browser without accounts or uploads.',
  });

  const pillars = [
    {
      icon: Lock,
      title: { en: 'Privacy by Architecture', hi: 'डिज़ाइन द्वारा गोपनीयता' },
      body: {
        en: 'Every Toolora utility—from image compression to password generation—is engineered to execute locally in your browser whenever possible. Your private documents and images stay on your own device.',
        hi: 'इमेज कम्प्रेशन से लेकर पासवर्ड जनरेशन तक, Toolora का हर टूल सीधे आपके ब्राउज़र में चलता है ताकि आपका निजी डेटा आपके डिवाइस पर ही सुरक्षित रहे।',
      },
    },
    {
      icon: Zap,
      title: { en: 'Instant, Zero-Friction Speed', hi: 'तुरंत और सरल गति' },
      body: {
        en: 'No sign-up screens, no email verification walls, and no bloated dashboards. Open any Toolora tool and finish your task in seconds.',
        hi: 'कोई साइन-अप नहीं, कोई ईमेल वेरिफिकेशन नहीं। किसी भी Toolora टूल को खोलें और सेकंडों में अपना काम पूरा करें।',
      },
    },
    {
      icon: ShieldCheck,
      title: { en: 'Free Forever via Transparent Support', hi: 'हमेशा मुफ्त और पारदर्शी मॉडल' },
      body: {
        en: 'Toolora does not sell products, courses, or paid subscriptions. To keep the platform sustainable and free for students, freelancers, and small businesses, Toolora plans to support operations through non-intrusive Google AdSense placements.',
        hi: 'Toolora कोई उत्पाद या पेड सब्सक्रिप्शन नहीं बेचता। छात्रों, फ्रीलांसरों और छोटे व्यवसायों के लिए प्लेटफ़ॉर्म को हमेशा मुफ्त रखने के लिए भविष्य में इसे Google AdSense द्वारा समर्थित किया जाएगा।',
      },
    },
    {
      icon: Globe2,
      title: { en: 'Accessible in English & Hindi', hi: 'अंग्रेज़ी और हिंदी में उपलब्ध' },
      body: {
        en: 'Designed for everyday users across India and around the world with full bilingual support, clean typography, and responsive layouts on mobile, tablet, and desktop.',
        hi: 'भारत और दुनिया भर के उपयोगकर्ताओं के लिए पूर्ण अंग्रेज़ी और हिंदी समर्थन तथा मोबाइल, टैबलेट और डेस्कटॉप पर स्वच्छ डिज़ाइन के साथ निर्मित।',
      },
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <header>
        <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
          {t({ en: 'About Toolora', hi: 'Toolora के बारे में' })}
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t({
            en: 'Practical online utilities built with respect for your time and privacy',
            hi: 'आपके समय और गोपनीयता का सम्मान करने वाले व्यावहारिक ऑनलाइन टूल्स',
          })}
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          {t({
            en: 'Toolora was created with a simple goal: replace cluttered, slow, ad-overloaded utility sites with a clean, trustworthy platform of everyday browser tools that simply work.',
            hi: 'Toolora का उद्देश्य सरल है: धीमी और उलझी हुई वेबसाइटों के बजाय एक स्वच्छ, तेज़ और भरोसेमंद प्लेटफ़ॉर्म प्रदान करना जहाँ दैनिक उपयोग के ऑनलाइन टूल्स तुरंत काम करें।',
          })}
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <article
              key={pillar.title.en}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                {t(pillar.title)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {t(pillar.body)}
              </p>
            </article>
          );
        })}
      </section>

      <section className="mt-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {t({ en: 'Growing Catalog of Verified Tools', hi: 'सत्यापित टूल्स का बढ़ता संग्रह' })}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {t({
            en: `Toolora launches with ${TOOLS.length} fully working tools across Text, Calculators, Image Optimization, Developer, and Internet categories—and we continue adding reliable browser-side utilities based on user requests.`,
            hi: `Toolora टेक्स्ट, कैलकुलेटर, इमेज, डेवलपर और इंटरनेट श्रेणियों में ${TOOLS.length} पूर्णतः कार्यशील टूल्स के साथ शुरू होता है और उपयोगकर्ता के सुझावों के आधार पर लगातार नए टूल्स जोड़ता रहेगा।`,
          })}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            {t(UI_STRINGS.controls.browseAll)}
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {t(UI_STRINGS.nav.contact)}
          </Link>
        </div>
      </section>

      <div className="mt-10">
        <AdSlot format="leaderboard" slotId="about-bottom" />
      </div>
    </div>
  );
}
