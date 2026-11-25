import { CheckCircle2, Mail, MessageSquare, Send } from 'lucide-react';
import React, { useState } from 'react';
import { AdSlot } from '../components/common/AdSlot';
import { useLanguage } from '../context/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';

interface SubmittedInquiry {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  submittedAt: string;
}

export function ContactPage() {
  const { language, t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('tool-suggestion');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [inquiries, setInquiries] = useState<SubmittedInquiry[]>([]);

  usePageMeta({
    title: language === 'hi' ? 'संपर्क करें | Toolora' : 'Contact Us – Suggest a Tool or Report an Issue | Toolora',
    description:
      language === 'hi'
        ? 'नया टूल सुझाने, किसी समस्या की रिपोर्ट करने या सामान्य पूछताछ के लिए Toolora टीम से संपर्क करें।'
        : 'Contact the Toolora team to suggest a new browser tool, report a calculation bug, or ask a question about our free online utilities.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { name?: string; email?: string; message?: string } = {};

    if (name.trim().length < 2) {
      nextErrors.name = t({
        en: 'Please enter your name (at least 2 characters).',
        hi: 'कृपया अपना नाम दर्ज करें (कम से कम 2 अक्षर)।',
      });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = t({
        en: 'Please enter a valid email address.',
        hi: 'कृपया एक मान्य ईमेल पता दर्ज करें।',
      });
    }
    if (message.trim().length < 10) {
      nextErrors.message = t({
        en: 'Please write a message of at least 10 characters.',
        hi: 'कृपया कम से कम 10 अक्षरों का संदेश लिखें।',
      });
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const entry: SubmittedInquiry = {
      id: `TLR-${Date.now().toString(36).toUpperCase()}`,
      name: name.trim(),
      email: email.trim(),
      topic,
      message: message.trim(),
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setInquiries((prev) => [entry, ...prev]);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <header className="max-w-2xl">
        <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
          {t({ en: 'Contact Toolora', hi: 'Toolora से संपर्क करें' })}
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {t({ en: 'Suggest a tool or get in touch', hi: 'नया टूल सुझाएं या हमसे जुड़ें' })}
        </h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {t({
            en: 'Have an idea for a new browser-side utility, spotted a bug, or have a privacy question? Send us a message using the form below.',
            hi: 'किसी नए टूल का सुझाव देना चाहते हैं, कोई समस्या मिली है, या कोई प्रश्न है? नीचे दिए गए फॉर्म से हमें संदेश भेजें।',
          })}
        </p>
      </header>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t({ en: 'Your Name', hi: 'आपका नाम' })}
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t({ en: 'Aarav Sharma', hi: 'आरव शर्मा' })}
                className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
              {errors.name && (
                <p role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t({ en: 'Email Address', hi: 'ईमेल पता' })}
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
              {errors.email && (
                <p role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="contact-topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t({ en: 'Topic', hi: 'विषय' })}
            </label>
            <select
              id="contact-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-900 dark:text-white"
            >
              <option value="tool-suggestion">{t({ en: 'Suggest a New Tool', hi: 'नया टूल सुझाएं' })}</option>
              <option value="bug-report">{t({ en: 'Report a Bug or Calculation Issue', hi: 'बग या समस्या की रिपोर्ट करें' })}</option>
              <option value="privacy">{t({ en: 'Privacy & Data Question', hi: 'गोपनीयता संबंधी प्रश्न' })}</option>
              <option value="general">{t({ en: 'General Inquiry', hi: 'सामान्य पूछताछ' })}</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t({ en: 'Message', hi: 'संदेश' })}
            </label>
            <textarea
              id="contact-message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t({
                en: 'Describe the tool you would like to see on Toolora or share details about your question...',
                hi: 'आप Toolora पर कौन सा टूल देखना चाहते हैं या अपना प्रश्न विस्तार से लिखें...',
              })}
              className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            />
            {errors.message && (
              <p role="alert" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {t({ en: 'Send Message', hi: 'संदेश भेजें' })}
          </button>

          {/* Submitted Inquiries Confirmation Log */}
          {inquiries.length > 0 && (
            <div
              data-testid="contact-confirmation"
              className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                {t({
                  en: 'Thank you! Your message has been recorded for the Toolora team.',
                  hi: 'धन्यवाद! आपका संदेश Toolora टीम के लिए दर्ज कर लिया गया है।',
                })}
              </div>
              <ul className="space-y-2">
                {inquiries.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-xs text-slate-600 dark:text-slate-400"
                  >
                    <div className="flex items-center justify-between font-mono text-slate-800 dark:text-slate-200">
                      <span>{item.id}</span>
                      <span>{item.submittedAt}</span>
                    </div>
                    <p className="mt-1 text-slate-700 dark:text-slate-300">
                      {item.name} ({item.email}) — {item.message}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>

        {/* Direct Contact Details */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-900 dark:text-white">
              <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              {t({ en: 'Direct Email', hi: 'सीधा ईमेल' })}
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {t({
                en: 'For editorial, privacy, or partnership inquiries:',
                hi: 'सामान्य, गोपनीयता या सुझाव संबंधी संपर्क के लिए:',
              })}
            </p>
            <a
              href="mailto:support@toolora.app"
              className="mt-2 inline-block font-mono text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              support@toolora.app
            </a>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-900 dark:text-white">
              <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              {t({ en: 'Response Expectations', hi: 'प्रतिक्रिया समय' })}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t({
                en: 'We review every tool suggestion and bug report within 2–3 business days. Toolora prioritizes utilities that can run reliably and privately inside a standard web browser.',
                hi: 'हम हर टूल सुझाव और बग रिपोर्ट की 2–3 कार्य दिवसों में समीक्षा करते हैं। Toolora उन टूल्स को प्राथमिकता देता है जो ब्राउज़र में निजी और विश्वसनीय रूप से चल सकें।',
              })}
            </p>
          </div>

          <AdSlot format="rectangle" slotId="contact-sidebar" />
        </div>
      </div>
    </div>
  );
}
