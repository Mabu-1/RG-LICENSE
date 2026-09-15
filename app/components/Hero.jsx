'use client'

export default function Hero() {
  return (
    <>
      <style>{`
        .rgl-hero {
          background: linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%);
          padding: 100px 0 80px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .rgl-hero::before {
          content: '';
          position: absolute;
          top: -200px; left: 50%;
          transform: translateX(-50%);
          width: 800px; height: 600px;
          background: radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .rgl-hero-h1 {
          font-family: 'Fraunces', serif;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -2px;
          color: #0F172A;
          margin-bottom: 20px;
          max-width: 760px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
        }

        /* Line 1 wrapper — underline + annotation */
        .rgl-hero-line1 {
          display: inline-block;
          position: relative;
          margin-bottom: 8px;
        }

        /* Full underline under "Stop Paying Monthly" */
        .rgl-hero-line1-underline {
          display: block;
          width: 100%;
          margin-top: 2px;
        }

        /* Fake reviews annotation — floats top right of line1 */
        .rgl-hero-annotation {
          position: absolute;
          top: -48px;
          right: -20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
        }
        .rgl-hero-annotation-label {
          background: #fff;
          border: 1.5px solid #BFDBFE;
          border-radius: 100px;
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 700;
          color: #94a3b8;
          text-decoration: line-through;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(37,99,235,0.08);
        }
        .rgl-hero-annotation-arrow {
          margin-top: 2px;
        }

        /* "Review Apps" with wavy underline */
        .rgl-hero-em {
          font-style: normal;
          color: #2563EB;
          position: relative;
          display: inline-block;
        }
        .rgl-hero-em-wave {
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          height: 10px;
        }

        .rgl-hero-sub {
          font-size: 18px;
          color: #64748B;
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
          color: #334155;
          font-weight: 500;
        }
        .rgl-hero-points li::before {
          content: '✓';
          width: 20px; height: 20px;
          background: rgba(37,99,235,0.1);
          border: 1px solid rgba(37,99,235,0.25);
          border-radius: 50%;
          color: #2563EB;
          font-size: 10px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .rgl-hero-video-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(37,99,235,0.15);
          border: 1px solid rgba(37,99,235,0.1);
          background: #000;
          max-width: 900px;
          margin: 0 auto 40px;
        }
        .rgl-hero-video-wrap::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4) 100%);
          z-index: 1; pointer-events: none;
        }
        .rgl-hero-video { width: 100%; display: block; border-radius: 20px; }
        .rgl-hero-video-badge {
          position: absolute; bottom: 20px; left: 20px; z-index: 2;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff; font-size: 12px; font-weight: 600;
          padding: 8px 14px; border-radius: 100px;
          display: flex; align-items: center; gap: 6px;
        }
        .rgl-hero-video-dot {
          width: 8px; height: 8px;
          background: #2563EB; border-radius: 50%;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .rgl-hero-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 18px 40px;
          background: #2563EB; color: #fff;
          font-size: 16px; font-weight: 700;
          border-radius: 100px; text-decoration: none;
          transition: all 0.25s;
          box-shadow: 0 8px 32px rgba(37,99,235,0.35);
        }
        .rgl-hero-btn:hover {
          background: #1D4ED8;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(37,99,235,0.45);
        }

        @media (max-width: 768px) {
          .rgl-hero { padding: 80px 0 60px; }
          .rgl-hero-h1 { font-size: clamp(30px, 8vw, 44px); letter-spacing: -1px; }
          .rgl-hero-sub { font-size: 15px; }
          .rgl-hero-points { flex-direction: row; justify-content: center; gap: 8px 12px; }
          .rgl-hero-points li { font-size: 12px; }
          .rgl-hero-btn { padding: 15px 28px; font-size: 15px; }
          .rgl-hero-annotation { top: -44px; right: -8px; }
          .rgl-hero-annotation-label { font-size: 11px; padding: 3px 10px; }
        }
        @media (max-width: 480px) {
          .rgl-hero-points { flex-direction: column; align-items: center; }
          .rgl-hero-annotation { top: -40px; right: 0px; }
        }
      `}</style>

      <section className="rgl-hero" id="hero">
        <div className="rgl-container">

          <h1 className="rgl-hero-h1">

            {/* "Stop Paying Monthly" with full underline + annotation */}
            <span className="rgl-hero-line1">

              {/* Fake reviews annotation top right */}
              <span className="rgl-hero-annotation">
                <span className="rgl-hero-annotation-label">Fake reviews</span>
                <svg className="rgl-hero-annotation-arrow" width="24" height="20" viewBox="0 0 24 20" fill="none">
                  <path d="M12 2 Q6 8 4 16" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" opacity="0.5"/>
                  <path d="M2 14 L4 16 L7 13" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                </svg>
              </span>

              Stop Paying Monthly

              {/* Full underline under all 3 words */}
              <svg className="rgl-hero-line1-underline" viewBox="0 0 400 10" fill="none" preserveAspectRatio="none" style={{ height: 8 }}>
                <path d="M0 5 L400 5" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" opacity="0.35"/>
              </svg>
            </span>

            <br />

            {/* "for Review Apps" */}
            for{' '}
            <span className="rgl-hero-em">
              Review Apps
              <svg className="rgl-hero-em-wave" viewBox="0 0 200 10" fill="none" preserveAspectRatio="none">
                <path d="M0 6 Q25 1 50 6 Q75 11 100 6 Q125 1 150 6 Q175 11 200 6" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              </svg>
            </span>
          </h1>

          <p className="rgl-hero-sub">
            Display unlimited photo, video, and star rating reviews — all powered by your Google Sheet.
          </p>

          <ul className="rgl-hero-points">
            <li>One-time setup</li>
            <li>We install it for you</li>
            <li>Google Sheet management</li>
          </ul>

          <div className="rgl-hero-video-wrap">
            <video
              className="rgl-hero-video"
              src="https://cdn.shopify.com/videos/c/o/v/02994640c893463e8c6d2f261fb75caa.mp4"
              autoPlay muted loop playsInline
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