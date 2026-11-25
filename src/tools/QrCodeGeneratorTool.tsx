import { Download } from 'lucide-react';
import QRCode from 'qrcode';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  buildEmailQrString,
  buildPhoneQrString,
  buildWifiQrString,
  QrMode,
} from '../utils/toolsLogic';

type EcLevel = 'L' | 'M' | 'Q' | 'H';

export function QrCodeGeneratorTool() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<QrMode>('text');
  const [textValue, setTextValue] = useState('https://toolora.app');

  // Wi-Fi fields
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);

  // Email fields
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Phone field
  const [phone, setPhone] = useState('');

  // Visual options
  const [size, setSize] = useState(280);
  const [ecLevel, setEcLevel] = useState<EcLevel>('M');
  const [darkColor, setDarkColor] = useState('#0f172a');
  const [lightColor, setLightColor] = useState('#ffffff');

  const [svgMarkup, setSvgMarkup] = useState('');
  const [pngUrl, setPngUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const payload = useMemo(() => {
    if (mode === 'text') return textValue.trim();
    if (mode === 'wifi') {
      return buildWifiQrString({
        ssid: wifiSsid,
        password: wifiPassword,
        encryption: wifiEncryption,
        hidden: wifiHidden,
      });
    }
    if (mode === 'email') {
      return buildEmailQrString({ to: emailTo, subject: emailSubject, body: emailBody });
    }
    return buildPhoneQrString(phone);
  }, [mode, textValue, wifiSsid, wifiPassword, wifiEncryption, wifiHidden, emailTo, emailSubject, emailBody, phone]);

  useEffect(() => {
    let cancelled = false;

    async function renderQr() {
      if (!payload) {
        setPngUrl('');
        setSvgMarkup('');
        setErrorMsg('');
        return;
      }

      try {
        const opts = {
          width: size,
          margin: 2,
          errorCorrectionLevel: ecLevel,
          color: {
            dark: darkColor,
            light: lightColor,
          },
        };

        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, payload, opts);
        }

        const [dataUrl, svg] = await Promise.all([
          QRCode.toDataURL(payload, { ...opts, width: Math.max(size, 512) }),
          QRCode.toString(payload, { ...opts, type: 'svg' }),
        ]);

        if (!cancelled) {
          setPngUrl(dataUrl);
          setSvgMarkup(svg);
          setErrorMsg('');
        }
      } catch {
        if (!cancelled) {
          setErrorMsg(
            t({
              en: 'Content is too long for a standard QR code. Shorten your input and try again.',
              hi: 'यह सामग्री मानक QR कोड के लिए बहुत लंबी है। कृपया इसे छोटा करें।',
            })
          );
          setPngUrl('');
          setSvgMarkup('');
        }
      }
    }

    renderQr();
    return () => {
      cancelled = true;
    };
  }, [payload, size, ecLevel, darkColor, lightColor, t]);

  const downloadPng = () => {
    if (!pngUrl) return;
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = `toolora-qr-${mode}.png`;
    a.click();
  };

  const downloadSvg = () => {
    if (!svgMarkup) return;
    const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `toolora-qr-${mode}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const modes: { id: QrMode; label: { en: string; hi: string } }[] = [
    { id: 'text', label: { en: 'URL / Text', hi: 'URL / टेक्स्ट' } },
    { id: 'wifi', label: { en: 'Wi-Fi', hi: 'वाई-फ़ाई' } },
    { id: 'email', label: { en: 'Email', hi: 'ईमेल' } },
    { id: 'phone', label: { en: 'Phone', hi: 'फ़ोन' } },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: Input Controls */}
      <div className="lg:col-span-7 space-y-5">
        <div
          role="tablist"
          aria-label={t({ en: 'QR code type', hi: 'QR कोड प्रकार' })}
          className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 p-1.5 border border-slate-200 dark:border-slate-800"
        >
          {modes.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={mode === m.id}
              onClick={() => setMode(m.id)}
              className={`rounded-lg px-3 py-2 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                mode === m.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t(m.label)}
            </button>
          ))}
        </div>

        {mode === 'text' && (
          <div>
            <label
              htmlFor="qr-text-input"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              {t({ en: 'Website URL or Text', hi: 'वेबसाइट लिंक या टेक्स्ट' })}
            </label>
            <textarea
              id="qr-text-input"
              rows={3}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder="https://example.com"
              className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            />
          </div>
        )}

        {mode === 'wifi' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="qr-wifi-ssid" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t({ en: 'Network Name (SSID)', hi: 'वाई-फ़ाई नेटवर्क का नाम (SSID)' })}
              </label>
              <input
                id="qr-wifi-ssid"
                type="text"
                value={wifiSsid}
                onChange={(e) => setWifiSsid(e.target.value)}
                placeholder="Office_Guest_WiFi"
                className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="qr-wifi-enc" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t({ en: 'Security', hi: 'सुरक्षा प्रकार' })}
                </label>
                <select
                  id="qr-wifi-enc"
                  value={wifiEncryption}
                  onChange={(e) => setWifiEncryption(e.target.value as 'WPA' | 'WEP' | 'nopass')}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2.5 text-sm text-slate-900 dark:text-white"
                >
                  <option value="WPA">WPA / WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">{t({ en: 'None (Open)', hi: 'कोई नहीं (ओपन)' })}</option>
                </select>
              </div>
              {wifiEncryption !== 'nopass' && (
                <div>
                  <label htmlFor="qr-wifi-pass" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t({ en: 'Password', hi: 'पासवर्ड' })}
                  </label>
                  <input
                    id="qr-wifi-pass"
                    type="text"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              )}
            </div>
            <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={wifiHidden}
                onChange={(e) => setWifiHidden(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600"
              />
              {t({ en: 'Hidden SSID network', hi: 'छिपा हुआ (Hidden) नेटवर्क' })}
            </label>
          </div>
        )}

        {mode === 'email' && (
          <div className="space-y-3.5">
            <div>
              <label htmlFor="qr-email-to" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t({ en: 'Recipient Email', hi: 'प्राप्तकर्ता का ईमेल' })}
              </label>
              <input
                id="qr-email-to"
                type="email"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                placeholder="hello@example.com"
                className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="qr-email-subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t({ en: 'Subject (optional)', hi: 'विषय (वैकल्पिक)' })}
              </label>
              <input
                id="qr-email-subject"
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="qr-email-body" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t({ en: 'Message (optional)', hi: 'संदेश (वैकल्पिक)' })}
              </label>
              <textarea
                id="qr-email-body"
                rows={2}
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>
        )}

        {mode === 'phone' && (
          <div>
            <label htmlFor="qr-phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t({ en: 'Phone Number (with country code)', hi: 'फ़ोन नंबर (देश कोड के साथ)' })}
            </label>
            <input
              id="qr-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="mt-1.5 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-2.5 font-mono text-sm text-slate-900 dark:text-white"
            />
          </div>
        )}

        {/* Style & Error Correction */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
              <label htmlFor="qr-size">{t({ en: 'Preview Size', hi: 'आकार' })}</label>
              <span className="font-mono tabular-nums">{size}px</span>
            </div>
            <input
              id="qr-size"
              type="range"
              min={180}
              max={360}
              step={20}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="mt-2 w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div>
            <label htmlFor="qr-ec" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              {t({ en: 'Error Correction', hi: 'एरर करेक्शन स्तर' })}
            </label>
            <select
              id="qr-ec"
              value={ecLevel}
              onChange={(e) => setEcLevel(e.target.value as EcLevel)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-white"
            >
              <option value="L">L — Low (7%)</option>
              <option value="M">M — Medium (15%)</option>
              <option value="Q">Q — Quartile (25%)</option>
              <option value="H">H — High (30%)</option>
            </select>
          </div>

          <div>
            <label htmlFor="qr-fg" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              {t({ en: 'Foreground Color', hi: 'मुख्य रंग' })}
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="qr-fg"
                type="color"
                value={darkColor}
                onChange={(e) => setDarkColor(e.target.value)}
                className="h-9 w-11 rounded border border-slate-300 dark:border-slate-700 cursor-pointer"
              />
              <span className="font-mono text-xs text-slate-600 dark:text-slate-400">{darkColor}</span>
            </div>
          </div>

          <div>
            <label htmlFor="qr-bg" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              {t({ en: 'Background Color', hi: 'पृष्ठभूमि रंग' })}
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                id="qr-bg"
                type="color"
                value={lightColor}
                onChange={(e) => setLightColor(e.target.value)}
                className="h-9 w-11 rounded border border-slate-300 dark:border-slate-700 cursor-pointer"
              />
              <span className="font-mono text-xs text-slate-600 dark:text-slate-400">{lightColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Live QR Preview & Download */}
      <div className="lg:col-span-5 flex flex-col items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6">
        <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
          {t({ en: 'Live Scannable Preview', hi: 'लाइव स्कैन करने योग्य प्रीव्यू' })}
        </div>

        <div className="flex min-h-[240px] w-full items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
          {errorMsg ? (
            <p className="text-sm text-rose-600 dark:text-rose-400 text-center">{errorMsg}</p>
          ) : !payload ? (
            <p className="text-sm text-slate-400 dark:text-slate-500 text-center">
              {t({ en: 'Enter details on the left to generate a QR code.', hi: 'QR कोड बनाने के लिए बाईं ओर विवरण दर्ज करें।' })}
            </p>
          ) : (
            <canvas
              ref={canvasRef}
              data-testid="qr-canvas"
              className="max-w-full h-auto rounded-md"
              aria-label={t({ en: 'Generated QR code', hi: 'बनाया गया QR कोड' })}
            />
          )}
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2.5 w-full">
          <button
            type="button"
            onClick={downloadPng}
            disabled={!pngUrl}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-40 transition-colors whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            PNG
          </button>
          <button
            type="button"
            onClick={downloadSvg}
            disabled={!svgMarkup}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors whitespace-nowrap cursor-pointer disabled:cursor-not-allowed"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            SVG
          </button>
        </div>
      </div>
    </div>
  );
}
