"use client";

const LOGO_URL =
  "https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373";
const LOGO_HEIGHT_DESKTOP = 44;
const LOGO_HEIGHT_MOBILE = 28;

export default function Nav() {
  return (
    <>
      <style>{`
        .rgl-nav { position: sticky; top: 0; z-index: 100; background: rgba(239,246,255,0.85); backdrop-filter: blur(16px); border-bottom: 1px solid #BFDBFE; }
        .rgl-nav-inner { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; max-width: 1160px; margin: 0 auto; }
        .rgl-logo { display: flex; align-items: center; }
        .rgl-logo img { height: ${LOGO_HEIGHT_DESKTOP}px; display: block; }
        .rgl-nav-links { display: flex; align-items: center; gap: 28px; }
        .rgl-nav-link { font-size: 14px; font-weight: 500; color: #64748B; transition: color 0.2s; text-decoration: none; }
        .rgl-nav-link:hover { color: #2563EB; }
        .rgl-btn-primary { display: inline-flex; align-items: center; gap: 6px; padding: 10px 22px; background: #2563EB; color: #fff; border-radius: 100px; font-weight: 600; font-size: 14px; transition: all 0.25s; border: 2px solid #2563EB; cursor: pointer; text-decoration: none; }
        .rgl-btn-primary:hover { background: #1D4ED8; border-color: #1D4ED8; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,0.3); }
        @media (max-width: 620px) {
          .rgl-nav-links a:not(.rgl-btn-primary) { display: none; }
          .rgl-logo img { height: ${LOGO_HEIGHT_MOBILE}px; }
          .rgl-btn-primary
          {
          font-size:10px;
          }
        }
      `}</style>
      <nav className="rgl-nav">
        <div className="rgl-nav-inner">
          <a href="/" className="rgl-logo">
            <img src={LOGO_URL} alt="Logo" />
          </a>
          <div className="rgl-nav-links">
            <a href="#feat-settings" className="rgl-nav-link">
              Features
            </a>
            <a href="#how" className="rgl-nav-link">
              How it Works
            </a>
            <a href="#pricing" className="rgl-nav-link">
              Pricing
            </a>
            <a href="#pricing" className="rgl-btn-primary">
              Get For Your Shop →
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
