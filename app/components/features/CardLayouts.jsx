'use client'
import { useState } from 'react'

const tabs = [
  { id: 'natural', label: 'Natural',       desc: 'Cards use their own content height. Clean rows, variable card heights.' },
  { id: 'equal',   label: 'Equal Height',  desc: 'All cards in a row match the tallest. Uniform, grid-like layout.' },
  { id: 'masonry', label: 'Masonry',       desc: 'Cards stack into columns filling gaps. Pinterest-style layout.' },
]

export default function CardLayouts() {
  const [active, setActive] = useState('natural')
  const current = tabs.find(t => t.id === active)
  return (
    <>
      <style>{`
        .cl { padding: 100px 0; background: #0F172A; }
        .cl-split { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .cl-eyebrow { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #F59E0B; margin-bottom: 12px; }
        .cl-h2 { font-family: 'Fraunces', serif; font-size: clamp(28px,3.5vw,44px); font-weight: 900; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 16px; color: #fff; }
        .cl-p { font-size: 16px; line-height: 1.7; margin-bottom: 24px; color: rgba(255,255,255,0.55); }
        .cl-list { list-style: none; }
        .cl-list li { font-size: 14px; padding: 9px 0; display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.7); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .cl-list li::before { content: '★'; color: #F59E0B; font-size: 10px; flex-shrink: 0; }
        .cl-tab-wrap { background: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .cl-tab-bar { display: flex; padding: 12px 12px 0; gap: 4px; }
        .cl-tab-btn { padding: 8px 20px; border-radius: 8px 8px 0 0; font-size: 13px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5); }
        .cl-tab-btn.active { background: #0F172A; color: #F59E0B; }
        .cl-tab-content { background: #0F172A; padding: 24px; min-height: 260px; display: flex; align-items: center; justify-content: center; }
        .cl-placeholder { width: 100%; aspect-ratio: 16/9; background: rgba(255,255,255,0.04); border: 2px dashed rgba(245,158,11,0.3); border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; }
        .cl-placeholder span { font-size: 32px; }
        .cl-placeholder p { font-size: 13px; color: rgba(255,255,255,0.4); text-align: center; max-width: 200px; }
        .cl-placeholder small { font-size: 11px; color: rgba(255,255,255,0.25); text-align: center; max-width: 220px; }
        @media (max-width: 900px) { .cl { padding: 70px 0; } .cl-split { grid-template-columns: 1fr; gap: 48px; } }
      `}</style>
      <section className="cl" id="feat-layouts">
        <div className="rgl-container">
          <div className="cl-split">
            <div>
              <div className="cl-eyebrow">Three Card Layouts</div>
              <h2 className="cl-h2">Pick the layout that fits your store</h2>
              <p className="cl-p">Every store has a different aesthetic. Switch between three distinct layout modes from the Shopify theme editor — no code, no rebuilds, instant preview.</p>
              <ul className="cl-list">
                <li>Natural, Equal Height, and Masonry modes</li>
                <li>2 to 6 columns on desktop, 1 to 2 on mobile</li>
                <li>Fully responsive breakpoints built in</li>
                <li>Switch layouts any time without losing settings</li>
              </ul>
            </div>
            <div>
              <div className="cl-tab-wrap">
                <div className="cl-tab-bar">
                  {tabs.map(t => (
                    <button key={t.id} className={'cl-tab-btn' + (active===t.id?' active':'')} onClick={() => setActive(t.id)}>
                      {t.label}
                    </button>
                  ))}
                </div>
                <div className="cl-tab-content">
                  <div className="cl-placeholder">
                    <span>🖼️</span>
                    <p style={{fontWeight:600,color:'rgba(255,255,255,0.5)'}}>Add {current.label} screenshot here</p>
                    <small>{current.desc}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
