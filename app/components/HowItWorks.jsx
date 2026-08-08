const steps = [
  { n: '1', t: 'Buy a License',  d: 'Choose your plan. Enter your Shopify store domain at checkout — that domain becomes your permanent license key.' },
  { n: '2', t: 'We Install It',  d: "We add the section to your Shopify theme and configure it to match your store's style within 24 hours of purchase." },
  { n: '3', t: 'Fill Your Sheet', d: 'Add reviews to your Google Sheet by filling in the columns. They appear on your store the moment you save.' },
]

export default function HowItWorks() {
  return (
    <section className="rgl-how" id="how">
      <div className="rgl-container">
        <div className="rgl-how-header">
          <div className="rgl-section-eyebrow">The Process</div>
          <h2 className="rgl-section-title">Up and running<br />in 24 hours</h2>
          <p className="rgl-section-sub">You don't need to write a single line of code. We handle installation and setup for you.</p>
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
