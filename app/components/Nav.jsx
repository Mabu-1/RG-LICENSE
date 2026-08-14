'use client'
import { useState, useEffect } from 'react'
import { supabaseBrowser } from '@/lib/supabase'

export default function Nav() {
  const [logo, setLogo]             = useState('')
  const [logoHeight, setLogoHeight] = useState(44)

  useEffect(() => {
    if (!supabaseBrowser) return
    supabaseBrowser.from('settings').select('value').eq('key','branding_logo').single()
      .then(({ data }) => { if (data?.value) setLogo(data.value) })
    supabaseBrowser.from('settings').select('value').eq('key','branding_logo_height').single()
      .then(({ data }) => { if (data?.value) setLogoHeight(parseInt(data.value)) })
  }, [])

  return (
    <>
      <style>{`
        .rgl-nav { position: sticky; top: 0; z-index: 100; background: rgba(248,247,244,0.9); backdrop-filter: blur(16px); border-bottom: 1px solid #e2e8f0; }
        .rgl-nav-inner { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; max-width: 1160px; margin: 0 auto; }
        .rgl-logo { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 6px; letter-spacing: -0.5px; }
        .rgl-logo-star { color: #f59e0b; }
        .rgl-nav-links { display: flex; align-items: center; gap: 28px; }
        .rgl-nav-link { font-size: 14px; font-weight: 500; color: #64748b; transition: color 0.2s; }
        .rgl-nav-link:hover { color: #0f172a; }
        .rgl-btn-primary { display: inline-flex; align-items: center; gap: 6px; padding: 10px 22px; background: #0f172a; color: #fff; border-radius: 100px; font-weight: 600; font-size: 14px; transition: all 0.25s; border: 2px solid #0f172a; cursor: pointer; }
        .rgl-btn-primary:hover { background: #1e293b; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(15,23,42,0.2); }
        @media (max-width: 620px) { .rgl-nav-links a:not(.rgl-btn-primary) { display: none; } }
      `}</style>
      <nav className="rgl-nav">
        <div className="rgl-nav-inner">
          <div className="rgl-logo">
            {logo
              ? <img src={logo} alt="Logo" style={{ height: logoHeight, display: 'block' }} />
              : <><span className="rgl-logo-star">★</span> Shop Review</>
            }
          </div>
          <div className="rgl-nav-links">
            <a href="#feat-sheets" className="rgl-nav-link">Features</a>
            <a href="#how" className="rgl-nav-link">How it Works</a>
            <a href="#pricing" className="rgl-nav-link">Pricing</a>
            <a href="#pricing" className="rgl-btn-primary">Get License →</a>
          </div>
        </div>
      </nav>
    </>
  )
}
