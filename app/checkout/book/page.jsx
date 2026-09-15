"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
function BookContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name") || "there";
  const total = searchParams.get("total") || "49.99";
  return (
    <>
      <style>{`
        .bk-wrap { min-height: 100vh; background: linear-gradient(135deg,#fff 0%,#EFF6FF 60%,#DBEAFE 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px 24px 60px; text-align: center; }
        .bk-header { position: fixed; top: 0; left: 0; right: 0; display: flex; align-items: center; padding: 18px 32px; background: rgba(255,255,255,0.8); backdrop-filter: blur(12px); border-bottom: 1px solid #BFDBFE; z-index: 10; }
        .bk-check { width: 64px; height: 64px; background: #F0FDF4; border: 2px solid #86EFAC; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .bk-check svg { width: 30px; height: 30px; stroke: #22C55E; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
        .bk-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #22C55E; margin-bottom: 10px; }
        .bk-h1 { font-family: serif; font-size: clamp(26px,5vw,40px); font-weight: 900; color: #0F172A; letter-spacing: -1.5px; margin-bottom: 10px; line-height: 1.1; }
        .bk-sub { font-size: 15px; color: #64748b; margin-bottom: 40px; line-height: 1.7; max-width: 460px; }
        .bk-box { background: white; border-radius: 24px; padding: 40px 36px; border: 1px solid #BFDBFE; box-shadow: 0 8px 40px rgba(37,99,235,0.08); max-width: 400px; width: 100%; }
        .bk-trial-badge { display: inline-flex; align-items: center; gap: 6px; background: #F0FDF4; border: 1px solid #86EFAC; border-radius: 100px; padding: 4px 14px; margin-bottom: 16px; }
        .bk-trial-dot { width: 6px; height: 6px; background: #22C55E; border-radius: 50%; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        .bk-trial-label { font-size: 11px; font-weight: 700; color: #15803D; }
        .bk-price-row { display: flex; align-items: baseline; justify-content: center; gap: 2px; margin-bottom: 6px; }
        .bk-dollar { font-family: serif; font-size: 28px; font-weight: 900; color: #22C55E; }
        .bk-amount { font-family: serif; font-size: 96px; font-weight: 900; color: #22C55E; letter-spacing: -6px; line-height: 1; }
        .bk-divider { height: 1px; background: #EFF6FF; margin: 16px 0; }
        .bk-then { font-size: 13px; color: #64748b; margin-bottom: 24px; }
        .bk-then strong { color: #0F172A; font-size: 20px; font-family: serif; font-weight: 900; }
        .bk-cta { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 16px 0; background: #2563EB; color: white; border-radius: 100px; font-size: 16px; font-weight: 700; text-decoration: none; transition: all 0.25s; box-shadow: 0 8px 28px rgba(37,99,235,0.3); width: 100%; }
        .bk-cta:hover { background: #1D4ED8; transform: translateY(-2px); }
        .bk-note { font-size: 12px; color: #94a3b8; margin-top: 12px; }
        @media (max-width: 480px) {
          .bk-wrap { padding: 90px 16px 40px; }
          .bk-amount { font-size: 72px; }
          .bk-box { padding: 28px 20px; }
          .bk-header { padding: 16px 20px; }
        }
      `}</style>

      <div className="bk-header">
        <button
          onClick={() => router.back()}
          style={{
            fontSize: 13,
            color: "#64748b",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          ← Back
        </button>
        <img
          src="https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373"
          alt="Logo"
          style={{ height: 32, display: "block", marginLeft: "auto" }}
        />
      </div>

      <div className="bk-wrap">
        <div className="bk-check">
          <svg viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div className="bk-eyebrow">Order Saved ✓</div>
        <h1 className="bk-h1">Hey {name}, book your call!</h1>
        <p className="bk-sub">
          Your order is saved. Pick a time and we will get your review gallery
          live within 24 hours.
        </p>

        <div className="bk-box">
          <div className="bk-trial-badge">
            <div className="bk-trial-dot" />
            <span className="bk-trial-label">3-Day Trial</span>
          </div>

          <div className="bk-price-row">
            <span className="bk-dollar">$</span>
            <span className="bk-amount">1</span>
          </div>

          <div className="bk-divider" />

          <div className="bk-then">
            then <strong>${total}</strong> one-time after trial
          </div>

          <a
            href="https://tidycal.com/mahdi/shop-review"
            target="_blank"
            rel="noopener noreferrer"
            className="bk-cta"
          >
            📅 Book Your Setup Call →
          </a>
          <div className="bk-note">
            🔒 No payment now — we invoice after setup
          </div>
        </div>
      </div>
    </>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Loading...
        </div>
      }
    >
      <BookContent />
    </Suspense>
  );
}
