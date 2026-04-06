import { useMemo, useState } from 'react';
import QrPreview from './QrPreview.jsx';

const tabItems = [
  { key: 'Pattern', label: 'Pattern', icon: 'pattern' },
  { key: 'Eyes', label: 'Eyes', icon: 'eyes' },
  { key: 'Logo', label: 'Logo', icon: 'logo' },
  { key: 'Colors', label: 'Colors', icon: 'colors' },
  { key: 'Frame', label: 'Frame', icon: 'frame' },
  { key: 'Templates', label: 'Templates', icon: 'templates' }
];

// Pattern options with qr-code-styling compatible types
const patternOptions = [
  { id: 'square', label: 'Square' },
  { id: 'dots', label: 'Dots' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'classy', label: 'Classy' },
  { id: 'classy-rounded', label: 'Classy Rounded' },
  { id: 'extra-rounded', label: 'Extra Rounded' }
];

// Eye outer frame styles
const eyeOuterOptions = [
  { id: 'square', label: 'Square' },
  { id: 'extra-rounded', label: 'Rounded' },
  { id: 'dot', label: 'Circle' }
];

// Eye inner dot styles
const eyeInnerOptions = [
  { id: 'square', label: 'Square' },
  { id: 'dot', label: 'Dot' }
];

// Combined eye combos for display
const eyeCombos = [
  { outer: 'square', inner: 'square', label: 'Square/Square' },
  { outer: 'square', inner: 'dot', label: 'Square/Dot' },
  { outer: 'extra-rounded', inner: 'square', label: 'Rounded/Square' },
  { outer: 'dot', inner: 'dot', label: 'Circle/Circle' },
  { outer: 'dot', inner: 'square', label: 'Circle/Square' },
  { outer: 'extra-rounded', inner: 'dot', label: 'Rounded/Dot' },
  { outer: 'square', inner: 'square', label: 'Default' },
  { outer: 'extra-rounded', inner: 'extra-rounded', label: 'Soft' }
];

const frameOptions = [
  { id: 'frame-none', label: 'No Frame' },
  { id: 'frame-simple', label: 'Simple' },
  { id: 'frame-bold', label: 'Bold' },
  { id: 'frame-rounded', label: 'Rounded' },
  { id: 'frame-circle', label: 'Circle' },
  { id: 'frame-dark', label: 'Dark' },
  { id: 'frame-elegant', label: 'Elegant' },
  { id: 'frame-tag', label: 'Tag' },
  { id: 'frame-dotted', label: 'Dotted' },
  { id: 'frame-double', label: 'Double' },
  { id: 'frame-shadow', label: 'Shadow' },
  { id: 'frame-minimal', label: 'Minimal' }
];

const templatePresets = [
  { id: 'temp-classic', label: 'Classic', colors: { dots: '#000000', bg: '#ffffff', eye: '#000000' }, pattern: 'square' },
  { id: 'temp-ocean', label: 'Ocean', colors: { dots: '#0077b6', bg: '#caf0f8', eye: '#023e8a' }, pattern: 'rounded' },
  { id: 'temp-sunset', label: 'Sunset', colors: { dots: '#e63946', bg: '#f1faee', eye: '#e63946' }, pattern: 'dots' },
  { id: 'temp-forest', label: 'Forest', colors: { dots: '#2d6a4f', bg: '#d8f3dc', eye: '#1b4332' }, pattern: 'classy' },
  { id: 'temp-royal', label: 'Royal', colors: { dots: '#7b2cbf', bg: '#f3e8ff', eye: '#5a189a' }, pattern: 'extra-rounded' },
  { id: 'temp-midnight', label: 'Midnight', colors: { dots: '#e0e0e0', bg: '#1a1a2e', eye: '#e94560' }, pattern: 'rounded' },
  { id: 'temp-coral', label: 'Coral', colors: { dots: '#ff6b6b', bg: '#fff5f5', eye: '#c92a2a' }, pattern: 'dots' },
  { id: 'temp-gold', label: 'Gold', colors: { dots: '#b8860b', bg: '#fffde7', eye: '#8b6914' }, pattern: 'classy' },
  { id: 'temp-teal', label: 'Teal', colors: { dots: '#009688', bg: '#e0f2f1', eye: '#00695c' }, pattern: 'extra-rounded' },
  { id: 'temp-berry', label: 'Berry', colors: { dots: '#ad1457', bg: '#fce4ec', eye: '#880e4f' }, pattern: 'rounded' },
  { id: 'temp-slate', label: 'Slate', colors: { dots: '#37474f', bg: '#eceff1', eye: '#263238' }, pattern: 'square' },
  { id: 'temp-neon', label: 'Neon', colors: { dots: '#00e676', bg: '#1b1b2f', eye: '#76ff03' }, pattern: 'dots' }
];

