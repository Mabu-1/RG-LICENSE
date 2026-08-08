const plans = [
  {
    name: 'Starter', price: '39', cents: '.99', featured: false, badge: null, cta: 'Get Starter',
    desc: 'Perfect for a single store getting started with serious social proof.',
    features: ['1 Gallery Design Style', '1 Licensed Domain', 'All 3 Card Layouts', 'Full Theme Editor Controls', 'Photo & Video Lightbox', 'Installation Included', 'Lifetime License'],
  },
  {
    name: 'Growth', price: '69', cents: '.99', featured: true, badge: 'Most Popular', cta: 'Get Growth',
    desc: 'For store owners or agencies managing a small portfolio of stores.',
    features: ['1 Gallery Design Style', '3 Licensed Domains', 'Everything in Starter', 'Priority Installation', 'Priority Support'],
  },
  {
    name: 'Studio', price: '89', cents: '.99', featured: false, badge: null, cta: 'Get Studio',
    desc: 'Full access to every design style across your entire store portfolio.',
    features: ['3 Gallery Design Styles', '3 Licensed Domains', 'Everything in Growth', 'Early Access to New Designs', 'Priority Support'],
  },
]

const addons = [
  { l: 'Extra Domain',       s: 'License one more Shopify store',       p: '+$10', u: '/ domain' },
  { l: 'Extra Design Style', s: 'Unlock an additional gallery style',    p: '+$20', u: '/ design' },
  { l: 'Installation',       s: 'We set it up and configure everything', p: 'Included', u: '' },
]

export default function Pricing() {
  return (
    <section className="rgl-pricing" id="pricing">
      <div className="rgl-container">
        <div className="rgl-pricing-header">
          <div className="rgl-section-eyebrow">Pricing</div>
          <h2 className="rgl-section-title">One-time. Forever yours.</h2>
          <p className="rgl-section-sub">No subscriptions. No renewals. Pay once and use it for as long as you run your store.</p>
        </div>

        <div className="rgl-plans">
          {plans.map(p => (
            <div key={p.name} className={`rgl-plan${p.featured ? ' featured' : ''}`}>
              {p.badge && <div className="rgl-plan-badge">{p.badge}</div>}
              <div className="rgl-plan-name">{p.name}</div>
              <div className="rgl-plan-desc">{p.desc}</div>
              <div className="rgl-price">
                <span className="rgl-price-cur">$</span>
                <span className="rgl-price-amt">{p.price}</span>
                <span className="rgl-price-cents">{p.cents}</span>
                <span className="rgl-price-note">one-time</span>
              </div>
              <div className="rgl-plan-divider" />
              <div className="rgl-plan-includes">Includes</div>
              <ul className="rgl-plan-feats">
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <a href="#" className="rgl-plan-cta">{p.cta} →</a>
            </div>
          ))}
        </div>

        <div className="rgl-addons">
          <div className="rgl-addons-title">Need more? Add on anytime.</div>
          <div className="rgl-addons-sub">Extend any plan after purchase — just reach out.</div>
          <div className="rgl-addons-grid">
            {addons.map(a => (
              <div key={a.l} className="rgl-addon">
                <div>
                  <div className="rgl-addon-label">{a.l}</div>
                  <div className="rgl-addon-sub">{a.s}</div>
                </div>
                <div className="rgl-addon-price" style={a.u === '' ? { color: '#F59E0B' } : {}}>
                  {a.p} <small>{a.u}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
