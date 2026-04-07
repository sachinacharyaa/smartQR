export default function InstagramBenefits() {
  const igLogo = `${import.meta.env.BASE_URL || '/'}logos/instagram.png`;

  return (
    <section className="ig-benefits">
      <div className="ig-benefits__head">
        <img src={igLogo} alt="Instagram logo" />
        <div>
          <h3>Why use an Instagram QR Code?</h3>
          <p>Turn offline traffic into profile visits, followers, and engagement in one scan.</p>
        </div>
      </div>
      <div className="ig-benefits__grid">
        <article>
          <h4>Faster follows</h4>
          <p>Users scan and land directly on your profile without searching usernames.</p>
        </article>
        <article>
          <h4>Better campaign tracking</h4>
          <p>Measure scan performance from packaging, posters, menus, and events.</p>
        </article>
        <article>
          <h4>Brand consistency</h4>
          <p>Use Instagram-themed logo and colors to improve trust and recognition.</p>
        </article>
        <article>
          <h4>Higher conversion</h4>
          <p>One clear CTA with QR improves profile visits and story engagement.</p>
        </article>
      </div>
    </section>
  );
}
