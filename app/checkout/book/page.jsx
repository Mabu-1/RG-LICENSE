"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BookContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "there";
  const total = searchParams.get("total") || "0";

  return (
    <>
      <style>{`
        .book-wrap { min-height: 100vh; background: linear-gradient(135deg,#fff 0%,#EFF6FF 60%,#DBEAFE 100%); padding: 40px 24px 80px; }
        .book-inner { max-width: 680px; margin: 0 auto; text-align: center; }
        .book-header { display: flex; align-items: center; margin-bottom: 48px; }
        .book-check { width: 72px; height: 72px; background: #F0FDF4; border: 2px solid #86EFAC; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; }
        .book-check svg { width: 36px; height: 36px; stroke: #22C55E; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
        .book-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #22C55E; margin-bottom: 12px; }
        .book-h1 { font-family: serif; font-size: clamp(28px, 5vw, 44px); font-weight: 900; color: #0F172A; letter-spacing: -1.5px; margin-bottom: 12px; line-height: 1.1; }
        .book-sub { font-size: 16px; color: #64748b; margin-bottom: 40px; line-height: 1.7; }
        .book-card { background: white; border-radius: 20px; padding: 32px; border: 1px solid #BFDBFE; margin-bottom: 24px; box-shadow: 0 4px 24px rgba(37,99,235,0.07); }
        .book-steps { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
        .book-step { display: flex; align-items: center; gap: 16px; text-align: left; }
        .book-step-num { width: 36px; height: 36px; background: #2563EB; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; flex-shrink: 0; }
        .book-step-text { font-size: 14px; color: #0F172A; font-weight: 500; }
        .book-step-sub { font-size: 12px; color: #64748b; margin-top: 2px; }
        .book-cta { display: inline-flex; align-items: center; gap: 10px; padding: 18px 40px; background: #2563EB; color: white; border-radius: 100px; font-size: 16px; font-weight: 700; text-decoration: none; transition: all 0.25s; box-shadow: 0 8px 28px rgba(37,99,235,0.3); width: 100%; justify-content: center; }
        .book-cta:hover { background: #1D4ED8; transform: translateY(-2px); }
        .book-note { font-size: 12px; color: #94a3b8; margin-top: 12px; }
        .book-summary { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px; }
        .book-summary:last-child { border: none; }

        @media (max-width: 480px) {
          .book-wrap { padding: 24px 16px 60px; }
          .book-card { padding: 20px; }
          .book-cta { font-size: 15px; padding: 16px 28px; }
        }
      `}</style>

      <div className="book-wrap">
        <div className="book-inner">

          <div className="book-header">
            <Link href="/" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>← Home</Link>
            <img src="https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373" alt="Logo" style={{ height: 36, display: "block", marginLeft: "auto" }} />
          </div>

          {/* Success check */}
          <div className="book-check">
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
          </div>

          <div className="book-eyebrow">Order Saved ✓</div>
          <h1 className="book-h1">Hey {name}, one last step!</h1>
          <p className="book-sub">
            Your order has been saved. Now book your setup call so we can get your review gallery installed within 24 hours.
          </p>

          <div className="book-card">
            <div className="book-steps">
              <div className="book-step">
                <div className="book-step-num">1</div>
                <div>
                  <div className="book-step-text">Order saved ✓</div>
                  <div className="book-step-sub">Your details are with us</div>
                </div>
              </div>
              <div className="book-step">
                <div className="book-step-num">2</div>
                <div>
                  <div className="book-step-text">Book your setup call</div>
                  <div className="book-step-sub">Pick a time that works for you — takes 30 mins</div>
                </div>
              </div>
              <div className="book-step">
                <div className="book-step-num">3</div>
                <div>
                  <div className="book-step-text">We install everything</div>
                  <div className="book-step-sub">Your gallery goes live — then we send the invoice for ${total}</div>
                </div>
              </div>
            </div>

            <a href="https://tidycal.com/mahdi/shop-review" target="_blank" rel="noopener noreferrer" className="book-cta">
              📅 Book Your Setup Call →
            </a>
            <div className="book-note">🔒 No payment now — we invoice after setup is complete</div>
          </div>

          <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>
            Questions? Contact us on WhatsApp at{" "}
            <a href="https://wa.me/8801971914828" style={{ color: "#2563EB", fontWeight: 600, textDecoration: "none" }}>+880 1971 914828</a>
          </div>

        </div>
      </div>
    </>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}>
      <BookContent />
    </Suspense>
  );
}