// Social media logos with proper colors
const socialLogos = [
  { id: 'facebook', label: 'FB', color: '#1877F2', icon: 'f' },
  { id: 'instagram', label: 'IG', color: '#E4405F', icon: '📷' },
  { id: 'pinterest', label: 'Pin', color: '#E60023', icon: 'P' },
  { id: 'x-twitter', label: 'X', color: '#000000', icon: '𝕏' },
  { id: 'youtube', label: 'YT', color: '#FF0000', icon: '▶' },
  { id: 'snapchat', label: 'SC', color: '#FFFC00', icon: '👻', textColor: '#000' },
  { id: 'tiktok', label: 'TT', color: '#000000', icon: '♪' },
  { id: 'linkedin', label: 'LI', color: '#0A66C2', icon: 'in' },
  { id: 'whatsapp', label: 'WA', color: '#25D366', icon: '📱' },
  { id: 'telegram', label: 'TG', color: '#26A5E4', icon: '✈' },
  { id: 'scan-me', label: 'ME', color: '#ffffff', icon: 'SCAN', textColor: '#000', border: true },
  { id: 'docs', label: 'Doc', color: '#4285F4', icon: '📄' },
  { id: 'maps', label: 'Maps', color: '#34A853', icon: '📍' },
  { id: 'playstore', label: 'Play', color: '#414141', icon: '▷' },
  { id: 'gmail', label: 'GM', color: '#EA4335', icon: 'M' },
  { id: 'paypal', label: 'PP', color: '#003087', icon: 'PP' },
  { id: 'vimeo', label: 'V', color: '#1AB7EA', icon: 'V' },
  { id: 'spotify', label: 'SP', color: '#1DB954', icon: '♫' },
  { id: 'wechat', label: 'WC', color: '#07C160', icon: '💬' },
  { id: 'yelp', label: 'YP', color: '#FF1A1A', icon: '★' }
];

/* ─── SVG Pattern Thumbnails ─── */
function PatternThumb({ type }) {
  const s = 80;
  if (type === 'square') {
    return (
      <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, c) => {
            const on = (r + c) % 2 === 0 || (r < 3 && c < 3) || (r < 3 && c > 3) || (r > 3 && c < 3);
            return on ? <rect key={`${r}-${c}`} x={c * 11 + 2} y={r * 11 + 2} width={10} height={10} rx={0} fill="#111" /> : null;
          })
        )}
      </svg>
    );
  }
  if (type === 'dots') {
    return (
      <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, c) => {
            const on = (r * 7 + c) % 3 !== 1;
            return on ? <circle key={`${r}-${c}`} cx={c * 11 + 7} cy={r * 11 + 7} r={4.5} fill="#111" /> : null;
          })
        )}
      </svg>
    );
  }
  if (type === 'rounded') {
    return (
      <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, c) => {
            const on = (r + c) % 3 !== 2;
            return on ? <rect key={`${r}-${c}`} x={c * 11 + 2} y={r * 11 + 2} width={10} height={10} rx={3} fill="#111" /> : null;
          })
        )}
      </svg>
    );
  }
  if (type === 'classy') {
    return (
      <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 6 }).map((_, c) => {
            const on = (r + c) % 2 === 0;
            return on ? <rect key={`${r}-${c}`} x={c * 13 + 2} y={r * 13 + 2} width={12} height={12} rx={1} fill="#111" /> : null;
          })
        )}
      </svg>
    );
  }
  if (type === 'classy-rounded') {
    return (
      <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 6 }).map((_, c) => {
            const on = (r * 6 + c) % 2 === 0;
            return on ? <rect key={`${r}-${c}`} x={c * 13 + 2} y={r * 13 + 2} width={12} height={12} rx={4} fill="#111" /> : null;
          })
        )}
      </svg>
    );
  }
  // extra-rounded
  return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 7 }).map((_, c) => {
          const on = (r + c + r * c) % 3 !== 0;
          return on ? <circle key={`${r}-${c}`} cx={c * 11 + 7} cy={r * 11 + 7} r={5} fill="#111" /> : null;
        })
      )}
    </svg>
  );
}

