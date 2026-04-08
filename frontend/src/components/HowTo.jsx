import { useState } from 'react';
const slides = [
  [
    { title: 'Trackable', cta: 'Create Trackable Qr Code', theme: 'track', image: 'track.jpg' },
    { title: 'Picture', cta: 'Create Picture QR Code', theme: 'picture', image: 'pictureQR.jpg' },
    { title: 'Wi-Fi', cta: 'Create Wi-Fi QR Code', theme: 'wifi', image: 'wifiQR.jpg' }
  ],
  [
    { title: 'Instagram', cta: 'Create Instagram QR Code', theme: 'instagram', image: 'instagram QR.jpg' },
    { title: 'Google Form', cta: 'Create Google Form QR Code', theme: 'form', image: 'google form QR code.jpg' },
    { title: 'Google Review', cta: 'Create Google Review QR Code', theme: 'review', image: 'google review QR.jpg' }
  ]
];

export default function HowTo() {
  const [slide, setSlide] = useState(0);
  const visible = slides[slide];

  const prev = () => setSlide((s) => (s - 1 + slides.length) % slides.length);
  const next = () => setSlide((s) => (s + 1) % slides.length);

  return (
    <section className="howto" id="solutions">
      <h2 className="howto__title">Create and Customize the QR Code You Need</h2>
      <p className="howto__sub">
        From Wi-Fi access to PDF downloads, smartQR supports dozens of code types so you can connect anything to anyone.
      </p>
      <div className="howto__carousel">
        <button className="howto__arrow" onClick={prev} aria-label="Previous slide">&lsaquo;</button>
        <div className="howto__grid">
          {visible.map((card) => (
            <article className="howto__card" key={card.title}>
              <div className={`howto__card-media howto__card-media--${card.theme}`}>
                {card.image ? (
                  <img
                    src={`${import.meta.env.BASE_URL || '/'}${encodeURI(card.image)}`}
                    alt={card.title}
                    className="howto__card-image"
                  />
                ) : (
                  <span className="howto__qr" />
                )}
              </div>
              <h3 className="howto__card-title">{card.title}</h3>
              <button className="howto__cta">{card.cta}</button>
            </article>
          ))}
        </div>
        <button className="howto__arrow" onClick={next} aria-label="Next slide">&rsaquo;</button>
      </div>
      <div className="howto__dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={idx === slide ? 'howto__dot howto__dot--active' : 'howto__dot'}
            onClick={() => setSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
