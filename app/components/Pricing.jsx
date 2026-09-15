'use client'
import { useState, useEffect } from 'react'
import { supabaseBrowser } from '@/lib/supabase'

export default function Pricing() {
  const [plan, setPlan]   = useState(null)
  const [addon, setAddon] = useState(null)

useEffect(() => {
  async function load() {
    if (!supabaseBrowser) return
    const { data: p } = await supabaseBrowser
      .from('pricing_plans')
      .select('*')
      .order('sort_order')
    const { data: a } = await supabaseBrowser
      .from('pricing_addons')
      .select('*')
      .ilike('label', '%domain%')
    setPlan(p && p.length > 0 ? p[0] : null)
    setAddon(a && a.length > 0 ? a[0] : null)
  }
  load()
}, [])

if (!plan) return (
  <section id="pricing" style={{ padding: '100px 0', textAlign: 'center', color: '#64748b' }}>
    Loading pricing...
  </section>
)

  return (
    <>
      <style>{`
        .rgl-pricing { padding: 100px 0; background: linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%); }
        .rgl-pricing-header { text-align: center; margin-bottom: 64px; }
        .rgl-pricing .rgl-section-title { color: #0F172A; }
        .rgl-pricing .rgl-section-sub { color: #64748B; margin: 0 auto; text-align: center; }

        .rgl-single-wrap { max-width: 540px; margin: 0 auto 32px; }
        .rgl-plan { background: #0F172A; border-radius: 24px; padding: 40px 36px; border: 2px solid #1e293b; position: relative; box-shadow: 0 24px 64px rgba(15,23,42,0.18); }

        .rgl-trial-banner { background: rgba(37,99,235,0.15); border: 1px solid rgba(37,99,235,0.3); border-radius: 10px; padding: 10px 16px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .rgl-trial-banner-text { font-size: 13px; font-weight: 700; color: #93C5FD; }
        .rgl-trial-banner-pill { background: #2563EB; color: #fff; font-size: 10px; font-weight: 700; padding: 3px 12px; border-radius: 100px; white-space: nowrap; }

        .rgl-plan-name { font-family:'Fraunces',serif; font-size:26px; font-weight:900; color:#fff; margin-bottom:6px; }
        .rgl-plan-desc { font-size:14px; color:rgba(255,255,255,0.5); margin-bottom:28px; line-height:1.6; }

        .rgl-price { display:flex; align-items:baseline; gap:6px; margin-bottom:6px; }
        .rgl-price-cur { font-size:22px; font-weight:600; color:#fff; margin-top:8px; }
        .rgl-price-amt { font-family:'Fraunces',serif; font-size:64px; font-weight:900; color:#fff; letter-spacing:-3px; line-height:1; }
        .rgl-price-original { font-family:'Fraunces',serif; font-size:26px; font-weight:700; color:rgba(255,255,255,0.25); text-decoration:line-through; align-self:center; }
        .rgl-price-note { font-size:14px; font-weight:700; color:#93C5FD; margin-bottom:28px; }

        .rgl-plan-divider { height:1px; background:rgba(255,255,255,0.1); margin-bottom:22px; }
        .rgl-plan-includes { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:rgba(255,255,255,0.3); margin-bottom:14px; }
        .rgl-plan-feats { list-style:none; margin-bottom:32px; }
        .rgl-plan-feats li { font-size:15px; color:rgba(255,255,255,0.85); padding:6px 0; display:flex; align-items:flex-start; gap:10px; }
        .rgl-plan-feats li::before { content:'★'; color:#2563EB; font-size:10px; flex-shrink:0; margin-top:5px; }
        .rgl-plan-cta { display:block; text-align:center; padding:16px; border-radius:100px; font-weight:700; font-size:16px; transition:all 0.25s; background:#2563EB; border:2px solid #2563EB; color:#fff; cursor:pointer; text-decoration:none; box-shadow:0 8px 24px rgba(37,99,235,0.4); }
        .rgl-plan-cta:hover { background:#1D4ED8; border-color:#1D4ED8; transform:translateY(-2px); }

        .rgl-addon-wrap { max-width: 540px; margin: 0 auto; background: #fff; border-radius: 18px; padding: 24px 28px; border: 1px solid #BFDBFE; box-shadow: 0 4px 24px rgba(37,99,235,0.07); display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .rgl-addon-left { display: flex; align-items: center; gap: 16px; }
        .rgl-addon-icon { width: 44px; height: 44px; background: #EFF6FF; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .rgl-addon-title { font-size: 15px; font-weight: 700; color: #0F172A; margin-bottom: 2px; }
        .rgl-addon-sub { font-size: 12px; color: #64748B; }
        .rgl-addon-price { font-family:'Fraunces',serif; font-size:28px; font-weight:900; color:#2563EB; white-space:nowrap; }
        .rgl-addon-price small { font-family:'Inter',sans-serif; font-size:12px; font-weight:500; color:#64748B; }

        @media (max-width:620px) { .rgl-pricing { padding:70px 0; } .rgl-plan { padding:28px 22px; } .rgl-addon-wrap { flex-direction:column; align-items:flex-start; } }
      `}</style>

      <section className="rgl-pricing" id="pricing">
        <div className="rgl-container">
          <div className="rgl-pricing-header">
            <div className="rgl-section-eyebrow">Pricing</div>
            <h2 className="rgl-section-title">One-time. Forever yours.</h2>
            <p className="rgl-section-sub">No subscriptions. No renewals. Pay once and use it for as long as you run your store.</p>
          </div>

          {/* Single Plan */}
          <div className="rgl-single-wrap">
            <div className="rgl-plan">
              <div className="rgl-trial-banner">
                <span className="rgl-trial-banner-text">🎉 $1 Trial For 3 Days</span>
                <span className="rgl-trial-banner-pill">Limited Offer</span>
              </div>

              <div className="rgl-plan-name">{plan.name}</div>
              <div className="rgl-plan-desc">{plan.description}</div>

              <div className="rgl-price">
                <span className="rgl-price-cur">$</span>
                <span className="rgl-price-amt">1</span>
                <span className="rgl-price-original">${plan.price}{plan.cents}</span>
              </div>
              <div className="rgl-price-note">then one-time payment after trial</div>

              <div className="rgl-plan-divider" />
              <div className="rgl-plan-includes">Everything Included</div>
              <ul className="rgl-plan-feats">
                {(Array.isArray(plan.features) ? plan.features : []).map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <a href={`/checkout?plan=${plan.name.toLowerCase()}`} className="rgl-plan-cta">
                Book A Call →
              </a>
            </div>
          </div>

          {/* Extra Domain Addon only */}
          {addon && (
            <div className="rgl-addon-wrap">
              <div className="rgl-addon-left">
                <div className="rgl-addon-icon">🌐</div>
                <div>
                  <div className="rgl-addon-title">{addon.label}</div>
                  <div className="rgl-addon-sub">{addon.sub}</div>
                </div>
              </div>
              <div className="rgl-addon-price">
                {addon.price} <small>{addon.unit}</small>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  )
}