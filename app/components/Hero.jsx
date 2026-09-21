"use client";

export default function Hero() {
  return (
    <>
      <style>{`
        .rgl-hero {
          background: linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%);
          padding: 120px 0 80px;
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

   .rgl-hero-annotation-pill {
  background: #fff;
  border: 1.5px solid #BFDBFE;
  border-radius: 100px;
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 700;
  color: #64748B;
  box-shadow: 0 2px 8px rgba(37,99,235,0.08);
  white-space: nowrap;
  display: inline-block;
  letter-spacing: normal;
  word-spacing: normal;
  font-family: 'Inter', sans-serif;
}
        .rgl-hero-h1 {
          font-family: 'Fraunces', serif;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -2px;
          color: #0F172A;
          margin-bottom: 24px;
          max-width: 760px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
        }

        /* Annotation absolutely positioned inside h1 */
        .rgl-hero-ann {
          position: absolute;
          top: -68px;
          left: 50%;
          transform: translateX(-200px);
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
        }

        .rgl-hero-wave {
          display: inline-block;
          position: relative;
          padding-bottom: 10px;
        }
        .rgl-hero-wave svg {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 10px;
        }
        .rgl-hero-em {
          font-style: normal;
          color: #2563EB;
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

        @media (max-width: 900px) {
          .rgl-hero-ann { transform: translateX(-160px); top: -64px; }
        }
        @media (max-width: 768px) {
          .rgl-hero { padding: 100px 0 60px; }
          .rgl-hero-h1 { font-size: clamp(28px, 8vw, 44px); letter-spacing: -1px; }
          .rgl-hero-sub { font-size: 15px; }
          .rgl-hero-points { flex-direction: row; justify-content: center; gap: 8px 12px; }
          .rgl-hero-points li { font-size: 12px; }
          .rgl-hero-btn { padding: 15px 28px; font-size: 15px; }
          .rgl-hero-ann { transform: translateX(-120px); top: -60px; }
          .rgl-hero-annotation-pill { font-size: 11px; padding: 4px 10px; }
        }
        @media (max-width: 480px) {
          .rgl-hero { padding: 90px 0 50px; }
          .rgl-hero-h1 { font-size: clamp(26px, 8vw, 36px); }
          .rgl-hero-points { flex-direction: row; align-items: center; }
          .rgl-hero-ann { transform: translateX(-120px); top: -70px; }
          .rgl-hero-btn { width: 100%; justify-content: center; padding: 15px 20px; }

        
        }
              
      `}</style>

      <section className="rgl-hero" id="hero">
        <div className="rgl-container">
          <h1 className="rgl-hero-h1">
            {/* Annotation: pill above + arrow curving down to "Stop" */}
            <span className="rgl-hero-ann">
              <span className="rgl-hero-annotation-pill">
                Fake review apps for your shopify store
              </span>
              <svg width="56" height="52" viewBox="0 0 56 52" fill="none">
                <path
                  d="M8 4 C8 4 44 18 50 48"
                  stroke="#2563EB"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  opacity="0.5"
                />
                <path
                  d="M44 46 L50 48 L48 41"
                  stroke="#2563EB"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.5"
                />
              </svg>
            </span>

            {/* "Stop Paying Monthly" wavy underline */}
            <span className="rgl-hero-wave">
              Stop Paying Monthly
              <svg viewBox="0 0 480 10" fill="none" preserveAspectRatio="none">
                <path
                  d="M0 6 Q30 1 60 6 Q90 11 120 6 Q150 1 180 6 Q210 11 240 6 Q270 1 300 6 Q330 11 360 6 Q390 1 420 6 Q450 11 480 6"
                  stroke="#0F172A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.2"
                />
              </svg>
            </span>

            <br />

            {/* "Review Apps" blue + wavy underline */}
            <span className="rgl-hero-em">
              <span className="rgl-hero-wave">
                Review Apps
                <svg
                  viewBox="0 0 280 10"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6 Q35 1 70 6 Q105 11 140 6 Q175 1 210 6 Q245 11 280 6"
                    stroke="#2563EB"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </span>
          </h1>

          <p className="rgl-hero-sub">
            Display unlimited photo, video, and star rating reviews — all
            powered by your Google Sheet.
          </p>

          <ul className="rgl-hero-points">
            <li>One-time setup</li>
            <li>We install it for you</li>
            <li>Google Sheet management</li>
          </ul>

          <div className="rgl-hero-video-wrap">
            <video
              className="rgl-hero-video"
              src="https://cdn.shopify.com/videos/c/o/v/5cd7ad593733438498651d519cb155ac.mp4
              "
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
  );
}
