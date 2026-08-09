"use client";
import { supabaseBrowser } from "@/lib/supabase";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function MediaPage() {
  const [uploads, setUploads]     = useState([]);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg]             = useState('');

  useEffect(() => { loadMedia(); }, []);

  async function loadMedia() {
    const { data } = await supabaseBrowser.from('media').select('*').order('created_at', { ascending: false });
    setUploads(data || []);
  }

  async function uploadFile(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    setMsg('');
    for (const file of files) {
      const ext = file.name.split('.').pop();
      const fileName = Date.now() + '_' + Math.random().toString(36).slice(2) + '.' + ext;
      const { error } = await supabaseBrowser.storage
        .from('review-images')
        .upload(fileName, file, { contentType: file.type, upsert: false });
      if (error) { setMsg('Upload failed: ' + error.message); continue; }
      const { data: urlData } = supabaseBrowser.storage.from('review-images').getPublicUrl(fileName);
      await supabaseBrowser.from('media').insert({ name: file.name, url: urlData.publicUrl, type: file.type });
    }
    setUploading(false);
    setMsg('Done!');
    e.target.value = '';
    loadMedia();
  }

  async function deleteMedia(id, url) {
    if (!confirm('Delete this file?')) return;
    const fileName = url.split('/').pop();
    await supabaseBrowser.storage.from('review-images').remove([fileName]);
    await supabaseBrowser.from('media').delete().eq('id', id);
    loadMedia();
  }

  function copyUrl(url) {
    navigator.clipboard.writeText(url);
    setMsg('URL copied!');
    setTimeout(() => setMsg(''), 2000);
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f8f7f4', padding:'40px 24px' }}>
      <div style={{ maxWidth:900, margin:'0 auto' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
          <h1 style={{ fontFamily:'serif', fontSize:28, fontWeight:900, color:'#0F172A', letterSpacing:-1 }}>📸 Media Upload</h1>
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
          {msg && <div style={{ marginTop:16, fontSize:13, color:'#10B981', fontWeight:600 }}>{msg}</div>}
        </div>

        <div style={{ background:'white', borderRadius:16, padding:28, border:'1px solid #e2e8f0' }}>
          <h2 style={{ fontSize:16, fontWeight:700, color:'#0F172A', marginBottom:20 }}>All Media ({uploads.length})</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {uploads.map((u) => (
              <div key={u.id} style={{ display:'flex', alignItems:'center', gap:16, padding:12, background:'#f8f7f4', borderRadius:10, border:'1px solid #e2e8f0' }}>
                <div style={{ width:80, height:80, borderRadius:8, overflow:'hidden', flexShrink:0, background:'#e2e8f0', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {u.type && u.type.startsWith('image') ? (
                    <img src={u.url} alt={u.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  ) : (
                    <span style={{ fontSize:28 }}>🎬</span>
                  )}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:'#0F172A', marginBottom:6, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{u.name}</div>
                  <input value={u.url} readOnly
                    style={{ width:'100%', padding:'6px 10px', border:'1px solid #e2e8f0', borderRadius:6, fontSize:11, background:'white', color:'#64748b', boxSizing:'border-box' }} />
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:6, flexShrink:0 }}>
                  <button onClick={() => copyUrl(u.url)}
                    style={{ padding:'7px 14px', background:'#0F172A', color:'white', border:'none', borderRadius:6, fontSize:12, fontWeight:600, cursor:'pointer' }}>
                    Copy URL
                  </button>
                  <button onClick={() => deleteMedia(u.id, u.url)}
                    style={{ padding:'7px 14px', background:'#fff5f5', color:'#dc2626', border:'1px solid #fee2e2', borderRadius:6, fontSize:12, cursor:'pointer' }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {uploads.length === 0 && <div style={{ color:'#94a3b8', fontSize:14, textAlign:'center', padding:20 }}>No media uploaded yet.</div>}
          </div>
        </div>

      </div>
    </div>
  )
}
