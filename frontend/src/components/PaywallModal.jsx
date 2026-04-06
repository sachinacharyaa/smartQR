export default function PaywallModal({ open, onClose, onUpgrade }) {
  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>x</button>
        <h2>Unlock Pro downloads</h2>
        <p className="muted">
          Your current design uses Pro features like dynamic tracking, gradients, or advanced frames.
          Choose a plan to continue.
        </p>
        <div className="modal__plans">
          {['Regular', 'Advanced', 'Premium'].map((plan) => (
            <button key={plan} className="plan-pill" onClick={() => onUpgrade(plan)}>
              {plan}
            </button>
          ))}
        </div>
        <button className="btn" onClick={() => onUpgrade('Advanced')}>Upgrade now</button>
      </div>
    </div>
  );
}
