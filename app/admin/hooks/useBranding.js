'use client'
import { useState, useEffect } from 'react'
import { supabaseBrowser } from '@/lib/supabase'

export function useBranding() {
  const [logo, setLogo]             = useState('')
  const [logoHeight, setLogoHeight] = useState(44)

  useEffect(() => {
    if (!supabaseBrowser) return
    supabaseBrowser.from('settings').select('value').eq('key','branding_logo').single()
      .then(({ data }) => { if (data?.value) setLogo(data.value) })
    supabaseBrowser.from('settings').select('value').eq('key','branding_logo_height').single()
      .then(({ data }) => { if (data?.value) setLogoHeight(parseInt(data.value)) })
  }, [])

  return { logo, logoHeight }
}
