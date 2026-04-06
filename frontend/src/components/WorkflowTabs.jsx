const iconMap = {
  url: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 13a4 4 0 0 1 0-6l2-2a4 4 0 1 1 6 6l-1 1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 11a4 4 0 0 1 0 6l-2 2a4 4 0 1 1-6-6l1-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  vcard: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 19v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="7" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h7l5 5v13H7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 3v5h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  linkpage: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 15a4 4 0 0 1-4 4H9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 9a4 4 0 0 1 4-4h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 12h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  googleform: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 4h9l3 3v13H6z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 11h6M9 15h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  app: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 12h8M12 8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  landing: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v14H4z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M4 9h16" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 13h8" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  smart: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 12a6 6 0 0 1 12 0" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M9 12a3 3 0 0 1 6 0" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="15" r="1" fill="currentColor" />
    </svg>
  ),
  gs1: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h2v16H5zM9 4h1v16H9zM12 4h3v16h-3zM17 4h2v16h-2z" fill="currentColor" />
    </svg>
  ),
  mp3: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18a3 3 0 1 1 0-6v-6l8-2v6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="18" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="14" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10 9l5 3-5 3z" fill="currentColor" />
    </svg>
  ),
  wifi: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9a12 12 0 0 1 16 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 12a8 8 0 0 1 10 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 15a4 4 0 0 1 4 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  more: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
};

export default function WorkflowTabs({ workflows, active, onChange }) {
  return (
    <div className="workflow-tabs">
      {workflows.map((item) => (
        <button
          key={item.id}
          className={active === item.id ? 'tab tab--active' : 'tab'}
          onClick={() => onChange(item.id)}
        >
          <span className="tab__icon">{iconMap[item.icon]}</span>
          <span className="tab__label">{item.label}</span>
        </button>
      ))}
      <button className="tab tab--more">
        <span className="tab__icon">{iconMap.more}</span>
        <span className="tab__label">More</span>
      </button>
    </div>
  );
}
