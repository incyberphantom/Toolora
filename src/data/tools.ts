import { CategoryId, ToolDefinition } from '../types/tool';

export const TOOLS: ToolDefinition[] = [
  {
    id: 'word-counter',
    slug: 'word-counter',
    category: 'text-tools',
    name: { en: 'Word Counter', hi: 'वर्ड काउंटर' },
    shortDescription: {
      en: 'Count words, characters, sentences, paragraphs, reading time, and top keyword density in real time.',
      hi: 'शब्द, अक्षर, वाक्य, पैराग्राफ, पढ़ने का समय और प्रमुख कीवर्ड डेंसिटी तुरंत गिनें।',
    },
    metaTitle: {
      en: 'Word Counter – Free Online Word & Character Counter | Toolora',
      hi: 'वर्ड काउंटर – मुफ्त ऑनलाइन शब्द और अक्षर गिनती टूल | Toolora',
    },
    metaDescription: {
      en: 'Count words, characters with and without spaces, sentences, paragraphs, and reading time instantly in your browser with Toolora Word Counter.',
      hi: 'Toolora वर्ड काउंटर के साथ अपने ब्राउज़र में शब्द, अक्षर, वाक्य, पैराग्राफ और पढ़ने का समय तुरंत गिनें।',
    },
    iconName: 'AlignLeft',
    keywords: ['word', 'character', 'counter', 'text', 'reading time', 'density', 'शब्द', 'गिनती'],
    popular: true,
    howToUse: [
      {
        en: 'Type or paste your text directly into the editor area above.',
        hi: 'ऊपर दिए गए एडिटर बॉक्स में अपना टेक्स्ट टाइप या पेस्ट करें।',
      },
      {
        en: 'Review live counts for words, characters, sentences, paragraphs, and estimated reading time.',
        hi: 'शब्द, अक्षर, वाक्य, पैराग्राफ और अनुमानित पढ़ने के समय के लाइव आंकड़े देखें।',
      },
      {
        en: 'Inspect the keyword density panel to identify your most frequently used terms.',
        hi: 'सबसे अधिक उपयोग किए गए शब्दों को देखने के लिए कीवर्ड डेंसिटी तालिका जांचें।',
      },
    ],
    faqs: [
      {
        question: {
          en: 'Does Toolora save or upload the text I paste here?',
          hi: 'क्या Toolora मेरे पेस्ट किए गए टेक्स्ट को सेव या अपलोड करता है?',
        },
        answer: {
          en: 'No. All counting and text analysis happens locally in your web browser. Your text never leaves your device.',
          hi: 'नहीं। सभी गणना और टेक्स्ट विश्लेषण आपके ब्राउज़र में लोकली होते हैं। आपका टेक्स्ट कभी आपके डिवाइस से बाहर नहीं जाता।',
        },
      },
      {
        question: {
          en: 'How is reading time estimated?',
          hi: 'पढ़ने के समय का अनुमान कैसे लगाया जाता है?',
        },
        answer: {
          en: 'Reading time uses the standard adult silent reading average of 200 words per minute, while speaking time uses 130 words per minute.',
          hi: 'पढ़ने का समय 200 शब्द प्रति मिनट की मानक दर से और बोलने का समय 130 शब्द प्रति मिनट की दर से गणना किया जाता है।',
        },
      },
    ],
  },
  {
    id: 'case-converter',
    slug: 'case-converter',
    category: 'text-tools',
    name: { en: 'Case Converter', hi: 'केस कन्वर्टर' },
    shortDescription: {
      en: 'Transform text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and more.',
      hi: 'टेक्स्ट को UPPERCASE, lowercase, Title Case, Sentence case, camelCase और snake_case में बदलें।',
    },
    metaTitle: {
      en: 'Case Converter – Uppercase, Lowercase, Title & Camel Case | Toolora',
      hi: 'केस कन्वर्टर – ऑनलाइन टेक्स्ट केस बदलने का टूल | Toolora',
    },
    metaDescription: {
      en: 'Convert text effortlessly between uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, and kebab-case with Toolora.',
      hi: 'Toolora के साथ टेक्स्ट को UPPERCASE, lowercase, Title Case, Sentence case, camelCase और snake_case में तुरंत बदलें।',
    },
    iconName: 'Type',
    keywords: ['case', 'uppercase', 'lowercase', 'title', 'camel', 'snake', 'kebab', 'text', 'केस'],
    popular: true,
    howToUse: [
      {
        en: 'Enter or paste the text you want to reformat into the input box.',
        hi: 'इनपुट बॉक्स में वह टेक्स्ट दर्ज या पेस्ट करें जिसे आप बदलना चाहते हैं।',
      },
      {
        en: 'Select any case transformation button such as Title Case, Sentence case, or snake_case.',
        hi: 'Title Case, Sentence case, या snake_case जैसे किसी भी केस विकल्प पर क्लिक करें।',
      },
      {
        en: 'Copy the converted text to your clipboard or download it as a plain .txt file.',
        hi: 'परिवर्तित टेक्स्ट को क्लिपबोर्ड पर कॉपी करें या .txt फ़ाइल के रूप में डाउनलोड करें।',
      },
    ],
    faqs: [
      {
        question: {
          en: 'What is the difference between Title Case and Sentence case?',
          hi: 'Title Case और Sentence case में क्या अंतर है?',
        },
        answer: {
          en: 'Title Case capitalizes the first letter of every word, whereas Sentence case capitalizes only the first letter of each sentence.',
          hi: 'Title Case हर शब्द का पहला अक्षर बड़ा करता है, जबकि Sentence case केवल हर वाक्य का पहला अक्षर बड़ा करता है।',
        },
      },
      {
        question: {
          en: 'Can developers use this for variable naming?',
          hi: 'क्या डेवलपर्स इसका उपयोग वेरिएबल नामकरण के लिए कर सकते हैं?',
        },
        answer: {
          en: 'Yes. Built-in camelCase, PascalCase, snake_case, and kebab-case converters preserve line breaks for fast code formatting.',
          hi: 'हाँ। इसमें camelCase, PascalCase, snake_case और kebab-case कन्वर्टर शामिल हैं जो लाइन ब्रेक को सुरक्षित रखते हैं।',
        },
      },
    ],
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    category: 'developer-tools',
    name: { en: 'Password Generator', hi: 'पासवर्ड जनरेटर' },
    shortDescription: {
      en: 'Generate cryptographically strong, random passwords locally using the browser Web Crypto API.',
      hi: 'ब्राउज़र के सुरक्षित Web Crypto API का उपयोग करके मजबूत और रैंडम पासवर्ड बनाएं।',
    },
    metaTitle: {
      en: 'Strong Password Generator – Secure Random Passwords | Toolora',
      hi: 'पासवर्ड जनरेटर – मजबूत और सुरक्षित रैंडम पासवर्ड बनाएं | Toolora',
    },
    metaDescription: {
      en: 'Create strong, unpredictable passwords with customizable length, character sets, and entropy scoring directly in your browser using Toolora.',
      hi: 'Toolora के साथ कस्टम लंबाई, कैरेक्टर सेट और एन्ट्रॉपी स्कोर के साथ मजबूत पासवर्ड अपने ब्राउज़र में बनाएं।',
    },
    iconName: 'KeyRound',
    keywords: ['password', 'generator', 'security', 'random', 'crypto', 'strong', 'पासवर्ड'],
    popular: true,
    howToUse: [
      {
        en: 'Adjust the password length slider and choose uppercase, lowercase, numbers, or symbols.',
        hi: 'पासवर्ड की लंबाई चुनें और बड़े अक्षर, छोटे अक्षर, संख्या या प्रतीक विकल्प चुनें।',
      },
      {
        en: 'Optionally exclude visually ambiguous characters like 0, O, l, and 1.',
        hi: 'वैकल्पिक रूप से भ्रमित करने वाले अक्षरों (0, O, l, 1) को बाहर रखें।',
      },
      {
        en: 'Click Copy to save the password or generate multiple passwords at once.',
        hi: 'पासवर्ड सेव करने के लिए कॉपी पर क्लिक करें या एक साथ कई पासवर्ड जनरेट करें।',
      },
    ],
    faqs: [
      {
        question: {
          en: 'Are generated passwords transmitted over the internet?',
          hi: 'क्या बनाए गए पासवर्ड इंटरनेट पर भेजे जाते हैं?',
        },
        answer: {
          en: 'Never. Passwords are created entirely inside your browser memory using window.crypto.getRandomValues().',
          hi: 'बिल्कुल नहीं। पासवर्ड पूरी तरह से आपके ब्राउज़र में window.crypto.getRandomValues() का उपयोग करके बनाए जाते हैं।',
        },
      },
      {
        question: {
          en: 'How long should a strong password be?',
          hi: 'एक मजबूत पासवर्ड कितना लंबा होना चाहिए?',
        },
        answer: {
          en: 'Security experts recommend at least 14 to 16 characters combining letters, numbers, and symbols for important accounts.',
          hi: 'सुरक्षा विशेषज्ञ महत्वपूर्ण खातों के लिए कम से कम 14 से 16 अक्षरों का पासवर्ड सुझाते हैं जिसमें अक्षर, संख्या और प्रतीक शामिल हों।',
        },
      },
    ],
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    category: 'calculators',
    name: { en: 'Percentage Calculator', hi: 'प्रतिशत कैलकुलेटर' },
    shortDescription: {
      en: 'Calculate percentage of a number, ratio percentages, and percentage increase or decrease with formulas.',
      hi: 'किसी संख्या का प्रतिशत, अनुपात प्रतिशत और प्रतिशत वृद्धि या कमी की सटीक गणना करें।',
    },
    metaTitle: {
      en: 'Percentage Calculator – Fast Online Percent & Change Calculator | Toolora',
      hi: 'प्रतिशत कैलकुलेटर – ऑनलाइन प्रतिशत और परिवर्तन गणना | Toolora',
    },
    metaDescription: {
      en: 'Calculate X% of Y, find what percentage one value is of another, and compute percentage increase or decrease with step-by-step formulas on Toolora.',
      hi: 'Toolora पर किसी संख्या का प्रतिशत, दो संख्याओं का प्रतिशत अनुपात और प्रतिशत वृद्धि या कमी तुरंत निकालें।',
    },
    iconName: 'Percent',
    keywords: ['percentage', 'percent', 'discount', 'increase', 'decrease', 'math', 'प्रतिशत'],
    popular: true,
    howToUse: [
      {
        en: 'Choose one of the three calculation tabs: Percent of Value, What Percent, or Percentage Change.',
        hi: 'तीन गणना मोड में से एक चुनें: संख्या का प्रतिशत, कितना प्रतिशत, या प्रतिशत परिवर्तन।',
      },
      {
        en: 'Enter your numbers in the input fields to view the result and exact formula immediately.',
        hi: 'तुरंत परिणाम और सटीक सूत्र देखने के लिए अपने नंबर दर्ज करें।',
      },
      {
        en: 'Use the Copy button to copy the formatted answer for reports or invoices.',
        hi: 'रिपोर्ट या बिल के लिए उत्तर कॉपी करने के लिए कॉपी बटन का उपयोग करें।',
      },
    ],
    faqs: [
      {
        question: {
          en: 'How do you calculate percentage increase?',
          hi: 'प्रतिशत वृद्धि की गणना कैसे की जाती है?',
        },
        answer: {
          en: 'Subtract the original value from the new value, divide by the original value, and multiply by 100.',
          hi: 'नई संख्या से पुरानी संख्या घटाएं, पुरानी संख्या से भाग दें और 100 से गुणा करें।',
        },
      },
    ],
  },
  {
    id: 'gst-calculator',
    slug: 'gst-calculator',
    category: 'calculators',
    name: { en: 'GST Calculator', hi: 'जीएसटी कैलकुलेटर' },
    shortDescription: {
      en: 'Compute Indian GST (5%, 12%, 18%, 28% or custom) with Exclusive/Inclusive modes and CGST/SGST/IGST split.',
      hi: 'भारतीय जीएसटी (5%, 12%, 18%, 28% या कस्टम) की गणना CGST, SGST और IGST विवरण के साथ करें।',
    },
    metaTitle: {
      en: 'GST Calculator India – Add or Remove GST with CGST & SGST | Toolora',
      hi: 'जीएसटी कैलकुलेटर भारत – CGST, SGST और IGST गणना | Toolora',
    },
    metaDescription: {
      en: 'Calculate GST exclusive and inclusive amounts for 5%, 12%, 18%, 28%, or custom Indian GST slabs with instant CGST, SGST, and IGST breakdown on Toolora.',
      hi: 'Toolora पर 5%, 12%, 18%, 28% या कस्टम स्लैब के लिए एक्सक्लूसिव और इनक्लूसिव जीएसटी की तुरंत गणना करें।',
    },
    iconName: 'ReceiptIndianRupee',
    keywords: ['gst', 'tax', 'india', 'cgst', 'sgst', 'igst', 'invoice', 'जीएसटी', 'टैक्स'],
    popular: true,
    howToUse: [
      {
        en: 'Select Add GST (Exclusive) to add tax on top of a base price, or Remove GST (Inclusive) to extract tax from a final bill.',
        hi: 'मूल मूल्य पर टैक्स जोड़ने के लिए "जीएसटी जोड़ें" या कुल बिल से टैक्स निकालने के लिए "जीएसटी हटाएं" चुनें।',
      },
      {
        en: 'Enter the amount and select a standard GST slab (5%, 12%, 18%, 28%) or type any custom rate.',
        hi: 'राशि दर्ज करें और मानक जीएसटी दर (5%, 12%, 18%, 28%) या कोई कस्टम दर चुनें।',
      },
      {
        en: 'Review the complete split across Base Amount, CGST, SGST, IGST, and Net Total.',
        hi: 'मूल राशि, CGST, SGST, IGST और कुल राशि का पूरा विवरण देखें।',
      },
    ],
    faqs: [
      {
        question: {
          en: 'What is the difference between CGST/SGST and IGST?',
          hi: 'CGST/SGST और IGST में क्या अंतर है?',
        },
        answer: {
          en: 'For intra-state sales within the same state, total GST is split equally into 50% CGST and 50% SGST. For inter-state sales, 100% is charged as IGST.',
          hi: 'एक ही राज्य के भीतर बिक्री पर कुल जीएसटी 50% CGST और 50% SGST में बराबर बंटता है। अंतर-राज्यीय बिक्री पर 100% IGST लागू होता है।',
        },
      },
      {
        question: {
          en: 'How is GST removed from a GST-inclusive price?',
          hi: 'जीएसटी-इनक्लूसिव मूल्य से जीएसटी कैसे निकाला जाता है?',
        },
        answer: {
          en: 'Base Amount = Total Amount × 100 ÷ (100 + GST Rate). The GST amount is then Total Amount minus Base Amount.',
          hi: 'मूल राशि = कुल राशि × 100 ÷ (100 + जीएसटी दर)। इसके बाद कुल राशि से मूल राशि घटाने पर जीएसटी प्राप्त होता है।',
        },
      },
    ],
  },
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    category: 'calculators',
    name: { en: 'Age Calculator', hi: 'आयु कैलकुलेटर' },
    shortDescription: {
      en: 'Find your exact age in years, months, and days plus total weeks, hours, and next birthday countdown.',
      hi: 'वर्ष, महीने और दिन में अपनी सटीक आयु, कुल दिन और अगले जन्मदिन की गिनती जानें।',
    },
    metaTitle: {
      en: 'Age Calculator – Exact Age in Years, Months & Days | Toolora',
      hi: 'आयु कैलकुलेटर – वर्ष, महीने और दिन में सटीक आयु | Toolora',
    },
    metaDescription: {
      en: 'Calculate exact chronological age in years, months, days, weeks, and hours, plus see your next birthday countdown with Toolora Age Calculator.',
      hi: 'Toolora आयु कैलकुलेटर के साथ वर्ष, महीने, दिन, सप्ताह और अगले जन्मदिन की शेष अवधि तुरंत निकालें।',
    },
    iconName: 'CalendarDays',
    keywords: ['age', 'birthday', 'dob', 'date', 'years', 'months', 'days', 'आयु', 'उम्र', 'जन्मदिन'],
    popular: true,
    howToUse: [
      {
        en: 'Select your Date of Birth using the date input.',
        hi: 'दिनांक चयनकर्ता में अपनी जन्म तिथि चुनें।',
      },
      {
        en: 'Keep the target date as today, or pick any past or future date to calculate age on that day.',
        hi: 'लक्ष्य तिथि आज की रखें या किसी अन्य तिथि पर अपनी आयु जानने के लिए उसे बदलें।',
      },
      {
        en: 'View your exact years, months, days, total days lived, and next birthday countdown.',
        hi: 'अपने सटीक वर्ष, महीने, दिन, कुल दिन और अगले जन्मदिन की उल्टी गिनती देखें।',
      },
    ],
    faqs: [
      {
        question: {
          en: 'Does the Age Calculator account for leap years?',
          hi: 'क्या आयु कैलकुलेटर लीप वर्ष की गणना करता है?',
        },
        answer: {
          en: 'Yes. Calendar month lengths (28, 29, 30, and 31 days) and leap years are calculated accurately using UTC calendar math.',
          hi: 'हाँ। सभी महीनों के दिन (28, 29, 30, 31) और लीप वर्षों की गणना सटीक कैलेंडर गणित से की जाती है।',
        },
      },
    ],
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    category: 'internet-tools',
    name: { en: 'QR Code Generator', hi: 'QR कोड जनरेटर' },
    shortDescription: {
      en: 'Create crisp, scannable QR codes for URLs, text, Wi-Fi networks, emails, and phones. Export PNG or SVG.',
      hi: 'वेबसाइट लिंक, टेक्स्ट, वाई-फ़ाई, ईमेल और फ़ोन के लिए QR कोड बनाएं और PNG या SVG डाउनलोड करें।',
    },
    metaTitle: {
      en: 'QR Code Generator – Free PNG & SVG QR Codes Online | Toolora',
      hi: 'QR कोड जनरेटर – मुफ्त PNG और SVG QR कोड ऑनलाइन | Toolora',
    },
    metaDescription: {
      en: 'Generate high-resolution QR codes for links, Wi-Fi, email, and phone numbers locally in your browser. Customize colors and download PNG or SVG free on Toolora.',
      hi: 'Toolora के साथ लिंक, वाई-फ़ाई, ईमेल और फ़ोन के लिए मुफ्त उच्च-गुणवत्ता वाले PNG और SVG QR कोड बनाएं।',
    },
    iconName: 'QrCode',
    keywords: ['qr', 'code', 'barcode', 'wifi', 'url', 'link', 'svg', 'png', 'क्यूआर'],
    popular: true,
    howToUse: [
      {
        en: 'Pick a QR type: URL / Text, Wi-Fi Network, Email, or Phone.',
        hi: 'QR कोड का प्रकार चुनें: URL / टेक्स्ट, वाई-फ़ाई नेटवर्क, ईमेल या फ़ोन।',
      },
      {
        en: 'Fill in your content and optionally customize size, error correction level, and colors.',
        hi: 'अपना विवरण भरें और आवश्यकतानुसार आकार, एरर करेक्शन और रंग चुनें।',
      },
      {
        en: 'Download the generated QR code in crisp PNG or scalable SVG format.',
        hi: 'बने हुए QR कोड को PNG या SVG प्रारूप में तुरंत डाउनलोड करें।',
      },
    ],
    faqs: [
      {
        question: {
          en: 'Do QR codes created on Toolora ever expire?',
          hi: 'क्या Toolora पर बनाए गए QR कोड कभी समाप्त (एक्सपायर) होते हैं?',
        },
        answer: {
          en: 'No. Toolora generates static, standards-compliant QR codes directly from your data with no tracking redirects or expiration limits.',
          hi: 'नहीं। Toolora सीधे आपके डेटा से स्टैटिक QR कोड बनाता है, जिनमें कोई ट्रैकिंग रीडायरेक्ट या समय सीमा नहीं होती।',
        },
      },
    ],
  },
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    category: 'image-tools',
    name: { en: 'Image Compressor', hi: 'इमेज कंप्रेसर' },
    shortDescription: {
      en: 'Reduce JPG, PNG, and WebP file sizes directly in your browser with quality control and live preview.',
      hi: 'क्वालिटी कंट्रोल और लाइव प्रीव्यू के साथ JPG, PNG और WebP इमेज का आकार अपने ब्राउज़र में कम करें।',
    },
    metaTitle: {
      en: 'Image Compressor – Free Browser-Side Photo Compression | Toolora',
      hi: 'इमेज कंप्रेसर – ब्राउज़र में मुफ्त फोटो कंप्रेस करें | Toolora',
    },
    metaDescription: {
      en: 'Compress JPEG, PNG, and WebP images privately in your browser with Toolora. Adjust quality, resize dimensions, compare sizes, and download instantly.',
      hi: 'Toolora के साथ बिना अपलोड किए अपने ब्राउज़र में JPEG, PNG और WebP इमेज का आकार कम करें और तुरंत डाउनलोड करें।',
    },
    iconName: 'ImageDown',
    keywords: ['image', 'compress', 'photo', 'jpg', 'png', 'webp', 'optimize', 'reduce', 'इमेज', 'फोटो'],
    popular: true,
    howToUse: [
      {
        en: 'Drop an image file (JPG, PNG, or WebP) into the upload area or click to browse your device.',
        hi: 'अपलोड क्षेत्र में अपनी इमेज (JPG, PNG या WebP) ड्रॉप करें या डिवाइस से चुनें।',
      },
      {
        en: 'Adjust the compression quality slider, output format (WebP/JPEG/PNG), and optional max width.',
        hi: 'कम्प्रेशन क्वालिटी स्लाइडर, आउटपुट फॉर्मेट (WebP/JPEG/PNG) और अधिकतम चौड़ाई सेट करें।',
      },
      {
        en: 'Compare original and compressed file sizes, then click Download Compressed Image.',
        hi: 'मूल और कम्प्रेस की गई फ़ाइल के आकार की तुलना करें और डाउनलोड बटन पर क्लिक करें।',
      },
    ],
    faqs: [
      {
        question: {
          en: 'Are my photos uploaded to Toolora servers?',
          hi: 'क्या मेरी तस्वीरें Toolora के सर्वर पर अपलोड होती हैं?',
        },
        answer: {
          en: 'No. Compression runs 100% inside your browser using HTML5 Canvas. Your private photos never leave your computer or phone.',
          hi: 'नहीं। इमेज कम्प्रेशन 100% आपके ब्राउज़र में HTML5 Canvas के ज़रिए होता है। आपकी निजी तस्वीरें कभी सर्वर पर नहीं जातीं।',
        },
      },
      {
        question: {
          en: 'Which output format achieves the smallest file size?',
          hi: 'कौन सा आउटपुट फॉर्मेट सबसे छोटा फ़ाइल आकार देता है?',
        },
        answer: {
          en: 'WebP typically achieves the highest compression savings while maintaining sharp visual quality, followed closely by JPEG for photographs.',
          hi: 'WebP आमतौर पर बेहतरीन विज़ुअल गुणवत्ता के साथ सबसे छोटा फ़ाइल आकार देता है, और फ़ोटो के लिए JPEG भी बहुत प्रभावी है।',
        },
      },
    ],
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: CategoryId): ToolDefinition[] {
  return TOOLS.filter((t) => t.category === category);
}
