import { useState } from 'react';

const items = [
  {
    q: 'What makes smartQR different from other generators?',
    a: 'smartQR combines dynamic routing, analytics, and brand templates in one workflow so teams move faster.'
  },
  {
    q: 'Can I edit a QR code after printing?',
    a: 'Yes, dynamic QR codes let you change the destination without reprinting.'
  },
  {
    q: 'Do you support vCard, file, and form QR codes?',
    a: 'Yes. You can create QR codes for URLs, vCards, files, Google Forms, WiFi, and more.'
  },
  {
    q: 'Can I track scans and locations?',
    a: 'Absolutely. Analytics show scans by time, device, and location, plus campaign breakdowns.'
  },
  {
    q: 'Is there a free plan?',
    a: 'Yes. Start with unlimited static QR codes and upgrade when you need dynamic features.'
  },
  {
    q: 'Do you offer custom domains?',
    a: 'Yes, Pro plans allow branded short links on your own domain.'
  },
  {
    q: 'Is my data secure?',
    a: 'We support password protection, expirations, and access controls for sensitive QR campaigns.'
  },
  {
    q: 'Can I collaborate with my team?',
    a: 'Yes, invite teammates, assign roles, and organize QR codes by workspace.'
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq" id="faq">
      <h2>Frequently asked questions</h2>
      <div className="faq__list">
        {items.map((item, index) => {
          const open = openIndex === index;
          return (
            <button
              key={item.q}
              className={open ? 'faq-item faq-item--open' : 'faq-item'}
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <div className="faq-item__header">
                <span>{item.q}</span>
                <span className="faq-item__icon">{open ? '-' : '+'}</span>
              </div>
              {open && <p>{item.a}</p>}
            </button>
          );
        })}
      </div>
    </section>
  );
}
