const steps = [
  { n: '1', t: 'Book Your Call',          d: 'Choose a time for Google Meet or Zoom.' },
  { n: '2', t: 'We Install Everything',   d: 'Connect your Shopify store in around 30 minutes.' },
  { n: '3', t: 'Start Collecting Trust',  d: 'Your premium review widgets go live immediately.' },
]

export default function HowItWorks() {
  return (
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
  )
}
