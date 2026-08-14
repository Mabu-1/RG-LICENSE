export default function CTABanner() {
  return (
    <>
      <style>{`
        .rgl-cta-banner { background: #f59e0b; padding: 80px 0; }
        .rgl-cta-inner { text-align: center; }
        .rgl-cta-title { font-family: 'Fraunces', serif; font-size: clamp(30px,4vw,52px); font-weight: 900; color: #fff; letter-spacing: -2px; margin-bottom: 14px; line-height: 1.05; }
        .rgl-cta-sub { font-size: 17px; color: rgba(255,255,255,0.85); margin-bottom: 36px; max-width: 560px; margin-left: auto; margin-right: auto; }
        .rgl-btn-white { display: inline-flex; align-items: center; gap: 8px; padding: 16px 36px; background: #fff; color: #0f172a; border-radius: 100px; font-weight: 700; font-size: 16px; transition: all 0.25s; border: 2px solid #fff; }
        .rgl-btn-white:hover { background: #0f172a; color: #fff; border-color: #0f172a; transform: translateY(-2px); }
      `}</style>
      <section className="rgl-cta-banner">
        <div className="rgl-container">
          <div className="rgl-cta-inner">
            <h2 className="rgl-cta-title">Ready to ditch the<br />monthly review app?</h2>
            <p className="rgl-cta-sub">One payment. Lifetime license. We install it for you.</p>
            <a href="#pricing" className="rgl-btn-white">Get Your License →</a>
          </div>
        </div>
      </section>
    </>
  )
}
