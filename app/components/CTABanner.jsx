export default function CTABanner() {
  return (
    <>
      <style>{`
        .rgl-cta-banner { background: linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%); padding: 80px 0; }
        .rgl-cta-inner { text-align: center; }
        .rgl-cta-title { font-family: 'Fraunces', serif; font-size: clamp(30px,4vw,52px); font-weight: 900; color: #0F172A; letter-spacing: -2px; margin-bottom: 14px; line-height: 1.05; }
        .rgl-cta-sub { font-size: 17px; color: #64748B; margin-bottom: 36px; max-width: 560px; margin-left: auto; margin-right: auto; }
        .rgl-btn-blue { display: inline-flex; align-items: center; gap: 8px; padding: 16px 36px; background: #2563EB; color: #fff; border-radius: 100px; font-weight: 700; font-size: 16px; transition: all 0.25s; border: 2px solid #2563EB; text-decoration: none; box-shadow: 0 8px 32px rgba(37,99,235,0.3); }
        .rgl-btn-blue:hover { background: #1D4ED8; border-color: #1D4ED8; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(37,99,235,0.4); }
      `}</style>
      <section className="rgl-cta-banner">
        <div className="rgl-container">
          <div className="rgl-cta-inner">
            <h2 className="rgl-cta-title">
              Ready to ditch the
              <br />
              monthly review app?
            </h2>
            <p className="rgl-cta-sub">
              One payment. Lifetime license. We install it for you.
            </p>
            <a href="#pricing" className="rgl-btn-blue">
              Get Your License →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
