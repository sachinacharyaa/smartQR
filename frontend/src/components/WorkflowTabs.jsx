export default function WorkflowTabs({ workflows, active, onChange }) {
  return (
    <div className="workflow-tabs">
      {workflows.map((item) => (
        <button
          key={item.id}
          className={active === item.id ? 'tab tab--active' : 'tab'}
          onClick={() => onChange(item.id)}
        >
          <span className="tab__icon">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
      <button className="tab tab--more">More +</button>
    </div>
  );
}
