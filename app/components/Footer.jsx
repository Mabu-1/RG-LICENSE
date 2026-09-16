const LOGO_URL =
  "https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373";
const LOGO_HEIGHT_DESKTOP = 40;
const LOGO_HEIGHT_MOBILE = 30;

export default function Footer() {
  return (
    <>
      <style>{`
        .rgl-footer { background: linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%); padding: 40px 0; border-top: 1px solid #BFDBFE; }
        .rgl-footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
        .rgl-footer-logo img { height: ${LOGO_HEIGHT_DESKTOP}px; display: block; }
        .rgl-footer-copy { font-size: 13px; color: #94a3b8; }
        .rgl-footer-links { display: flex; gap: 24px; }
        .rgl-footer-link { font-size: 13px; color: #64748B; transition: color 0.2s; text-decoration: none; }
        .rgl-footer-link:hover { color: #2563EB; }
        @media (max-width: 620px) {
          .rgl-footer-logo img { height: ${LOGO_HEIGHT_MOBILE}px; }
          .rgl-footer-inner { flex-direction: column; text-align: center; }
          .rgl-footer-links { justify-content: center; }
        }
      `}</style>
      <footer className="rgl-footer">
        <div className="rgl-container">
          <div className="rgl-footer-inner">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 48,
              }}
            >
              <Link
                href="/"
                style={{
                  fontSize: 13,
                  color: "#64748b",
                  textDecoration: "none",
                }}
              >
                ← Back
              </Link>
              <a href="/" style={{ marginLeft: "auto", display: "block" }}>
                <img
                  src={LOGO_URL}
                  alt="ShopReview"
                  style={{ height: 36, display: "block" }}
                />
              </a>
            </div>
            <div className="rgl-footer-copy">
              © 2026 ShopRevew. All rights reserved.
            </div>
            <div className="rgl-footer-links">
              <a href="/contact" className="rgl-footer-link">
                Contact
              </a>
              <a href="/about" className="rgl-footer-link">
                About
              </a>
              <a href="/terms" className="rgl-footer-link">
                Terms
              </a>
              <a href="/#pricing" className="rgl-footer-link">
                License
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
