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
  )
}
