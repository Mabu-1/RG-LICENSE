const settings = [
  { icon: "🎨", label: "Section Background", val: "Color" },
  { icon: "🃏", label: "Card Background", val: "Color" },
  { icon: "✏️", label: "Text Color", val: "Color" },
  { icon: "⭐", label: "Star Color", val: "Color" },
  { icon: "✅", label: "Verified Badge Color", val: "Color" },
  { icon: "🖱️", label: "Button Background", val: "Color" },
  { icon: "📐", label: "Card Layout Style", val: "Select" },
  { icon: "🖥️", label: "Desktop Columns", val: "2 – 6" },
  { icon: "📱", label: "Mobile Columns", val: "1 – 2" },
  { icon: "📏", label: "Section Max Width", val: "px range" },
  { icon: "↕️", label: "Padding Top / Bottom", val: "px range" },
  { icon: "🔢", label: "Initial Load Count", val: "4 – 60" },
  { icon: "➕", label: "Load More Count", val: "4 – 60" },
  { icon: "🔍", label: "Show Search Bar", val: "Toggle" },
  { icon: "⭐", label: "Show Star Filters", val: "Toggle" },
  { icon: "🔀", label: "Show Sort Dropdown", val: "Toggle" },
  { icon: "✅", label: "Show Verified Badge", val: "Toggle" },
  { icon: "🖼️", label: "Enable Lightbox", val: "Toggle" },
  { icon: "📋", label: "Show Load More", val: "Toggle" },
  { icon: "🔗", label: "CSV / Sheet URL", val: "Text" },
];

export default function ThemeSettings() {
  return (
    <>
      <style>{`
        .ts { padding: 100px 0; background: #F8F7F4; }
        .ts-center { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .ts-eyebrow { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #F59E0B; margin-bottom: 14px; }
        .ts-h2 { font-family: 'Fraunces', serif; font-size: clamp(30px, 4vw, 52px); font-weight: 900; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 40px; color: #0F172A; }
        .ts-wrap { width: 100%; max-width: 820px; background: #fff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #e2e8f0; }
        .ts-header { background: #0F172A; padding: 14px 20px; display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.7); }
        .ts-dot { width: 8px; height: 8px; border-radius: 50%; background: #F59E0B; flex-shrink: 0; }
        .ts-body { padding: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .ts-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 8px; transition: background 0.2s; gap: 8px; }
        .ts-item:hover { background: #f8f7f4; }
        .ts-item-label { font-size: 11px; color: #334155; font-weight: 500; display: flex; align-items: center; gap: 5px; white-space: nowrap; }
        .ts-item-val { font-size: 10px; color: #F59E0B; font-weight: 700; background: #FFFBEB; padding: 2px 6px; border-radius: 4px; white-space: nowrap; flex-shrink: 0; }
        @media (max-width: 640px) {
          .ts { padding: 70px 0; }
          .ts-body { grid-template-columns: 1fr; }
          .ts-wrap { max-width: 100%; }
        }
      `}</style>
      <section className="ts" id="feat-settings">
        <div className="rgl-container">
          <div className="ts-center">
            <div className="ts-eyebrow">20+ Theme Editor Settings</div>
            <h2 className="ts-h2">What You Can Change</h2>
            <div className="ts-wrap">
              <div className="ts-header">
                <div className="ts-dot" />
                What You Can Change
              </div>
              <div className="ts-body">
                {settings.map((s, i) => (
                  <div key={i} className="ts-item">
                    <div className="ts-item-label">
                      <span>{s.icon}</span>
                      {s.label}
                    </div>
                    <div className="ts-item-val">{s.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
