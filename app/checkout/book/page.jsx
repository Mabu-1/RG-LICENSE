"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#0F172A",
      fontFamily: "inherit",
      lineHeight: "28px",
      "::placeholder": { color: "#94a3b8" },
    },
    invalid: { color: "#ef4444" },
  },
};

function PaymentForm({ name, email, orderId, total }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [preparing, setPreparing] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function prepare() {
      try {
        const res = await fetch("/api/stripe/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name || "Customer",
            email: email || "customer@example.com",
            orderId,
            total: parseFloat(total),
          }),
        });
        const data = await res.json();
        if (data.error) { setError(data.error); setPreparing(false); return; }
        setClientSecret(data.clientSecret);
        setCustomerId(data.customerId);
        setPreparing(false);
      } catch (err) {
        setError("Failed to prepare payment. Please refresh.");
        setPreparing(false);
      }
    }
    prepare();
  }, [name, email, orderId, total]);

  async function handlePay() {
    if (!stripe || !elements || !clientSecret) return;
    setLoading(true);
    setError("");
    const cardNumber = elements.getElement(CardNumberElement);
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumber,
        billing_details: { name, email },
      },
    });
    if (stripeError) { setError(stripeError.message); setLoading(false); return; }
    if (paymentIntent.status === "succeeded") {
      await fetch("/api/stripe/confirm-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          customerId,
          paymentMethodId: paymentIntent.payment_method,
          paymentIntentId: paymentIntent.id,
        }),
      });
      window.location.href = "https://tidycal.com/mahdi/shop-review";
    }
  }

  const fieldBox = {
    background: "white",
    borderRadius: 10,
    padding: "14px 16px",
    border: "1.5px solid #BFDBFE",
  };
  const fieldLabel = {
    fontSize: 11,
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    display: "block",
  };

  if (preparing) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "24px 0" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ width: 36, height: 36, border: "3px solid #BFDBFE", borderTop: "3px solid #2563EB", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <div style={{ fontSize: 13, color: "#64748b" }}>Preparing secure payment...</div>
    </div>
  );

  return (
    <div>
      {/* Card Number — full row */}
      <div style={{ ...fieldBox, marginBottom: 12 }}>
        <label style={fieldLabel}>Card Number</label>
        <CardNumberElement options={ELEMENT_OPTIONS} />
      </div>

      {/* Expiry + CVC — side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        <div style={fieldBox}>
          <label style={fieldLabel}>Expiry Date</label>
          <CardExpiryElement options={ELEMENT_OPTIONS} />
        </div>
        <div style={fieldBox}>
          <label style={fieldLabel}>CVC</label>
          <CardCvcElement options={ELEMENT_OPTIONS} />
        </div>
      </div>

      {error && (
        <div style={{ color: "#ef4444", fontSize: 12, marginBottom: 14, padding: "10px 14px", background: "#FEF2F2", borderRadius: 8, border: "1px solid #FCA5A5" }}>
          {error}
        </div>
      )}

      <button
        onClick={handlePay}
        disabled={loading || !stripe || !clientSecret}
        style={{
          width: "100%", padding: "16px",
          background: loading ? "#94a3b8" : "#2563EB",
          color: "white", border: "none", borderRadius: 100,
          fontSize: 16, fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          boxShadow: loading ? "none" : "0 8px 28px rgba(37,99,235,0.3)",
          marginBottom: 14,
        }}
      >
        {loading ? "⏳ Processing..." : "💳 Pay $1 & Book Call →"}
      </button>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11, color: "#94a3b8" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        Secured by Stripe — card never stored on our servers
      </div>
    </div>
  );
}

function BookContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name") || "";
  const total = searchParams.get("total") || "49.99";
  const orderId = searchParams.get("order_id") || "";
  const email = searchParams.get("email") || "";

  return (
    <>
      <style>{`
        .bk-wrap { min-height: 100vh; background: linear-gradient(135deg,#fff 0%,#EFF6FF 60%,#DBEAFE 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px 24px 60px; }
        .bk-header { position: fixed; top: 0; left: 0; right: 0; display: flex; align-items: center; padding: 18px 32px; background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); border-bottom: 1px solid #BFDBFE; z-index: 10; }
        .bk-box { background: white; border-radius: 24px; padding: 40px 36px; border: 1px solid #BFDBFE; box-shadow: 0 8px 40px rgba(37,99,235,0.08); max-width: 460px; width: 100%; }
        .bk-trial-badge { display: inline-flex; align-items: center; gap: 6px; background: #F0FDF4; border: 1px solid #86EFAC; border-radius: 100px; padding: 4px 14px; margin-bottom: 20px; }
        .bk-trial-dot { width: 6px; height: 6px; background: #22C55E; border-radius: 50%; animation: bkpulse 1.5s infinite; }
        @keyframes bkpulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        .bk-trial-label { font-size: 11px; font-weight: 700; color: #15803D; }
        .bk-top { text-align: center; margin-bottom: 28px; }
        .bk-price-row { display: flex; align-items: baseline; justify-content: center; gap: 2px; margin-bottom: 6px; }
        .bk-dollar { font-family: serif; font-size: 32px; font-weight: 900; color: #22C55E; }
        .bk-amount { font-family: serif; font-size: 100px; font-weight: 900; color: #22C55E; letter-spacing: -6px; line-height: 1; }
        .bk-then { font-size: 13px; color: #64748b; }
        .bk-then strong { color: #0F172A; font-weight: 700; }
        .bk-divider { height: 1px; background: #EFF6FF; margin: 24px 0; }
        .bk-form-title { font-size: 14px; font-weight: 700; color: #0F172A; margin-bottom: 20px; text-align: center; }
        @media (max-width: 480px) {
          .bk-wrap { padding: 90px 16px 40px; }
          .bk-amount { font-size: 72px; }
          .bk-box { padding: 28px 20px; }
          .bk-header { padding: 16px 20px; }
        }
      `}</style>

      <div className="bk-header">
        <button onClick={() => router.back()} style={{ fontSize: 13, color: "#64748b", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          ← Back
        </button>
        <img
          src="https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373"
          alt="Logo"
          style={{ height: 32, display: "block", marginLeft: "auto" }}
        />
      </div>

      <div className="bk-wrap">
        <Elements stripe={stripePromise}>
          <div className="bk-box">
            <div className="bk-top">
              <div className="bk-trial-badge">
                <div className="bk-trial-dot" />
                <span className="bk-trial-label">3-Day Trial</span>
              </div>
              <div className="bk-price-row">
                <span className="bk-dollar">$</span>
                <span className="bk-amount">1</span>
              </div>
              <div className="bk-then">
                then <strong>${total}</strong> one-time after 3 days — charged automatically
              </div>
            </div>

            <div className="bk-divider" />

            <div className="bk-form-title">Enter your card details</div>
            <PaymentForm name={name} email={email} orderId={orderId} total={total} />
          </div>
        </Elements>
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
