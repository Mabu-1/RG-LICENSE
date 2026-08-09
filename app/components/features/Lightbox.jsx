'use client'
import { useState } from 'react'

const thumbs = [
  {
    img: 'https://vdeubftebrtbkyjchjqh.supabase.co/storage/v1/object/public/review-images/1786297614686_hvss33m0uxg.jpeg',
    author: 'Sarah M.', stars: '★★★★★',
    body: 'Absolutely love this product. The quality is incredible and it arrived perfectly packaged. Will definitely order again soon!'
  },
  {
    img: 'https://vdeubftebrtbkyjchjqh.supabase.co/storage/v1/object/public/review-images/1786297674810_54vlkmi3asm.avif',
    author: 'James R.', stars: '★★★★★',
    body: 'Fast shipping and exactly as described. This is my second purchase and I am just as happy as the first time around.'
  },
  {
    img: 'https://vdeubftebrtbkyjchjqh.supabase.co/storage/v1/object/public/review-images/1786297674810_54vlkmi3asm.avif',
    author: 'Priya K.', stars: '★★★★☆',
    body: 'Great quality for the price. The packaging was beautiful and everything arrived in perfect condition. Highly recommend!'
  },
  {
    img: 'https://vdeubftebrtbkyjchjqh.supabase.co/storage/v1/object/public/review-images/1786297731460_mc12v3pxp8.jpeg',
    author: 'Tom W.', stars: '★★★★★',
    body: 'Second purchase and still the best. Customer service is also top notch. This brand never disappoints at all.'
  },
]

export default function Lightbox() {
  const [open, setOpen] = useState(null)

  function prev() { setOpen(i => (i - 1 + thumbs.length) % thumbs.length) }
  function next() { setOpen(i => (i + 1) % thumbs.length) }

  const current = open !== null ? thumbs[open] : null

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
        .lb-thumb { aspect-ratio: 4/3; border-radius: 10px; cursor: pointer; position: relative; overflow: hidden; transition: transform 0.2s; }
        .lb-thumb:hover { transform: scale(1.02); }
        .lb-thumb img { width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.3s; }
        .lb-thumb:hover img { transform: scale(1.05); }
        .lb-overlay { position:absolute; inset:0; background:rgba(0,0,0,0); display:flex; align-items:center; justify-content:center; transition:background 0.2s; }
        .lb-thumb:hover .lb-overlay { background:rgba(0,0,0,0.3); }
        .lb-zoom { background:rgba(255,255,255,0.9); color:#111; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; opacity:0; transition:opacity 0.2s; }
        .lb-thumb:hover .lb-zoom { opacity:1; }
        .lb-label { text-align:center; margin-top:12px; font-size:12px; color:rgba(255,255,255,0.4); }
        .lb-modal { position:fixed; inset:0; background:rgba(0,0,0,0.92); z-index:9999; display:flex; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(8px); opacity:0; pointer-events:none; transition:opacity 0.3s; }
        .lb-modal.open { opacity:1; pointer-events:auto; }
        .lb-modal-inner { display:flex; max-width:900px; width:100%; border-radius:16px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.5); max-height:90vh; }
        .lb-img-side { flex:0 0 60%; background:#111; display:flex; align-items:center; justify-content:center; overflow:hidden; position:relative; }
        .lb-img-side img { width:100%; height:100%; object-fit:cover; display:block; }
        .lb-text-side { flex:1; background:#fff; padding:32px; display:flex; flex-direction:column; overflow-y:auto; }
        .lb-close { position:fixed; top:20px; right:20px; background:rgba(255,255,255,0.9); border:none; cursor:pointer; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; z-index:10000; transition:all 0.2s; }
        .lb-close:hover { background:#fff; transform:scale(1.1); }
        .lb-nav { position:absolute; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.9); border:none; cursor:pointer; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; transition:all 0.2s; z-index:10; }
        .lb-nav:hover { background:#fff; transform:translateY(-50%) scale(1.1); }
        .lb-prev { left:12px; }
        .lb-next { right:12px; }
        .lb-author { font-weight:700; font-size:18px; color:#0F172A; margin-bottom:4px; }
        .lb-stars { color:#F59E0B; font-size:18px; margin-bottom:12px; }
        .lb-body { font-size:14px; color:#64748B; line-height:1.7; flex:1; }
        .lb-counter { font-size:12px; color:#94a3b8; margin-top:16px; text-align:center; }
        @media (max-width:900px) {
          .lb { padding:70px 0; }
          .lb-split { grid-template-columns:1fr; gap:48px; }
          .lb-modal-inner { flex-direction:column; }
          .lb-img-side { flex:0 0 auto; min-height:220px; }
        }
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
                  {thumbs.map((t, i) => (
                    <div key={i} className="lb-thumb" onClick={() => setOpen(i)}>
                      <img src={t.img} alt={t.author} />
                      <div className="lb-overlay">
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

      {open !== null && current && (
        <div className="lb-modal open">
          <button className="lb-close" onClick={() => setOpen(null)}>✕</button>
          <div className="lb-modal-inner">
            <div className="lb-img-side">
              <img src={current.img} alt={current.author} />
              <button className="lb-nav lb-prev" onClick={prev}>❮</button>
              <button className="lb-nav lb-next" onClick={next}>❯</button>
            </div>
            <div className="lb-text-side">
              <div className="lb-author">{current.author}</div>
              <div className="lb-stars">{current.stars}</div>
              <div className="lb-body">{current.body}</div>
              <div className="lb-counter">{open + 1} / {thumbs.length}</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
