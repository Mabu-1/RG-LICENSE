const cards = [
  { cls: 'rgl-mi1', e: '🛍️', n: 'Sarah M.', v: true,  s: '★★★★★', b: 'Absolutely love this! Quality is incredible.' },
  { cls: 'rgl-mi2', e: '📦', n: 'James R.', v: false, s: '★★★★★', b: 'Fast shipping, exactly as described.' },
  { cls: 'rgl-mi3', e: '✨', n: 'Priya K.', v: true,  s: '★★★★☆', b: 'Great quality for the price. Beautiful.' },
  { cls: 'rgl-mi4', e: '💫', n: 'Tom W.',   v: false, s: '★★★★★', b: 'Second purchase, still the best.' },
]

export default function Hero() {
  return (
    <section className="rgl-hero" id="hero">
      <div className="rgl-hero-watermark">★</div>
      <div className="rgl-container">
        <div className="rgl-hero-inner">
          <div>
            <div className="rgl-eyebrow">★ Shopify Review Gallery</div>
            <h1 className="rgl-h1">
              The Gallery That<br />
              Makes Reviews<br />
              <em>Actually Sell</em>
            </h1>
            <p className="rgl-hero-sub">
              A domain-locked Shopify section that reads from your Google Sheet and renders
              a beautiful, filterable review gallery. One-time license. No subscriptions.
            </p>
            <div className="rgl-cta-group">
              <a href="#pricing" className="rgl-btn-hero">Get Your License — $39.99</a>
             
            </div>
            <div className="rgl-trust">
              {['One-time payment', 'Domain-locked', 'No subscriptions', 'We install it'].map(t => (
                <div key={t} className="rgl-trust-item">
                  <span className="rgl-trust-check">✓</span> {t}
                </div>
              ))}
            </div>
          </div>

          <div className="rgl-mockup">
            <div className="rgl-browser">
              <div className="rgl-browser-bar">
                <div className="rgl-dot rgl-dot-r" />
                <div className="rgl-dot rgl-dot-y" />
                <div className="rgl-dot rgl-dot-g" />
                <div className="rgl-url">yourstore.com/products/item</div>
              </div>
              <div className="rgl-browser-body">
                <div className="rgl-mock-heading">Customer Reviews</div>
                <div className="rgl-mock-meta"><strong>★★★★★</strong> 4.9 out of 5 · 248 reviews</div>
                <div className="rgl-mock-cards">
                  {cards.map((c, i) => (
                    <div key={i} className="rgl-mock-card">
                      <div className={`rgl-mock-img ${c.cls}`}>{c.e}</div>
                      <div className="rgl-mc-name">{c.n} {c.v && <span style={{ color: '#4CAF50' }}>✓</span>}</div>
                      <div className="rgl-mc-stars">{c.s}</div>
                      <div className="rgl-mc-body">{c.b}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
