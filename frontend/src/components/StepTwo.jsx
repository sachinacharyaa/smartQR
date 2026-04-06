import { useMemo } from 'react';
import QrPreview from './QrPreview.jsx';

const tabItems = [
  { key: 'Pattern', label: 'Pattern', icon: 'pattern' },
  { key: 'Eyes', label: 'Eyes', icon: 'eyes' },
  { key: 'Logo', label: 'Logo', icon: 'logo' },
  { key: 'Colors', label: 'Colors', icon: 'colors' },
  { key: 'Frame', label: 'Frame', icon: 'frame' },
  { key: 'Templates', label: 'Templates', icon: 'templates' }
];

const patternOptions = [
  { id: 'square' },
  { id: 'rounded' },
  { id: 'dots' },
  { id: 'classy' },
  { id: 'extra-rounded' },
  { id: 'rounded-2' },
  { id: 'diamond' },
  { id: 'circle' },
  { id: 'dots-2' }
];

const eyeOptions = [
  { id: 'eye-1' },
  { id: 'eye-2' },
  { id: 'eye-3' },
  { id: 'eye-4' },
  { id: 'eye-5' },
  { id: 'eye-6' },
  { id: 'eye-7' },
  { id: 'eye-8' },
  { id: 'eye-9' },
  { id: 'eye-10' },
  { id: 'eye-11' },
  { id: 'eye-12' },
  { id: 'eye-13' },
  { id: 'eye-14' },
  { id: 'eye-15' }
];

const frameOptions = [
  { id: 'frame-none', label: 'None' },
  { id: 'frame-soft', label: 'Soft' },
  { id: 'frame-bold', label: 'Bold' },
  { id: 'frame-card', label: 'Card' },
  { id: 'frame-round', label: 'Round' },
  { id: 'frame-solid', label: 'Solid' },
  { id: 'frame-tag', label: 'Tag' },
  { id: 'frame-cut', label: 'Cut' }
];

const templateOptions = [
  { id: 'temp-1' },
  { id: 'temp-2' },
  { id: 'temp-3' },
  { id: 'temp-4' },
  { id: 'temp-5' },
  { id: 'temp-6' },
  { id: 'temp-7' },
  { id: 'temp-8' },
  { id: 'temp-9' },
  { id: 'temp-10' },
  { id: 'temp-11' },
  { id: 'temp-12' }
];

const logoOptions = [
  'F', 'IG', 'P', 'X', 'YT', 'SC', 'TT', 'IN', 'WA', 'TG', 'ME', 'DOC', 'GM', 'PP', 'V', 'SP', 'WE', 'YP'
];

