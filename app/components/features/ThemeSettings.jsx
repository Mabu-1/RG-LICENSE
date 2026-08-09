const settings = [
  { icon: '🎨', label: 'Section Background',  val: 'Color'    },
  { icon: '🃏', label: 'Card Background',      val: 'Color'    },
  { icon: '✏️', label: 'Text Color',           val: 'Color'    },
  { icon: '⭐', label: 'Star Color',           val: 'Color'    },
  { icon: '✅', label: 'Verified Badge Color', val: 'Color'    },
  { icon: '🖱️', label: 'Button Background',    val: 'Color'    },
  { icon: '📐', label: 'Card Layout Style',    val: 'Select'   },
  { icon: '🖥️', label: 'Desktop Columns',      val: '2 – 6'    },
  { icon: '📱', label: 'Mobile Columns',       val: '1 – 2'    },
  { icon: '📏', label: 'Section Max Width',    val: 'px range' },
  { icon: '↕️', label: 'Padding Top / Bottom', val: 'px range' },
  { icon: '🔢', label: 'Initial Load Count',   val: '4 – 60'   },
  { icon: '➕', label: 'Load More Count',      val: '4 – 60'   },
  { icon: '🔍', label: 'Show Search Bar',      val: 'Toggle'   },
  { icon: '⭐', label: 'Show Star Filters',    val: 'Toggle'   },
  { icon: '🔀', label: 'Show Sort Dropdown',   val: 'Toggle'   },
  { icon: '✅', label: 'Show Verified Badge',  val: 'Toggle'   },
  { icon: '🖼️', label: 'Enable Lightbox',      val: 'Toggle'   },
  { icon: '📋', label: 'Show Load More',       val: 'Toggle'   },
  { icon: '🔗', label: 'CSV / Sheet URL',      val: 'Text'     },
]

export default function ThemeSettings() {
  return (
    <>
      <style>{`
        .ts { padding: 100px 0; background: #F8F7F4; }
        .ts-split { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
        .ts-eyebrow { display: inline-block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #F59E0B; margin-bottom: 12px; }
        .ts-h2 { font-family: 'Fraunces', serif; font-size: clamp(28px,3.5vw,44px); font-weight: 900; letter-spacing: -1.5px; line-height: 1.05; margin-bottom: 16px; color: #0F172A; }
        .ts-p { font-size: 16px; line-height: 1.7; margin-bottom: 24px; color: #64748B; }
        .ts-list { list-style: none; }
        .ts-list li { font-size: 14px; padding: 9px 0; display: flex; align-items: center; gap: 10px; color: #334155; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .ts-list li::before { content: '★'; color: #F59E0B; font-size: 10px; flex-shrink: 0; }
        .ts-wrap { background: #fff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.08); overflow: hidden; border: 1px solid #e2e8f0; }
        .ts-header { background: #0F172A; padding: 14px 20px; display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.7); }
        .ts-dot { width: 8px; height: 8px; border-radius: 50%; background: #F59E0B; flex-shrink: 0; }
        .ts-body { padding: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .ts-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 8px; transition: background 0.2s; gap: 8px; }
        .ts-item:hover { background: #f8f7f4; }
        .ts-item-label { font-size: 11px; color: #334155; font-weight: 500; display: flex; align-items: center; gap: 5px; white-space: nowrap; }
        .ts-item-val { font-size: 10px; color: #F59E0B; font-weight: 700; background: #FFFBEB; padding: 2px 6px; border-radius: 4px; white-space: nowrap; flex-shrink: 0; }
        @media (max-width: 900px) { .ts { padding: 70px 0; } .ts-split { grid-template-columns: 1fr; gap: 48px; } .ts-body { grid-template-columns: 1fr; } }
      `}</style>
      <section className="ts" id="feat-settings">
        <div className="rgl-container">
          <div className="ts-split">
            <div>
              <div className="ts-eyebrow">20+ Theme Editor Settings</div>
              <h2 className="ts-h2">Configure everything without touching code</h2>
              <p className="ts-p">Every visual and functional aspect of the gallery is exposed in the Shopify theme editor. Your client or your team can make changes without ever opening a file.</p>
              <ul className="ts-list">
                <li>Colors, columns, spacing — all visual controls in one place</li>
                <li>Toggle features on and off per section instance</li>
                <li>Works inside Shopify native theme editor UI</li>
                <li>Changes preview live in the editor instantly</li>
              </ul>
            </div>
            <div>
              <div className="ts-wrap">
                <div className="ts-header">
                  <div className="ts-dot" />
                  CSV Review Gallery Pro — Settings
                </div>
                <div className="ts-body">
                  {settings.map((s,i) => (
                    <div key={i} className="ts-item">
                      <div className="ts-item-label"><span>{s.icon}</span>{s.label}</div>
                      <div className="ts-item-val">{s.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
