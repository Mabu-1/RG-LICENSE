'use client'
import { useState, useEffect } from 'react'
import { supabaseBrowser } from '@/lib/supabase'
import Link from 'next/link'

const TOKEN_KEY = 'rg_admin_token'

async function fetchLogo() {
  const { data } = await supabaseBrowser.from('settings').select('value').eq('key', 'branding_logo').single()
  return data?.value || ''
}

export default function AdminPage() {
  const [authed, setAuthed]       = useState(false)
  const [checking, setChecking]   = useState(true)
  const [username, setUsername]   = useState('')
  const [password, setPassword]   = useState('')
  const [sites, setSites]         = useState([])
  const [loading, setLoading]     = useState(false)
  const [form, setForm]           = useState({ domain: '', label: '', notes: '' })
  const [editId, setEditId]       = useState(null)
  const [msg, setMsg]             = useState('')
  const [logo, setLogo]           = useState('')
  const [logoUploading, setLogoUploading] = useState(false)
  const [brandMsg, setBrandMsg]   = useState('')

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) { validateToken(token) } else { setChecking(false) }
    fetchLogo().then(setLogo)
  }, [])

  async function validateToken(token) {
    try {
      const res = await fetch('/api/admin/login', { headers: { 'x-admin-token': token } })
      if (res.ok) { setAuthed(true); loadSites(token) }
      else localStorage.removeItem(TOKEN_KEY)
    } catch(e) { localStorage.removeItem(TOKEN_KEY) }
    setChecking(false)
  }

  async function login() {
    setMsg('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json()
    if (!res.ok) { setMsg(data.error || 'Invalid credentials'); return }
    localStorage.setItem(TOKEN_KEY, data.token)
    setAuthed(true)
    loadSites(data.token)
  }

  function logout() { localStorage.removeItem(TOKEN_KEY); setAuthed(false); setSites([]) }
  function getToken() { return localStorage.getItem(TOKEN_KEY) }

  async function loadSites(token) {
    setLoading(true)
    const res = await fetch('/api/sites', { headers: { 'x-admin-token': token || getToken() } })
    const data = await res.json()
    setSites(data || [])
    setLoading(false)
  }

  async function saveSite() {
    const method = editId ? 'PATCH' : 'POST'
    const body = editId ? { ...form, id: editId } : form
    const res = await fetch('/api/sites', {
      method,
      headers: { 'x-admin-token': getToken(), 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (res.ok) { setMsg('Saved!'); setForm({ domain: '', label: '', notes: '' }); setEditId(null); loadSites() }
    else setMsg('Error saving')
  }

  async function toggleActive(site) {
    await fetch('/api/sites', {
      method: 'PATCH',
      headers: { 'x-admin-token': getToken(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: site.id, active: !site.active })
    })
    loadSites()
  }

  async function deleteSite(id) {
    if (!confirm('Delete this site?')) return
    await fetch('/api/sites?id=' + id, { method: 'DELETE', headers: { 'x-admin-token': getToken() } })
    loadSites()
  }

  async function uploadLogo(e) {
    const file = e.target.files[0]
    if (!file) return
    setLogoUploading(true)
    setBrandMsg('')
    const ext = file.name.split('.').pop()
    const fileName = 'branding_logo_' + Date.now() + '.' + ext
    const { error: storageError } = await supabaseBrowser.storage
      .from('review-images')
      .upload(fileName, file, { contentType: file.type, upsert: true })
    if (storageError) { setBrandMsg('Upload failed: ' + storageError.message); setLogoUploading(false); return }
    const { data: urlData } = supabaseBrowser.storage.from('review-images').getPublicUrl(fileName)
    const newUrl = urlData.publicUrl
    await supabaseBrowser.from('settings').upsert({ key: 'branding_logo', value: newUrl })
    setLogo(newUrl)
    setLogoUploading(false)
    setBrandMsg('Logo updated!')
    setTimeout(() => setBrandMsg(''), 3000)
    e.target.value = ''
  }

  async function removeLogo() {
    await supabaseBrowser.from('settings').upsert({ key: 'branding_logo', value: '' })
    setLogo('')
    setBrandMsg('Logo removed!')
    setTimeout(() => setBrandMsg(''), 3000)
  }

  const inputStyle = { padding:'10px 14px', border:'1px solid #e2e8f0', borderRadius:8, fontSize:13, boxSizing:'border-box', width:'100%' }
  const btnStyle   = { padding:'10px 24px', background:'#0F172A', color:'white', border:'none', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer' }

  if (checking) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#f8f7f4' }}>
      <div style={{ color:'#64748b', fontSize:14 }}>Checking session...</div>
    </div>
  )

  if (!authed) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#f8f7f4' }}>
      <div style={{ background:'white', padding:40, borderRadius:16, boxShadow:'0 4px 24px rgba(0,0,0,0.08)', width:360 }}>
        {logo ? <img src={logo} alt="Logo" style={{ height:48, marginBottom:24, display:'block' }} /> : <h2 style={{ fontFamily:'serif', fontSize:24, fontWeight:700, marginBottom:24, color:'#0F172A' }}>★ RG Admin</h2>}
        <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} style={{ ...inputStyle, marginBottom:12 }} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} style={{ ...inputStyle, marginBottom:12 }} />
        <button onClick={login} style={{ ...btnStyle, width:'100%', padding:11 }}>Login</button>
        {msg && <div style={{ marginTop:12, color:'red', fontSize:13 }}>{msg}</div>}
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#f8f7f4', padding:'40px 24px' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
          <div>
            {logo
              ? <img src={logo} alt="Logo" style={{ height:44, display:'block' }} />
              : <h1 style={{ fontFamily:'serif', fontSize:28, fontWeight:900, color:'#0F172A', letterSpacing:-1 }}>★ ReviewGallery Admin</h1>
            }
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <Link href="/admin/orders" style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'10px 20px', background:'#6366F1', color:'white', borderRadius:8, fontSize:13, fontWeight:600, textDecoration:'none' }}>📋 Orders</Link>
            <Link href="/admin/media" style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'10px 20px', background:'#F59E0B', color:'white', borderRadius:8, fontSize:13, fontWeight:600, textDecoration:'none' }}>📸 Media</Link>
            <Link href="/admin/pricing" style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'10px 20px', background:'#10B981', color:'white', borderRadius:8, fontSize:13, fontWeight:600, textDecoration:'none' }}>💰 Pricing</Link>
            <button onClick={logout} style={{ padding:'10px 20px', background:'#fee2e2', color:'#dc2626', border:'none', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer' }}>Logout</button>
          </div>
        </div>

        {/* BRANDING */}
        <div style={{ background:'white', borderRadius:16, padding:28, marginBottom:24, border:'1px solid #e2e8f0' }}>
          <h2 style={{ fontSize:16, fontWeight:700, color:'#0F172A', marginBottom:20 }}>🎨 Branding</h2>
          <div style={{ display:'flex', alignItems:'center', gap:24 }}>
            <div style={{ width:120, height:60, background:'#f1f5f9', borderRadius:10, border:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
              {logo ? <img src={logo} alt="Logo" style={{ maxWidth:'100%', maxHeight:'100%', objectFit:'contain' }} /> : <span style={{ fontSize:12, color:'#94a3b8' }}>No logo</span>}
            </div>
            <div>
              <label style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'9px 20px', background:'#0F172A', color:'white', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer' }}>
                {logoUploading ? '⏳ Uploading...' : '📁 Upload Logo'}
                <input type="file" accept="image/*" onChange={uploadLogo} style={{ display:'none' }} disabled={logoUploading} />
              </label>
              {logo && <button onClick={removeLogo} style={{ marginLeft:10, padding:'9px 16px', background:'#fff5f5', color:'#dc2626', border:'1px solid #fee2e2', borderRadius:8, fontSize:13, cursor:'pointer' }}>Remove</button>}
              {brandMsg && <div style={{ marginTop:8, fontSize:13, color: brandMsg.includes('fail') ? '#dc2626' : '#10B981', fontWeight:600 }}>{brandMsg}</div>}
              <div style={{ fontSize:12, color:'#94a3b8', marginTop:6 }}>PNG, SVG or JPG. Shows on all admin pages and login screen.</div>
            </div>
          </div>
        </div>

        {/* ADD / EDIT FORM */}
        <div style={{ background:'white', borderRadius:16, padding:28, marginBottom:24, border:'1px solid #e2e8f0' }}>
          <h2 style={{ fontSize:16, fontWeight:700, color:'#0F172A', marginBottom:20 }}>{editId ? 'Edit Site' : 'Add New Site'}</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
            <input placeholder="Domain (e.g. store.myshopify.com)" value={form.domain} onChange={e=>setForm({...form,domain:e.target.value})} style={inputStyle} />
            <input placeholder="Label (e.g. Client Store Name)" value={form.label} onChange={e=>setForm({...form,label:e.target.value})} style={inputStyle} />
          </div>
          <textarea placeholder="Notes..." value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} style={{ ...inputStyle, marginBottom:12, height:70, resize:'vertical' }} />
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={saveSite} style={btnStyle}>{editId ? 'Update Site' : 'Add Site'}</button>
            {editId && <button onClick={()=>{setEditId(null);setForm({domain:'',label:'',notes:''})}} style={{ padding:'10px 24px', background:'#f1f5f9', color:'#64748b', border:'none', borderRadius:8, fontSize:13, cursor:'pointer' }}>Cancel</button>}
          </div>
          {msg && <div style={{ marginTop:12, color:'#10B981', fontSize:13, fontWeight:500 }}>{msg}</div>}
        </div>

        {/* SITES LIST */}
        <div style={{ background:'white', borderRadius:16, padding:28, border:'1px solid #e2e8f0' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ fontSize:16, fontWeight:700, color:'#0F172A' }}>Licensed Sites ({sites.length})</h2>
            <button onClick={()=>loadSites()} style={{ padding:'6px 14px', background:'#f1f5f9', color:'#64748b', border:'none', borderRadius:6, fontSize:12, cursor:'pointer' }}>Refresh</button>
          </div>
          {loading ? <div style={{ color:'#64748b', fontSize:14 }}>Loading...</div> : (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {sites.map(site => (
                <div key={site.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 16px', background:'#f8f7f4', borderRadius:10, border:'1px solid #e2e8f0', flexWrap:'wrap' }}>
                  <div style={{ flex:1, minWidth:200 }}>
                    <div style={{ fontWeight:600, fontSize:14, color:'#0F172A' }}>{site.label || site.domain}</div>
                    <div style={{ fontSize:12, color:'#64748b', fontFamily:'monospace' }}>{site.domain}</div>
                    {site.notes && <div style={{ fontSize:12, color:'#94a3b8', marginTop:2 }}>{site.notes}</div>}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20, background: site.active ? '#d1fae5' : '#fee2e2', color: site.active ? '#065f46' : '#991b1b' }}>{site.active ? 'Active' : 'Inactive'}</span>
                    <button onClick={()=>toggleActive(site)} style={{ padding:'6px 12px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, cursor:'pointer', background:'white' }}>{site.active ? 'Deactivate' : 'Activate'}</button>
                    <button onClick={()=>{ setEditId(site.id); setForm({ domain:site.domain, label:site.label||'', notes:site.notes||'' }) }} style={{ padding:'6px 12px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, cursor:'pointer', background:'white' }}>Edit</button>
                    <button onClick={()=>deleteSite(site.id)} style={{ padding:'6px 12px', fontSize:12, border:'1px solid #fee2e2', borderRadius:6, cursor:'pointer', background:'#fff5f5', color:'#dc2626' }}>Delete</button>
                  </div>
                </div>
              ))}
              {sites.length === 0 && <div style={{ color:'#94a3b8', fontSize:14 }}>No sites added yet.</div>}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
