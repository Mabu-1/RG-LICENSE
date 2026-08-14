export default function StatsBar() {
  const stats = [
    { num: '$0', label: 'Monthly Fees' },
    { num: '∞', label: 'Reviews Supported' },
    { num: '24h', label: 'Setup Time' },
    { num: '1×', label: 'One-Time Payment' },
  ]
  return (
    <>
      <style>{`
        .rgl-stats { background: #0f172a; padding: 34px 0; }
        .rgl-stats-inner { display: flex; justify-content: center; gap: 80px; flex-wrap: wrap; }
        .rgl-stat { text-align: center; }
        .rgl-stat-num { font-family: 'Fraunces', serif; font-size: 38px; font-weight: 900; color: #f59e0b; letter-spacing: -1.5px; line-height: 1; margin-bottom: 4px; }
        .rgl-stat-label { font-size: 12px; color: rgba(255,255,255,0.45); font-weight: 500; text-transform: uppercase; letter-spacing: 1px; }
        @media (max-width: 960px) { .rgl-stats-inner { gap: 40px; } }
      `}</style>
      <div className="rgl-stats">
        <div className="rgl-stats-inner">
          {stats.map(s => (
            <div key={s.label} className="rgl-stat">
              <div className="rgl-stat-num">{s.num}</div>
              <div className="rgl-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
