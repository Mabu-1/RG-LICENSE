"use client";
import { useState } from "react";

const tabs = [
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
  {
    id: "masonry",
    label: "Masonry",
    img: "https://vdeubftebrtbkyjchjqh.supabase.co/storage/v1/object/public/review-images/1786296628914_8t8v46l8yct.png",
    desc: "Cards stack into columns filling gaps. Pinterest-style layout.",
  },
];

export default function CardLayouts() {
  const [active, setActive] = useState("natural");
  const current = tabs.find((t) => t.id === active);
  return (
    <>
      <style>{`
        .cl { padding: 100px 0; background: #0F172A; text-align: center; }
        .cl-eyebrow { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #F59E0B; margin-bottom: 12px; }
        .cl-h2 { font-family: 'Fraunces', serif; font-size: clamp(22px,3.5vw,34px); font-weight: 900; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 16px; color: #fff; max-width: 600px; margin-left: auto; margin-right: auto; }
        .cl-p { font-size: 16px; line-height: 1.7; margin-bottom: 16px; color: rgba(255,255,255,0.55); max-width: 540px; margin-left: auto; margin-right: auto; }
        .cl-list { list-style: none; display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 24px; margin-bottom: 48px; }
        .cl-list li { font-size: 14px; display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.7); }
        .cl-list li::before { content: '★'; color: #F59E0B; font-size: 10px; flex-shrink: 0; }
        .cl-tab-wrap { background: #1e293b; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3); max-width: 960px; margin: 0 auto; }
        .cl-tab-bar { display: flex; justify-content: center; padding: 16px 16px 0; gap: 6px; }
        .cl-tab-btn { padding: 10px 28px; border-radius: 10px 10px 0 0; font-size: 13px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5); }
        .cl-tab-btn.active { background: #0F172A; color: #F59E0B; }
        .cl-tab-content { background: #0F172A; padding: 24px; }
        .cl-tab-img { width: 100%; border-radius: 12px; display: block; object-fit: contain; }
        .cl-tab-desc { text-align: center; margin-top: 16px; font-size: 14px; color: rgba(255,255,255,0.45); }
        @media (max-width: 900px) { .cl { padding: 70px 0; } .cl-tab-btn { padding: 8px 16px; font-size: 12px; } }
        @media (max-width: 480px) { .cl-tab-bar { gap: 4px; } .cl-tab-btn { padding: 7px 12px; font-size: 11px; } }
      `}</style>
      <section className="cl" id="feat-layouts">
        <div className="rgl-container">
          <div className="cl-eyebrow">Three Card Layouts</div>
          <h2 className="cl-h2">Pick the layout that fits your store</h2>
          <p className="cl-p">
            Every store has a different aesthetic. Switch between three distinct layout modes from the Shopify theme editor — no code, no rebuilds, instant preview.
          </p>
          <ul className="cl-list">
            <li>Natural, Equal Height, and Masonry modes</li>
            <li>2 to 6 columns on desktop, 1 to 2 on mobile</li>
            <li>Fully responsive breakpoints built in</li>
            <li>Switch layouts any time without losing settings</li>
          </ul>
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
              <img
                key={current.id}
                src={current.img}
                alt={current.label}
                className="cl-tab-img"
              />
              <div className="cl-tab-desc">{current.desc}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
