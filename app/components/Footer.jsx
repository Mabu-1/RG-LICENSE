'use client'
import { useState, useEffect } from 'react'
import { supabaseBrowser } from '@/lib/supabase'

export default function Footer() {
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
        .rgl-footer { background: #0f172a; padding: 40px 0; }
        .rgl-footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
        .rgl-footer-logo { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 5px; }
        .rgl-footer-copy { font-size: 13px; color: rgba(255,255,255,0.3); }
        .rgl-footer-links { display: flex; gap: 24px; }
        .rgl-footer-link { font-size: 13px; color: rgba(255,255,255,0.38); transition: color 0.2s; }
        .rgl-footer-link:hover { color: rgba(255,255,255,0.85); }
      `}</style>
      <footer className="rgl-footer">
        <div className="rgl-container">
          <div className="rgl-footer-inner">
            <div className="rgl-footer-logo">
              {logo
                ? <img src={logo} alt="Logo" style={{ height: logoHeight, display: 'block' }} />
                : <><span style={{ color: '#F59E0B' }}>★</span> Shop Review</>
              }
            </div>
            <div className="rgl-footer-copy">© 2026 Shop Review. All rights reserved.</div>
            <div className="rgl-footer-links">
              <a href="#" className="rgl-footer-link">Contact</a>
              <a href="#" className="rgl-footer-link">Terms</a>
              <a href="#" className="rgl-footer-link">License</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
