import QrPreview from './QrPreview.jsx';

const patternOptions = [
  { id: 'square', label: 'Square' },
  { id: 'rounded', label: 'Rounded' },
  { id: 'dots', label: 'Dots' },
  { id: 'classy', label: 'Classy' },
  { id: 'extra-rounded', label: 'Extra rounded' }
];

const eyeSquares = [
  { id: 'square', label: 'Square' },
  { id: 'extra-rounded', label: 'Soft' }
];

const eyeDots = [
  { id: 'dot', label: 'Dot' },
  { id: 'square', label: 'Square' }
];

export default function StepTwo({
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

  return (
    <div className="step-card">
      <div className="step-card__header">
        <span className="step-chip">Step 2</span>
        <h3>Customize your QR</h3>
        <p className="muted">All options are visible here for a faster workflow.</p>
      </div>
      <div className="step-two">
        <div className="step-two__controls">
          <div className="control-section">
            <h4>Pattern</h4>
            <div className="option-grid">
              {patternOptions.map((opt) => (
                <button
                  key={opt.id}
                  className={style.pattern === opt.id ? 'chip chip--active' : 'chip'}
                  onClick={() => updateStyle('pattern', opt.id)}
                >
                  <span className="chip__swatch" />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="control-section">
            <h4>Eyes</h4>
            <div className="option-group">
              <div>
                <p className="muted">Eye squares</p>
                <div className="option-grid">
                  {eyeSquares.map((opt) => (
                    <button
                      key={opt.id}
                      className={style.eyeSquare === opt.id ? 'chip chip--active' : 'chip'}
                      onClick={() => updateStyle('eyeSquare', opt.id)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="muted">Eye dots</p>
                <div className="option-grid">
                  {eyeDots.map((opt) => (
                    <button
                      key={opt.id}
                      className={style.eyeDot === opt.id ? 'chip chip--active' : 'chip'}
                      onClick={() => updateStyle('eyeDot', opt.id)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="control-section">
            <h4>Logo</h4>
            <div className="option-group">
              <label className="file">
                Upload logo (PNG/SVG)
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
              <label>
                Logo margin
                <input
                  type="range"
                  min="0"
                  max="16"
                  value={style.logoMargin ?? 6}
                  onChange={(e) => updateStyle('logoMargin', Number(e.target.value))}
                />
              </label>
              <button className="ghost" onClick={() => updateStyle('logo', null)}>Remove logo</button>
            </div>
          </div>

          <div className="control-section">
            <h4>Colors</h4>
            <div className="option-group">
              <label>
                Dot color
                <input
                  type="color"
                  value={style.dotsColor}
                  onChange={(e) => updateStyle('dotsColor', e.target.value)}
                />
              </label>
              <label>
                Eye color
                <input
                  type="color"
                  value={style.eyeColor}
                  onChange={(e) => updateStyle('eyeColor', e.target.value)}
                />
              </label>
              <label>
                Background color
                <input
                  type="color"
                  value={style.backgroundColor}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                />
              </label>
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={Boolean(style.gradient)}
                  onChange={(e) => updateStyle('gradient', e.target.checked)}
                />
                Gradient overlay (Pro)
              </label>
            </div>
          </div>

          <div className="control-section">
            <h4>Frame</h4>
            <div className="option-group">
              <label>
                Frame text
                <input
                  value={style.frameText || ''}
                  placeholder="Scan Me"
                  onChange={(e) => updateStyle('frameText', e.target.value)}
                />
              </label>
              <label>
                CTA style
                <select
                  value={style.frameStyle || 'soft'}
                  onChange={(e) => updateStyle('frameStyle', e.target.value)}
                >
                  <option value="soft">Soft</option>
                  <option value="bold">Bold</option>
                  <option value="outline">Outline</option>
                </select>
              </label>
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={Boolean(style.proFrame)}
                  onChange={(e) => updateStyle('proFrame', e.target.checked)}
                />
                Animated frame (Pro)
              </label>
            </div>
          </div>

          <div className="control-section">
            <h4>Templates</h4>
            <div className="option-grid">
              {['Clean', 'Retro', 'Cafe', 'Futurist'].map((name) => (
                <button
                  key={name}
                  className={style.template === name ? 'chip chip--active' : 'chip'}
                  onClick={() => updateStyle('template', name)}
                >
                  <span className="chip__swatch" />
                  {name}
                </button>
              ))}
            </div>
            <label className="toggle-row">
              <input
                type="checkbox"
                checked={Boolean(style.saveTemplate)}
                onChange={(e) => updateStyle('saveTemplate', e.target.checked)}
              />
              Save as template
            </label>
            <button className="ghost" onClick={onSaveTemplate}>Save template</button>
          </div>
        </div>

        <div className="step-two__preview">
          <div className="preview-card">
            <QrPreview data={data} style={style} onReady={onReady} loading={loading} />
            <div className="preview-actions">
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={Boolean(style.dynamic)}
                  onChange={(e) => updateStyle('dynamic', e.target.checked)}
                />
                Dynamic QR tracking (Pro)
              </label>
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={Boolean(style.password)}
                  onChange={(e) => updateStyle('password', e.target.checked)}
                />
                Password protect (Pro)
              </label>
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={Boolean(style.expire)}
                  onChange={(e) => updateStyle('expire', e.target.checked)}
                />
                Set expiry date (Pro)
              </label>
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={Boolean(style.geoRouting)}
                  onChange={(e) => updateStyle('geoRouting', e.target.checked)}
                />
                Geo routing (Pro)
              </label>
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={Boolean(style.scanLimit)}
                  onChange={(e) => updateStyle('scanLimit', e.target.checked)}
                />
                Scan limits (Pro)
              </label>
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={Boolean(style.utmTracking)}
                  onChange={(e) => updateStyle('utmTracking', e.target.checked)}
                />
                UTM tracking (Pro)
              </label>
            </div>
            <div className="download-row">
              <button className="btn" onClick={onDownload}>Download</button>
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
            </div>
            <p className="muted">Always scan to test your QR works before printing.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
