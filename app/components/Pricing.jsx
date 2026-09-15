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

        /* Main open grid */
        .rgl-px { max-width: 1040px; margin: 0 auto 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 0; align-items: center; position: relative; }

        /* Left — all about the price */
        .rgl-px-left { padding-right: 64px; border-right: 1px solid #BFDBFE; display: flex; flex-direction: column; align-items: flex-start; }

        .rgl-px-plan-name { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; color: #2563EB; margin-bottom: 24px; }

        /* The $1 hero */
        .rgl-px-price-hero { position: relative; margin-bottom: 4px; }
        .rgl-px-dollar { font-family: 'Fraunces', serif; font-size: 48px; font-weight: 900; color: #2563EB; line-height: 1; vertical-align: top; display: inline-block; margin-top: 16px; }
        .rgl-px-one { font-family: 'Fraunces', serif; font-size: 160px; font-weight: 900; color: #0F172A; letter-spacing: -8px; line-height: 0.9; display: inline-block; }
        .rgl-px-original { display: inline-flex; align-items: center; gap: 6px; margin-left: 12px; vertical-align: middle; }
        .rgl-px-original-label { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
        .rgl-px-original-price { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 700; color: #CBD5E1; text-decoration: line-through; }

        /* ONE-TIME big highlight */
        .rgl-px-onetime-wrap { margin-bottom: 32px; }
        .rgl-px-onetime { display: inline-flex; align-items: center; gap: 10px; }
        .rgl-px-onetime-text { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 900; color: #2563EB; letter-spacing: -0.5px; }
        .rgl-px-onetime-badge { background: #2563EB; color: #fff; font-size: 11px; font-weight: 700; padding: 4px 14px; border-radius: 100px; letter-spacing: 0.5px; }
        .rgl-px-trial-note { font-size: 13px; color: #64748B; margin-top: 6px; }

        /* CTA */
        .rgl-px-cta { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 16px 0; background: #0F172A; color: #fff; border-radius: 14px; font-weight: 700; font-size: 16px; text-decoration: none; transition: all 0.25s; width: 100%; margin-bottom: 12px; letter-spacing: -0.2px; }
        .rgl-px-cta:hover { background: #2563EB; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(37,99,235,0.3); }
        .rgl-px-cta-note { font-size: 12px; color: #94a3b8; text-align: center; width: 100%; }

        /* Right — features */
        .rgl-px-right { padding-left: 64px; }
        .rgl-px-feats-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; margin-bottom: 24px; }
        .rgl-feat { display: flex; align-items: center; gap: 16px; padding: 14px 0; border-bottom: 1px solid #E2E8F0; }
        .rgl-feat:first-of-type { border-top: 1px solid #E2E8F0; }
        .rgl-feat-check { width: 28px; height: 28px; background: #2563EB; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .rgl-feat-check svg { width: 14px; height: 14px; stroke: #fff; fill: none; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
        .rgl-feat-text { font-size: 15px; color: #0F172A; font-weight: 500; line-height: 1.4; }

        /* Addon strip */
        .rgl-px-addon { max-width: 1040px; margin: 0 auto; display: flex; align-items: center; gap: 20px; padding: 20px 0; border-top: 1px dashed #BFDBFE; }
        .rgl-px-addon-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; flex-shrink: 0; width: 120px; }
        .rgl-px-addon-info { flex: 1; }
        .rgl-px-addon-title { font-size: 15px; font-weight: 700; color: #0F172A; }
        .rgl-px-addon-sub { font-size: 12px; color: #64748B; }
        .rgl-px-addon-price { font-family: 'Fraunces', serif; font-size: 28px; font-weight: 900; color: #2563EB; white-space: nowrap; }
        .rgl-px-addon-price small { font-family: inherit; font-size: 12px; font-weight: 500; color: #64748B; }

        /* Mobile */
        @media (max-width: 768px) {
          .rgl-pricing { padding: 70px 0; }
          .rgl-px { grid-template-columns: 1fr; gap: 48px; }
          .rgl-px-left { padding-right: 0; border-right: none; border-bottom: 1px solid #BFDBFE; padding-bottom: 48px; }
          .rgl-px-right { padding-left: 0; }
          .rgl-px-one { font-size: 120px; letter-spacing: -6px; }
          .rgl-px-dollar { font-size: 36px; margin-top: 12px; }
          .rgl-px-onetime-text { font-size: 22px; }
          .rgl-px-addon { flex-wrap: wrap; gap: 12px; }
          .rgl-px-addon-label { width: auto; }
        }
        @media (max-width: 480px) {
          .rgl-px-one { font-size: 96px; letter-spacing: -4px; }
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
            {/* Left */}
            <div className="rgl-px-left">
              <div className="rgl-px-plan-name">{plan.name}</div>

              {/* Giant $1 */}
              <div className="rgl-px-price-hero">
                <span className="rgl-px-dollar">$</span>
                <span className="rgl-px-one">1</span>
              </div>
              <div className="rgl-px-original">
                <span className="rgl-px-original-label">Was</span>
                <span className="rgl-px-original-price">${plan.price}{plan.cents}</span>
              </div>

              {/* ONE-TIME highlight */}
              <div className="rgl-px-onetime-wrap" style={{ marginTop: 20 }}>
                <div className="rgl-px-onetime">
                  <span className="rgl-px-onetime-text">One-Time Payment</span>
                  <span className="rgl-px-onetime-badge">Forever</span>
                </div>
                <div className="rgl-px-trial-note">$1 trial for 3 days, then pay once. No subscriptions.</div>
              </div>

              <a href={`/checkout?plan=${plan.name.toLowerCase()}`} className="rgl-px-cta">
                Book A Call →
              </a>
              <div className="rgl-px-cta-note">🔒 No payment now — we invoice after setup</div>
            </div>

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
            </div>
          </div>

          {/* Extra Domain addon */}
          {addon && (
            <div className="rgl-px-addon">
              <div className="rgl-px-addon-label">Add-on</div>
              <div className="rgl-px-addon-info">
                <div className="rgl-px-addon-title">🌐 {addon.label}</div>
                <div className="rgl-px-addon-sub">{addon.sub}</div>
              </div>
              <div className="rgl-px-addon-price">{addon.price} <small>{addon.unit}</small></div>
            </div>
          )}

        </div>
      </section>
    </>
  )
}