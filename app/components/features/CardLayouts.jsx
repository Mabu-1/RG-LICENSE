"use client";
import { useEffect, useState } from "react";

const tabs = [
    {
    id: "masonry",
    label: "Masonry",
    img: "https://vdeubftebrtbkyjchjqh.supabase.co/storage/v1/object/public/review-images/1786296628914_8t8v46l8yct.png",
    desc: "Cards stack into columns filling gaps. Pinterest-style layout.",
  },
  {
    id: "natural",
    label: "Natural",
    img: "https://vdeubftebrtbkyjchjqh.supabase.co/storage/v1/object/public/review-images/1786296630082_cqs3l68wsg.png",
    desc: "Cards use their own content height. Clean rows, variable card heights.",
  },
  {
    id: "equal",
    label: "Equal Height",
    img: "https://vdeubftebrtbkyjchjqh.supabase.co/storage/v1/object/public/review-images/1786297480876_s6pt5bulk5g.png",
    desc: "All cards in a row match the tallest. Uniform, grid-like layout.",
  },

];

export default function CardLayouts() {
  const [active, setActive] = useState("natural");
  const [loaded, setLoaded] = useState({});
  const current = tabs.find((t) => t.id === active);

  useEffect(() => {
    tabs.forEach((t) => {
      const img = new Image();
      img.src = t.img;
      img.onload = () => setLoaded((prev) => ({ ...prev, [t.id]: true }));
    });
  }, []);

  return (
    <>
      <style>{`
        .cl { padding: 100px 0; background: linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%); text-align: center; }
        .cl-eyebrow { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #2563EB; margin-bottom: 12px; }
        .cl-h2 { font-family: 'Fraunces', serif; font-size: clamp(22px,3.5vw,34px); font-weight: 900; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 16px; color: #0F172A; max-width: 600px; margin-left: auto; margin-right: auto; }
        .cl-p { font-size: 16px; line-height: 1.7; margin-bottom: 48px; color: #64748B; max-width: 540px; margin-left: auto; margin-right: auto; }
        .cl-tab-wrap { background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(37,99,235,0.1); border: 1px solid #BFDBFE; max-width: 960px; margin: 0 auto; }
        .cl-tab-bar { display: flex; justify-content: center; padding: 16px 16px 0; gap: 6px; background: #EFF6FF; }
        .cl-tab-btn { padding: 10px 28px; border-radius: 10px 10px 0 0; font-size: 13px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; background: rgba(37,99,235,0.06); color: #64748B; }
        .cl-tab-btn.active { background: #fff; color: #2563EB; }
        .cl-tab-content { background: #fff; padding: 24px; position: relative; min-height: 200px; }
        .cl-img-wrap { position: relative; width: 100%; }
        .cl-tab-img { width: 100%; border-radius: 12px; display: block; object-fit: contain; transition: opacity 0.2s; }
        .cl-tab-img.hidden { opacity: 0; }
        .cl-skeleton { position: absolute; inset: 0; border-radius: 12px; background: linear-gradient(90deg, #f0f7ff 25%, #dbeafe 50%, #f0f7ff 75%); background-size: 200% 100%; animation: cl-shimmer 1.2s infinite; }
        @keyframes cl-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .cl-tab-desc { text-align: center; margin-top: 16px; font-size: 14px; color: #64748B; }
       @media (max-width: 900px) { .cl { padding: 70px 0; } .cl-tab-btn { padding: 8px 16px; font-size: 12px; } }
@media (max-width: 640px) {
  .cl { padding: 60px 0; }
  .cl-tab-wrap { border-radius: 16px; }
  .cl-tab-bar { padding: 12px 12px 0; gap: 6px; overflow-x: auto; justify-content: flex-start; scrollbar-width: none; }
  .cl-tab-bar::-webkit-scrollbar { display: none; }
  .cl-tab-btn { padding: 10px 20px; font-size: 13px; font-weight: 700; white-space: nowrap; flex-shrink: 0; }
  .cl-tab-btn.active { background: #fff; color: #2563EB; box-shadow: 0 -2px 0 #2563EB inset; }
  .cl-tab-content { padding: 16px; }
  .cl-tab-img { border-radius: 8px; }
  .cl-tab-desc { font-size: 13px; margin-top: 12px; padding: 0 8px; }
  .cl-h2 { font-size: 22px; margin-bottom: 28px; }
}
      `}</style>
      <section className="cl" id="feat-layouts">
        <div className="rgl-container">
          <div className="cl-eyebrow">Three Card Layouts</div>
          <h2 className="cl-h2">Pick the layout that fits your store</h2>
       
          <div className="cl-tab-wrap">
            <div className="cl-tab-bar">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  className={"cl-tab-btn" + (active === t.id ? " active" : "")}
                  onClick={() => setActive(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="cl-tab-content">
              <div className="cl-img-wrap">
                {!loaded[current.id] && (
                  <div
                    className="cl-skeleton"
                    style={{ aspectRatio: "16/9" }}
                  />
                )}
                <img
                  key={current.id}
                  src={current.img}
                  alt={current.label}
                  className={`cl-tab-img${loaded[current.id] ? "" : " hidden"}`}
                  onLoad={() =>
                    setLoaded((prev) => ({ ...prev, [current.id]: true }))
                  }
                />
              </div>
              <div className="cl-tab-desc">{current.desc}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
