"use client";
import { supabaseBrowser } from "@/lib/supabase";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const TIDYCAL_URL = "https://tidycal.com/mahdi/shop-review";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planKey = searchParams.get("plan") || "starter";

  const [plan, setPlan] = useState(null);
  const [planLoading, setPlanLoading] = useState(true);
  const [domains, setDomains] = useState([""]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function loadPlan() {
      if (!supabaseBrowser) {
        setPlan({ name: "Starter", price: 49.99, cents: "", desc: "", features: [] });
        setPlanLoading(false);
        return;
      }
      const { data } = await supabaseBrowser.from("pricing_plans").select("*").order("sort_order");
      if (data && data.length > 0) {
        const p = data[0];
        setPlan({ name: p.name, price: parseFloat(p.price), cents: p.cents || "", desc: p.description || "", features: Array.isArray(p.features) ? p.features : [] });
      }
      setPlanLoading(false);
    }
    loadPlan();
  }, [planKey]);

  const extraDomains = Math.max(0, domains.length - 3);
  const addonCost = extraDomains * 10;
  const fullTotal = plan ? plan.price + addonCost : 0;

  function addDomain() {
    setDomains([...domains, ""]);
  }

  function updateDomain(i, val) {
    const updated = [...domains];
    updated[i] = val;
    setDomains(updated);
  }

  function removeDomain(i) {
    if (domains.length === 1) return;
    setDomains(domains.filter((_, idx) => idx !== i));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email required";
    if (!domains[0].trim()) e.domain0 = "Required";
    domains.forEach((d, i) => {
      if (i > 0 && !d.trim()) e[`domain${i}`] = "Required";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setLoading(true);
    const cleanDomains = domains.map(d => d.toLowerCase().replace(/^www\./, "").replace(/\/$/, ""));
    const { error } = await supabaseBrowser.from("orders").insert({
      name: form.name,
      email: form.email,
      domain: cleanDomains[0],
      plan: plan.name,
      plan_price: plan.price,
      addon_domain: domains.length > 1,
      addon_domain_list: cleanDomains.slice(1),
      addon_design: false,
      addon_design_count: 0,
      selected_designs: [],
      total: fullTotal,
      notes: form.message,
      status: "pending",
    });
    if (error) console.error("Order save error:", error);
    window.location.href = TIDYCAL_URL;
  }

  const inp = {
    width: "100%", padding: "11px 14px", border: "1px solid #BFDBFE",
    borderRadius: 10, fontSize: 14, boxSizing: "border-box",
    fontFamily: "inherit", outline: "none", background: "white",
  };
  const lbl = { fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 5 };

  if (planLoading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#fff 0%,#EFF6FF 60%,#DBEAFE 100%)" }}>
      <div style={{ color: "#64748b" }}>Loading...</div>
    </div>
  );

  if (!plan) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#fff 0%,#EFF6FF 60%,#DBEAFE 100%)" }}>
      <div style={{ color: "#dc2626" }}>Plan not found.</div>
    </div>
  );

  return (
    <>
      <style>{`
        .co-wrap { min-height: 100vh; background: linear-gradient(135deg,#fff 0%,#EFF6FF 60%,#DBEAFE 100%); padding: 40px 24px 80px; }
        .co-inner { max-width: 960px; margin: 0 auto; }
        .co-header { display: flex; align-items: center; margin-bottom: 40px; }
        .co-grid { display: grid; grid-template-columns: 1fr 380px; gap: 32px; align-items: start; }
        .co-card { background: white; border-radius: 16px; padding: 28px; margin-bottom: 16px; border: 1px solid #BFDBFE; }
        .co-card-title { font-size: 15px; font-weight: 700; color: #0F172A; margin-bottom: 20px; }
        .co-domain-row { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .co-domain-badge { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 100px; white-space: nowrap; flex-shrink: 0; }
        .co-add-btn { display: flex; align-items: center; gap: 8px; background: #EFF6FF; border: 1.5px dashed #BFDBFE; border-radius: 10px; padding: 10px 16px; font-size: 13px; font-weight: 600; color: #2563EB; cursor: pointer; width: 100%; margin-top: 4px; transition: all 0.2s; }
        .co-add-btn:hover { background: #DBEAFE; border-color: #2563EB; }
        .co-remove-btn { width: 28px; height: 28px; border-radius: 8px; border: 1px solid #BFDBFE; background: white; color: #94a3b8; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .co-remove-btn:hover { background: #FEF2F2; border-color: #FCA5A5; color: #ef4444; }

        /* Summary */
        .co-summary { background: white; border-radius: 16px; padding: 28px; border: 1px solid #BFDBFE; margin-bottom: 12px; position: sticky; top: 24px; }
        .co-trial-box { background: #F0FDF4; border: 1.5px solid #86EFAC; border-radius: 14px; padding: 20px; text-align: center; margin-bottom: 20px; }
        .co-trial-price { display: flex; align-items: baseline; justify-content: center; gap: 4px; margin-bottom: 4px; }
        .co-trial-dollar { font-family: serif; font-size: 24px; font-weight: 900; color: #22C55E; }
        .co-trial-num { font-family: serif; font-size: 64px; font-weight: 900; color: #22C55E; letter-spacing: -4px; line-height: 1; }
        .co-trial-badge { display: inline-flex; align-items: center; gap: 6px; background: white; border: 1px solid #86EFAC; border-radius: 100px; padding: 3px 12px; margin-bottom: 8px; }
        .co-trial-dot { width: 6px; height: 6px; background: #22C55E; border-radius: 50%; }
        .co-trial-label { font-size: 11px; font-weight: 700; color: #15803D; }
        .co-trial-then { font-size: 12px; color: #64748b; }
        .co-trial-then strong { color: #0F172A; }

        .co-summary-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #F1F5F9; font-size: 13px; }
        .co-summary-row:last-of-type { border-bottom: none; }
        .co-summary-label { color: #64748b; }
        .co-summary-val { font-weight: 700; color: #0F172A; }
        .co-summary-extra { color: #2563EB; }
        .co-total-row { display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 2px solid #EFF6FF; margin-top: 8px; }

        .co-submit { width: 100%; padding: 16px; background: #2563EB; color: white; border: none; border-radius: 100px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.2s; box-shadow: 0 8px 24px rgba(37,99,235,0.3); margin-bottom: 10px; }
        .co-submit:hover { background: #1D4ED8; transform: translateY(-1px); }
        .co-submit:disabled { background: #94a3b8; box-shadow: none; cursor: not-allowed; transform: none; }
        .co-note { text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.7; }
        .co-trust { display: flex; justify-content: center; gap: 16px; margin-top: 10px; flex-wrap: wrap; }
        .co-trust span { font-size: 11px; color: #64748b; font-weight: 500; }

        @media (max-width: 768px) {
          .co-grid { grid-template-columns: 1fr; }
          .co-summary { position: static; order: -1; }
          .co-wrap { padding: 24px 16px 60px; }
          .co-card { padding: 20px; }
          .co-trial-num { font-size: 52px; }
        }
      `}</style>

      <div className="co-wrap">
        <div className="co-inner">

          {/* Header */}
          <div className="co-header">
            <Link href="/#pricing" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>← Back</Link>
            <img src="https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373" alt="Logo" style={{ height: 36, display: "block", marginLeft: "auto" }} />
          </div>

          <div className="co-grid">

            {/* Left — Form */}
            <div>
              <h1 style={{ fontFamily: "serif", fontSize: 28, fontWeight: 900, color: "#0F172A", marginBottom: 6, letterSpacing: -1 }}>Complete Your Order</h1>
              <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>Fill in your details and we will reach out within 24 hours to get you set up.</p>

              {/* Details */}
              <div className="co-card">
                <div className="co-card-title">1. Your Details</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={lbl}>Full Name *</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Smith" style={{ ...inp, borderColor: errors.name ? "#ef4444" : "#BFDBFE" }} />
                    {errors.name && <div style={{ fontSize: 11, color: "#ef4444", marginTop: 3 }}>{errors.name}</div>}
                  </div>
                  <div>
                    <label style={lbl}>Email Address *</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@store.com" style={{ ...inp, borderColor: errors.email ? "#ef4444" : "#BFDBFE" }} />
                    {errors.email && <div style={{ fontSize: 11, color: "#ef4444", marginTop: 3 }}>{errors.email}</div>}
                  </div>
                </div>
                <div>
                  <label style={lbl}>Notes (optional)</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Any questions or special requirements..." style={{ ...inp, height: 80, resize: "vertical" }} />
                </div>
              </div>

              {/* Domains */}
              <div className="co-card">
                <div className="co-card-title">2. Your Shopify Store Domains</div>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16, marginTop: -10 }}>First 3 domains are free. Additional domains are +$10 each.</p>

                {domains.map((d, i) => (
                  <div key={i}>
                    <div className="co-domain-row">
                      <div style={{ flex: 1 }}>
                        <label style={{ ...lbl, marginBottom: 5 }}>
                          {i === 0 ? "Primary Domain *" : `Domain ${i + 1}`}
                          {i > 0 && i < 3 && <span style={{ color: "#22C55E", marginLeft: 6, fontSize: 11, fontWeight: 700 }}>Free</span>}
                          {i >= 3 && <span style={{ color: "#2563EB", marginLeft: 6, fontSize: 11, fontWeight: 700 }}>+$10</span>}
                        </label>
                        <input
                          value={d}
                          onChange={e => updateDomain(i, e.target.value)}
                          placeholder={`store${i > 0 ? i + 1 : ""}.myshopify.com`}
                          style={{ ...inp, borderColor: errors[`domain${i}`] ? "#ef4444" : "#BFDBFE" }}
                        />
                        {errors[`domain${i}`] && <div style={{ fontSize: 11, color: "#ef4444", marginTop: 3 }}>{errors[`domain${i}`]}</div>}
                      </div>
                      {i > 0 && (
                        <button className="co-remove-btn" onClick={() => removeDomain(i)} style={{ marginTop: 20 }}>×</button>
                      )}
                    </div>
                    {i === 0 && <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 10, marginTop: -4 }}>This becomes your primary license key</div>}
                  </div>
                ))}

                <button className="co-add-btn" onClick={addDomain}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                  Add another domain {domains.length >= 3 ? "(+$10)" : "(free)"}
                </button>
              </div>
            </div>

            {/* Right — Summary */}
            <div>
              <div className="co-summary">

                {/* $1 trial box */}
                <div className="co-trial-box">
                  <div className="co-trial-badge">
                    <div className="co-trial-dot" />
                    <span className="co-trial-label">3-Day Trial</span>
                  </div>
                  <div className="co-trial-price">
                    <span className="co-trial-dollar">$</span>
                    <span className="co-trial-num">1</span>
                  </div>
                  <div className="co-trial-then">then <strong>${fullTotal.toFixed(2)}</strong> one-time after trial</div>
                </div>

                {/* Summary rows */}
                <div style={{ marginBottom: 8 }}>
                  <div className="co-summary-row">
                    <span className="co-summary-label">{plan.name} Plan</span>
                    <span className="co-summary-val">${plan.price}{plan.cents}</span>
                  </div>
                  <div className="co-summary-row">
                    <span className="co-summary-label">Domains included</span>
                    <span className="co-summary-val" style={{ color: "#22C55E" }}>3 free</span>
                  </div>
                  {domains.length > 1 && domains.slice(0, Math.min(domains.length, 3)).map((d, i) => i > 0 && (
                    <div key={i} className="co-summary-row">
                      <span className="co-summary-label">Domain {i + 1} {d && `(${d.replace(/^www\./, "").substring(0, 20)})`}</span>
                      <span className="co-summary-val" style={{ color: "#22C55E" }}>Free</span>
                    </div>
                  ))}
                  {domains.length > 3 && domains.slice(3).map((d, i) => (
                    <div key={i} className="co-summary-row">
                      <span className="co-summary-label">Domain {i + 4} {d && `(${d.replace(/^www\./, "").substring(0, 20)})`}</span>
                      <span className="co-summary-val co-summary-extra">+$10</span>
                    </div>
                  ))}
                </div>

                <div className="co-total-row">
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>Total after trial</div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>One-time payment</div>
                  </div>
                  <div style={{ fontFamily: "serif", fontSize: 28, fontWeight: 900, color: "#0F172A", letterSpacing: -1 }}>${fullTotal.toFixed(2)}</div>
                </div>
              </div>

              <button onClick={handleSubmit} disabled={loading} className="co-submit">
                {loading ? "⏳ Saving..." : "Book a Call →"}
              </button>

              <div className="co-note">
                🔒 No payment now — we invoice after setup<br />
                ⚡ You will book your setup meeting on the next step
              </div>
              <div className="co-trust">
                {["✓ No subscription", "✓ Lifetime license", "✓ We install it"].map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}