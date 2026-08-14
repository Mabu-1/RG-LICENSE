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
          text-align: center;
        }
        .rgl-hero::before {
          content: '';
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 600px;
          background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%);
          pointer-events: none;
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
          margin-bottom: 28px;
        }
        .rgl-hero-h1 {
          font-family: 'Fraunces', serif;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -2px;
          color: #fff;
          margin-bottom: 20px;
          max-width: 760px;
          margin-left: auto;
          margin-right: auto;
        }
        .rgl-hero-h1 em {
          font-style: normal;
          color: #F59E0B;
        }
        .rgl-hero-sub {
          font-size: 18px;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
          margin-bottom: 32px;
          max-width: 540px;
          margin-left: auto;
          margin-right: auto;
        }
        .rgl-hero-points {
          list-style: none;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px 24px;
          margin-bottom: 48px;
        }
        .rgl-hero-points li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: rgba(255,255,255,0.75);
          font-weight: 500;
        }
        .rgl-hero-points li::before {
          content: '✓';
          width: 20px;
          height: 20px;
          background: rgba(245,158,11,0.15);
          border: 1px solid rgba(245,158,11,0.3);
          border-radius: 50%;
          color: #F59E0B;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .rgl-hero-video-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.08);
          background: #000;
          max-width: 900px;
          margin: 0 auto 40px;
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
        .rgl-hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 18px 40px;
          background: #F59E0B;
          color: #0F172A;
          font-size: 16px;
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
        @media (max-width: 768px) {
          .rgl-hero { padding: 70px 0 60px; }
          .rgl-hero-h1 { font-size: 36px; letter-spacing: -1px; }
          .rgl-hero-sub { font-size: 16px; }
          .rgl-hero-points { flex-direction: column; align-items: center; }
        }
      `}</style>

      <section className="rgl-hero" id="hero">
        <div className="rgl-container">

          <div className="rgl-hero-eyebrow">★ Shopify Review Gallery</div>

          <h1 className="rgl-hero-h1">
            Stop Paying Monthly<br />
            for <em>Review Apps</em>
          </h1>

          <p className="rgl-hero-sub">
            Display unlimited photo, video, and star rating reviews — all powered by your Google Sheet.
          </p>

          <ul className="rgl-hero-points">
            <li>One-time setup</li>
            <li>Google Sheet management</li>
            <li>We install it for you</li>
          </ul>

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

          <a href="#pricing" className="rgl-hero-btn">
            Get For Your Store →
          </a>

        </div>
      </section>
    </>
  )
}
