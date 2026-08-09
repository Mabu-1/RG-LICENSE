'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed]     = useState(false)
  const [sites, setSites]       = useState([])
  const [loading, setLoading]   = useState(false)
  const [form, setForm]         = useState({ domain: '', label: '', notes: '' })
  const [editId, setEditId]     = useState(null)
  const [msg, setMsg]           = useState('')

  const headers = { 'x-admin-password': password }

  async function login() {
    const res = await fetch('/api/sites', { headers: { 'x-admin-password': password } })
    if (res.ok) { setAuthed(true); loadSites() }
    else setMsg('Wrong password')
  }

  async function loadSites() {
    setLoading(true)
    const res = await fetch('/api/sites', { headers })
    const data = await res.json()
    setSites(data || [])
    setLoading(false)
  }

  async function saveSite() {
    const method = editId ? 'PATCH' : 'POST'
    const body = editId ? { ...form, id: editId } : form
    const res = await fetch('/api/sites', {
      method,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (res.ok) {
      setMsg('Saved!')
      setForm({ domain: '', label: '', notes: '' })
      setEditId(null)
      loadSites()
    } else setMsg('Error saving')
  }

  async function toggleActive(site) {
    await fetch('/api/sites', {
      method: 'PATCH',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: site.id, active: !site.active })
    })
    loadSites()
  }

  async function deleteSite(id) {
    if (!confirm('Delete this site?')) return
    await fetch('/api/sites?id=' + id, { method: 'DELETE', headers })
    loadSites()
  }

  const inputStyle = { padding:'10px 14px', border:'1px solid #e2e8f0', borderRadius:8, fontSize:13, boxSizing:'border-box', width:'100%' }
  const btnStyle   = { padding:'10px 24px', background:'#0F172A', color:'white', border:'none', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer' }

  if (!authed) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#f8f7f4' }}>
      <div style={{ background:'white', padding:40, borderRadius:16, boxShadow:'0 4px 24px rgba(0,0,0,0.08)', width:360 }}>
        <h2 style={{ fontFamily:'serif', fontSize:24, fontWeight:700, marginBottom:24, color:'#0F172A' }}>★ RG Admin</h2>
        <input type="password" placeholder="Admin password" value={password}
          onChange={e=>setPassword(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&login()}
          style={{ ...inputStyle, marginBottom:12 }} />
        <button onClick={login} style={{ ...btnStyle, width:'100%', padding:11 }}>Login</button>
        {msg && <div style={{ marginTop:12, color:'red', fontSize:13 }}>{msg}</div>}
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:'100vh', background:'#f8f7f4', padding:'40px 24px' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
          <h1 style={{ fontFamily:'serif', fontSize:28, fontWeight:900, color:'#0F172A', letterSpacing:-1 }}>★ ReviewGallery Admin</h1>
          <Link href="/admin/media" style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'10px 20px', background:'#F59E0B', color:'white', borderRadius:8, fontSize:13, fontWeight:600, textDecoration:'none' }}>
            📸 Media Upload
          </Link>
        </div>

        {/* ADD / EDIT FORM */}
        <div style={{ background:'white', borderRadius:16, padding:28, marginBottom:24, border:'1px solid #e2e8f0' }}>
          <h2 style={{ fontSize:16, fontWeight:700, color:'#0F172A', marginBottom:20 }}>{editId ? 'Edit Site' : 'Add New Site'}</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
            <input placeholder="Domain (e.g. store.myshopify.com)" value={form.domain}
              onChange={e=>setForm({...form,domain:e.target.value})} style={inputStyle} />
            <input placeholder="Label (e.g. Client Store Name)" value={form.label}
              onChange={e=>setForm({...form,label:e.target.value})} style={inputStyle} />
          </div>
          <textarea placeholder="Notes..." value={form.notes}
            onChange={e=>setForm({...form,notes:e.target.value})}
            style={{ ...inputStyle, marginBottom:12, height:70, resize:'vertical' }} />
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={saveSite} style={btnStyle}>{editId ? 'Update Site' : 'Add Site'}</button>
            {editId && (
              <button onClick={()=>{setEditId(null);setForm({domain:'',label:'',notes:''})}}
                style={{ padding:'10px 24px', background:'#f1f5f9', color:'#64748b', border:'none', borderRadius:8, fontSize:13, cursor:'pointer' }}>
                Cancel
              </button>
            )}
          </div>
          {msg && <div style={{ marginTop:12, color:'#10B981', fontSize:13, fontWeight:500 }}>{msg}</div>}
        </div>

        {/* SITES LIST */}
        <div style={{ background:'white', borderRadius:16, padding:28, border:'1px solid #e2e8f0' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ fontSize:16, fontWeight:700, color:'#0F172A' }}>Licensed Sites ({sites.length})</h2>
            <button onClick={loadSites} style={{ padding:'6px 14px', background:'#f1f5f9', color:'#64748b', border:'none', borderRadius:6, fontSize:12, cursor:'pointer' }}>Refresh</button>
          </div>
          {loading ? (
            <div style={{ color:'#64748b', fontSize:14 }}>Loading...</div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {sites.map(site => (
                <div key={site.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 16px', background:'#f8f7f4', borderRadius:10, border:'1px solid #e2e8f0', flexWrap:'wrap' }}>
                  <div style={{ flex:1, minWidth:200 }}>
                    <div style={{ fontWeight:600, fontSize:14, color:'#0F172A' }}>{site.label || site.domain}</div>
                    <div style={{ fontSize:12, color:'#64748b', fontFamily:'monospace' }}>{site.domain}</div>
                    {site.notes && <div style={{ fontSize:12, color:'#94a3b8', marginTop:2 }}>{site.notes}</div>}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20, background: site.active ? '#d1fae5' : '#fee2e2', color: site.active ? '#065f46' : '#991b1b' }}>
                      {site.active ? 'Active' : 'Inactive'}
                    </span>
                    <button onClick={()=>toggleActive(site)}
                      style={{ padding:'6px 12px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, cursor:'pointer', background:'white' }}>
                      {site.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button onClick={()=>{ setEditId(site.id); setForm({ domain:site.domain, label:site.label||'', notes:site.notes||'' }) }}
                      style={{ padding:'6px 12px', fontSize:12, border:'1px solid #e2e8f0', borderRadius:6, cursor:'pointer', background:'white' }}>
                      Edit
                    </button>
                    <button onClick={()=>deleteSite(site.id)}
                      style={{ padding:'6px 12px', fontSize:12, border:'1px solid #fee2e2', borderRadius:6, cursor:'pointer', background:'#fff5f5', color:'#dc2626' }}>
                      Delete
                    </button>
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