/* ─── SVG Eye Thumbnail ─── */
function EyeThumb({ outer, inner }) {
  const s = 70;
  let outerEl, innerEl;

  // Outer shape
  if (outer === 'square') {
    outerEl = <rect x={5} y={5} width={60} height={60} rx={4} fill="none" stroke="#111" strokeWidth={8} />;
  } else if (outer === 'extra-rounded') {
    outerEl = <rect x={5} y={5} width={60} height={60} rx={16} fill="none" stroke="#111" strokeWidth={8} />;
  } else if (outer === 'dot') {
    outerEl = <circle cx={35} cy={35} r={28} fill="none" stroke="#111" strokeWidth={8} />;
  } else {
    outerEl = <rect x={5} y={5} width={60} height={60} rx={8} fill="none" stroke="#111" strokeWidth={8} />;
  }

  // Inner shape
  if (inner === 'dot') {
    innerEl = <circle cx={35} cy={35} r={12} fill="#111" />;
  } else if (inner === 'extra-rounded') {
    innerEl = <rect x={23} y={23} width={24} height={24} rx={8} fill="#111" />;
  } else {
    innerEl = <rect x={22} y={22} width={26} height={26} rx={3} fill="#111" />;
  }

  return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      {outerEl}
      {innerEl}
    </svg>
  );
}

