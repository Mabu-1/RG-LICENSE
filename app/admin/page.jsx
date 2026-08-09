'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [password, setPassword]       = useState('')
  const [authed, setAuthed]           = useState(false)
  const [sites, setSites]             = useState([])
  const [loading, setLoading]         = useState(false)
  const [form, setForm]               = useState({ domain: '', label: '', notes: '' })
  const [editId, setEditId]           = useState(null)
  const [msg, setMsg]                 = useState('')
  const [uploading, setUploading]     = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState('')

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

  async function uploadImage(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    setUploadedUrl('')
    setMsg('')
    const ext = file.name.split('.').pop()
    const fileName = Date.now() + '.' + ext
    const { data, error } = await supabase.storage
      .from('review-images')
      .upload(fileName, file, { contentType: file.type, upsert: false })
    if (error) {
      setMsg('Upload failed: ' + error.message)
      setUploading(false)
      return
    }
    const { data: urlData } = supabase.storage.from('review-images').getPublicUrl(fileName)
    setUploadedUrl(urlData.publicUrl)
    setUploading(false)
    setMsg('Image uploaded!')
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
        <h1 style={{ fontFamily:'serif', fontSize:28, fontWeight:900, color:'#0F172A', marginBottom:32, letterSpacing:-1 }}>★ ReviewGallery Admin</h1>

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

        {/* IMAGE / VIDEO UPLOAD */}
        <div style={{ background:'white', borderRadius:16, padding:28, marginBottom:24, border:'1px solid #e2e8f0' }}>
          <h2 style={{ fontSize:16, fontWeight:700, color:'#0F172A', marginBottom:6 }}>📸 Upload Review Media</h2>
          <p style={{ fontSize:13, color:'#64748b', marginBottom:16 }}>Upload an image or video — copy the URL and paste it into your Google Sheet <strong>photo_url</strong> column.</p>
          <label style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', background:'#F59E0B', color:'white', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer' }}>
            {uploading ? '⏳ Uploading...' : '📁 Choose Image or Video'}
            <input type="file" accept="image/*,video/*" onChange={uploadImage} style={{ display:'none' }} disabled={uploading} />
          </label>

          {uploadedUrl && (
            <div style={{ marginTop:16, background:'#f8f7f4', borderRadius:10, padding:16, border:'1px solid #e2e8f0' }}>
              <div style={{ fontSize:12, color:'#10B981', marginBottom:10, fontWeight:700 }}>✅ Upload successful — copy URL below:</div>
              <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:12 }}>
                <input value={uploadedUrl} readOnly
                  style={{ flex:1, padding:'8px 12px', border:'1px solid #e2e8f0', borderRadius:6, fontSize:12, background:'white', color:'#0F172A' }} />
                <button
                  onClick={()=>{ navigator.clipboard.writeText(uploadedUrl); setMsg('URL copied to clipboard!') }}
                  style={{ padding:'8px 16px', background:'#0F172A', color:'white', border:'none', borderRadius:6, fontSize:12, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' }}>
                  Copy URL
                </button>
              </div>
              {uploadedUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                <img src={uploadedUrl} alt="preview" style={{ maxHeight:140, borderRadius:8, objectFit:'cover', border:'1px solid #e2e8f0' }} />
              )}
              {uploadedUrl.match(/\.(mp4|mov)$/i) && (
                <video src={uploadedUrl} controls style={{ maxHeight:140, borderRadius:8, border:'1px solid #e2e8f0' }} />
              )}
            </div>
          )}
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
