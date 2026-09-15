"use client";

const stats = [
  { num: "$0", label: "Monthly Fees" },
  { num: "∞", label: "Reviews Supported" },
  { num: "24h", label: "Setup Time" },
  { num: "1×", label: "One-Time Payment" },
];

export default function StatsBar() {
  return (
    <>
      <style>{`
        .rgl-stats { background: linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%); padding: 50px 0; border-top: 1px solid #BFDBFE; border-bottom: 1px solid #BFDBFE; }
        .rgl-stats-inner { display: flex; justify-content: center; gap: 80px; flex-wrap: wrap; }
        .rgl-stat { text-align: center; }
        .rgl-stat-num { font-family: 'Fraunces', serif; font-size: 48px; font-weight: 900; color: #2563EB; letter-spacing: -2px; line-height: 1; margin-bottom: 6px; }
        .rgl-stat-label { font-size: 12px; color: #64748B; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; }
        @media (max-width: 960px) { .rgl-stats-inner { gap: 40px; } }
        @media (max-width: 480px) { .rgl-stats-inner { gap: 32px; } .rgl-stat-num { font-size: 36px; } }
      `}</style>
      <div className="rgl-stats">
        <div className="rgl-stats-inner">
          {stats.map((s) => (
            <div key={s.label} className="rgl-stat">
              <div className="rgl-stat-num">{s.num}</div>
              <div className="rgl-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
