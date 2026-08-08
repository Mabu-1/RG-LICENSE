const features = [
  { icon: '📊', title: 'Google Sheets Powered',     desc: "Point to any Google Sheet and reviews appear instantly. Add a row, refresh — it's live. No database, no backend complexity." },
  { icon: '🎨', title: 'Three Card Layouts',         desc: 'Natural height grid, equal-height grid, or masonry. Fully responsive with configurable desktop and mobile column counts.' },
  { icon: '🔍', title: 'Search, Filter & Sort',      desc: 'Live keyword search, one-click star filters, and sort by rating or original order — updating in real time without a page reload.' },
  { icon: '🎬', title: 'Photo & Video Lightbox',     desc: 'Full-screen popup with keyboard navigation. Supports image and video reviews side-by-side with the review text and rating.' },
  { icon: '🎛️', title: '20+ Theme Editor Settings', desc: 'Colors, columns, spacing, badge visibility, load-more count — all from the Shopify theme editor. Zero code required.' },
  { icon: '🔒', title: 'Domain-Locked License',      desc: "Your license is bound to your specific domain. It won't load on unauthorized stores. Your code stays yours." },
]

export default function Features() {
  return (
    <section className="rgl-features" id="features">
      <div className="rgl-container">
        <div className="rgl-features-header">
          <div className="rgl-section-eyebrow">What You Get</div>
          <h2 className="rgl-section-title">Everything you need,<br />nothing you don't</h2>
          <p className="rgl-section-sub">Built for Shopify stores that want reviews to do real selling work — not just sit there.</p>
        </div>
        <div className="rgl-features-grid">
          {features.map(f => (
            <div key={f.title} className="rgl-feat-card">
              <div className="rgl-feat-icon">{f.icon}</div>
              <div className="rgl-feat-title">{f.title}</div>
              <div className="rgl-feat-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
