'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabaseBrowser } from '@/lib/supabase'

export default function AdminHeader({ title, backHref = '/admin' }) {
  const [logo, setLogo] = useState('')

  useEffect(() => {
    supabaseBrowser.from('settings').select('value').eq('key', 'branding_logo').single()
      .then(({ data }) => { if (data?.value) setLogo(data.value) })
  }, [])

  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
      <div>
        {logo
          ? <img src={logo} alt="Logo" style={{ height:44, display:'block' }} />
          : <h1 style={{ fontFamily:'serif', fontSize:28, fontWeight:900, color:'#0F172A', letterSpacing:-1 }}>{title}</h1>
        }
      </div>
      <Link href={backHref} style={{ padding:'8px 18px', background:'#0F172A', color:'white', borderRadius:8, fontSize:13, fontWeight:600, textDecoration:'none' }}>← Back to Admin</Link>
    </div>
  )
}