function TabIcon({ name }) {
  if (name === 'pattern') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 6h4v4H6zM14 6h4v4h-4zM6 14h4v4H6z" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (name === 'eyes') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (name === 'logo') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 15l3-3 3 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === 'colors') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h16M7 4v6M12 4v10M17 4v6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === 'frame') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z" fill="none" stroke="currentColor" strokeWidth="2" />
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
  const updateStyle = (key, value) => setStyle({ ...style, [key]: value });

  const tabContent = useMemo(() => {
    if (activeTab === 'Pattern') {
      return (
        <div className="pattern-grid">
          {patternOptions.map((opt) => (
            <button
              key={opt.id}
              className={style.pattern === opt.id ? 'pattern-card pattern-card--active' : 'pattern-card'}
              onClick={() => updateStyle('pattern', opt.id)}
            >
              <span className={`pattern-thumb pattern-thumb--${opt.id}`} />
            </button>
          ))}
        </div>
      );
    }

    if (activeTab === 'Eyes') {
      return (
        <div>
          <div className="info-row">
            <span className="info-dot">i</span>
            Select eyes to make your QR code stand out. Eyes are what your camera recognizes when scanning.
          </div>
          <div className="eye-grid">
            {eyeOptions.map((opt) => (
              <button
                key={opt.id}
                className={style.eyeStyle === opt.id ? 'eye-card eye-card--active' : 'eye-card'}
                onClick={() => updateStyle('eyeStyle', opt.id)}
              >
                <span className={`eye-thumb ${opt.id}`} />
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'Logo') {
      return (
        <div>
          <div className="info-row">
            <span className="info-dot">i</span>
            Add your logo for stronger brand recall (300 x 300px, 72dpi)
          </div>
          <div className="logo-upload">
            <div className="logo-upload__preview">SCAN<br />ME</div>
            <div className="logo-upload__actions">
              <label className="upload-btn">
                Upload
                <input
                  type="file"
                  accept="image/*"
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
              <span>PNG</span>
              <span>JPG</span>
            </div>
          </div>
          <div className="logo-grid">
            {logoOptions.map((item) => (
              <button
                key={item}
                className={style.logoPreset === item ? 'logo-pill logo-pill--active' : 'logo-pill'}
                onClick={() => updateStyle('logoPreset', item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'Colors') {
      return (
        <div>
          <div className="info-row">
            <span className="info-dot">i</span>
            Embellish your customized QR with your brand colors
          </div>
          <div className="color-mode">
            <label><input type="radio" name="colormode" defaultChecked /> Solid Color</label>
            <label><input type="radio" name="colormode" /> Gradient</label>
            <label><input type="checkbox" defaultChecked /> Custom Eye Color</label>
          </div>
          <div className="color-grid">
            <label>
              Main color
              <div className="color-row">
                <input type="color" value={style.dotsColor} onChange={(e) => updateStyle('dotsColor', e.target.value)} />
                <input type="text" value={style.dotsColor} onChange={(e) => updateStyle('dotsColor', e.target.value)} />
              </div>
            </label>
            <label>
              Eye color
              <div className="color-row">
                <input type="color" value={style.eyeColor} onChange={(e) => updateStyle('eyeColor', e.target.value)} />
                <input type="text" value={style.eyeColor} onChange={(e) => updateStyle('eyeColor', e.target.value)} />
              </div>
            </label>
            <label>
              Background
              <div className="color-row">
                <input type="color" value={style.backgroundColor} onChange={(e) => updateStyle('backgroundColor', e.target.value)} />
                <input type="text" value={style.backgroundColor} onChange={(e) => updateStyle('backgroundColor', e.target.value)} />
              </div>
            </label>
            <label className="toggle-row">
              <input type="checkbox" /> Transparent background
            </label>
          </div>
        </div>
      );
    }

    if (activeTab === 'Frame') {
      return (
        <div>
          <div className="info-row">
            <span className="info-dot">i</span>
            A QR with a frame and call-to-action gets more scans
          </div>
          <div className="frame-grid">
            {frameOptions.map((opt) => (
              <button
                key={opt.id}
                className={style.frameChoice === opt.id ? 'frame-card frame-card--active' : 'frame-card'}
                onClick={() => updateStyle('frameChoice', opt.id)}
              >
                <span className={`frame-thumb ${opt.id}`} />
              </button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="info-row">
          <span className="info-dot">i</span>
          Choose a ready-made template (optional)
        </div>
        <div className="template-grid">
          {templateOptions.map((opt) => (
            <button
              key={opt.id}
              className={style.template === opt.id ? 'template-card template-card--active' : 'template-card'}
              onClick={() => updateStyle('template', opt.id)}
            >
              <span className={`template-thumb ${opt.id}`} />
            </button>
          ))}
        </div>
      </div>
    );
  }, [activeTab, style, onSaveTemplate]);

  return (
    <div className="step-card step-card--flat">
      <div className="step-head">
        <span className="step-pill">Step 2</span>
        <h3>Customize your QR</h3>
        <div className="step-head__meta">
          <span>Why is my QR code not working?</span>
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
          <p className="muted">Always scan to test that your QR code works</p>
          <QrPreview data={data} style={style} onReady={onReady} loading={loading} />
          <label className="toggle-row">
            <input
              type="checkbox"
              checked={Boolean(style.saveTemplate)}
              onChange={(e) => updateStyle('saveTemplate', e.target.checked)}
            />
            Save as a template
          </label>
          <div className="download-options">
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
          <button className="btn btn--success" onClick={onDownload}>Download</button>
        </div>
      </div>
    </div>
  );
}
