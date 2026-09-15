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
        .rgl-pricing-header { text-align: center; margin-bottom: 56px; }
        .rgl-pricing .rgl-section-title { color: #0F172A; }
        .rgl-pricing .rgl-section-sub { color: #64748B; margin: 0 auto; text-align: center; }

        .rgl-px { max-width: 1040px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1px 1fr; gap: 0; align-items: start; background: #fff; border-radius: 28px; padding: 56px 52px; border: 1px solid #BFDBFE; box-shadow: 0 8px 48px rgba(37,99,235,0.08); }

        /* Left */
        .rgl-px-left { padding-right: 56px; display: flex; flex-direction: column; align-items: flex-start; }
        .rgl-px-plan-name { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #2563EB; margin-bottom: 28px; }

        /* $1 green circle */
        .rgl-px-price-hero { display: flex; align-items: center; gap: 20px; margin-bottom: 16px; }
        .rgl-px-one-wrap { position: relative; width: 160px; height: 160px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .rgl-px-one-ring { position: absolute; inset: 0; border-radius: 50%; border: 3px solid #22C55E; box-shadow: 0 0 0 6px rgba(34,197,94,0.1), 0 0 0 12px rgba(34,197,94,0.05); }
        .rgl-px-one-ring-inner { position: absolute; inset: 10px; border-radius: 50%; border: 1px dashed rgba(34,197,94,0.3); }
        .rgl-px-dollar { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 900; color: #22C55E; line-height: 1; align-self: flex-start; margin-top: 28px; margin-right: -4px; }
        .rgl-px-one { font-family: 'Fraunces', serif; font-size: 110px; font-weight: 900; color: #22C55E; letter-spacing: -6px; line-height: 1; }
        .rgl-px-price-right { display: flex; flex-direction: column; gap: 6px; }
        .rgl-px-was-row { display: flex; align-items: center; gap: 6px; }
        .rgl-px-was-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; }
        .rgl-px-was-price { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: #CBD5E1; text-decoration: line-through; }
        .rgl-px-green-badge { display: inline-flex; align-items: center; gap: 6px; background: #F0FDF4; border: 1.5px solid #86EFAC; border-radius: 100px; padding: 4px 12px; }
        .rgl-px-green-dot { width: 6px; height: 6px; background: #22C55E; border-radius: 50%; }
        .rgl-px-green-text { font-size: 12px; font-weight: 700; color: #15803D; }

        /* One-time */
        .rgl-px-onetime { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
        .rgl-px-onetime-text { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 900; color: #2563EB; letter-spacing: -0.5px; }
        .rgl-px-onetime-badge { background: #2563EB; color: #fff; font-size: 10px; font-weight: 700; padding: 3px 12px; border-radius: 100px; flex-shrink: 0; }
        .rgl-px-trial-note { font-size: 13px; color: #64748B; margin-bottom: 32px; line-height: 1.6; }

        /* CTA */
        .rgl-px-cta { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 15px 0; background: #0F172A; color: #fff; border-radius: 14px; font-weight: 700; font-size: 15px; text-decoration: none; transition: all 0.25s; width: 100%; margin-bottom: 10px; }
        .rgl-px-cta:hover { background: #2563EB; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(37,99,235,0.3); }
        .rgl-px-cta-note { font-size: 11px; color: #94a3b8; text-align: center; width: 100%; }

        /* Divider */
        .rgl-px-divider { background: #EFF6FF; align-self: stretch; width: 1px; }

        /* Right */
        .rgl-px-right { padding-left: 56px; display: flex; flex-direction: column; }
        .rgl-px-feats-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; margin-bottom: 20px; }
        .rgl-feat { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid #F1F5F9; }
        .rgl-feat:first-of-type { border-top: 1px solid #F1F5F9; }
        .rgl-feat-check { width: 26px; height: 26px; background: #2563EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .rgl-feat-check svg { width: 13px; height: 13px; stroke: #fff; fill: none; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
        .rgl-feat-text { font-size: 14px; color: #0F172A; font-weight: 500; line-height: 1.4; }

        /* Addon */
        .rgl-px-addon { margin-top: 20px; display: flex; align-items: center; gap: 12px; background: #F8FAFF; border-radius: 14px; padding: 14px 16px; border: 1px solid #BFDBFE; }
        .rgl-px-addon-icon { width: 38px; height: 38px; background: #EFF6FF; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .rgl-px-addon-info { flex: 1; min-width: 0; }
        .rgl-px-addon-title { font-size: 13px; font-weight: 700; color: #0F172A; margin-bottom: 1px; white-space: nowrap; }
        .rgl-px-addon-sub { font-size: 11px; color: #64748B; white-space: nowrap; }
        .rgl-px-addon-price { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 900; color: #2563EB; white-space: nowrap; flex-shrink: 0; }
        .rgl-px-addon-price small { font-family: inherit; font-size: 11px; font-weight: 500; color: #64748B; }
        .rgl-px-addon-tag { font-size: 10px; font-weight: 700; color: #2563EB; background: #EFF6FF; padding: 3px 10px; border-radius: 100px; border: 1px solid #BFDBFE; white-space: nowrap; flex-shrink: 0; }

        /* Tablet */
        @media (max-width: 860px) {
          .rgl-px { grid-template-columns: 1fr; padding: 40px 28px; }
          .rgl-px-left { padding-right: 0; padding-bottom: 40px; border-bottom: 1px solid #EFF6FF; align-items: center; text-align: center; width: 100%; }
          .rgl-px-divider { display: none; }
          .rgl-px-right { padding-left: 0; padding-top: 36px; }
          .rgl-px-price-hero { justify-content: center; gap: 16px; }
          .rgl-px-one-wrap { width: 130px; height: 130px; }
          .rgl-px-one { font-size: 88px; }
          .rgl-px-dollar { font-size: 22px; margin-top: 22px; }
          .rgl-px-onetime { justify-content: center; }
          .rgl-px-trial-note { text-align: center; }
          .rgl-px-cta-note { text-align: center; }
          .rgl-px-was-row { justify-content: center; }
          .rgl-px-green-badge { align-self: center; }
          .rgl-px-plan-name { text-align: center; }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .rgl-pricing { padding: 60px 0; }
          .rgl-px { padding: 28px 18px; border-radius: 20px; }
          .rgl-px-one-wrap { width: 110px; height: 110px; }
          .rgl-px-one { font-size: 72px; letter-spacing: -4px; }
          .rgl-px-dollar { font-size: 20px; margin-top: 18px; }
          .rgl-px-onetime-text { font-size: 18px; }
          .rgl-px-onetime-badge { font-size: 9px; }
          .rgl-px-trial-note { font-size: 12px; }
          .rgl-px-cta { font-size: 14px; padding: 14px 0; }
          .rgl-feat-text { font-size: 13px; }
          .rgl-px-addon { gap: 10px; padding: 12px 14px; }
          .rgl-px-addon-icon { width: 32px; height: 32px; font-size: 16px; }
          .rgl-px-addon-title { font-size: 12px; }
          .rgl-px-addon-sub { font-size: 10px; }
          .rgl-px-addon-price { font-size: 16px; }
          .rgl-px-addon-tag { display: none; }
        }
      `}</style>

      <section className="rgl-pricing" id="pricing">
        <div className="rgl-container">
          <div className="rgl-pricing-header">
            <div className="rgl-section-eyebrow">Pricing</div>
            <h2 className="rgl-section-title">
              <span style={{ color: '#2563EB' }}>One-time.</span> Forever yours.
            </h2>
          </div>

          <div className="rgl-px">

            {/* Left */}
            <div className="rgl-px-left">
              <div className="rgl-px-price-hero">
                <div className="rgl-px-one-wrap">
                  <div className="rgl-px-one-ring" />
                  <div className="rgl-px-one-ring-inner" />
                  <span className="rgl-px-dollar">$</span>
                  <span className="rgl-px-one">1</span>
                </div>
                <div className="rgl-px-price-right">
                  <div className="rgl-px-was-row">
                    <span className="rgl-px-was-label">Was</span>
                    <span className="rgl-px-was-price">${plan.price}{plan.cents}</span>
                  </div>
                  <div className="rgl-px-green-badge">
                    <div className="rgl-px-green-dot" />
                    <span className="rgl-px-green-text">3-Day Trial</span>
                  </div>
                </div>
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

            {/* Right */}
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