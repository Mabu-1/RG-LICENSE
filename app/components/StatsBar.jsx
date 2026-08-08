const stats = [
  ['3',   'Layout Styles'],
  ['20+', 'Theme Settings'],
  ['$0',  'Monthly Fees'],
  ['∞',   'Reviews Supported'],
]

export default function StatsBar() {
  return (
    <div className="rgl-stats">
      <div className="rgl-container">
        <div className="rgl-stats-inner">
          {stats.map(([n, l]) => (
            <div key={l} className="rgl-stat">
              <div className="rgl-stat-num">{n}</div>
              <div className="rgl-stat-label">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
