"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import { useRouter } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");
  const sessionId = searchParams.get("session_id");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    async function confirm() {
      if (!orderId) return;
      const today = new Date().toISOString().split("T")[0];
      await supabaseBrowser.from("orders").update({
        trial_status: "trial",
        trial_start_date: today,
        is_trial: true,
        status: "active",
        stripe_session_id: sessionId || "",
      }).eq("id", orderId);
      sessionStorage.removeItem("co_form");
      sessionStorage.removeItem("co_domains");
    }
    confirm();
  }, [orderId, sessionId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [router]);

  return (
    <>
      <style>{`
        .sc-wrap { min-height: 100vh; background: linear-gradient(135deg,#fff 0%,#EFF6FF 60%,#DBEAFE 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 24px; text-align: center; }
        .sc-check { width: 80px; height: 80px; background: #F0FDF4; border: 3px solid #86EFAC; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; animation: scpop 0.4s ease; }
        @keyframes scpop { 0%{transform:scale(0)} 80%{transform:scale(1.1)} 100%{transform:scale(1)} }
        .sc-check svg { width: 40px; height: 40px; stroke: #22C55E; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
        .sc-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #22C55E; margin-bottom: 12px; }
        .sc-h1 { font-family: serif; font-size: clamp(32px,5vw,52px); font-weight: 900; color: #0F172A; letter-spacing: -1.5px; margin-bottom: 16px; line-height: 1.05; }
        .sc-sub { font-size: 16px; color: #64748b; margin-bottom: 40px; line-height: 1.7; max-width: 440px; }
        .sc-countdown { display: inline-flex; align-items: center; gap: 10px; background: white; border: 1px solid #BFDBFE; border-radius: 100px; padding: 10px 24px; font-size: 13px; color: #64748b; font-weight: 500; }
        .sc-countdown strong { color: #2563EB; font-weight: 700; }
        @media (max-width: 480px) { .sc-wrap { padding: 40px 20px; } }
      `}</style>

      <div className="sc-wrap">
        <div className="sc-check">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
        </div>

        <div className="sc-eyebrow">Payment Confirmed ✓</div>
        <h1 className="sc-h1">Thank you!<br />You are all set.</h1>
        <p className="sc-sub">
          Your $1 trial has started. We will be in touch via WhatsApp to schedule your setup. After 3 days the remaining amount will be charged automatically.
        </p>

        <div className="sc-countdown">
          Redirecting to home in <strong>{countdown}s</strong>
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
