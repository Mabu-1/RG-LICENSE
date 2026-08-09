'use client'
import { useState } from 'react'

const thumbs = [
  { emoji: '🛍️', bg: 'linear-gradient(135deg,#FEF3C7,#FDE68A)', author: 'Sarah M.', stars: '★★★★★', body: 'Absolutely love this product. The quality is incredible and it arrived perfectly packaged. Will definitely order again soon!' },
  { emoji: '📦', bg: 'linear-gradient(135deg,#DBEAFE,#BFDBFE)', author: 'James R.', stars: '★★★★★', body: 'Fast shipping and exactly as described. This is my second purchase and I am just as happy as the first time around.' },
  { emoji: '✨', bg: 'linear-gradient(135deg,#D1FAE5,#A7F3D0)', author: 'Priya K.', stars: '★★★★☆', body: 'Great quality for the price. The packaging was beautiful and everything arrived in perfect condition. Highly recommend!' },
  { emoji: '💫', bg: 'linear-gradient(135deg,#FCE7F3,#FBCFE8)', author: 'Tom W.',   stars: '★★★★★', body: 'Second purchase and still the best. Customer service is also top notch. This brand never disappoints at all.' },
]

export default function Lightbox() {
  const [open, setOpen] = useState(null)
  return (
    <>
      <style>{`
        .lb { padding: 100px 0; background: #0F172A; }
        .lb-split { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .lb-eyebrow { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #F59E0B; margin-bottom: 12px; }
        .lb-h2 { font-family: 'Fraunces', serif; font-size: clamp(28px,3.5vw,44px); font-weight: 900; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 16px; color: #fff; }
        .lb-p { font-size: 16px; line-height: 1.7; margin-bottom: 24px; color: rgba(255,255,255,0.55); }
        .lb-list { list-style: none; }
        .lb-list li { font-size: 14px; padding: 9px 0; display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.7); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .lb-list li::before { content: '★'; color: #F59E0B; font-size: 10px; flex-shrink: 0; }
        .lb-wrap { background: #1a1a1a; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.4); padding: 16px; }
        .lb-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .lb-thumb { aspect-ratio: 4/3; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 36px; position: relative; overflow: hidden; transition: transform 0.2s; }
        .lb-thumb:hover { transform: scale(1.02); }
        .lb-thumb-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0); display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .lb-thumb:hover .lb-thumb-overlay { background: rgba(0,0,0,0.3); }
        .lb-zoom { background: rgba(255,255,255,0.9); color: #111; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; opacity: 0; transition: opacity 0.2s; }
        .lb-thumb:hover .lb-zoom { opacity: 1; }
        .lb-label { text-align: center; margin-top: 12px; font-size: 12px; color: rgba(255,255,255,0.4); }
        .lb-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(8px); opacity: 0; pointer-events: none; transition: opacity 0.3s; }
        .lb-modal.lb-open { opacity: 1; pointer-events: auto; }
        .lb-modal-inner { display: flex; max-width: 900px; width: 100%; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5); max-height: 90vh; }
        .lb-modal-img-side { flex: 0 0 60%; display: flex; align-items: center; justify-content: center; font-size: 80px; min-height: 400px; }
        .lb-modal-text-side { flex: 1; background: #fff; padding: 32px; display: flex; flex-direction: column; overflow-y: auto; }
        .lb-modal-close { position: fixed; top: 20px; right: 20px; background: rgba(255,255,255,0.9); border: none; cursor: pointer; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; z-index: 10000; transition: all 0.2s; }
        .lb-modal-close:hover { background: #fff; transform: scale(1.1); }
        .lb-modal-author { font-weight: 700; font-size: 18px; color: #0F172A; margin-bottom: 4px; }
        .lb-modal-stars { color: #F59E0B; font-size: 18px; margin-bottom: 12px; }
        .lb-modal-body { font-size: 14px; color: #64748B; line-height: 1.7; flex: 1; }
        .lb-nav-btn { padding: 8px 16px; border: 1px solid #e2e8f0; border-radius: 8px; cursor: pointer; font-size: 13px; background: #fff; transition: all 0.2s; margin-top: 20px; }
        .lb-nav-btn:hover { border-color: #0F172A; }
        @media (max-width: 900px) { .lb { padding: 70px 0; } .lb-split { grid-template-columns: 1fr; gap: 48px; } .lb-modal-inner { flex-direction: column; } .lb-modal-img-side { flex: 0 0 auto; min-height: 220px; } }
      `}</style>
      <section className="lb" id="feat-lightbox">
        <div className="rgl-container">
          <div className="lb-split">
            <div>
              <div className="lb-eyebrow">Photo & Video Lightbox</div>
              <h2 className="lb-h2">Reviews that show, not just tell</h2>
              <p className="lb-p">Photo and video reviews open in a full-screen popup with the review text alongside. Keyboard navigation, prev and next, ESC to close — all built in. Try it below.</p>
              <ul className="lb-list">
                <li>Supports image and video reviews side by side</li>
                <li>Keyboard navigation — arrow keys and ESC to close</li>
                <li>Prev and next navigation between media reviews</li>
                <li>Blurred backdrop with smooth open and close animation</li>
              </ul>
            </div>
            <div>
              <div className="lb-wrap">
                <div className="lb-grid">
                  {thumbs.map((t,i) => (
                    <div key={i} className="lb-thumb" style={{background:t.bg}} onClick={() => setOpen(i)}>
                      <span>{t.emoji}</span>
                      <div className="lb-thumb-overlay">
                        <div className="lb-zoom">🔍</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lb-label">Click any photo to try the lightbox</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {open !== null && (
        <div className="lb-modal lb-open">
          <button className="lb-modal-close" onClick={() => setOpen(null)}>✕</button>
          <div className="lb-modal-inner">
            <div className="lb-modal-img-side" style={{background:thumbs[open].bg}}>
              <span style={{fontSize:80}}>{thumbs[open].emoji}</span>
            </div>
            <div className="lb-modal-text-side">
              <div className="lb-modal-author">{thumbs[open].author}</div>
              <div className="lb-modal-stars">{thumbs[open].stars}</div>
              <div className="lb-modal-body">{thumbs[open].body}</div>
              <div style={{display:'flex',gap:8}}>
                <button className="lb-nav-btn" onClick={() => setOpen(o => (o-1+thumbs.length)%thumbs.length)}>❮ Prev</button>
                <button className="lb-nav-btn" onClick={() => setOpen(o => (o+1)%thumbs.length)}>Next ❯</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
