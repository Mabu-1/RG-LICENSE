'use client'
import { useState } from 'react'

const faqs = [
  { q: 'Is this really a one-time payment?', a: 'Yes. You pay once and the license never expires. No monthly fees, no renewals.' },
  { q: 'How does the Google Sheet work?', a: 'You share a Google Sheet publicly, copy its CSV export URL, and paste it into the Shopify theme editor. Reviews load from your sheet automatically.' },
  { q: 'Do I need to know how to code?', a: 'Not at all. We install the section on your Shopify theme for you within 24 hours of purchase.' },
  { q: 'What happens if I change my domain?', a: 'Your license is tied to the domain you provide at checkout. Contact us and we can transfer it.' },
  { q: 'Can I use it on multiple stores?', a: 'Each license covers one domain. Purchase additional licenses or add the Extra Domain add-on for more stores.' },
  { q: 'What Shopify themes does it support?', a: 'It works with any Shopify 2.0 theme including Dawn, Debut, Refresh, and most premium themes.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <>
      <style>{`
        .rgl-faq { padding: 100px 0; background: #f8f7f4; }
        .rgl-faq-header { text-align: center; margin-bottom: 60px; }
        .rgl-faq .rgl-section-title { color: #0f172a; }
        .rgl-faq-list { max-width: 720px; margin: 0 auto; }
        .rgl-faq-item { background: #fff; border-radius: 14px; border: 1px solid #e2e8f0; margin-bottom: 10px; overflow: hidden; }
        .rgl-faq-q { width: 100%; background: none; border: none; text-align: left; padding: 20px 22px; font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600; color: #0f172a; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; }
        .rgl-faq-q:hover { background: #f8f7f4; }
        .rgl-faq-icon { width: 26px; height: 26px; background: #f8f7f4; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; color: #64748b; flex-shrink: 0; transition: all 0.25s; line-height: 1; }
        .rgl-faq-icon.open { background: #f59e0b; color: #fff; transform: rotate(45deg); }
        .rgl-faq-a { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
        .rgl-faq-a.open { max-height: 300px; }
        .rgl-faq-a-inner { padding: 16px 22px 22px; font-size: 14px; color: #64748b; line-height: 1.7; border-top: 1px solid #e2e8f0; }
        @media (max-width: 620px) { .rgl-faq { padding: 70px 0; } }
      `}</style>
      <section className="rgl-faq" id="faq">
        <div className="rgl-container">
          <div className="rgl-faq-header">
            <div className="rgl-section-eyebrow">FAQ</div>
            <h2 className="rgl-section-title">Common questions</h2>
          </div>
          <div className="rgl-faq-list">
            {faqs.map((f, i) => (
              <div key={i} className="rgl-faq-item">
                <button className="rgl-faq-q" onClick={() => setOpen(open === i ? null : i)}>
                  {f.q}
                  <span className={`rgl-faq-icon${open === i ? ' open' : ''}`}>+</span>
                </button>
                <div className={`rgl-faq-a${open === i ? ' open' : ''}`}>
                  <div className="rgl-faq-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
