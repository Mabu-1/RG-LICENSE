"use client";
import { useState, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase";

export default function Pricing() {
  const [plans, setPlans]   = useState([]);
  const [addons, setAddons] = useState([]);

  useEffect(() => {
    async function load() {
      const { data: p } = await supabaseBrowser.from("pricing_plans").select("*").order("sort_order");
      const { data: a } = await supabaseBrowser.from("pricing_addons").select("*").order("sort_order");
      setPlans(p || []);
      setAddons(a || []);
    }
    load();
  }, []);

  return (
    <>
      <style>{`
        .rgl-pricing { padding: 100px 0; background: #fff; }
        .rgl-pricing-header { text-align: center; margin-bottom: 64px; }
        .rgl-pricing .rgl-section-title { color: #0F172A; }
        .rgl-pricing .rgl-section-sub { color: #64748B; margin: 0 auto; text-align: center; }
        .rgl-plans { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-bottom: 40px; align-items: start; }
        .rgl-plan { background: #F8F7F4; border-radius: 20px; padding: 32px 28px; border: 2px solid transparent; transition: all 0.3s; position: relative; }
        .rgl-plan:hover { border-color: #E2E8F0; transform: translateY(-4px); box-shadow: 0 18px 48px rgba(0,0,0,0.08); }
        .rgl-plan.featured { background: #0F172A; border-color: #0F172A; }
        .rgl-plan.featured:hover { border-color: #F59E0B; }
        .rgl-plan-badge { position:absolute; top:-13px; left:50%; transform:translateX(-50%); background:#F59E0B; color:#fff; font-size:10px; font-weight:700; padding:4px 16px; border-radius:100px; text-transform:uppercase; letter-spacing:0.8px; white-space:nowrap; }
        .rgl-plan-name { font-family:'Fraunces',serif; font-size:22px; font-weight:700; color:#0F172A; margin-bottom:6px; }
        .rgl-plan-desc { font-size:13px; color:#64748B; margin-bottom:22px; line-height:1.5; }
        .rgl-plan.featured .rgl-plan-name { color:#fff; }
        .rgl-plan.featured .rgl-plan-desc { color:rgba(255,255,255,0.45); }
        .rgl-price { display:flex; align-items:baseline; gap:2px; margin-bottom:22px; }
        .rgl-price-cur { font-size:19px; font-weight:600; color:#0F172A; margin-top:8px; }
        .rgl-price-amt { font-family:'Fraunces',serif; font-size:54px; font-weight:900; color:#0F172A; letter-spacing:-3px; line-height:1; }
        .rgl-price-cents { font-size:20px; font-weight:700; color:#0F172A; align-self:flex-start; margin-top:10px; }
        .rgl-price-note { font-size:12px; color:#64748B; align-self:flex-end; padding-bottom:4px; margin-left:4px; }
        .rgl-plan.featured .rgl-price-cur,.rgl-plan.featured .rgl-price-amt,.rgl-plan.featured .rgl-price-cents { color:#fff; }
        .rgl-plan.featured .rgl-price-note { color:rgba(255,255,255,0.45); }
        .rgl-plan-divider { height:1px; background:#E2E8F0; margin-bottom:18px; }
        .rgl-plan.featured .rgl-plan-divider { background:rgba(255,255,255,0.1); }
        .rgl-plan-includes { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1.2px; color:#64748B; margin-bottom:12px; }
        .rgl-plan.featured .rgl-plan-includes { color:rgba(255,255,255,0.35); }
        .rgl-plan-feats { list-style:none; margin-bottom:26px; }
        .rgl-plan-feats li { font-size:14px; color:#0F172A; padding:5px 0; display:flex; align-items:flex-start; gap:8px; }
        .rgl-plan-feats li::before { content:'★'; color:#F59E0B; font-size:10px; flex-shrink:0; margin-top:4px; }
        .rgl-plan.featured .rgl-plan-feats li { color:rgba(255,255,255,0.85); }
        .rgl-plan-cta { display:block; text-align:center; padding:14px; border-radius:100px; font-weight:600; font-size:14px; transition:all 0.25s; border:2px solid #0F172A; color:#0F172A; background:transparent; cursor:pointer; text-decoration:none; }
        .rgl-plan-cta:hover { background:#0F172A; color:#fff; }
        .rgl-plan.featured .rgl-plan-cta { background:#F59E0B; border-color:#F59E0B; color:#fff; }
        .rgl-plan.featured .rgl-plan-cta:hover { background:#D97706; border-color:#D97706; }
        .rgl-addons { background:#F8F7F4; border-radius:20px; padding:32px; border:1px solid #E2E8F0; }
        .rgl-addons-title { font-family:'Fraunces',serif; font-size:20px; font-weight:700; color:#0F172A; margin-bottom:6px; }
        .rgl-addons-sub { font-size:13px; color:#64748B; margin-bottom:20px; }
        .rgl-addons-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .rgl-addon { background:#fff; border-radius:14px; padding:20px; border:1px solid #E2E8F0; display:flex; justify-content:space-between; align-items:center; gap:12px; transition:border-color 0.2s; }
        .rgl-addon:hover { border-color:#F59E0B; }
        .rgl-addon-label { font-size:14px; font-weight:600; color:#0F172A; margin-bottom:2px; }
        .rgl-addon-sub { font-size:12px; color:#64748B; }
        .rgl-addon-price { font-family:'Fraunces',serif; font-size:24px; font-weight:900; color:#0F172A; white-space:nowrap; }
        .rgl-addon-price small { font-family:'Inter',sans-serif; font-size:11px; font-weight:500; color:#64748B; }
        @media (max-width:960px) { .rgl-plans { grid-template-columns:1fr; max-width:420px; margin:0 auto 40px; } .rgl-addons-grid { grid-template-columns:1fr; } }
        @media (max-width:620px) { .rgl-pricing { padding:70px 0; } .rgl-addons { padding:20px; } }
      `}</style>

      <section className="rgl-pricing" id="pricing">
        <div className="rgl-container">
          <div className="rgl-pricing-header">
            <div className="rgl-section-eyebrow">Pricing</div>
            <h2 className="rgl-section-title">One-time. Forever yours.</h2>
            <p className="rgl-section-sub">No subscriptions. No renewals. Pay once and use it for as long as you run your store.</p>
          </div>

          <div className="rgl-plans">
            {plans.map(p => (
              <div key={p.id} className={`rgl-plan${p.featured ? " featured" : ""}`}>
                {p.badge && <div className="rgl-plan-badge">{p.badge}</div>}
                <div className="rgl-plan-name">{p.name}</div>
                <div className="rgl-plan-desc">{p.description}</div>
                <div className="rgl-price">
                  <span className="rgl-price-cur">$</span>
                  <span className="rgl-price-amt">{p.price}</span>
                  <span className="rgl-price-cents">{p.cents}</span>
                  <span className="rgl-price-note">one-time</span>
                </div>
                <div className="rgl-plan-divider" />
                <div className="rgl-plan-includes">Includes</div>
                <ul className="rgl-plan-feats">
                  {(Array.isArray(p.features) ? p.features : []).map((f, i) => <li key={i}>{f}</li>)}
                </ul>
                <a href={`/checkout?plan=${p.name.toLowerCase()}`} className="rgl-plan-cta">{p.cta} →</a>
              </div>
            ))}
          </div>

          <div className="rgl-addons">
            <div className="rgl-addons-title">Need more? Add on anytime.</div>
            <div className="rgl-addons-sub">Extend any plan after purchase — just reach out.</div>
            <div className="rgl-addons-grid">
              {addons.map(a => (
                <div key={a.id} className="rgl-addon">
                  <div>
                    <div className="rgl-addon-label">{a.label}</div>
                    <div className="rgl-addon-sub">{a.sub}</div>
                  </div>
                  <div className="rgl-addon-price" style={a.unit === "" ? { color:"#F59E0B" } : {}}>
                    {a.price} <small>{a.unit}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
