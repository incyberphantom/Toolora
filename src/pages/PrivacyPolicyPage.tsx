import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';

export function PrivacyPolicyPage() {
  const { language, t } = useLanguage();

  usePageMeta({
    title: language === 'hi' ? 'गोपनीयता नीति | Toolora' : 'Privacy Policy | Toolora',
    description:
      language === 'hi'
        ? 'Toolora गोपनीयता नीति: ब्राउज़र-साइड प्रोसेसिंग, लोकल स्टोरेज और Google AdSense कुकी जानकारी।'
        : 'Read the Toolora Privacy Policy explaining our browser-side processing, local preferences, and future Google AdSense advertising disclosures.',
  });

  const sections = [
    {
      title: { en: '1. Browser-Side Processing & Your Files', hi: '1. ब्राउज़र-साइड प्रोसेसिंग और आपकी फ़ाइलें' },
      body: {
        en: 'Toolora is engineered so that core tools—including Word Counter, Case Converter, Password Generator, Percentage Calculator, GST Calculator, Age Calculator, QR Code Generator, and Image Compressor—run locally inside your web browser. Text you type, passwords you generate, and images you compress are not uploaded to Toolora servers.',
        hi: 'Toolora के सभी मुख्य टूल्स—वर्ड काउंटर, केस कन्वर्टर, पासवर्ड जनरेटर, प्रतिशत कैलकुलेटर, जीएसटी कैलकुलेटर, आयु कैलकुलेटर, QR कोड जनरेटर और इमेज कंप्रेसर—सीधे आपके ब्राउज़र में लोकली चलते हैं। आपका टेक्स्ट, पासवर्ड या इमेज कभी हमारे सर्वर पर अपलोड नहीं होते।',
      },
    },
    {
      title: { en: '2. Local Preferences (Theme & Language)', hi: '2. लोकल प्राथमिकताएं (थीम और भाषा)' },
      body: {
        en: 'Toolora stores your Light/Dark mode choice and English/Hindi language preference in your browser’s localStorage so the site remembers your settings on future visits. This data stays strictly on your device.',
        hi: 'Toolora आपकी लाइट/डार्क मोड और अंग्रेज़ी/हिंदी भाषा की पसंद को आपके ब्राउज़र के localStorage में सेव करता है ताकि अगली बार विज़िट करने पर आपकी सेटिंग्स बनी रहें। यह डेटा केवल आपके डिवाइस पर रहता है।',
      },
    },
    {
      title: { en: '3. Google AdSense & Third-Party Cookies', hi: '3. Google AdSense और थर्ड-पार्टी कुकीज़' },
      body: {
        en: 'Toolora is a free platform with no paid products. In the future, Toolora may display advertisements served by Google AdSense. Google, as a third-party vendor, uses cookies to serve ads based on a user’s prior visits to Toolora or other websites. Users may opt out of personalized advertising by visiting Google Ads Settings (adssettings.google.com).',
        hi: 'Toolora एक पूर्णतः मुफ्त प्लेटफ़ॉर्म है। भविष्य में इस वेबसाइट को चलाने के लिए Google AdSense द्वारा विज्ञापन दिखाए जा सकते हैं। थर्ड-पार्टी विक्रेता के रूप में Google कुकीज़ का उपयोग करके विज्ञापन दिखा सकता है। उपयोगकर्ता Google Ads Settings (adssettings.google.com) पर जाकर वैयक्तिकृत विज्ञापनों से ऑप्ट-आउट कर सकते हैं।',
      },
    },
    {
      title: { en: '4. Contact Information', hi: '4. संपर्क जानकारी' },
      body: {
        en: 'If you voluntarily submit a message via our Contact Us page or email support@toolora.app, we use the information only to respond to your inquiry or evaluate your tool suggestion. We never sell or rent user contact details.',
        hi: 'यदि आप हमारे संपर्क पृष्ठ या support@toolora.app के माध्यम से संदेश भेजते हैं, तो हम उस जानकारी का उपयोग केवल आपके प्रश्न का उत्तर देने या सुझाव की समीक्षा के लिए करते हैं। हम कभी उपयोगकर्ता जानकारी नहीं बेचते।',
      },
    },
    {
      title: { en: '5. Policy Updates', hi: '5. नीति में बदलाव' },
      body: {
        en: 'We may update this Privacy Policy periodically as new tools or advertising integrations are introduced. Changes take effect once published on this page with an updated effective date.',
        hi: 'नए टूल्स या विज्ञापन एकीकरण जुड़ने पर हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। सभी परिवर्तन इस पृष्ठ पर प्रकाशित होने के बाद प्रभावी होंगे।',
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
          {t({ en: 'Privacy Policy', hi: 'गोपनीयता नीति' })}
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
