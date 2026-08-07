'use client'
import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(false)
  const [newDomain, setNewDomain] = useState('')
  const [newLabel, setNewLabel] = useState('')
  const [newExpiry, setNewExpiry] = useState('')
  const [message, setMessage] = useState('')
  const [adminPass, setAdminPass] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editDomain, setEditDomain] = useState('')
  const [editLabel, setEditLabel] = useState('')
  const [editExpiry, setEditExpiry] = useState('')

  useEffect(() => { if (authed) fetchSites() }, [authed])

  const headers = { 'Content-Type': 'application/json', 'x-admin-password': adminPass }

  async function fetchSites() {
    setLoading(true)
    const res = await fetch('/api/sites', { headers: { 'Content-Type': 'application/json', 'x-admin-password': adminPass } })
    const data = await res.json()
    if (data.error) { setAuthed(false); setMessage('Wrong password'); setLoading(false); return }
    setSites(data || [])
    setLoading(false)
  }

  async function addSite() {
    if (!newDomain) return
    const res = await fetch('/api/sites', { method: 'POST', headers, body: JSON.stringify({ domain: newDomain, label: newLabel, expires_at: newExpiry || null }) })
    const data = await res.json()
    if (data.error) { setMessage('Error: ' + data.error); return }
    setMessage('Site added!')
    setNewDomain(''); setNewLabel(''); setNewExpiry('')
    fetchSites()
  }

  async function toggleSite(id, current) {
    await fetch('/api/sites', { method: 'PATCH', headers, body: JSON.stringify({ id, active: !current }) })
    fetchSites()
  }

  async function deleteSite(id) {
    if (!confirm('Delete this site?')) return
    await fetch(`/api/sites?id=${id}`, { method: 'DELETE', headers })
    fetchSites()
  }

  function startEdit(site) {
    setEditingId(site.id)
    setEditDomain(site.domain)
    setEditLabel(site.label || '')
    setEditExpiry(site.expires_at ? site.expires_at.split('T')[0] : '')
  }

  function cancelEdit() { setEditingId(null); setEditDomain(''); setEditLabel(''); setEditExpiry('') }

  async function saveEdit(id) {
    const res = await fetch('/api/sites', { method: 'PATCH', headers, body: JSON.stringify({ id, domain: editDomain, label: editLabel, expires_at: editExpiry || null }) })
    const data = await res.json()
    if (data.error) { setMessage('Error: ' + data.error); return }
    setEditingId(null)
    fetchSites()
  }

  if (!authed) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#f4f4f5' }}>
      <div style={{ background:'white', padding:'40px', borderRadius:'12px', boxShadow:'0 4px 20px rgba(0,0,0,0.1)', minWidth:'320px' }}>
        <h2 style={{ marginBottom:'20px', fontSize:'20px', fontWeight:'700' }}>Admin Login</h2>
        <input type="password" placeholder="Password" value={passwordInput}
          onChange={e => setPasswordInput(e.target.value)}
          onKeyDown={e => { if(e.key === 'Enter') { setAdminPass(passwordInput); setAuthed(true); setMessage('') }}}
          style={{ width:'100%', padding:'10px', border:'1px solid #ddd', borderRadius:'8px', marginBottom:'12px', boxSizing:'border-box' }} />
        <button onClick={() => { setAdminPass(passwordInput); setAuthed(true); setMessage('') }}
          style={{ width:'100%', padding:'10px', background:'#111', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'600' }}>Login</button>
        {message && <p style={{ color:'red', marginTop:'10px', fontSize:'13px' }}>{message}</p>}
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth:'960px', margin:'0 auto', padding:'40px 20px', fontFamily:'system-ui, sans-serif' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px' }}>
        <h1 style={{ fontSize:'24px', fontWeight:'700' }}>RG License Manager</h1>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <span style={{ fontSize:'13px', color:'#888' }}>{sites.length} sites</span>
          <button onClick={() => setAuthed(false)} style={{ padding:'6px 14px', border:'1px solid #ddd', borderRadius:'8px', cursor:'pointer', fontSize:'13px' }}>Logout</button>
        </div>
      </div>

      <div style={{ background:'white', padding:'24px', borderRadius:'12px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', marginBottom:'30px' }}>
        <h2 style={{ fontSize:'16px', fontWeight:'600', marginBottom:'16px' }}>Add New Site</h2>
        <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
          <input placeholder="Domain (e.g. client.com)" value={newDomain} onChange={e => setNewDomain(e.target.value)}
            style={{ flex:'1', minWidth:'180px', padding:'10px', border:'1px solid #ddd', borderRadius:'8px' }} />
          <input placeholder="Label (e.g. Client Name)" value={newLabel} onChange={e => setNewLabel(e.target.value)}
            style={{ flex:'1', minWidth:'150px', padding:'10px', border:'1px solid #ddd', borderRadius:'8px' }} />
          <input type="date" value={newExpiry} onChange={e => setNewExpiry(e.target.value)}
            style={{ padding:'10px', border:'1px solid #ddd', borderRadius:'8px' }} />
          <button onClick={addSite} style={{ padding:'10px 24px', background:'#111', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'600' }}>Add</button>
        </div>
        {message && <p style={{ marginTop:'10px', fontSize:'13px', color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
      </div>

      <div style={{ background:'white', borderRadius:'12px', boxShadow:'0 2px 10px rgba(0,0,0,0.06)', overflow:'hidden' }}>
        {loading ? (
          <p style={{ padding:'30px', textAlign:'center', color:'#888' }}>Loading...</p>
        ) : sites.length === 0 ? (
          <p style={{ padding:'30px', textAlign:'center', color:'#888' }}>No sites yet.</p>
        ) : sites.map(site => (
          <div key={site.id} style={{ borderBottom:'1px solid #f0f0f0' }}>
            {editingId === site.id ? (
              <div style={{ padding:'16px 24px', display:'flex', flexDirection:'column', gap:'10px' }}>
                <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                  <input value={editDomain} onChange={e => setEditDomain(e.target.value)} placeholder="Domain"
                    style={{ flex:'1', minWidth:'180px', padding:'8px 10px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'14px' }} />
                  <input value={editLabel} onChange={e => setEditLabel(e.target.value)} placeholder="Label"
                    style={{ flex:'1', minWidth:'140px', padding:'8px 10px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'14px' }} />
                  <input type="date" value={editExpiry} onChange={e => setEditExpiry(e.target.value)}
                    style={{ padding:'8px 10px', border:'1px solid #ddd', borderRadius:'8px', fontSize:'14px' }} />
                </div>
                <div style={{ display:'flex', gap:'8px' }}>
                  <button onClick={() => saveEdit(site.id)}
                    style={{ padding:'7px 18px', background:'#111', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontWeight:'600', fontSize:'13px' }}>Save</button>
                  <button onClick={cancelEdit}
                    style={{ padding:'7px 18px', background:'white', border:'1px solid #ddd', borderRadius:'8px', cursor:'pointer', fontSize:'13px' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{ display:'flex', alignItems:'center', padding:'16px 24px', gap:'12px', flexWrap:'wrap' }}>
                <div style={{ flex:'1', minWidth:'150px' }}>
                  <div style={{ fontWeight:'600', fontSize:'15px' }}>{site.domain}</div>
                  {site.label && <div style={{ fontSize:'12px', color:'#888', marginTop:'2px' }}>{site.label}</div>}
                </div>
                {site.expires_at && <div style={{ fontSize:'12px', color:'#999' }}>Expires: {new Date(site.expires_at).toLocaleDateString()}</div>}
                <div style={{ fontSize:'12px', color:'#999' }}>Added: {new Date(site.created_at).toLocaleDateString()}</div>
                <button onClick={() => toggleSite(site.id, site.active)}
                  style={{ padding:'6px 16px', borderRadius:'20px', border:'none', cursor:'pointer', fontWeight:'600', fontSize:'13px',
                    background: site.active ? '#dcfce7' : '#fee2e2', color: site.active ? '#166534' : '#991b1b' }}>
                  {site.active ? 'Active' : 'Disabled'}
                </button>
                <button onClick={() => startEdit(site)}
                  style={{ padding:'6px 14px', borderRadius:'20px', border:'1px solid #ddd', cursor:'pointer', fontSize:'13px', background:'white', color:'#444' }}>Edit</button>
                <button onClick={() => deleteSite(site.id)}
                  style={{ padding:'6px 14px', borderRadius:'20px', border:'1px solid #ddd', cursor:'pointer', fontSize:'13px', background:'white', color:'#666' }}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
