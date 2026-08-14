'use client'

export default function Hero() {
  return (
    <>
      <style>{`
        .rgl-hero {
          background: #0F172A;
          padding: 100px 0 80px;
          position: relative;
          overflow: hidden;
        }
        .rgl-hero::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .rgl-hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .rgl-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(245,158,11,0.12);
          border: 1px solid rgba(245,158,11,0.25);
          color: #F59E0B;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 24px;
        }
        .rgl-hero-h1 {
          font-family: 'Fraunces', serif;
          font-size: clamp(32px, 4.5vw, 54px);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -2px;
          color: #fff;
          margin-bottom: 20px;
        }
        .rgl-hero-h1 em {
          font-style: normal;
          color: #F59E0B;
        }
        .rgl-hero-sub {
          font-size: 18px;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
          margin-bottom: 28px;
          max-width: 480px;
        }
        .rgl-hero-points {
          list-style: none;
          margin-bottom: 36px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .rgl-hero-points li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          color: rgba(255,255,255,0.8);
          font-weight: 500;
        }
        .rgl-hero-points li::before {
          content: '✓';
          width: 22px;
          height: 22px;
          background: rgba(245,158,11,0.15);
          border: 1px solid rgba(245,158,11,0.3);
          border-radius: 50%;
          color: #F59E0B;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .rgl-hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 36px;
          background: #F59E0B;
          color: #0F172A;
          font-size: 15px;
          font-weight: 700;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.25s;
          box-shadow: 0 8px 32px rgba(245,158,11,0.35);
        }
        .rgl-hero-btn:hover {
          background: #D97706;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(245,158,11,0.45);
        }
        .rgl-hero-video-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.08);
          background: #000;
        }
        .rgl-hero-video-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4) 100%);
          z-index: 1;
          pointer-events: none;
        }
        .rgl-hero-video {
          width: 100%;
          display: block;
          border-radius: 20px;
        }
        .rgl-hero-video-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          z-index: 2;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .rgl-hero-video-dot {
          width: 8px;
          height: 8px;
          background: #F59E0B;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @media (max-width: 900px) {
          .rgl-hero { padding: 70px 0 60px; }
          .rgl-hero-inner { grid-template-columns: 1fr; gap: 48px; }
          .rgl-hero-h1 { font-size: 36px; }
        }
      `}</style>

      <section className="rgl-hero" id="hero">
        <div className="rgl-container">
          <div className="rgl-hero-inner">

            <div>
              <div className="rgl-hero-eyebrow">★ Shopify Review Gallery</div>
              <h1 className="rgl-hero-h1">
                Stop Paying Monthly<br />
                for <em>Review Apps</em>
              </h1>
              <p className="rgl-hero-sub">
                Display unlimited photo, video, and star rating reviews — all powered by your Google Sheet.
              </p>
              <ul className="rgl-hero-points">
                <li>One-time setup, no subscriptions ever</li>
                <li>Managed with Google Sheets — no dashboard needed</li>
                <li>We install everything for you</li>
              </ul>
              <a href="#pricing" className="rgl-hero-btn">
                Get For Your Store →
              </a>
            </div>

            <div>
              <div className="rgl-hero-video-wrap">
                <video
                  className="rgl-hero-video"
                  src="https://cdn.shopify.com/videos/c/o/v/02994640c893463e8c6d2f261fb75caa.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="rgl-hero-video-badge">
                  <div className="rgl-hero-video-dot" />
                  Live Preview
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
