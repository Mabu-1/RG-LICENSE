const LOGO_URL =
  "https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373";
const LOGO_HEIGHT_DESKTOP = 36;
const LOGO_HEIGHT_MOBILE = 28;

export default function Footer() {
  return (
    <>
      <style>{`
        .rgl-footer { background: linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%); padding: 48px 0 32px; border-top: 1px solid #BFDBFE; }
        .rgl-footer-top { display: grid; grid-template-columns: 1fr auto auto; gap: 48px; align-items: start; margin-bottom: 40px; }
        .rgl-footer-logo img { height: ${LOGO_HEIGHT_DESKTOP}px; display: block; margin-bottom: 10px; }
        .rgl-footer-tagline { font-size: 13px; color: #94a3b8; max-width: 220px; line-height: 1.6; }
        .rgl-footer-col-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #0F172A; margin-bottom: 14px; }
        .rgl-footer-col { display: flex; flex-direction: column; gap: 10px; }
        .rgl-footer-link { font-size: 13px; color: #64748B; transition: color 0.2s; text-decoration: none; }
        .rgl-footer-link:hover { color: #2563EB; }
        .rgl-footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid #BFDBFE; flex-wrap: wrap; gap: 12px; }
        .rgl-footer-copy { font-size: 12px; color: #94a3b8; }
        .rgl-footer-badges { display: flex; align-items: center; gap: 10px; }
        .rgl-footer-badge { font-size: 11px; font-weight: 600; color: #64748b; background: #EFF6FF; border: 1px solid #BFDBFE; padding: 3px 10px; border-radius: 100px; }
        @media (max-width: 768px) {
          .rgl-footer-top { grid-template-columns: 1fr; gap: 28px; }
          .rgl-footer-logo img { height: ${LOGO_HEIGHT_MOBILE}px; }
          .rgl-footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>

      <footer className="rgl-footer">
        <div className="rgl-container">
          <div className="rgl-footer-top">
            {/* Brand */}
            <div>
              <a href="/" className="rgl-footer-logo">
                <img src={LOGO_URL} alt="ShopRevew" />
              </a>
              <div className="rgl-footer-tagline">
                One-time Shopify review gallery. No subscriptions. We install it
                for you.
              </div>
            </div>

            {/* Pages */}
            <div>
              <div className="rgl-footer-col-title">Pages</div>
              <div className="rgl-footer-col">
                <a href="/" className="rgl-footer-link">
                  Home
                </a>
                <a href="/about" className="rgl-footer-link">
                  About
                </a>
                <a href="/contact" className="rgl-footer-link">
                  Contact
                </a>
                <a href="/#pricing" className="rgl-footer-link">
                  Pricing
                </a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <div className="rgl-footer-col-title">Legal</div>
              <div className="rgl-footer-col">
                <a href="/terms" className="rgl-footer-link">
                  Terms & Conditions
                </a>
                <a href="/privacy" className="rgl-footer-link">
                  Privacy Policy
                </a>
                <a href="/refund" className="rgl-footer-link">
                  Refund Policy
                </a>
                <a href="/cookies" className="rgl-footer-link">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>

          <div className="rgl-footer-bottom">
            <div className="rgl-footer-copy">
              © 2026 ShopRevew. All rights reserved.
            </div>
            <div className="rgl-footer-badges">
              <span className="rgl-footer-badge">🔒 Secured by Stripe</span>
              <span className="rgl-footer-badge">✓ Shopify Compatible</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
