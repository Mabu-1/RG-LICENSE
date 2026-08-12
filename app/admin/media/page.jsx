"use client";
import { supabaseBrowser } from "@/lib/supabase";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function MediaPage() {
  const [uploads, setUploads]     = useState([]);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg]             = useState('');
  const [logo, setLogo]           = useState('');

  useEffect(() => {
    loadMedia();
    supabaseBrowser.from('settings').select('value').eq('key','branding_logo').single()
      .then(({ data }) => { if (data?.value) setLogo(data.value) })
  }, []);

  async function loadMedia() {
    const { data, error } = await supabaseBrowser.from('media').select('*').order('created_at', { ascending: false });
    if (error) console.error('Load error:', error);
    setUploads(data || []);
  }

  async function uploadFile(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true); setMsg('');
    for (const file of files) {
      const ext = file.name.split('.').pop();
      const fileName = Date.now() + '_' + Math.random().toString(36).slice(2) + '.' + ext;
      const { error: storageError } = await supabaseBrowser.storage.from('review-images').upload(fileName, file, { contentType: file.type, upsert: false });
      if (storageError) { setMsg('Upload failed: ' + storageError.message); continue; }
      const { data: urlData } = supabaseBrowser.storage.from('review-images').getPublicUrl(fileName);
      const { error: dbError } = await supabaseBrowser.from('media').insert({ name: file.name, url: urlData.publicUrl, type: file.type });
      if (dbError) { setMsg('DB save failed: ' + dbError.message); }
    }
    setUploading(false); setMsg('Upload complete!');
    e.target.value = ''; loadMedia();
  }

  async function deleteMedia(id, url) {
    if (!confirm('Delete this file?')) return;
    const parts = url.split('/'); const fileName = parts[parts.length - 1];
    await supabaseBrowser.storage.from('review-images').remove([fileName]);
    await supabaseBrowser.from('media').delete().eq('id', id);
    loadMedia();
  }

  function copyUrl(url) { navigator.clipboard.writeText(url); setMsg('URL copied!'); setTimeout(() => setMsg(''), 2000); }

  return (
    <div style={{ minHeight:'100vh', background:'#f8f7f4', padding:'40px 24px' }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
          <div>
            {logo ? <img src={logo} alt="Logo" style={{ height:44, display:'block' }} />
              : <h1 style={{ fontFamily:'serif', fontSize:28, fontWeight:900, color:'#0F172A', letterSpacing:-1 }}>📸 Media Upload</h1>}
          </div>
          <Link href="/admin" style={{ padding:'8px 18px', background:'#0F172A', color:'white', borderRadius:8, fontSize:13, fontWeight:600, textDecoration:'none' }}>← Back to Admin</Link>
        </div>

        <div style={{ background:'white', borderRadius:16, padding:32, marginBottom:24, border:'2px dashed #e2e8f0', textAlign:'center' }}>
          <div style={{ fontSize:40, marginBottom:12 }}>☁️</div>
          <div style={{ fontSize:15, fontWeight:600, color:'#0F172A', marginBottom:6 }}>Upload Images or Videos</div>
          <div style={{ fontSize:13, color:'#64748b', marginBottom:20 }}>JPG, PNG, GIF, WEBP, MP4, MOV — multiple files at once</div>
          <label style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'12px 28px', background:'#F59E0B', color:'white', borderRadius:10, fontSize:14, fontWeight:700, cursor:'pointer' }}>
            {uploading ? '⏳ Uploading...' : '📁 Choose Files'}
            <input type="file" accept="image/*,video/*" multiple onChange={uploadFile} style={{ display:'none' }} disabled={uploading} />
          </label>
          {msg && <div style={{ marginTop:16, fontSize:13, color: msg.includes('failed') ? '#dc2626' : '#10B981', fontWeight:600 }}>{msg}</div>}
        </div>

        <div style={{ background:'white', borderRadius:16, padding:28, border:'1px solid #e2e8f0' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
            <h2 style={{ fontSize:16, fontWeight:700, color:'#0F172A' }}>All Media ({uploads.length})</h2>
            <button onClick={loadMedia} style={{ padding:'6px 14px', background:'#f1f5f9', color:'#64748b', border:'none', borderRadius:6, fontSize:12, cursor:'pointer' }}>Refresh</button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:16 }}>
            {uploads.map((u) => (
              <div key={u.id} style={{ background:'#f8f7f4', borderRadius:12, border:'1px solid #e2e8f0', overflow:'hidden' }}>
                <div style={{ width:'100%', aspectRatio:'16/9', background:'#e2e8f0', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {u.type && u.type.startsWith('image') ? (
                    <img src={u.url} alt={u.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} onError={e => { e.target.style.display='none'; }} />
                  ) : (
                    <div style={{ fontSize:36 }}>🎬</div>
                  )}
                </div>
                <div style={{ padding:10 }}>
                  <div style={{ fontSize:11, fontWeight:600, color:'#0F172A', marginBottom:8, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{u.name}</div>
                  <div style={{ display:'flex', gap:6 }}>
                    <button onClick={() => copyUrl(u.url)} style={{ flex:1, padding:'6px 0', background:'#0F172A', color:'white', border:'none', borderRadius:6, fontSize:11, fontWeight:600, cursor:'pointer' }}>Copy URL</button>
                    <button onClick={() => deleteMedia(u.id, u.url)} style={{ padding:'6px 10px', background:'#fff5f5', color:'#dc2626', border:'1px solid #fee2e2', borderRadius:6, fontSize:11, cursor:'pointer' }}>🗑</button>
                  </div>
                </div>
              </div>
            ))}
            {uploads.length === 0 && <div style={{ gridColumn:'1/-1', color:'#94a3b8', fontSize:14, textAlign:'center', padding:40 }}>No media uploaded yet.</div>}
          </div>
        </div>

      </div>
    </div>
  )
}
