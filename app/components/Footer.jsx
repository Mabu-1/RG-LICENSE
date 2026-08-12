'use client'
import { useState, useEffect } from 'react'
import { supabaseBrowser } from '@/lib/supabase'

export default function Footer() {
  const [logo, setLogo]             = useState('')
  const [logoHeight, setLogoHeight] = useState(44)

  useEffect(() => {
    supabaseBrowser.from('settings').select('value').eq('key','branding_logo').single()
      .then(({ data }) => { if (data?.value) setLogo(data.value) })
    supabaseBrowser.from('settings').select('value').eq('key','branding_logo_height').single()
      .then(({ data }) => { if (data?.value) setLogoHeight(parseInt(data.value)) })
  }, [])

  return (
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
  )
}
