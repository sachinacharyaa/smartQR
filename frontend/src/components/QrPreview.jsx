import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

const defaultOptions = {
  width: 220,
  height: 220,
  margin: 6,
  data: 'https://smartqr.io',
  image: null,
  dotsOptions: { color: '#1f4bd8', type: 'rounded' },
  cornersSquareOptions: { color: '#1f4bd8', type: 'extra-rounded' },
  cornersDotOptions: { color: '#1f4bd8', type: 'dot' },
  backgroundOptions: { color: '#ffffff' },
  imageOptions: { crossOrigin: 'anonymous', margin: 6 }
};

// Maps frameChoice → { wrapperClass, labelText, labelClass }
const FRAME_MAP = {
  'frame-none':     { wrapperClass: '',                   labelText: null },
  'frame-simple':   { wrapperClass: 'qr-frame qr-frame--simple',   labelText: 'SCAN ME' },
  'frame-bold':     { wrapperClass: 'qr-frame qr-frame--bold',     labelText: 'SCAN ME' },
  'frame-rounded':  { wrapperClass: 'qr-frame qr-frame--rounded',  labelText: 'SCAN ME' },
  'frame-circle':   { wrapperClass: 'qr-frame qr-frame--circle',   labelText: 'SCAN ME' },
  'frame-dark':     { wrapperClass: 'qr-frame qr-frame--dark',     labelText: 'SCAN ME', darkLabel: true },
  'frame-elegant':  { wrapperClass: 'qr-frame qr-frame--elegant',  labelText: 'SCAN ME' },
  'frame-tag':      { wrapperClass: 'qr-frame qr-frame--tag',      labelText: 'SCAN ME', pill: true },
  'frame-dotted':   { wrapperClass: 'qr-frame qr-frame--dotted',   labelText: 'SCAN ME' },
  'frame-double':   { wrapperClass: 'qr-frame qr-frame--double',   labelText: 'SCAN ME' },
  'frame-shadow':   { wrapperClass: 'qr-frame qr-frame--shadow',   labelText: 'SCAN ME' },
  'frame-minimal':  { wrapperClass: 'qr-frame qr-frame--minimal',  labelText: 'SCAN ME' },
};

const DOTS_TYPE_MAP = {
  'scatter-blocks': 'rounded',
  'stack-bars': 'classy-rounded',
  'chunky-mix': 'classy',
  'ink-splash': 'extra-rounded',
  'orbit-dots': 'dots',
  'diamond-grid': 'square',
  square: 'square',
  dots: 'dots',
  rounded: 'rounded',
  classy: 'classy',
  'classy-rounded': 'classy-rounded',
  'extra-rounded': 'extra-rounded'
};

export default function QrPreview({ data, style = {}, size = 220, onReady, loading }) {
  const containerRef = useRef(null);
  const qrRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling({
        ...defaultOptions,
        width: size,
        height: size
      });
      qrRef.current.append(containerRef.current);
      if (onReady) onReady(qrRef.current);
    }
  }, [size, onReady]);

  useEffect(() => {
    if (!qrRef.current) return;
    const dotsType = DOTS_TYPE_MAP[style.pattern] || 'rounded';
    qrRef.current.update({
      ...defaultOptions,
      data: data || defaultOptions.data,
      width: size,
      height: size,
      image: style.logo || null,
      dotsOptions: {
        color: style.dotsColor || '#1f4bd8',
        type: dotsType
      },
      cornersSquareOptions: {
        color: style.eyeColor || '#1f4bd8',
        type: style.eyeSquare || 'extra-rounded'
      },
      cornersDotOptions: {
        color: style.eyeColor || '#1f4bd8',
        type: style.eyeDot || 'dot'
      },
      backgroundOptions: {
        color: style.backgroundColor || '#ffffff'
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: style.logoMargin ?? 6
      }
    });
  }, [data, style, size]);

  const frameKey = style.frameChoice || 'frame-none';
  const frame = FRAME_MAP[frameKey] || FRAME_MAP['frame-none'];

  return (
    <div className={loading ? 'qr-preview qr-preview--loading' : 'qr-preview'}>
      <div className={frame.wrapperClass || 'qr-frame-bare'}>
        <div className="qr-preview__code" ref={containerRef} />
        {frame.labelText && (
          frame.pill
            ? <div className="qr-frame__pill-label">{frame.labelText}</div>
            : <div className={`qr-frame__label${frame.darkLabel ? ' qr-frame__label--dark' : ''}`}>{frame.labelText}</div>
        )}
      </div>
      {loading && (
        <div className="qr-loading">
          <div className="qr-loading__scan" />
          <div className="spinner" />
          <span>Generating QR...</span>
          <div className="qr-loading__dots">
            <span /><span /><span />
          </div>
        </div>
      )}
    </div>
  );
}
