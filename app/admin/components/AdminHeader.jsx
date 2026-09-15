'use client'
import { useState, useEffect } from 'react'
import { supabaseBrowser } from '@/lib/supabase'

export default function Pricing() {
  const [plan, setPlan]   = useState(null)
  const [addon, setAddon] = useState(null)

  useEffect(() => {
    async function load() {
      if (!supabaseBrowser) return
      const { data: p } = await supabaseBrowser.from('pricing_plans').select('*').order('sort_order')
      const { data: a } = await supabaseBrowser.from('pricing_addons').select('*').ilike('label', '%domain%')
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
        .rgl-pricing-header { text-align: center; margin-bottom: 72px; }
        .rgl-pricing .rgl-section-title { color: #0F172A; }
        .rgl-pricing .rgl-section-sub { color: #64748B; margin: 0 auto; text-align: center; }

        .rgl-px-wrap { max-width: 960px; margin: 0 auto; }

        /* Trial pill */
        .rgl-px-trial { display: inline-flex; align-items: center; gap: 10px; background: #fff; border: 1.5px solid #BFDBFE; border-radius: 100px; padding: 8px 18px; margin-bottom: 40px; box-shadow: 0 2px 12px rgba(37,99,235,0.08); }
        .rgl-px-trial-dot { width: 8px; height: 8px; background: #2563EB; border-radius: 50%; }
        .rgl-px-trial-text { font-size: 13px; font-weight: 700; color: #0F172A; }
        .rgl-px-trial-pill { background: #2563EB; color: #fff; font-size: 11px; font-weight: 700; padding: 3px 12px; border-radius: 100px; }

        /* Price hero */
        .rgl-px-hero { display: flex; align-items: flex-end; gap: 20px; margin-bottom: 8px; }
        .rgl-px-price-big { display: flex; align-items: flex-start; gap: 4px; }
        .rgl-px-dollar { font-family: 'Fraunces', serif; font-size: 32px; font-weight: 900; color: #0F172A; margin-top: 12px; }
        .rgl-px-amount { font-family: 'Fraunces', serif; font-size: 96px; font-weight: 900; color: #0F172A; letter-spacing: -5px; line-height: 1; }
        .rgl-px-was { display: flex; flex-direction: column; padding-bottom: 14px; gap: 4px; }
        .rgl-px-was-label { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
        .rgl-px-was-price { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 700; color: #CBD5E1; text-decoration: line-through; }
        .rgl-px-note { font-size: 14px; color: #2563EB; font-weight: 600; margin-bottom: 40px; }

        /* Split */
        .rgl-px-split { display: grid; grid-template-columns: auto 1px 1fr; gap: 60px; align-items: start; margin-bottom: 48px; }
        .rgl-px-left { display: flex; flex-direction: column; align-items: flex-start; min-width: 280px; }
        .rgl-px-divider { background: #E2E8F0; width: 1px; align-self: stretch; }

        /* Plan name & desc */
        .rgl-px-name { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 900; color: #0F172A; margin-bottom: 6px; }
        .rgl-px-desc { font-size: 14px; color: #64748B; line-height: 1.7; margin-bottom: 32px; max-width: 260px; }

        /* CTA */
        .rgl-px-cta { display: inline-flex; align-items: center; gap: 8px; padding: 15px 32px; background: #2563EB; color: #fff; border-radius: 100px; font-weight: 700; font-size: 15px; text-decoration: none; transition: all 0.25s; box-shadow: 0 8px 24px rgba(37,99,235,0.3); margin-bottom: 14px; width: 100%; justify-content: center; }
        .rgl-px-cta:hover { background: #1D4ED8; transform: translateY(-2px); }
        .rgl-px-cta-note { font-size: 12px; color: #94a3b8; text-align: center; width: 100%; }

        /* Features right */
        .rgl-px-right { padding-top: 4px; }
        .rgl-px-feats-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; margin-bottom: 20px; }
        .rgl-feat { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid #F1F5F9; }
        .rgl-feat:last-child { border-bottom: none; }
        .rgl-feat-icon { width: 32px; height: 32px; background: #EFF6FF; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .rgl-feat-icon svg { width: 16px; height: 16px; stroke: #2563EB; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
        .rgl-feat-text { font-size: 15px; color: #0F172A; font-weight: 500; }

        /* Addon */
        .rgl-px-addon { display: flex; align-items: center; gap: 20px; background: #fff; border-radius: 16px; padding: 20px 28px; border: 1px solid #BFDBFE; max-width: 960px; margin: 0 auto; }
        .rgl-px-addon-icon { width: 44px; height: 44px; background: #EFF6FF; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
        .rgl-px-addon-info { flex: 1; }
        .rgl-px-addon-title { font-size: 15px; font-weight: 700; color: #0F172A; margin-bottom: 2px; }
        .rgl-px-addon-sub { font-size: 12px; color: #64748B; }
        .rgl-px-addon-price { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 900; color: #2563EB; }
        .rgl-px-addon-price small { font-family: inherit; font-size: 12px; font-weight: 500; color: #64748B; }
        .rgl-px-addon-tag { font-size: 11px; font-weight: 700; color: #2563EB; background: #EFF6FF; padding: 4px 14px; border-radius: 100px; border: 1px solid #BFDBFE; white-space: nowrap; }

        @media (max-width: 860px) {
          .rgl-px-split { grid-template-columns: 1fr; gap: 32px; }
          .rgl-px-divider { width: 100%; height: 1px; }
          .rgl-px-left { min-width: unset; width: 100%; }
          .rgl-px-amount { font-size: 72px; }
        }
        @media (max-width: 620px) {
          .rgl-pricing { padding: 70px 0; }
          .rgl-px-hero { gap: 12px; }
          .rgl-px-amount { font-size: 60px; }
          .rgl-px-addon { flex-wrap: wrap; }
        }
      `}</style>

      <section className="rgl-pricing" id="pricing">
        <div className="rgl-container">
          <div className="rgl-pricing-header">
            <div className="rgl-section-eyebrow">Pricing</div>
            <h2 className="rgl-section-title">One-time. Forever yours.</h2>
            <p className="rgl-section-sub">No subscriptions. No renewals. Pay once and use it for as long as you run your store.</p>
          </div>

          <div className="rgl-px-wrap">

            {/* Trial pill centered */}
            <div style={{ textAlign: 'center' }}>
              <div className="rgl-px-trial" style={{ display: 'inline-flex' }}>
                <div className="rgl-px-trial-dot" />
                <span className="rgl-px-trial-text">🎉 $1 Trial For 3 Days</span>
                <span className="rgl-px-trial-pill">Limited Offer</span>
              </div>
            </div>

            <div className="rgl-px-split">

              {/* Left */}
              <div className="rgl-px-left">
                <div className="rgl-px-name">{plan.name}</div>
                <div className="rgl-px-desc">{plan.description}</div>

                {/* Big price */}
                <div className="rgl-px-hero">
                  <div className="rgl-px-price-big">
                    <span className="rgl-px-dollar">$</span>
                    <span className="rgl-px-amount">1</span>
                  </div>
                  <div className="rgl-px-was">
                    <span className="rgl-px-was-label">Was</span>
                    <span className="rgl-px-was-price">${plan.price}{plan.cents}</span>
                  </div>
                </div>
                <div className="rgl-px-note">then one-time payment after trial</div>

                <a href={`/checkout?plan=${plan.name.toLowerCase()}`} className="rgl-px-cta">
                  Book A Call →
                </a>
                <div className="rgl-px-cta-note">🔒 No payment now — we invoice after setup</div>
              </div>

              {/* Divider */}
              <div className="rgl-px-divider" />

              {/* Right — features */}
              <div className="rgl-px-right">
                <div className="rgl-px-feats-label">Everything included</div>
                {(Array.isArray(plan.features) ? plan.features : []).map((f, i) => (
                  <div key={i} className="rgl-feat">
                    <div className="rgl-feat-icon">
                      <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <div className="rgl-feat-text">{f}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra Domain Addon */}
            {addon && (
              <div className="rgl-px-addon">
                <div className="rgl-px-addon-icon">🌐</div>
                <div className="rgl-px-addon-info">
                  <div className="rgl-px-addon-title">{addon.label}</div>
                  <div className="rgl-px-addon-sub">{addon.sub}</div>
                </div>
                <div className="rgl-px-addon-price">{addon.price} <small>{addon.unit}</small></div>
                <div className="rgl-px-addon-tag">Optional add-on</div>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  )
}