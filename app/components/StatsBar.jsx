"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { num: 0, suffix: "", symbol: "$0", label: "Monthly Fees" },
  { num: 999, suffix: "", symbol: "∞", label: "Reviews Supported" },
  { num: 24, suffix: "h", symbol: null, label: "Setup Time" },
  { num: 1, suffix: "×", symbol: null, label: "One-Time Payment" },
];

function useCountUp(target, duration, started) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started || target === 0 || target === 999) {
      setVal(target);
      return;
    }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return val;
}

function Stat({ stat, started, index }) {
  const val = useCountUp(stat.num, 1000 + index * 150, started);
  const display = stat.symbol ? stat.symbol : val + stat.suffix;
  return (
    <div className="rgl-stat">
      <div className="rgl-stat-num">{display}</div>
      <div className="rgl-stat-label">{stat.label}</div>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

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
      <div className="rgl-stats" ref={ref}>
        <div className="rgl-stats-inner">
          {stats.map((s, i) => (
            <Stat key={s.label} stat={s} started={started} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
