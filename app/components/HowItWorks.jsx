const steps = [
  { n: '1', t: 'Book Your Call',         d: 'Choose a time for Google Meet or Zoom.' },
  { n: '2', t: 'We Install Everything',  d: 'Connect your Shopify store in around 30 minutes.' },
  { n: '3', t: 'Start Collecting Trust', d: 'Your premium review widgets go live immediately.' },
]

export default function HowItWorks() {
  return (
    <>
      <style>{`
        .rgl-how { padding: 100px 0; background: #f8f7f4; }
        .rgl-how-header { text-align: center; margin-bottom: 64px; }
        .rgl-how .rgl-section-title { color: #0f172a; }
        .rgl-how .rgl-section-sub { color: #64748b; margin: 0 auto; text-align: center; }
        .rgl-steps { display: grid; grid-template-columns: repeat(3,1fr); gap: 36px; position: relative; }
        .rgl-steps::before { content: ''; position: absolute; top: 27px; left: calc(16.66% + 24px); right: calc(16.66% + 24px); height: 1px; background: repeating-linear-gradient(90deg,#f59e0b 0,#f59e0b 6px,transparent 6px,transparent 12px); }
        .rgl-step { text-align: center; position: relative; z-index: 1; }
        .rgl-step-num { width: 54px; height: 54px; background: #f59e0b; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-size: 22px; font-weight: 900; margin: 0 auto 20px; box-shadow: 0 8px 24px rgba(245,158,11,0.32); }
        .rgl-step-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 10px; }
        .rgl-step-desc { font-size: 14px; color: #64748b; line-height: 1.65; }
        @media (max-width: 960px) { .rgl-steps { grid-template-columns: 1fr; } .rgl-steps::before { display: none; } }
        @media (max-width: 620px) { .rgl-how { padding: 70px 0; } }
      `}</style>
      <section className="rgl-how" id="how">
        <div className="rgl-container">
          <div className="rgl-how-header">
            <div className="rgl-section-eyebrow">How It Works</div>
            <h2 className="rgl-section-title">We do everything<br />for you.</h2>
          </div>
          <div className="rgl-steps">
            {steps.map(s => (
              <div key={s.n} className="rgl-step">
                <div className="rgl-step-num">{s.n}</div>
                <div className="rgl-step-title">{s.t}</div>
                <div className="rgl-step-desc">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
