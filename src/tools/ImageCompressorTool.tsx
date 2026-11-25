import { Download, ImagePlus, RotateCcw, Sparkles, Upload } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { calculateSavingsPercent, formatBytes } from '../utils/toolsLogic';

type OutputMime = 'image/webp' | 'image/jpeg' | 'image/png';

interface CompressedState {
  url: string;
  size: number;
  width: number;
  height: number;
}

export function ImageCompressorTool() {
  const { t } = useLanguage();
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState<string>('');
  const [sourceDimensions, setSourceDimensions] = useState<{ w: number; h: number } | null>(null);

  const [quality, setQuality] = useState(75);
  const [format, setFormat] = useState<OutputMime>('image/webp');
  const [maxWidth, setMaxWidth] = useState<number>(0); // 0 = original width

  const [compressed, setCompressed] = useState<CompressedState | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg(
        t({
          en: 'Please select a valid image file (PNG, JPEG, or WebP).',
          hi: 'कृपया एक मान्य इमेज फ़ाइल (PNG, JPEG या WebP) चुनें।',
        })
      );
      return;
    }
    setErrorMsg('');
    setSourceFile(file);
  }, [t]);

  // Create and clean up object URL for original image
  useEffect(() => {
    if (!sourceFile) {
      setSourceUrl('');
      setSourceDimensions(null);
      setCompressed(null);
      return;
    }
    const nextUrl = URL.createObjectURL(sourceFile);
    setSourceUrl(nextUrl);
    return () => {
      URL.revokeObjectURL(nextUrl);
    };
  }, [sourceFile]);

  // Perform browser-side HTML5 Canvas compression whenever file or settings change
  useEffect(() => {
    if (!sourceUrl || !sourceFile) return;

    let cancelled = false;
    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const origW = img.naturalWidth;
      const origH = img.naturalHeight;
      setSourceDimensions({ w: origW, h: origH });

      let targetW = origW;
      let targetH = origH;
      if (maxWidth > 0 && origW > maxWidth) {
        targetW = maxWidth;
        targetH = Math.round((origH * maxWidth) / origW);
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      if (format === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetW, targetH);
      }
      ctx.drawImage(img, 0, 0, targetW, targetH);

      canvas.toBlob(
        (blob) => {
          if (cancelled) return;
          setIsProcessing(false);
          if (!blob) {
            setErrorMsg(
              t({
                en: 'Could not compress this image in the selected format. Try JPEG or PNG.',
                hi: 'इस इमेज को चुने गए फॉर्मेट में कंप्रेस नहीं किया जा सका। JPEG या PNG आज़माएं।',
              })
            );
            return;
          }
          const outUrl = URL.createObjectURL(blob);
          setCompressed((prev) => {
            if (prev?.url) URL.revokeObjectURL(prev.url);
            return {
              url: outUrl,
              size: blob.size,
              width: targetW,
              height: targetH,
            };
          });
        },
        format,
        format === 'image/png' ? undefined : quality / 100
      );
    };

    img.onerror = () => {
      if (!cancelled) {
        setIsProcessing(false);
        setErrorMsg(
          t({
            en: 'Unable to read this image file.',
            hi: 'इस इमेज फ़ाइल को पढ़ा नहीं जा सका।',
          })
        );
      }
    };

    img.src = sourceUrl;

    return () => {
      cancelled = true;
    };
  }, [sourceUrl, sourceFile, quality, format, maxWidth, t]);

  // Clean up compressed URL on unmount
  useEffect(() => {
    return () => {
      if (compressed?.url) URL.revokeObjectURL(compressed.url);
    };
  }, [compressed?.url]);

  // Generates a high-detail photographic-style PNG locally on canvas for instant testing
  const generateSampleImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, 1280, 800);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#1d4ed8');
    grad.addColorStop(1, '#38bdf8');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1280, 800);

    // Rich geometric detail + soft noise texture so PNG vs WebP/JPEG shows genuine compression savings
    for (let i = 0; i < 45; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.03 + (i % 5) * 0.02})`;
      ctx.beginPath();
      ctx.arc((i * 197) % 1280, (i * 131) % 800, 40 + (i % 6) * 28, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px sans-serif';
    ctx.fillText('Toolora Sample Photo', 90, 380);
    ctx.fillStyle = 'rgba(255,255,255,0.82)';
    ctx.font = '28px sans-serif';
    ctx.fillText('1280 × 800 · Generated locally in your browser', 90, 435);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const sampleFile = new File([blob], 'toolora-sample-photo.png', { type: 'image/png' });
      loadFile(sampleFile);
    }, 'image/png');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) loadFile(file);
  };

  const handleDownload = () => {
    if (!compressed || !sourceFile) return;
    const ext = format === 'image/webp' ? 'webp' : format === 'image/jpeg' ? 'jpg' : 'png';
    const baseName = sourceFile.name.replace(/\.[^.]+$/, '');
    const a = document.createElement('a');
    a.href = compressed.url;
    a.download = `${baseName}-compressed.${ext}`;
    a.click();
  };

  const savings =
    sourceFile && compressed ? calculateSavingsPercent(sourceFile.size, compressed.size) : 0;

  return (
    <div className="space-y-6">
      {/* Upload Dropzone */}
      {!sourceFile ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`rounded-xl border-2 border-dashed p-8 sm:p-10 text-center transition-colors ${
            dragActive
              ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/30'
              : 'border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-950/50'
          }`}
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <Upload className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
            {t({ en: 'Drop your image here to compress locally', hi: 'लोकली कंप्रेस करने के लिए अपनी इमेज यहाँ ड्रॉप करें' })}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t({
              en: 'Supports JPG, PNG, and WebP. Your image is never uploaded to any server.',
              hi: 'JPG, PNG और WebP समर्थित हैं। आपकी इमेज कभी सर्वर पर अपलोड नहीं होती।',
            })}
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) loadFile(file);
            }}
            className="sr-only"
            id="image-compressor-file"
          />

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <ImagePlus className="h-4 w-4" aria-hidden="true" />
              {t({ en: 'Choose Image', hi: 'इमेज चुनें' })}
            </button>
            <button
              type="button"
              onClick={generateSampleImage}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {t({ en: 'Try Sample Image', hi: 'नमूना इमेज आज़माएं' })}
            </button>
          </div>

          {errorMsg && (
            <p role="alert" className="mt-4 text-sm font-medium text-rose-600 dark:text-rose-400">
              {errorMsg}
            </p>
          )}
        </div>
      ) : (
        <>
          {/* Controls Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                <label htmlFor="img-quality">{t({ en: 'Quality', hi: 'गुणवत्ता (Quality)' })}</label>
                <span className="font-mono tabular-nums font-bold text-blue-600 dark:text-blue-400">
                  {format === 'image/png' ? 'Lossless' : `${quality}%`}
                </span>
              </div>
              <input
                id="img-quality"
                type="range"
                min={10}
                max={95}
                step={5}
                disabled={format === 'image/png'}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="mt-2.5 w-full accent-blue-600 disabled:opacity-40 cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="img-format" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                {t({ en: 'Output Format', hi: 'आउटपुट फॉर्मेट' })}
              </label>
              <select
                id="img-format"
                value={format}
                onChange={(e) => setFormat(e.target.value as OutputMime)}
                className="mt-1.5 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white"
              >
                <option value="image/webp">WebP ({t({ en: 'Best compression', hi: 'सर्वोत्तम कम्प्रेशन' })})</option>
                <option value="image/jpeg">JPEG (.jpg)</option>
                <option value="image/png">PNG (Lossless)</option>
              </select>
            </div>

            <div>
              <label htmlFor="img-max-width" className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                {t({ en: 'Max Width (optional)', hi: 'अधिकतम चौड़ाई (वैकल्पिक)' })}
              </label>
              <select
                id="img-max-width"
                value={maxWidth}
                onChange={(e) => setMaxWidth(Number(e.target.value))}
                className="mt-1.5 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-white"
              >
                <option value={0}>{t({ en: 'Keep Original Width', hi: 'मूल चौड़ाई रखें' })}</option>
                <option value={1920}>1920px (Full HD)</option>
                <option value={1280}>1280px (Web Hero)</option>
                <option value={800}>800px (Blog / Card)</option>
                <option value={480}>480px (Thumbnail)</option>
              </select>
            </div>
          </div>

          {/* Metrics Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" data-testid="compressor-stats">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {t({ en: 'Original Size', hi: 'मूल आकार' })}
              </div>
              <div className="mt-1 text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                {formatBytes(sourceFile.size)}
              </div>
              {sourceDimensions && (
                <div className="mt-0.5 text-xs font-mono text-slate-400">
                  {sourceDimensions.w} × {sourceDimensions.h}px
                </div>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {t({ en: 'Compressed Size', hi: 'कंप्रेस्ड आकार' })}
              </div>
              <div className="mt-1 text-xl font-bold font-mono tabular-nums text-blue-600 dark:text-blue-400">
                {isProcessing ? '...' : compressed ? formatBytes(compressed.size) : '—'}
              </div>
              {compressed && (
                <div className="mt-0.5 text-xs font-mono text-slate-400">
                  {compressed.width} × {compressed.height}px
                </div>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {t({ en: 'Size Reduction', hi: 'आकार में बचत' })}
              </div>
              <div
                className={`mt-1 text-xl font-bold font-mono tabular-nums ${
                  savings > 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {isProcessing
                  ? '...'
                  : savings >= 0
                  ? `−${savings}%`
                  : `+${Math.abs(savings)}%`}
              </div>
              <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {savings > 0
                  ? t({ en: 'Smaller than original', hi: 'मूल से छोटा' })
                  : t({ en: 'Try lower quality or WebP', hi: 'कम क्वालिटी या WebP चुनें' })}
              </div>
            </div>
          </div>

          {/* Visual Side-by-Side Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <figure className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-950">
              <figcaption className="px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                {t({ en: 'Original', hi: 'मूल इमेज' })} · {sourceFile.name}
              </figcaption>
              <div className="p-3 flex items-center justify-center min-h-[180px] max-h-[280px]">
                {sourceUrl ? (
                  <img
                    src={sourceUrl}
                    alt={t({ en: 'Original uploaded image', hi: 'मूल अपलोड की गई इमेज' })}
                    className="max-h-[250px] w-auto object-contain rounded"
                  />
                ) : (
                  <span className="text-sm text-slate-400">
                    {t({ en: 'Loading preview...', hi: 'प्रीव्यू लोड हो रहा है...' })}
                  </span>
                )}
              </div>
            </figure>

            <figure className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-950">
              <figcaption className="px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                {t({ en: 'Compressed Preview', hi: 'कंप्रेस्ड प्रीव्यू' })}
              </figcaption>
              <div className="p-3 flex items-center justify-center min-h-[180px] max-h-[280px]">
                {compressed ? (
                  <img
                    src={compressed.url}
                    alt={t({ en: 'Compressed output image', hi: 'कंप्रेस की गई आउटपुट इमेज' })}
                    className="max-h-[250px] w-auto object-contain rounded"
                  />
                ) : (
                  <span className="text-sm text-slate-400">
                    {t({ en: 'Processing...', hi: 'प्रोसेस हो रहा है...' })}
                  </span>
                )}
              </div>
            </figure>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!compressed || isProcessing}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-40 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              {t({ en: 'Download Compressed Image', hi: 'कंप्रेस्ड इमेज डाउनलोड करें' })}
            </button>
            <button
              type="button"
              onClick={() => {
                setSourceFile(null);
                setCompressed(null);
                setErrorMsg('');
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {t({ en: 'Compress Another Image', hi: 'दूसरी इमेज चुनें' })}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
