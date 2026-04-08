import { useState } from 'react';

const individualPlans = [
  // {
  //   name: 'Free',
  //   price: 'Free',
  //   note: 'No credit card required',
  //   cta: 'Try for free',
  //   features: [
  //     'Unlimited static QR codes',
  //     '3 dynamic QR codes',
  //     '500 scans per dynamic QR',
  //     'Basic scan analytics',
  //     'Basic support'
  //   ]
  // },
  {
    name: 'Regular',
    price: 'US$9',
    note: 'Billed monthly',
    cta: 'Buy now',
    features: [
      'Unlimited static QR codes',
      '12 dynamic QR codes',
      'Unlimited scans and downloads',
      'Advanced scan analytics',
      '24/7 support',
      'Up to 5MB file upload'
    ]
  },
  {
    name: 'Advanced',
    price: 'US$19',
    note: 'Billed annually',
    cta: 'Buy now',
    badge: 'Most Popular',
    features: [
      'Unlimited static QR codes',
      '200 dynamic QR codes',
      'Unlimited scans and downloads',
      'Advanced analytics + integrations',
      'Priority 24/7 support',
      'Up to 10MB file upload',
      'High-resolution images',
      'API: 3,000 requests',
      'Unlimited folders',
      'Save your QR code design as a template',
      'Edit your QR code link any time'
    ]
  },
  {
    name: 'Premium',
    price: 'US$37',
    note: 'Billed annually',
    cta: 'Buy now',
    features: [
      'Unlimited static QR codes',
      '600 dynamic QR codes',
      'Unlimited scans and downloads',
      'White-label + custom domains',
      'Priority 24/7 support',
      'Up to 20MB file upload',
      'High-resolution images',
      'API: 10,000 requests',
      'Unlimited folders',
      'Save your QR code design as a template',
      'Edit your QR code link any time',
      'Clone your QR code',
      'App Store QR code',
      'vCard QR code'
    ]
  }
];

const businessPlans = [
  {
    name: 'Advanced',
    price: 'US$16',
    note: 'For solo teams',
    cta: 'Buy now',
    features: ['200 dynamic QR codes', 'Unlimited scans', 'Advanced analytics', 'Ads-free']
  },
  {
    name: 'Premium',
    price: 'US$37',
    note: 'For agencies',
    cta: 'Buy now',
    badge: 'Most Popular',
    features: ['600 dynamic QR codes', 'Unlimited scans', 'Smart multi-URL routing', 'Ads-free']
  },
  {
    name: 'Professional',
    price: 'US$89',
    note: 'For scale',
    cta: 'Buy now',
    features: ['1,200 dynamic QR codes', 'VIP support', 'Bulk generation', 'Team management']
  }
];

export default function Pricing({ onSelectPlan }) {
  const [segment, setSegment] = useState('individuals');
  const plans = segment === 'individuals' ? individualPlans : businessPlans;

  return (
    <section className="pricing" id="pricing">
      <div className="pricing__header pricing__header--center">
        <h2>Plan and pricing</h2>
        <p className="muted">Choose a plan that scales with your QR campaigns and scan volume.</p>
      </div>

      <div className="pricing__segment">
        <button
          type="button"
          className={segment === 'individuals' ? 'pricing__segment-btn pricing__segment-btn--active' : 'pricing__segment-btn'}
          onClick={() => setSegment('individuals')}
        >
          For individuals
        </button>
        <button
          type="button"
          className={segment === 'businesses' ? 'pricing__segment-btn pricing__segment-btn--active' : 'pricing__segment-btn'}
          onClick={() => setSegment('businesses')}
        >
          For businesses
        </button>
      </div>

      <div className="pricing__grid">
        {plans.map((plan) => (
          <div
            className={
              (plan.name === 'Advanced' || plan.name === 'Premium')
                ? 'plan-card plan-card--extended'
                : 'plan-card'
            }
            key={plan.name}
          >
            <div className="plan-card__top">
              <h3>{plan.name}</h3>
              {plan.badge && <span className="badge">{plan.badge}</span>}
            </div>
            <div className="plan-price">{plan.price}<span>/Month</span></div>
            <div className="plan-note">{plan.note}</div>
            <button className="btn btn--success" onClick={() => onSelectPlan(plan.name)}>{plan.cta}</button>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>✓ {feature}</li>
              ))}
            </ul>
          </div>
        ))}
        {segment === 'businesses' && (
          <div className="plan-card plan-card--enterprise">
            <h3>Enterprise</h3>
            <p>
              Advanced features and tailored setup for corporations managing multiple QR campaigns
              across teams and brands.
            </p>
            <ul>
              <li>✓ SSO and role-based access</li>
              <li>✓ Dedicated account specialist</li>
              <li>✓ SLA and compliance support</li>
            </ul>
            <button className="btn btn--success">Contact us</button>
          </div>
        )}
      </div>
    </section>
  );
}
