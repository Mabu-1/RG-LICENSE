import CardLayouts from './features/CardLayouts'
import GoogleSheets from './features/GoogleSheets'

const feats = [
  { icon: '📊', title: 'Google Sheet Backend', desc: 'Your spreadsheet is your database. Add a row, save, done — reviews appear instantly.' },
  { icon: '🔒', title: 'Domain-Locked License', desc: 'Each license is tied to one Shopify domain. Secure and non-transferable.' },
  { icon: '🖼️', title: 'Photo & Video Reviews', desc: 'Customers can share photos and videos. Full lightbox popup included.' },
  { icon: '🎨', title: '3 Layout Modes', desc: 'Natural, Equal Height, or Masonry. Switch from the theme editor instantly.' },
  { icon: '⭐', title: 'Star Ratings & Filters', desc: 'Average rating display, star filter buttons, and sort dropdown built in.' },
  { icon: '✅', title: 'Verified Badge', desc: 'Mark purchases as verified. Adds a green badge to build buyer confidence.' },
]

export default function Features() {
  return (
    <>
      <style>{`
        .rgl-features { background: #0f172a; padding: 100px 0; }
        .rgl-features-header { margin-bottom: 60px; }
        .rgl-features .rgl-section-title { color: #fff; }
        .rgl-features .rgl-section-sub { color: rgba(255,255,255,0.5); }
        .rgl-features-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; }
        .rgl-feat-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 28px 24px; transition: all 0.3s; }
        .rgl-feat-card:hover { background: rgba(255,255,255,0.07); border-color: rgba(245,158,11,0.35); transform: translateY(-3px); }
        .rgl-feat-icon { width: 46px; height: 46px; background: rgba(245,158,11,0.12); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 21px; margin-bottom: 16px; }
        .rgl-feat-title { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .rgl-feat-desc { font-size: 13.5px; color: rgba(255,255,255,0.45); line-height: 1.65; }
        @media (max-width: 960px) { .rgl-features-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 620px) { .rgl-features { padding: 70px 0; } .rgl-features-grid { grid-template-columns: 1fr; } }
      `}</style>
      <section className="rgl-features">
        <div className="rgl-container">
          <div className="rgl-features-header">
            <div className="rgl-section-eyebrow">Everything Included</div>
            <h2 className="rgl-section-title">One section.<br />Every feature.</h2>
            <p className="rgl-section-sub">No plugins, no add-ons, no upsells. Everything you need ships in the license.</p>
          </div>
          <div className="rgl-features-grid">
            {feats.map(f => (
              <div key={f.title} className="rgl-feat-card">
                <div className="rgl-feat-icon">{f.icon}</div>
                <div className="rgl-feat-title">{f.title}</div>
                <div className="rgl-feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <GoogleSheets />
      <CardLayouts />
    </>
  )
}
