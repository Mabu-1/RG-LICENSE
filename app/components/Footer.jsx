const LOGO_URL = 'https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373'
const LOGO_HEIGHT_DESKTOP = 40
const LOGO_HEIGHT_MOBILE = 30

export default function Footer() {
  return (
    <>
      <style>{`
        .rgl-footer { background: #0f172a; padding: 40px 0; }
        .rgl-footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
        .rgl-footer-logo img { height: ${LOGO_HEIGHT_DESKTOP}px; display: block; }
        .rgl-footer-copy { font-size: 13px; color: rgba(255,255,255,0.3); }
        .rgl-footer-links { display: flex; gap: 24px; }
        .rgl-footer-link { font-size: 13px; color: rgba(255,255,255,0.38); transition: color 0.2s; }
        .rgl-footer-link:hover { color: rgba(255,255,255,0.85); }
        @media (max-width: 620px) {
          .rgl-footer-logo img { height: ${LOGO_HEIGHT_MOBILE}px; }
          .rgl-footer-inner { flex-direction: column; text-align: center; }
          .rgl-footer-links { justify-content: center; }
        }
      `}</style>
      <footer className="rgl-footer">
        <div className="rgl-container">
          <div className="rgl-footer-inner">
            <div className="rgl-footer-logo">
              <img src={LOGO_URL} alt="Logo" />
            </div>
            <div className="rgl-footer-copy">© 2026 Shop Review. All rights reserved.</div>
            <div className="rgl-footer-links">
              <a href="#" className="rgl-footer-link">Contact</a>
              <a href="#" className="rgl-footer-link">Terms</a>
              <a href="#" className="rgl-footer-link">License</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
