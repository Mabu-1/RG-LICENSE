"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");
  const sessionId = searchParams.get("session_id");
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function confirm() {
      if (!orderId || !sessionId) return;
      const today = new Date().toISOString().split("T")[0];
      await supabaseBrowser.from("orders").update({
        trial_status: "trial",
        trial_start_date: today,
        is_trial: true,
        status: "active",
        stripe_session_id: sessionId,
      }).eq("id", orderId);
      sessionStorage.removeItem("co_form");
      sessionStorage.removeItem("co_domains");
      setDone(true);
    }
    confirm();
  }, [orderId, sessionId]);

  return (
    <>
      <style>{`
        .sc-wrap { min-height: 100vh; background: linear-gradient(135deg,#fff 0%,#EFF6FF 60%,#DBEAFE 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 24px; text-align: center; }
        .sc-check { width: 80px; height: 80px; background: #F0FDF4; border: 3px solid #86EFAC; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; }
        .sc-check svg { width: 40px; height: 40px; stroke: #22C55E; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
        .sc-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #22C55E; margin-bottom: 12px; }
        .sc-h1 { font-family: serif; font-size: clamp(28px,5vw,44px); font-weight: 900; color: #0F172A; letter-spacing: -1.5px; margin-bottom: 12px; }
        .sc-sub { font-size: 15px; color: #64748b; margin-bottom: 40px; line-height: 1.7; max-width: 480px; }
        .sc-box { background: white; border-radius: 20px; padding: 32px; border: 1px solid #BFDBFE; box-shadow: 0 8px 40px rgba(37,99,235,0.08); max-width: 440px; width: 100%; margin-bottom: 24px; }
        .sc-step { display: flex; align-items: center; gap: 14px; text-align: left; padding: 12px 0; border-bottom: 1px solid #F1F5F9; }
        .sc-step:last-child { border: none; }
        .sc-step-num { width: 32px; height: 32px; background: #2563EB; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; }
        .sc-step-done { background: #22C55E; }
        .sc-step-title { font-size: 14px; font-weight: 600; color: #0F172A; }
        .sc-step-sub { font-size: 12px; color: #64748b; margin-top: 2px; }
        .sc-cta { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 16px 36px; background: #2563EB; color: white; border-radius: 100px; font-size: 15px; font-weight: 700; text-decoration: none; transition: all 0.25s; box-shadow: 0 8px 28px rgba(37,99,235,0.3); }
        .sc-cta:hover { background: #1D4ED8; transform: translateY(-2px); }
        @media (max-width: 480px) { .sc-box { padding: 24px 18px; } }
      `}</style>

      <div className="sc-wrap">
        <div className="sc-check">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <div className="sc-eyebrow">Payment Confirmed ✓</div>
        <h1 className="sc-h1">You are all set!</h1>
        <p className="sc-sub">
          Your $1 trial has started. After 3 days we will automatically charge the remaining amount. No action needed from you.
        </p>

        <div className="sc-box">
          {[
            { label: "Payment confirmed", sub: "$1 trial started successfully", done: true },
            { label: "Book your setup call", sub: "Pick a time — takes 30 mins", done: false },
            { label: "We install everything", sub: "Gallery goes live within 24h of your call", done: false },
            { label: "Auto-charge after 3 days", sub: "Remaining amount charged automatically", done: false },
          ].map((s, i) => (
            <div key={i} className="sc-step">
              <div className={`sc-step-num${s.done ? " sc-step-done" : ""}`}>
                {s.done ? "✓" : i + 1}
              </div>
              <div>
                <div className="sc-step-title">{s.label}</div>
                <div className="sc-step-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <a href="https://tidycal.com/mahdi/shop-review" target="_blank" rel="noopener noreferrer" className="sc-cta">
          📅 Book Your Setup Call →
        </a>
        <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 12 }}>
          Questions? WhatsApp us at <a href="https://wa.me/8801971914828" style={{ color: "#2563EB", fontWeight: 600, textDecoration: "none" }}>+880 1971 914828</a>
        </div>
      </div>
    </>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
