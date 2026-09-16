const LOGO_URL =
  "https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373";
const LOGO_HEIGHT = 34;

export default function Footer() {
  return (
    <>
      <style>{`
        .rgl-footer { background: linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%); padding: 56px 0 28px; border-top: 1px solid #BFDBFE; }
        .rgl-footer-top { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 32px; margin-bottom: 40px; }
        .rgl-footer-brand a { display: inline-block; margin-bottom: 10px; }
        .rgl-footer-brand img { height: ${LOGO_HEIGHT}px; display: block; }
        .rgl-footer-tagline { font-size: 13px; color: #94a3b8; line-height: 1.65; max-width: 200px; }
        .rgl-footer-col-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #0F172A; margin-bottom: 14px; }
        .rgl-footer-col { display: flex; flex-direction: column; gap: 10px; }
        .rgl-footer-link { font-size: 13px; color: #64748B; text-decoration: none; transition: color 0.2s; width: fit-content; }
        .rgl-footer-link:hover { color: #2563EB; }
        .rgl-footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid #BFDBFE; }
        .rgl-footer-copy { font-size: 12px; color: #94a3b8; }
        .rgl-footer-stripe { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #94a3b8; }
        .rgl-footer-stripe svg { opacity: 0.5; }

        @media (max-width: 768px) {
          .rgl-footer { padding: 40px 0 24px; }
          .rgl-footer-top { grid-template-columns: 1fr 1fr; gap: 28px; }
          .rgl-footer-brand { grid-column: 1 / -1; text-align: center; }
          .rgl-footer-tagline { max-width: 100%; margin: 0 auto; }
          .rgl-footer-bottom { flex-direction: column; gap: 10px; text-align: center; }
        }

        @media (max-width: 480px) {
          .rgl-footer-top { grid-template-columns: 1fr 1fr; }
          .rgl-footer-col { align-items: flex-start; }
        }
      `}</style>

      <footer className="rgl-footer">
        <div className="rgl-container">
          <div className="rgl-footer-top">
            {/* Brand */}
            <div className="rgl-footer-brand">
              <a href="/">
                <img src={LOGO_URL} alt="ShopRevew" />
              </a>
              <div className="rgl-footer-tagline">
                One-time Shopify review gallery.
                <br />
                No subscriptions. We install it for you.
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
            <div className="rgl-footer-stripe">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Secured by Stripe
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