/* ─── SVG Frame Thumbnail ─── */
function FrameThumb({ type, label }) {
  const s = 90;
  // shared mini-QR placeholder
  const qr = (
    <g>
      <rect x={28} y={14} width={34} height={34} rx={2} fill="#e8edf8" />
      {/* 3 corner eyes */}
      <rect x={30} y={16} width={8} height={8} rx={1} fill="none" stroke="#1f4bd8" strokeWidth={1.5} />
      <rect x={32} y={18} width={4} height={4} fill="#1f4bd8" />
      <rect x={50} y={16} width={8} height={8} rx={1} fill="none" stroke="#1f4bd8" strokeWidth={1.5} />
      <rect x={52} y={18} width={4} height={4} fill="#1f4bd8" />
      <rect x={30} y={30} width={8} height={8} rx={1} fill="none" stroke="#1f4bd8" strokeWidth={1.5} />
      <rect x={32} y={32} width={4} height={4} fill="#1f4bd8" />
      {/* dots */}
      {[42, 47, 52, 57].map((x) => [22, 26, 30, 34, 38].map((yo) => (
        <rect key={`${x}-${yo}`} x={x} y={yo + 14} width={2.5} height={2.5} rx={0.5} fill="#1f4bd8" opacity="0.5" />
      )))}
    </g>
  );

  // No frame — crossed out box
  if (type === 'frame-none') return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      <rect x={8} y={8} width={74} height={74} rx={4} fill="none" stroke="#ccc" strokeWidth={1.5} strokeDasharray="4 3" />
      <line x1={20} y1={20} x2={70} y2={70} stroke="#ddd" strokeWidth={2} />
      <line x1={70} y1={20} x2={20} y2={70} stroke="#ddd" strokeWidth={2} />
      <text x={45} y={86} textAnchor="middle" fontSize={7} fill="#999">{label}</text>
    </svg>
  );

  if (type === 'frame-simple') return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      <rect x={5} y={4} width={80} height={72} rx={3} fill="none" stroke="#333" strokeWidth={2} />
      {qr}
      <text x={45} y={82} textAnchor="middle" fontSize={7} fill="#333" fontWeight="600">SCAN ME</text>
      <text x={45} y={92} textAnchor="middle" fontSize={6} fill="#999">{label}</text>
    </svg>
  );

  if (type === 'frame-bold') return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      <rect x={4} y={3} width={82} height={74} rx={4} fill="none" stroke="#111" strokeWidth={4} />
      {qr}
      <text x={45} y={83} textAnchor="middle" fontSize={7.5} fill="#111" fontWeight="800">SCAN ME</text>
      <text x={45} y={92} textAnchor="middle" fontSize={6} fill="#999">{label}</text>
    </svg>
  );

  if (type === 'frame-rounded') return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      <rect x={5} y={4} width={80} height={72} rx={18} fill="none" stroke="#333" strokeWidth={2.5} />
      {qr}
      <text x={45} y={82} textAnchor="middle" fontSize={7} fill="#333" fontWeight="600">SCAN ME</text>
      <text x={45} y={92} textAnchor="middle" fontSize={6} fill="#999">{label}</text>
    </svg>
  );

  if (type === 'frame-circle') return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      <ellipse cx={45} cy={39} rx={38} ry={36} fill="none" stroke="#333" strokeWidth={2.5} />
      {qr}
      <text x={45} y={82} textAnchor="middle" fontSize={7} fill="#333" fontWeight="600">SCAN ME</text>
      <text x={45} y={92} textAnchor="middle" fontSize={6} fill="#999">{label}</text>
    </svg>
  );

  if (type === 'frame-dark') return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      <rect x={4} y={3} width={82} height={74} rx={6} fill="#1a1a2e" />
      {/* re-render qr with white bg */}
      <rect x={28} y={14} width={34} height={34} rx={2} fill="#fff" />
      <rect x={30} y={16} width={8} height={8} rx={1} fill="none" stroke="#e94560" strokeWidth={1.5} />
      <rect x={32} y={18} width={4} height={4} fill="#e94560" />
      <rect x={50} y={16} width={8} height={8} rx={1} fill="none" stroke="#e94560" strokeWidth={1.5} />
      <rect x={52} y={18} width={4} height={4} fill="#e94560" />
      <rect x={30} y={30} width={8} height={8} rx={1} fill="none" stroke="#e94560" strokeWidth={1.5} />
      <rect x={32} y={32} width={4} height={4} fill="#e94560" />
      <text x={45} y={82} textAnchor="middle" fontSize={7} fill="#e0e0e0" fontWeight="700">SCAN ME</text>
      <text x={45} y={92} textAnchor="middle" fontSize={6} fill="#999">{label}</text>
    </svg>
  );

  if (type === 'frame-elegant') return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      <rect x={5} y={4} width={80} height={72} rx={3} fill="none" stroke="#333" strokeWidth={1.5} />
      <rect x={8} y={7} width={74} height={66} rx={2} fill="none" stroke="#555" strokeWidth={0.5} />
      {qr}
      <text x={45} y={82} textAnchor="middle" fontSize={7} fill="#333" fontFamily="serif" fontWeight="600" fontStyle="italic">SCAN ME</text>
      <text x={45} y={92} textAnchor="middle" fontSize={6} fill="#999">{label}</text>
    </svg>
  );

  if (type === 'frame-tag') return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      <rect x={5} y={4} width={80} height={64} rx={3} fill="none" stroke="#333" strokeWidth={2} />
      {qr}
      <rect x={16} y={70} width={58} height={16} rx={8} fill="#1f4bd8" />
      <text x={45} y={82} textAnchor="middle" fontSize={7} fill="#fff" fontWeight="700">SCAN ME</text>
      <text x={45} y={93} textAnchor="middle" fontSize={6} fill="#999">{label}</text>
    </svg>
  );

  if (type === 'frame-dotted') return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      <rect x={5} y={4} width={80} height={72} rx={3} fill="none" stroke="#333" strokeWidth={2} strokeDasharray="4 3" />
      {qr}
      <text x={45} y={82} textAnchor="middle" fontSize={7} fill="#333" fontWeight="600">SCAN ME</text>
      <text x={45} y={92} textAnchor="middle" fontSize={6} fill="#999">{label}</text>
    </svg>
  );

  if (type === 'frame-double') return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      <rect x={4} y={3} width={82} height={74} rx={4} fill="none" stroke="#222" strokeWidth={2.5} />
      <rect x={8} y={7} width={74} height={66} rx={3} fill="none" stroke="#222" strokeWidth={1} />
      {qr}
      <text x={45} y={82} textAnchor="middle" fontSize={7} fill="#222" fontWeight="600">SCAN ME</text>
      <text x={45} y={92} textAnchor="middle" fontSize={6} fill="#999">{label}</text>
    </svg>
  );

  if (type === 'frame-shadow') return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      <rect x={9} y={7} width={78} height={72} rx={4} fill="#d0d5e0" />
      <rect x={5} y={3} width={78} height={72} rx={4} fill="#fff" stroke="#ccc" strokeWidth={1.5} />
      {qr}
      <text x={44} y={81} textAnchor="middle" fontSize={7} fill="#333" fontWeight="600">SCAN ME</text>
      <text x={44} y={92} textAnchor="middle" fontSize={6} fill="#999">{label}</text>
    </svg>
  );

  // frame-minimal — corner brackets only
  return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
      {/* TL */}<path d="M8,20 L8,6 L22,6" fill="none" stroke="#333" strokeWidth={2.5} strokeLinecap="round" />
      {/* TR */}<path d="M68,6 L82,6 L82,20" fill="none" stroke="#333" strokeWidth={2.5} strokeLinecap="round" />
      {/* BL */}<path d="M8,58 L8,72 L22,72" fill="none" stroke="#333" strokeWidth={2.5} strokeLinecap="round" />
      {/* BR */}<path d="M68,72 L82,72 L82,58" fill="none" stroke="#333" strokeWidth={2.5} strokeLinecap="round" />
      {qr}
      <text x={45} y={83} textAnchor="middle" fontSize={7} fill="#333" fontWeight="600">SCAN ME</text>
      <text x={45} y={93} textAnchor="middle" fontSize={6} fill="#999">{label}</text>
    </svg>
  );
}

