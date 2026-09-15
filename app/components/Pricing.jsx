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
        .rgl-pricing { padding: 100px 0; background: linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%); overflow: hidden; }
        .rgl-pricing-header { text-align: center; margin-bottom: 80px; }
        .rgl-pricing .rgl-section-title { color: #0F172A; }
        .rgl-pricing .rgl-section-sub { color: #64748B; margin: 0 auto; text-align: center; }

        /* Main open grid with white panel */
        .rgl-px { max-width: 1040px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1px 1fr; gap: 0; align-items: start; background: #fff; border-radius: 28px; padding: 56px 52px; border: 1px solid #BFDBFE; box-shadow: 0 8px 48px rgba(37,99,235,0.08); }

        /* Left */
        .rgl-px-left { padding-right: 56px; display: flex; flex-direction: column; align-items: flex-start; }
        .rgl-px-plan-name { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #2563EB; margin-bottom: 24px; }

        /* Giant $1 */
        .rgl-px-price-row { display: flex; align-items: flex-start; gap: 0; margin-bottom: 12px; }
        .rgl-px-dollar { font-family: 'Fraunces', serif; font-size: 44px; font-weight: 900; color: #2563EB; line-height: 1; margin-top: 14px; }
        .rgl-px-one { font-family: 'Fraunces', serif; font-size: 140px; font-weight: 900; color: #0F172A; letter-spacing: -8px; line-height: 0.9; }

        .rgl-px-was-row { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
        .rgl-px-was-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; }
        .rgl-px-was-price { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: #CBD5E1; text-decoration: line-through; }

        /* One-time highlight */
        .rgl-px-onetime { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .rgl-px-onetime-text { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 900; color: #2563EB; letter-spacing: -0.5px; }
        .rgl-px-onetime-badge { background: #2563EB; color: #fff; font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 100px; letter-spacing: 0.3px; flex-shrink: 0; }
        .rgl-px-trial-note { font-size: 13px; color: #64748B; margin-bottom: 36px; line-height: 1.6; }

        /* CTA */
        .rgl-px-cta { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 16px 0; background: #0F172A; color: #fff; border-radius: 14px; font-weight: 700; font-size: 16px; text-decoration: none; transition: all 0.25s; width: 100%; margin-bottom: 12px; }
        .rgl-px-cta:hover { background: #2563EB; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(37,99,235,0.3); }
        .rgl-px-cta-note { font-size: 12px; color: #94a3b8; text-align: center; width: 100%; }

        /* Divider */
        .rgl-px-divider { background: #EFF6FF; align-self: stretch; width: 1px; }

        /* Right */
        .rgl-px-right { padding-left: 56px; display: flex; flex-direction: column; }
        .rgl-px-feats-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; margin-bottom: 20px; }
        .rgl-feat { display: flex; align-items: center; gap: 14px; padding: 13px 0; border-bottom: 1px solid #F1F5F9; }
        .rgl-feat:first-of-type { border-top: 1px solid #F1F5F9; }
        .rgl-feat-check { width: 28px; height: 28px; background: #2563EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .rgl-feat-check svg { width: 14px; height: 14px; stroke: #fff; fill: none; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
        .rgl-feat-text { font-size: 14px; color: #0F172A; font-weight: 500; line-height: 1.4; }

        /* Addon inside right */
        .rgl-px-addon { margin-top: 24px; padding-top: 20px; border-top: 2px dashed #BFDBFE; display: flex; align-items: center; gap: 14px; background: #F8FAFF; border-radius: 14px; padding: 16px; }
        .rgl-px-addon-icon { width: 40px; height: 40px; background: #EFF6FF; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
        .rgl-px-addon-info { flex: 1; }
        .rgl-px-addon-title { font-size: 13px; font-weight: 700; color: #0F172A; margin-bottom: 2px; }
        .rgl-px-addon-sub { font-size: 11px; color: #64748B; }
        .rgl-px-addon-price { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 900; color: #2563EB; white-space: nowrap; }
        .rgl-px-addon-price small { font-family: inherit; font-size: 11px; font-weight: 500; color: #64748B; }
        .rgl-px-addon-tag { font-size: 10px; font-weight: 700; color: #2563EB; background: #EFF6FF; padding: 3px 10px; border-radius: 100px; border: 1px solid #BFDBFE; white-space: nowrap; flex-shrink: 0; }

        @media (max-width: 860px) {
          .rgl-px { grid-template-columns: 1fr; padding: 36px 28px; }
          .rgl-px-left { padding-right: 0; padding-bottom: 40px; border-bottom: 1px solid #EFF6FF; }
          .rgl-px-divider { display: none; }
          .rgl-px-right { padding-left: 0; padding-top: 40px; }
          .rgl-px-one { font-size: 110px; letter-spacing: -6px; }
          .rgl-px-dollar { font-size: 36px; margin-top: 10px; }
          .rgl-px-onetime-text { font-size: 22px; }
        }
        @media (max-width: 480px) {
          .rgl-pricing { padding: 70px 0; }
          .rgl-px { padding: 28px 20px; }
          .rgl-px-one { font-size: 90px; letter-spacing: -4px; }
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

          <div className="rgl-px">

            {/* Left — price */}
            <div className="rgl-px-left">
              <div className="rgl-px-plan-name">{plan.name}</div>

              <div className="rgl-px-price-row">
                <span className="rgl-px-dollar">$</span>
                <span className="rgl-px-one">1</span>
              </div>

              <div className="rgl-px-was-row">
                <span className="rgl-px-was-label">Was</span>
                <span className="rgl-px-was-price">${plan.price}{plan.cents}</span>
              </div>

              <div className="rgl-px-onetime">
                <span className="rgl-px-onetime-text">One-Time Payment</span>
                <span className="rgl-px-onetime-badge">Forever</span>
              </div>
              <div className="rgl-px-trial-note">$1 trial for 3 days, then pay once.<br />No subscriptions. No renewals. Ever.</div>

              <a href={`/checkout?plan=${plan.name.toLowerCase()}`} className="rgl-px-cta">
                Book A Call →
              </a>
              <div className="rgl-px-cta-note">🔒 No payment now — we invoice after setup</div>
            </div>

            {/* Divider */}
            <div className="rgl-px-divider" />

            {/* Right — features + addon */}
            <div className="rgl-px-right">
              <div className="rgl-px-feats-label">Everything included</div>
              {(Array.isArray(plan.features) ? plan.features : []).map((f, i) => (
                <div key={i} className="rgl-feat">
                  <div className="rgl-feat-check">
                    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <div className="rgl-feat-text">{f}</div>
                </div>
              ))}

              {addon && (
                <div className="rgl-px-addon">
                  <div className="rgl-px-addon-icon">🌐</div>
                  <div className="rgl-px-addon-info">
                    <div className="rgl-px-addon-title">{addon.label}</div>
                    <div className="rgl-px-addon-sub">{addon.sub}</div>
                  </div>
                  <div className="rgl-px-addon-price">{addon.price} <small>{addon.unit}</small></div>
                  <div className="rgl-px-addon-tag">Add-on</div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}