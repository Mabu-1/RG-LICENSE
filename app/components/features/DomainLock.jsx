export default function DomainLock() {
  return (
    <>
      <style>{`
        .dl { padding: 100px 0; background: #0F172A; }
        .dl-split { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .dl-eyebrow { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #F59E0B; margin-bottom: 12px; }
        .dl-h2 { font-family: 'Fraunces', serif; font-size: clamp(28px,3.5vw,44px); font-weight: 900; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 16px; color: #fff; }
        .dl-p { font-size: 16px; line-height: 1.7; margin-bottom: 24px; color: rgba(255,255,255,0.55); }
        .dl-list { list-style: none; }
        .dl-list li { font-size: 14px; padding: 9px 0; display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.7); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .dl-list li::before { content: '★'; color: #F59E0B; font-size: 10px; flex-shrink: 0; }
        .dl-cards { display: flex; gap: 16px; }
        .dl-card { flex: 1; border-radius: 16px; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px; }
        .dl-card.dl-allow { background: rgba(16,185,129,0.08); border: 2px solid rgba(16,185,129,0.3); }
        .dl-card.dl-block { background: rgba(239,68,68,0.08); border: 2px solid rgba(239,68,68,0.2); }
        .dl-icon { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; }
        .dl-card.dl-allow .dl-icon { background: rgba(16,185,129,0.15); }
        .dl-card.dl-block .dl-icon { background: rgba(239,68,68,0.15); }
        .dl-domain { font-size: 12px; font-weight: 700; font-family: monospace; }
        .dl-card.dl-allow .dl-domain { color: #10B981; }
        .dl-card.dl-block .dl-domain { color: #EF4444; }
        .dl-status { font-size: 13px; font-weight: 600; }
        .dl-card.dl-allow .dl-status { color: #10B981; }
        .dl-card.dl-block .dl-status { color: #EF4444; }
        .dl-sub { font-size: 12px; color: rgba(255,255,255,0.35); }
        @media (max-width: 900px) { .dl { padding: 70px 0; } .dl-split { grid-template-columns: 1fr; gap: 48px; } .dl-cards { flex-direction: column; } }
      `}</style>
      <section className="dl" id="feat-domain">
        <div className="rgl-container">
          <div className="dl-split">
            <div>
              <div className="dl-eyebrow">Domain-Locked License</div>
              <h2 className="dl-h2">Your code works only where you say it does</h2>
              <p className="dl-p">Every license is tied to a specific domain. If the section loads on an unlicensed store it silently does nothing — no errors, no broken UI. Your code stays yours.</p>
              <ul className="dl-list">
                <li>License bound to your exact domain at checkout</li>
                <li>Silently fails on unauthorized stores — no errors shown</li>
                <li>Add extra domains at any time for $10 each</li>
                <li>Domain change requests handled within 24 hours</li>
              </ul>
            </div>
            <div>
              <div className="dl-cards">
                <div className="dl-card dl-allow">
                  <div className="dl-icon">✅</div>
                  <div className="dl-domain">yourstore.myshopify.com</div>
                  <div className="dl-status">Licensed — Gallery loads</div>
                  <div className="dl-sub">Reviews display perfectly</div>
                </div>
                <div className="dl-card dl-block">
                  <div className="dl-icon">🚫</div>
                  <div className="dl-domain">otherstore.com</div>
                  <div className="dl-status">Blocked — Gallery silent</div>
                  <div className="dl-sub">No errors, nothing loads</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
