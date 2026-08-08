'use client'
import { useState } from 'react'

const faqs = [
  { q: 'What exactly is a "design style"?',         a: 'A design style is a unique visual variant of the review gallery — a distinct look, card layout, and animation set. Each one looks different on the storefront. When you purchase, you choose which style(s) you want installed.' },
  { q: 'Can I change my domain after purchase?',    a: 'Yes. If you migrate stores or entered the wrong domain, just contact us and we will update your license within 24 hours — free of charge for your first domain change.' },
  { q: 'Do I need to know how to code?',            a: 'No. Installation is included with every license. We access your theme editor via Shopify collaborator access and install the section for you — configured and ready within 24 hours.' },
  { q: 'Is there a monthly fee or subscription?',   a: 'Absolutely not. You pay once and the license is yours indefinitely. No renewals, no subscription fees, no expiry dates.' },
  { q: 'How do I add reviews to my store?',         a: 'You get a Google Sheet with the correct column structure. Fill in rows — name, rating, review text, photo URL, date — and save. The gallery fetches the sheet automatically. No Shopify access needed after setup.' },
  { q: 'What if I need support after purchase?',    a: 'All plans include standard email support. Growth and Studio plans get priority response. If something breaks on our end, we fix it.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="rgl-faq" id="faq">
      <div className="rgl-container">
        <div className="rgl-faq-header">
          <div className="rgl-section-eyebrow">FAQ</div>
          <h2 className="rgl-section-title">Questions answered</h2>
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
  )
}
