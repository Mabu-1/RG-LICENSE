'use client'
import { useState } from 'react'

const settings = [
  { icon: "🎨", label: "Section Background",  val: "Color",    color: "#F59E0B" },
  { icon: "🃏", label: "Card Background",      val: "Color",    color: "#F59E0B" },
  { icon: "✏️", label: "Text Color",           val: "Color",    color: "#F59E0B" },
  { icon: "⭐", label: "Star Color",           val: "Color",    color: "#F59E0B" },
  { icon: "✅", label: "Verified Badge Color", val: "Color",    color: "#F59E0B" },
  { icon: "🖱️", label: "Button Background",   val: "Color",    color: "#F59E0B" },
  { icon: "📐", label: "Card Layout Style",    val: "Select",   color: "#6366F1" },
  { icon: "🖥️", label: "Desktop Columns",     val: "2 – 6",    color: "#6366F1" },
  { icon: "📱", label: "Mobile Columns",       val: "1 – 2",    color: "#6366F1" },
  { icon: "📏", label: "Section Max Width",    val: "px range", color: "#6366F1" },
  { icon: "↕️", label: "Padding Top / Bottom",val: "px range", color: "#6366F1" },
  { icon: "🔢", label: "Initial Load Count",  val: "4 – 60",   color: "#6366F1" },
  { icon: "➕", label: "Load More Count",      val: "4 – 60",   color: "#6366F1" },
  { icon: "🔍", label: "Show Search Bar",      val: "Toggle",   color: "#10B981" },
  { icon: "⭐", label: "Show Star Filters",    val: "Toggle",   color: "#10B981" },
  { icon: "🔀", label: "Show Sort Dropdown",   val: "Toggle",   color: "#10B981" },
  { icon: "✅", label: "Show Verified Badge",  val: "Toggle",   color: "#10B981" },
  { icon: "🖼️", label: "Enable Lightbox",     val: "Toggle",   color: "#10B981" },
  { icon: "📋", label: "Show Load More",       val: "Toggle",   color: "#10B981" },
  { icon: "🔗", label: "CSV / Sheet URL",      val: "Text",     color: "#2563EB" },
]

export default function ThemeSettings() {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <style>{`
        .ts { padding: 100px 0; background: linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%); }
        .ts-center { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .ts-eyebrow { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #2563EB; margin-bottom: 14px; }
        .ts-h2 { font-family: 'Fraunces', serif; font-size: clamp(30px,4vw,52px); font-weight: 900; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 40px; color: #0F172A; }

        .ts-wrap { width: 100%; max-width: 960px; position: relative; }

        /* Desktop: always 4 cols, always all items visible */
        .ts-grid { width: 100%; display: grid; grid-template-columns: repeat(4,1fr); gap: 0; border: 2px solid #BFDBFE; border-radius: 18px; overflow: hidden; box-shadow: 0 4px 32px rgba(37,99,235,0.08); outline: 5px solid #EFF6FF; outline-offset: -7px; }
        .ts-item { background: #fff; padding: 16px 18px; display: flex; align-items: center; gap: 12px; border-right: 1px solid #EFF6FF; border-bottom: 1px solid #EFF6FF; transition: background 0.15s; cursor: default; }
        .ts-item:hover { background: #F8FAFF; }
        .ts-item:nth-child(4n) { border-right: none; }
        .ts-item:nth-last-child(-n+4) { border-bottom: none; }
        .ts-icon { font-size: 18px; flex-shrink: 0; width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .ts-label { font-size: 14px; font-weight: 600; color: #0F172A; flex: 1; text-align: left; line-height: 1.3; }
        .ts-val { font-size: 12px; font-weight: 800; padding: 4px 12px; border-radius: 20px; white-space: nowrap; flex-shrink: 0; border: 1.5px solid; }

        /* Fade + toggle — HIDDEN on desktop */
        .ts-fade { display: none; }
        .ts-toggle { display: none; }

        /* MOBILE only — single col, collapse after 8 */
        @media (max-width: 640px) {
          .ts { padding: 60px 0; }
          .ts-grid { grid-template-columns: 1fr; border-radius: 14px; outline: none; }

          /* Reset desktop border rules */
          .ts-item:nth-child(4n) { border-right: 1px solid #EFF6FF; }
          .ts-item:nth-last-child(-n+4) { border-bottom: 1px solid #EFF6FF; }

          /* Mobile rules */
          .ts-item { border-right: none !important; border-bottom: 1px solid #EFF6FF; }
          .ts-item:last-child { border-bottom: none; }
          .ts-label { font-size: 13px; }
          .ts-val { font-size: 11px; padding: 3px 10px; }

          /* Hide items beyond 8 when collapsed */
          .ts-grid.collapsed .ts-item:nth-child(n+9) { display: none; }

          /* Show fade on mobile when collapsed */
          .ts-fade { display: block; position: absolute; bottom: 44px; left: 0; right: 0; height: 70px; background: linear-gradient(to bottom, transparent, rgba(239,246,255,0.97)); border-radius: 0 0 14px 14px; pointer-events: none; }
          .ts-fade.hidden { display: none; }

          /* Show toggle on mobile */
          .ts-toggle { display: inline-flex; margin-top: 14px; align-items: center; gap: 8px; background: #fff; border: 1.5px solid #BFDBFE; border-radius: 100px; padding: 10px 22px; font-size: 13px; font-weight: 700; color: #2563EB; cursor: pointer; transition: all 0.2s; box-shadow: 0 2px 12px rgba(37,99,235,0.08); }
          .ts-toggle:hover { background: #EFF6FF; border-color: #2563EB; }
          .ts-toggle svg { width: 16px; height: 16px; stroke: #2563EB; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.3s; }
          .ts-toggle svg.flipped { transform: rotate(180deg); }
        }
      `}</style>

      <section className="ts" id="feat-settings">
        <div className="rgl-container">
          <div className="ts-center">
            <div className="ts-eyebrow">20+ Theme Editor Settings</div>
            <h2 className="ts-h2">What You Can Change</h2>

            <div className="ts-wrap">
              <div className={`ts-grid${expanded ? '' : ' collapsed'}`}>
                {settings.map((s, i) => (
                  <div key={i} className="ts-item">
                    <div className="ts-icon" style={{ background: s.color + '18' }}>
                      <span>{s.icon}</span>
                    </div>
                    <div className="ts-label">{s.label}</div>
                    <div className="ts-val" style={{ background: s.color + '15', color: s.color, borderColor: s.color + '55' }}>{s.val}</div>
                  </div>
                ))}
              </div>
              <div className={`ts-fade${expanded ? ' hidden' : ''}`} />
            </div>

            <button className="ts-toggle" onClick={() => setExpanded(!expanded)}>
              {expanded ? 'Show less' : `Show all ${settings.length} settings`}
              <svg className={expanded ? 'flipped' : ''} viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

          </div>
        </div>
      </section>
    </>
  )
}