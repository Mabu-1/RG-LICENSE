const rows = [
  { feature: "One-Time Payment", us: true, loox: false, other: false },
  { feature: "Monthly Fees", us: false, loox: true, other: true },
  {
    feature: "Unlimited Reviews",
    us: true,
    loox: "Limited by Plan",
    other: "Limited by Plan",
  },
  { feature: "Google Sheet Management", us: true, loox: false, other: false },
  { feature: "Personal Setup Included", us: true, loox: false, other: false },
  { feature: "Multiple Layouts", us: true, loox: true, other: true },
];

function Cell({ val }) {
  if (val === true) return <span style={{ fontSize: 20 }}>✅</span>;
  if (val === false) return <span style={{ fontSize: 20 }}>❌</span>;
  return (
    <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>
      {val}
    </span>
  );
}

export default function WhySwitch() {
  return (
    <>
      <style>{`
        .ws { padding: 100px 0; background: #F8FAFF; }
        .ws-header { text-align: center; margin-bottom: 56px; }
        .ws-eyebrow { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #2563EB; margin-bottom: 12px; }
        .ws-h2 { font-family: 'Fraunces', serif; font-size: clamp(28px,3.5vw,44px); font-weight: 900; letter-spacing: -1.5px; color: #0F172A; margin-bottom: 12px; }
        .ws-h2 em { font-style: normal; color: #2563EB; }
        .ws-sub { font-size: 16px; color: #64748b; max-width: 480px; margin: 0 auto; line-height: 1.7; }
        .ws-wrap { max-width: 860px; margin: 0 auto; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(37,99,235,0.08); border: 1px solid #e2e8f0; }
        .ws-table { width: 100%; border-collapse: collapse; }
        .ws-table thead tr { background: #0F172A; }
        .ws-table thead th { padding: 18px 20px; text-align: center; font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.6); letter-spacing: 0.5px; }
        .ws-table thead th:first-child { text-align: left; color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
        .ws-table thead th.ws-us { color: #60A5FA; font-size: 14px; }
        .ws-table tbody tr { border-bottom: 1px solid #f1f5f9; transition: background 0.15s; }
        .ws-table tbody tr:last-child { border-bottom: none; }
        .ws-table tbody tr:hover { background: #f0f7ff; }
        .ws-table tbody td { padding: 18px 20px; text-align: center; font-size: 14px; color: #0F172A; background: #fff; }
        .ws-table tbody td:first-child { text-align: left; font-weight: 600; color: #0F172A; font-size: 14px; }
        .ws-table tbody td.ws-us-col { background: rgba(37,99,235,0.04); border-left: 2px solid rgba(37,99,235,0.15); border-right: 2px solid rgba(37,99,235,0.15); }
        .ws-table thead th.ws-us { border-left: 2px solid rgba(37,99,235,0.3); border-right: 2px solid rgba(37,99,235,0.3); }
        @media (max-width: 640px) {
          .ws { padding: 70px 0; }
          .ws-table thead th, .ws-table tbody td { padding: 14px 12px; font-size: 12px; }
          .ws-table tbody td:first-child { font-size: 12px; }
        }
      `}</style>

      <section className="ws" id="why-switch">
        <div className="rgl-container">
          <div className="ws-header">
            <div className="ws-eyebrow">Comparison</div>
            <h2 className="ws-h2">
              Why Store Owners <em>Switch</em>
            </h2>
          </div>
          <div className="ws-wrap">
            <table className="ws-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="ws-us">★ Our System</th>
                  <th>Loox</th>
                  <th>Other Apps</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.feature}</td>
                    <td className="ws-us-col">
                      <Cell val={row.us} />
                    </td>
                    <td>
                      <Cell val={row.loox} />
                    </td>
                    <td>
                      <Cell val={row.other} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
