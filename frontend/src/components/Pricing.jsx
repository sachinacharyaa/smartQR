const plans = [
  {
    name: 'Free',
    price: 'Free',
    cta: 'Try for free',
    badge: '',
    features: ['Unlimited static QR codes', '3 dynamic QR codes', '500 scans per dynamic code']
  },
  {
    name: 'Regular',
    price: '$7',
    cta: 'Buy now',
    badge: '',
    features: ['Unlimited static QR codes', '12 dynamic QR codes', 'Unlimited scans and downloads']
  },
  {
    name: 'Advanced',
    price: '$16',
    cta: 'Buy now',
    badge: 'Most popular',
    features: ['Unlimited static QR codes', '200 dynamic QR codes', 'Bulk generation + analytics']
  },
  {
    name: 'Premium',
    price: '$37',
    cta: 'Buy now',
    badge: '',
    features: ['Unlimited static QR codes', '600 dynamic QR codes', 'White label + custom domains']
  }
];

export default function Pricing({ onSelectPlan }) {
  return (
    <section className="pricing" id="pricing">
      <div className="pricing__header">
        <h2>Plan and pricing</h2>
        <p className="muted">Choose a plan that scales with your QR campaigns.</p>
      </div>
      <div className="pricing__grid">
        {plans.map((plan) => (
          <div className="plan-card" key={plan.name}>
            {plan.badge && <span className="badge">{plan.badge}</span>}
            <h3>{plan.name}</h3>
            <div className="plan-price">{plan.price}<span>/mo</span></div>
            <button className="btn" onClick={() => onSelectPlan(plan.name)}>{plan.cta}</button>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
