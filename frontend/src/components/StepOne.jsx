export default function StepOne({
  workflow,
  data,
  onDataChange,
  isDynamic,
  onToggleDynamic,
  onGenerate
}) {
  const fields = (() => {
    switch (workflow) {
      case 'vcard':
        return [
          { key: 'fullName', label: 'Full name', placeholder: 'Ava Patel' },
          { key: 'title', label: 'Title', placeholder: 'Founder' },
          { key: 'phone', label: 'Phone', placeholder: '+1 555 240 9823' },
          { key: 'email', label: 'Email', placeholder: 'ava@smartqr.io' }
        ];
      case 'file':
        return [
          { key: 'fileName', label: 'File name', placeholder: 'company-profile.pdf' }
        ];
      case 'linkpage':
        return [
          { key: 'headline', label: 'Headline', placeholder: 'Follow smartQR' },
          { key: 'primaryLink', label: 'Primary link', placeholder: 'https://smartqr.io' }
        ];
      case 'googleform':
        return [
          { key: 'formUrl', label: 'Google Form URL', placeholder: 'https://forms.gle/...' }
        ];
      default:
        return [
          { key: 'url', label: 'Website URL', placeholder: 'https://www.yoursite.com' }
        ];
    }
  })();

  return (
    <div className="step-card step-card--flat">
      <div className="step-head">
        <span className="step-pill">Step 1</span>
        <h3>Enter the {workflow === 'url' ? 'URL of your website' : 'details'}</h3>
        <div className="step-head__link">
          Learn how to track data with <span>dynamic QR codes</span>
        </div>
      </div>

      <div className="step-toggle">
        <button
          className={isDynamic ? 'toggle' : 'toggle toggle--active'}
          onClick={() => onToggleDynamic(false)}
        >
          Static QR
        </button>
        <button
          className={isDynamic ? 'toggle toggle--active' : 'toggle'}
          onClick={() => onToggleDynamic(true)}
        >
          Dynamic QR
        </button>
        <span className="toggle__hint">Edit URL | Track data | Learn more</span>
      </div>

      <div className="form-grid form-grid--single">
        {fields.map((field) => (
          <label key={field.key}>
            {field.label}
            <input
              value={data[field.key] || ''}
              placeholder={field.placeholder}
              onChange={(e) => onDataChange(field.key, e.target.value)}
            />
          </label>
        ))}
        {workflow === 'file' && (
          <label>
            Upload file
            <input type="file" onChange={(e) => onDataChange('fileUpload', e.target.files?.[0]?.name || '')} />
          </label>
        )}
      </div>

      <div className="step-note">...or upload an image to extract the URL</div>

      <div className="step-card__footer step-card__footer--bar">
        <button className="btn btn--muted" onClick={onGenerate}>Generate QR code</button>
        <p className="muted">
          We recommend creating a dynamic QR code if you want to track performance and edit data even after printing.
        </p>
      </div>
    </div>
  );
}