function TabIcon({ name }) {
  if (name === 'pattern') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4h5v5H4zM11 4h2v2h-2zM15 4h5v5h-5zM4 11h2v2H4zM8 11h3v3H8zM13 11h2v2h-2zM18 11h2v2h-2zM4 15h5v5H4zM11 18h2v2h-2zM15 15h5v5h-5z" fill="currentColor" opacity="0.85" />
      </svg>
    );
  }
  if (name === 'eyes') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="currentColor" />
      </svg>
    );
  }
  if (name === 'logo') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 16l3-4 2 2 3-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="9" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (name === 'colors') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-1 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.96-4.48-9-10-9z" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="7.5" cy="11.5" r="1.5" fill="currentColor" />
        <circle cx="10.5" cy="7.5" r="1.5" fill="currentColor" />
        <circle cx="15" cy="7.5" r="1.5" fill="currentColor" />
        <circle cx="17" cy="11.5" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (name === 'frame') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 7V3h4M21 7V3h-4M3 17v4h4M21 17v4h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="7" y="7" width="10" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="3" width="8" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="13" width="8" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <rect x="13" y="13" width="8" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function StepTwo({
  activeTab,
  setActiveTab,
  style,
  setStyle,
  data,
  onDownload,
  onSaveTemplate,
  onReady,
  downloadExt,
  setDownloadExt,
  loading
}) {
  const [colorMode, setColorMode] = useState('solid');
  const [customEyeColor, setCustomEyeColor] = useState(true);
  const [transparentBg, setTransparentBg] = useState(false);
  const [gradientColor2, setGradientColor2] = useState('#ff6b6b');
  const [eyeColor2, setEyeColor2] = useState('#f30505');

  const updateStyle = (key, value) => setStyle(prev => ({ ...prev, [key]: value }));
  const updateMultiStyle = (obj) => setStyle(prev => ({ ...prev, ...obj }));

  const tabContent = useMemo(() => {
    /* ───── PATTERN TAB ───── */
    if (activeTab === 'Pattern') {
      return (
        <div>
          <div className="info-row">
            <span className="info-dot">i</span>
            You can customize these templates later to match your brand
          </div>
          <div className="pattern-grid">
            {patternOptions.map((opt) => (
              <button
                key={opt.id}
                className={style.pattern === opt.id ? 'pattern-card pattern-card--active' : 'pattern-card'}
                onClick={() => updateStyle('pattern', opt.id)}
                title={opt.label}
              >
                <PatternThumb type={opt.id} />
              </button>
            ))}
          </div>
        </div>
      );
    }

    /* ───── EYES TAB ───── */
    if (activeTab === 'Eyes') {
      return (
        <div>
          <div className="info-row">
            <span className="info-dot">i</span>
            Select eyes to make your QR code stand out. Eyes are what your camera recognizes when scanning.
          </div>
          <div className="eye-grid">
            {eyeCombos.map((combo, i) => {
              const isActive = style.eyeSquare === combo.outer && style.eyeDot === combo.inner;
              return (
                <button
                  key={i}
                  className={isActive ? 'eye-card eye-card--active' : 'eye-card'}
                  onClick={() => updateMultiStyle({ eyeSquare: combo.outer, eyeDot: combo.inner })}
                  title={combo.label}
                >
                  <EyeThumb outer={combo.outer} inner={combo.inner} />
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    /* ───── LOGO TAB ───── */
    if (activeTab === 'Logo') {
      return (
        <div>
          <div className="info-row">
            <span className="info-dot">i</span>
            With this QR code generator with logo, you can easily add your logo for stronger brand recall (300 × 300px, 72dpi)
          </div>
          <div className="logo-upload">
            <div className="logo-upload__preview">
              {style.logo ? (
                <img src={style.logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }} />
              ) : (
                <>SCAN<br />ME</>
              )}
            </div>
            <div className="logo-upload__actions">
              <label className="upload-btn">
                Upload
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => updateStyle('logo', reader.result);
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
              <button className="ghost" onClick={() => updateStyle('logo', null)}>Remove logo</button>
            </div>
            <div className="logo-upload__formats">
              <p>Supported formats:</p>
              <div className="logo-upload__format-tags">
                <span>PNG</span>
                <span>JPG</span>
              </div>
            </div>
          </div>

          <h4 className="logo-section-title">Or use our available logos:</h4>
          <div className="logo-grid">
            {socialLogos.map((item) => (
              <button
                key={item.id}
                className={style.logoPreset === item.id ? 'social-logo-btn social-logo-btn--active' : 'social-logo-btn'}
                onClick={() => updateStyle('logoPreset', item.id)}
                title={item.label}
                style={{
                  background: item.color,
                  color: item.textColor || '#fff',
                  border: item.border ? '1.5px solid #d6dee9' : '1.5px solid transparent'
                }}
              >
                <span className="social-logo-icon">{item.icon}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    /* ───── COLORS TAB ───── */
    if (activeTab === 'Colors') {
      return (
        <div>
          <div className="info-row">
            <span className="info-dot">i</span>
            Embellish your customized QR with your brand colors
          </div>

          <div className="color-mode">
            <label className="color-mode__label">
              <input
                type="radio"
                name="colormode"
                checked={colorMode === 'solid'}
                onChange={() => setColorMode('solid')}
              />
              <span>Solid Color</span>
            </label>
            <label className="color-mode__label">
              <input
                type="radio"
                name="colormode"
                checked={colorMode === 'gradient'}
                onChange={() => setColorMode('gradient')}
              />
              <span>Gradient</span>
            </label>
            <label className="color-mode__label color-mode__checkbox">
              <input
                type="checkbox"
                checked={customEyeColor}
                onChange={(e) => setCustomEyeColor(e.target.checked)}
              />
              <span>Custom Eye Color</span>
            </label>
          </div>

          {/* Main color */}
          <div className="color-field">
            <div className="color-row">
              <input
                type="color"
                value={style.dotsColor}
                onChange={(e) => updateStyle('dotsColor', e.target.value)}
                className="color-swatch"
              />
              <input
                type="text"
                value={style.dotsColor}
                onChange={(e) => updateStyle('dotsColor', e.target.value)}
                className="color-hex"
              />
            </div>
          </div>

          {colorMode === 'gradient' && (
            <div className="color-field" style={{ marginTop: '0.5rem' }}>
              <label className="color-field__label">Gradient end color</label>
              <div className="color-row">
                <input
                  type="color"
                  value={gradientColor2}
                  onChange={(e) => setGradientColor2(e.target.value)}
                  className="color-swatch"
                />
                <input
                  type="text"
                  value={gradientColor2}
                  onChange={(e) => setGradientColor2(e.target.value)}
                  className="color-hex"
                />
              </div>
            </div>
          )}

          {/* Eye color section */}
          {customEyeColor && (
            <div className="color-section">
              <label className="color-field__label">Eye color</label>
              <div className="eye-color-row">
                <div className="color-row">
                  <input
                    type="color"
                    value={style.eyeColor}
                    onChange={(e) => updateStyle('eyeColor', e.target.value)}
                    className="color-swatch"
                  />
                  <input
                    type="text"
                    value={style.eyeColor}
                    onChange={(e) => updateStyle('eyeColor', e.target.value)}
                    className="color-hex"
                  />
                </div>
                <button
                  className="swap-btn"
                  onClick={() => {
                    const temp = style.eyeColor;
                    updateStyle('eyeColor', eyeColor2);
                    setEyeColor2(temp);
                  }}
                  title="Swap colors"
                >
                  ⇄
                </button>
                <div className="color-row">
                  <input
                    type="color"
                    value={eyeColor2}
                    onChange={(e) => setEyeColor2(e.target.value)}
                    className="color-swatch"
                  />
                  <input
                    type="text"
                    value={eyeColor2}
                    onChange={(e) => setEyeColor2(e.target.value)}
                    className="color-hex"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Background */}
          <div className="color-section">
            <label className="color-field__label">Background</label>
            <div className="color-row">
              <input
                type="color"
                value={style.backgroundColor}
                onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                className="color-swatch"
                disabled={transparentBg}
              />
              <input
                type="text"
                value={transparentBg ? 'transparent' : style.backgroundColor}
                onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                className="color-hex"
                disabled={transparentBg}
              />
            </div>
          </div>

          <label className="toggle-row" style={{ marginTop: '0.75rem' }}>
            <input
              type="checkbox"
              checked={transparentBg}
              onChange={(e) => {
                setTransparentBg(e.target.checked);
                if (e.target.checked) updateStyle('backgroundColor', 'transparent');
                else updateStyle('backgroundColor', '#ffffff');
              }}
            />
            Transparent background
          </label>
        </div>
      );
    }

    /* ───── FRAME TAB ───── */
    if (activeTab === 'Frame') {
      return (
        <div>
          <div className="info-row">
            <span className="info-dot">i</span>
            A quick response code with a frame and call-to-action gets 80% more scans
          </div>
          <div className="frame-grid">
            {frameOptions.map((opt) => (
              <button
                key={opt.id}
                className={style.frameChoice === opt.id ? 'frame-card frame-card--active' : 'frame-card'}
                onClick={() => updateStyle('frameChoice', opt.id)}
                title={opt.label}
              >
                <FrameThumb type={opt.id} label={opt.label} />
              </button>
            ))}
          </div>
        </div>
      );
    }

    /* ───── TEMPLATES TAB ───── */
    return (
      <div>
        <div className="info-row">
          <span className="info-dot">i</span>
          Choose a ready-made template to quickly style your QR code
        </div>
        <div className="template-grid">
          {templatePresets.map((t) => (
            <button
              key={t.id}
              className={style.template === t.id ? 'template-card template-card--active' : 'template-card'}
              onClick={() =>
                updateMultiStyle({
                  template: t.id,
                  dotsColor: t.colors.dots,
                  backgroundColor: t.colors.bg,
                  eyeColor: t.colors.eye,
                  pattern: t.pattern
                })
              }
              title={t.label}
            >
              <div
                className="template-thumb"
                style={{ background: t.colors.bg, borderColor: t.colors.dots }}
              >
                <svg viewBox="0 0 60 60" width="50" height="50">
                  {/* Mini QR representation */}
                  <rect x={2} y={2} width={16} height={16} rx={2} fill="none" stroke={t.colors.eye} strokeWidth={3} />
                  <rect x={6} y={6} width={8} height={8} rx={1} fill={t.colors.eye} />
                  <rect x={42} y={2} width={16} height={16} rx={2} fill="none" stroke={t.colors.eye} strokeWidth={3} />
                  <rect x={46} y={6} width={8} height={8} rx={1} fill={t.colors.eye} />
                  <rect x={2} y={42} width={16} height={16} rx={2} fill="none" stroke={t.colors.eye} strokeWidth={3} />
                  <rect x={6} y={46} width={8} height={8} rx={1} fill={t.colors.eye} />
                  {/* Dots */}
                  {[22,30,38].map(x => [22,30,38].map(y => (
                    <circle key={`${x}-${y}`} cx={x} cy={y} r={3} fill={t.colors.dots} />
                  )))}
                  {[22,30,38,46].map(x => (
                    <rect key={`b${x}`} x={x} y={48} width={5} height={5} rx={1} fill={t.colors.dots} opacity={0.6} />
                  ))}
                </svg>
              </div>
              <span className="template-label">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }, [activeTab, style, colorMode, customEyeColor, transparentBg, gradientColor2, eyeColor2]);

  return (
    <div className="step-card step-card--flat">
      <div className="step-head">
        <span className="step-pill">Step 2</span>
        <h3>Customize your QR</h3>
        <div className="step-head__meta">
          <span className="step-head__link-text">Why is my <a href="#" className="link-blue">QR code not working</a>?</span>
          <span>You can customize these templates later to match your brand.</span>
        </div>
      </div>

      <div className="step-tabs">
        {tabItems.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? 'step-tab step-tab--active' : 'step-tab'}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="step-tab__icon"><TabIcon name={tab.icon} /></span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="step-two__layout">
        <div className="step-two__left">
          {tabContent}
        </div>
        <div className="step-two__right">
          <p className="muted" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            You can customize these templates later to match your brand.<br />
            Always scan to test that your QR code works
          </p>
          <QrPreview data={data} style={style} onReady={onReady} loading={loading} />
          <label className="toggle-row" style={{ justifyContent: 'center', marginTop: '1rem' }}>
            <input
              type="checkbox"
              checked={Boolean(style.saveTemplate)}
              onChange={(e) => updateStyle('saveTemplate', e.target.checked)}
            />
            Save as a template
          </label>
          <div className="download-options" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
            <label>
              <input
                type="radio"
                name="ext"
                checked={downloadExt === 'png'}
                onChange={() => setDownloadExt('png')}
              />
              PNG
            </label>
            <label>
              <input
                type="radio"
                name="ext"
                checked={downloadExt === 'svg'}
                onChange={() => setDownloadExt('svg')}
              />
              SVG
            </label>
          </div>
          <button className="btn btn--success download-main-btn" onClick={onDownload}>Download</button>
        </div>
      </div>
    </div>
  );
}
