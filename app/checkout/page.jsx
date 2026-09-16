"use client";
import { supabaseBrowser } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function CheckoutContent() {
  const router = useRouter();
  const [plan, setPlan] = useState(null);
  const [planLoading, setPlanLoading] = useState(true);
  const [domains, setDomains] = useState(() => {
    if (typeof window === "undefined") return [""];
    try { return JSON.parse(sessionStorage.getItem("co_domains") || '[""]'); } catch { return [""]; }
  });
  const [form, setForm] = useState(() => {
    if (typeof window === "undefined") return { name: "", email: "", whatsapp: "", message: "" };
    try { return JSON.parse(sessionStorage.getItem("co_form") || "{}") || { name: "", email: "", whatsapp: "", message: "" }; } catch { return { name: "", email: "", whatsapp: "", message: "" }; }
  });
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
  }, []);

  const extraDomains = Math.max(0, domains.length - 3);
  const addonCost = extraDomains * 10;
  const fullTotal = plan ? plan.price + addonCost : 0;

  function addDomain() { setDomains([...domains, ""]); }
  function updateDomain(i, val) { const u = [...domains]; u[i] = val; setDomains(u); }
  function removeDomain(i) { setDomains(domains.filter((_, idx) => idx !== i)); }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    else if (form.name.trim().length < 2) e.name = "Enter your full name";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) e.email = "Required";
    else if (!emailRegex.test(form.email.trim())) e.email = "Enter a valid email address";
    const waDigits = form.whatsapp.replace(/\D/g, "");
    if (!form.whatsapp.trim()) e.whatsapp = "Required";
    else if (waDigits.length < 7) e.whatsapp = "Enter a valid WhatsApp number";
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}$/;
    domains.forEach((d, i) => {
      if (!d.trim()) {
        e[`domain${i}`] = i === 0 ? "Required" : "Enter the domain or remove this field";
      } else if (!domainRegex.test(d.trim().replace(/^www\./, "").replace(/\/$/, ""))) {
        e[`domain${i}`] = "Enter a valid domain (e.g. yourstore.myshopify.com)";
      }
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setLoading(true);
    const cleanDomains = domains.map(d => d.toLowerCase().replace(/^www\./, "").replace(/\/$/, ""));

    sessionStorage.setItem("co_form", JSON.stringify(form));
    sessionStorage.setItem("co_domains", JSON.stringify(domains));

    const { data, error } = await supabaseBrowser.from("orders").insert({
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
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
      trial_status: "pending_booking",
      is_trial: true,
      trial_start_date: new Date().toISOString().split("T")[0],
    }).select().single();

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    router.push(
      `/checkout/book?name=${encodeURIComponent(form.name)}&total=${fullTotal.toFixed(2)}&order_id=${data.id}&email=${encodeURIComponent(form.email)}`
    );
  }

  const inp = (hasError) => ({
    width: "100%", padding: "11px 14px",
    border: `1px solid ${hasError ? "#ef4444" : "#BFDBFE"}`,
    borderRadius: 10, fontSize: 14, boxSizing: "border-box",
    fontFamily: "inherit", outline: "none", background: "white",
    transition: "border-color 0.2s",
  });
  const lbl = { fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 5 };

  if (planLoading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#fff 0%,#EFF6FF 60%,#DBEAFE 100%)" }}>
      <div style={{ color: "#64748b" }}>Loading...</div>
    </div>
  );

  return (
    <>
      <style>{`
        .co-wrap { min-height: 100vh; background: linear-gradient(135deg,#fff 0%,#EFF6FF 60%,#DBEAFE 100%); padding: 40px 24px 80px; }
        .co-inner { max-width: 620px; margin: 0 auto; }
        .co-header { display: flex; align-items: center; margin-bottom: 40px; }
        .co-card { background: white; border-radius: 16px; padding: 28px; margin-bottom: 16px; border: 1px solid #BFDBFE; }
        .co-card-title { font-size: 15px; font-weight: 700; color: #0F172A; margin-bottom: 20px; }
        .co-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        .co-field { margin-bottom: 14px; }
        .co-domain-row { display: flex; align-items: flex-end; gap: 8px; margin-bottom: 12px; }
        .co-add-btn { display: flex; align-items: center; gap: 8px; background: #EFF6FF; border: 1.5px dashed #BFDBFE; border-radius: 10px; padding: 10px 16px; font-size: 13px; font-weight: 600; color: #2563EB; cursor: pointer; width: 100%; margin-top: 4px; transition: all 0.2s; }
        .co-add-btn:hover { background: #DBEAFE; border-color: #2563EB; }
        .co-remove-btn { width: 32px; height: 42px; border-radius: 8px; border: 1px solid #BFDBFE; background: white; color: #94a3b8; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.15s; }
        .co-remove-btn:hover { background: #FEF2F2; border-color: #FCA5A5; color: #ef4444; }
        .co-submit { width: 100%; padding: 16px; background: #2563EB; color: white; border: none; border-radius: 100px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.2s; box-shadow: 0 8px 24px rgba(37,99,235,0.3); margin-bottom: 10px; }
        .co-submit:hover { background: #1D4ED8; transform: translateY(-1px); }
        .co-submit:disabled { background: #94a3b8; box-shadow: none; cursor: not-allowed; transform: none; }
        .err { font-size: 11px; color: #ef4444; margin-top: 4px; display: flex; align-items: center; gap: 4px; }
        .err::before { content: "⚠"; font-size: 10px; }
        @media (max-width: 640px) {
          .co-wrap { padding: 24px 16px 60px; }
          .co-card { padding: 20px; }
          .co-2col { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="co-wrap">
        <div className="co-inner">
          <div className="co-header">
            <Link href="/#pricing" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>← Back</Link>
            <img src="https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373" alt="Logo" style={{ height: 36, display: "block", marginLeft: "auto" }} />
          </div>

          <h1 style={{ fontFamily: "serif", fontSize: 28, fontWeight: 900, color: "#0F172A", marginBottom: 6, letterSpacing: -1 }}>Complete Your Order</h1>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 28 }}>Fill in your details below. After submitting you will pay $1 to start your 3-day trial.</p>

          {/* Details */}
          <div className="co-card">
            <div className="co-card-title">Your Details</div>
            <div className="co-2col">
              <div>
                <label style={lbl}>Full Name *</label>
                <input value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }} placeholder="John Smith" style={inp(errors.name)} />
                {errors.name && <div className="err">{errors.name}</div>}
              </div>
              <div>
                <label style={lbl}>Email Address *</label>
                <input type="email" value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }} placeholder="john@store.com" style={inp(errors.email)} />
                {errors.email && <div className="err">{errors.email}</div>}
              </div>
            </div>
            <div className="co-field">
              <label style={lbl}>WhatsApp Number *</label>
              <input type="tel" value={form.whatsapp} onChange={e => { const val = e.target.value.replace(/[^0-9\s\+\-\(\)]/g, ""); setForm({ ...form, whatsapp: val }); setErrors({ ...errors, whatsapp: "" }); }} placeholder="+1 234 567 8900" style={inp(errors.whatsapp)} />
              {errors.whatsapp && <div className="err">{errors.whatsapp}</div>}
            </div>
            <div>
              <label style={lbl}>Notes (optional)</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Any questions or special requirements..." style={{ ...inp(false), height: 80, resize: "vertical" }} />
            </div>
          </div>

          {/* Domains */}
          <div className="co-card">
            <div className="co-card-title">Your Shopify Store Domains</div>
            <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20, marginTop: -12 }}>First 3 domains are free. Each additional domain is +$10.</p>
            {domains.map((d, i) => (
              <div key={i} className="co-domain-row">
                <div style={{ flex: 1 }}>
                  <label style={{ ...lbl, display: "flex", alignItems: "center", gap: 6 }}>
                    {i === 0 ? "Primary Domain *" : `Domain ${i + 1}`}
                    {i >= 1 && i <= 2 && <span style={{ color: "#22C55E", fontSize: 10, fontWeight: 700, background: "#F0FDF4", padding: "1px 8px", borderRadius: 100, border: "1px solid #86EFAC" }}>Free</span>}
                    {i >= 3 && <span style={{ color: "#2563EB", fontSize: 10, fontWeight: 700, background: "#EFF6FF", padding: "1px 8px", borderRadius: 100, border: "1px solid #BFDBFE" }}>+$10</span>}
                  </label>
                  <input value={d} onChange={e => { updateDomain(i, e.target.value); const ne = { ...errors }; delete ne[`domain${i}`]; setErrors(ne); }} placeholder="yourstore.myshopify.com" style={inp(errors[`domain${i}`])} />
                  {errors[`domain${i}`] && <div className="err">{errors[`domain${i}`]}</div>}
                  {i === 0 && <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>This becomes your primary license key</div>}
                </div>
                {i > 0 && <button className="co-remove-btn" onClick={() => removeDomain(i)}>×</button>}
              </div>
            ))}
            <button className="co-add-btn" onClick={addDomain}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
              Add another domain {domains.length >= 3 ? "(+$10)" : "(free)"}
            </button>
          </div>

          <button onClick={handleSubmit} disabled={loading} className="co-submit">
            {loading ? "⏳ Saving..." : "Continue to Payment →"}
          </button>
          <div style={{ textAlign: "center", fontSize: 12, color: "#94a3b8" }}>
            🔒 Next step: pay $1 to start your 3-day trial
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
