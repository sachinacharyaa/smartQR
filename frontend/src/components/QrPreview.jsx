import { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

const defaultOptions = {
  width: 280,
  height: 280,
  margin: 8,
  data: 'https://smartqr.io',
  image: null,
  dotsOptions: { color: '#1f4bd8', type: 'rounded' },
  cornersSquareOptions: { color: '#1f4bd8', type: 'extra-rounded' },
  cornersDotOptions: { color: '#1f4bd8', type: 'dot' },
  backgroundOptions: { color: '#ffffff' },
  imageOptions: { crossOrigin: 'anonymous', margin: 6 }
};

export default function QrPreview({ data, style, size = 280, onReady, loading }) {
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
    const next = {
      ...defaultOptions,
      data: data || defaultOptions.data,
      width: size,
      height: size,
      image: style.logo || null,
      dotsOptions: {
        color: style.dotsColor || '#1f4bd8',
        type: style.pattern || 'rounded'
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
    };
    qrRef.current.update(next);
  }, [data, style, size]);

  return (
    <div className="qr-preview">
      <div className="qr-preview__code" ref={containerRef} />
      {loading && (
        <div className="qr-loading">
          <div className="spinner" />
          <span>Generating QR...</span>
        </div>
      )}
    </div>
  );
}
