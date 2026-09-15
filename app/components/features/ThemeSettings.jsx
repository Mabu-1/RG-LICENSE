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
  return (
    <>
      <style>{`
        .ts { padding: 100px 0; background: linear-gradient(135deg, #ffffff 0%, #EFF6FF 60%, #DBEAFE 100%); }
        .ts-center { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .ts-eyebrow { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #2563EB; margin-bottom: 14px; }
        .ts-h2 { font-family: 'Fraunces', serif; font-size: clamp(30px,4vw,52px); font-weight: 900; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 48px; color: #0F172A; }
        .ts-grid { width: 100%; max-width: 920px; display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
        .ts-item { background: #fff; border: 1px solid #E2E8F0; border-radius: 16px; padding: 20px 16px 16px; display: flex; flex-direction: column; align-items: flex-start; gap: 10px; transition: all 0.2s; cursor: default; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
        .ts-item:hover { border-color: #BFDBFE; box-shadow: 0 8px 24px rgba(37,99,235,0.1); transform: translateY(-2px); }
        .ts-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .ts-label { font-size: 12px; font-weight: 600; color: #0F172A; line-height: 1.4; text-align: left; }
        .ts-val { font-size: 10px; font-weight: 700; padding: 3px 10px; border-radius: 20px; margin-top: auto; letter-spacing: 0.3px; }
        @media (max-width: 900px) { .ts-grid { grid-template-columns: repeat(3,1fr); } }
        @media (max-width: 640px) { .ts { padding: 70px 0; } .ts-grid { grid-template-columns: repeat(2,1fr); gap: 10px; } .ts-item { padding: 16px 12px; } }
        @media (max-width: 380px) { .ts-grid { grid-template-columns: 1fr; } }
      `}</style>
      <section className="ts" id="feat-settings">
        <div className="rgl-container">
          <div className="ts-center">
            <div className="ts-eyebrow">20+ Theme Editor Settings</div>
            <h2 className="ts-h2">What You Can Change</h2>
            <div className="ts-grid">
              {settings.map((s, i) => (
                <div key={i} className="ts-item">
                  <div className="ts-icon" style={{ background: s.color + '18' }}>
                    <span>{s.icon}</span>
                  </div>
                  <div className="ts-label">{s.label}</div>
                  <div className="ts-val" style={{ background: s.color + '15', color: s.color }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}