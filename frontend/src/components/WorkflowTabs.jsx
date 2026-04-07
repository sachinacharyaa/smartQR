import { useState } from 'react';
import { WorkflowTabIcons, QuickFeatureIcons } from './Icons.jsx';

const quickFeatures = [
  { id: 'facebook', label: 'Facebook' },
  { id: 'youtube', label: 'Youtube' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'pinterest', label: 'Pinterest' },
  { id: 'tiktok', label: 'Tiktok' },
  { id: 'twitter', label: 'Twitter' },
  { id: 'location', label: 'Location' }
];

export default function WorkflowTabs({ workflows, active, onChange, quickPreset, onQuickSelect }) {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="workflow-tabs">
      {workflows.map((item) => (
        <button
          key={item.id}
          className={active === item.id ? 'tab tab--active' : 'tab'}
          onClick={() => onChange(item.id)}
        >
          <span className="tab__icon">{WorkflowTabIcons[item.icon]}</span>
          <span className="tab__label">{item.label}</span>
        </button>
      ))}

      {!moreOpen && (
        <button type="button" className="tab tab--more" onClick={() => setMoreOpen(true)} aria-expanded="false">
          <span className="tab__icon">{WorkflowTabIcons.more}</span>
          <span className="tab__label">More</span>
        </button>
      )}

      {moreOpen && (
        <>
          {quickFeatures.map((item) => {
            const isQuickActive = active === 'url' && quickPreset === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={isQuickActive ? 'tab tab--active tab--quick' : 'tab tab--quick'}
                onClick={() => onQuickSelect(item.id)}
                title={item.label}
              >
                <span className="tab__icon">{QuickFeatureIcons[item.id]}</span>
                <span className="tab__label">{item.label}</span>
              </button>
            );
          })}
          <button type="button" className="tab tab--less" onClick={() => setMoreOpen(false)} aria-expanded="true">
            <span className="tab__icon">{WorkflowTabIcons.less}</span>
            <span className="tab__label">Less</span>
          </button>
        </>
      )}
    </div>
  );
}
