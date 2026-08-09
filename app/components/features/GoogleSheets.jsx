export default function GoogleSheets() {
  const rows = [
    { r: 5, a: 'Sarah M.',  b: 'Absolutely love this!',   d: '2024-01-15', v: 'TRUE'  },
    { r: 4, a: 'James R.',  b: 'Great product overall',    d: '2024-01-14', v: 'FALSE' },
    { r: 5, a: 'Priya K.',  b: 'Exceeded expectations',    d: '2024-01-13', v: 'TRUE'  },
    { r: 5, a: 'Tom W.',    b: 'Second purchase, perfect', d: '2024-01-12', v: 'FALSE' },
  ]
  return (
    <>
      <style>{`
        .gs { padding: 100px 0; background: #F8F7F4; }
        .gs-split { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .gs-eyebrow { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #F59E0B; margin-bottom: 12px; }
        .gs-h2 { font-family: 'Fraunces', serif; font-size: clamp(28px,3.5vw,44px); font-weight: 900; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 16px; color: #0F172A; }
        .gs-p { font-size: 16px; line-height: 1.7; margin-bottom: 24px; color: #64748B; }
        .gs-list { list-style: none; }
        .gs-list li { font-size: 14px; padding: 9px 0; display: flex; align-items: center; gap: 10px; color: #334155; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .gs-list li::before { content: '★'; color: #F59E0B; font-size: 10px; flex-shrink: 0; }
        .gs-sheet-wrap { background: #fff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.12); overflow: hidden; border: 1px solid #e2e8f0; }
        .gs-sheet-bar { background: #f1f3f4; padding: 10px 16px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #5f6368; font-weight: 500; }
        .gs-sheet-icon { color: #0F9D58; font-size: 16px; }
        .gs-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .gs-table { width: 100%; border-collapse: collapse; font-size: 12px; min-width: 420px; }
        .gs-table th { background: #f8f9fa; padding: 8px 12px; text-align: left; font-weight: 600; color: #5f6368; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; white-space: nowrap; }
        .gs-table td { padding: 7px 12px; color: #333; border-bottom: 1px solid #f1f3f4; border-right: 1px solid #f1f3f4; white-space: nowrap; max-width: 160px; overflow: hidden; text-overflow: ellipsis; }
        .gs-table tr:hover td { background: #f8f9fa; }
        .gs-row-num { color: #999; text-align: center; background: #f8f9fa !important; width: 32px; }
        .gs-star { color: #F59E0B; }
        .gs-verified { color: #0F9D58; font-weight: 600; }
        @media (max-width: 900px) {
          .gs { padding: 70px 0; }
          .gs-split { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 480px) {
          .gs-sheet-bar { font-size: 11px; }
        }
      `}</style>
      <section className="gs" id="feat-sheets">
        <div className="rgl-container">
          <div className="gs-split">
            <div>
              <div className="gs-eyebrow">Google Sheets Powered</div>
              <h2 className="gs-h2">Your spreadsheet IS your database</h2>
              <p className="gs-p">No CMS, no dashboard, no complexity. Point the section to any Google Sheet, make it public, and your reviews appear on the store instantly. Add a row — refresh — it is live.</p>
              <ul className="gs-list">
                <li>8 simple columns — rating, author, body, date, photo, verified, variant</li>
                <li>Update reviews without touching Shopify at all</li>
                <li>Works with any public Google Sheet export URL</li>
                <li>Cache-busting ensures reviews always stay fresh</li>
              </ul>
            </div>
            <div>
              <div className="gs-sheet-wrap">
                <div className="gs-sheet-bar">
                  <span className="gs-sheet-icon">📊</span>
                  reviews-data — Google Sheets
                </div>
                <div className="gs-scroll">
                  <table className="gs-table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Rating</th>
                        <th>Author</th>
                        <th>Body</th>
                        <th>Date</th>
                        <th>Verified</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r, i) => (
                        <tr key={i}>
                          <td className="gs-row-num">{i + 2}</td>
                          <td className="gs-star">{'★'.repeat(r.r) + '☆'.repeat(5 - r.r)}</td>
                          <td>{r.a}</td>
                          <td>{r.b}</td>
                          <td>{r.d}</td>
                          <td className={r.v === 'TRUE' ? 'gs-verified' : ''}>{r.v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
