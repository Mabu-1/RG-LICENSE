"use client";
import { useState, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import Link from "next/link";

const STATUS_COLORS = {
  pending:   { bg: '#FEF3C7', color: '#92400E' },
  active:    { bg: '#D1FAE5', color: '#065F46' },
  cancelled: { bg: '#FEE2E2', color: '#991B1B' },
}

const DESIGNS = ['Natural', 'Equal Height', 'Masonry']

export default function OrdersPage() {
  const [orders, setOrders]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [editOrder, setEditOrder] = useState(null);
  const [msg, setMsg]             = useState("");

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data, error } = await supabaseBrowser
      .from("orders").select("*").order("created_at", { ascending: false });
    if (error) console.error(error);
    setOrders(data || []);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    await supabaseBrowser.from("orders").update({ status }).eq("id", id);
    setMsg("Updated!"); setTimeout(() => setMsg(""), 2000); load();
  }

  async function deleteOrder(id) {
    if (!confirm("Delete this order?")) return;
    const { error } = await supabaseBrowser.from("orders").delete().eq("id", id);
    if (error) { console.error(error); setMsg("Delete failed: " + error.message); return; }
    setMsg("Deleted!"); setTimeout(() => setMsg(""), 2000); load();
  }

  async function saveEdit() {
    const { error } = await supabaseBrowser.from("orders").update({
      name: editOrder.name,
      email: editOrder.email,
      domain: editOrder.domain,
      plan: editOrder.plan,
      total: parseFloat(editOrder.total),
      notes: editOrder.notes,
      status: editOrder.status,
      setup_date: editOrder.setup_date || '',
      setup_time: editOrder.setup_time || '',
      addon_domain_list: (editOrder.addon_domain_list || []).filter(Boolean),
      selected_designs: (editOrder.selected_designs || []).filter(Boolean),
    }).eq("id", editOrder.id);
    if (error) { console.error(error); setMsg("Save failed: " + error.message); return; }
    setMsg("Saved!"); setTimeout(() => setMsg(""), 2000);
    setEditOrder(null); load();
  }

  function openEdit(o) {
    setEditOrder({
      ...o,
      addon_domain_list: Array.isArray(o.addon_domain_list) && o.addon_domain_list.length ? o.addon_domain_list : [''],
      selected_designs: Array.isArray(o.selected_designs) && o.selected_designs.length ? o.selected_designs : [''],
    });
  }

  function setDesign(index, value) {
    const u = [...(editOrder.selected_designs || [])]
    u[index] = value
    setEditOrder({...editOrder, selected_designs: u})
  }

  function addDesign() {
    const current = editOrder.selected_designs || []
    if (current.length >= 3) return
    setEditOrder({...editOrder, selected_designs: [...current, '']})
  }

  function removeDesign(index) {
    const u = [...(editOrder.selected_designs || [])]
    u.splice(index, 1)
    setEditOrder({...editOrder, selected_designs: u})
  }

  function setDomain(index, value) {
    const u = [...(editOrder.addon_domain_list || [])]
    u[index] = value
    setEditOrder({...editOrder, addon_domain_list: u})
  }

  function addDomain() {
    setEditOrder({...editOrder, addon_domain_list: [...(editOrder.addon_domain_list || []), '']})
  }

  function removeDomain(index) {
    const u = [...(editOrder.addon_domain_list || [])]
    u.splice(index, 1)
    setEditOrder({...editOrder, addon_domain_list: u})
  }

  function getAvailableDesigns(currentIndex) {
    const chosen = (editOrder.selected_designs || []).filter((d, i) => i !== currentIndex && d)
    return DESIGNS.filter(d => !chosen.includes(d))
  }

  function fmt(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  const inputStyle = { width:'100%', padding:'8px 10px', border:'1px solid #e2e8f0', borderRadius:7, fontSize:13, boxSizing:'border-box', fontFamily:'inherit' }
  const labelStyle = { fontSize:11, fontWeight:600, color:'#64748b', display:'block', marginBottom:3 }
  const selectStyle = { width:'100%', padding:'8px 10px', border:'1px solid #e2e8f0', borderRadius:7, fontSize:13, boxSizing:'border-box', fontFamily:'inherit', background:'white', cursor:'pointer' }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "serif", fontSize: 28, fontWeight: 900, color: "#0F172A", letterSpacing: -1 }}>📋 Orders</h1>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {msg && <span style={{ fontSize: 13, color: msg.includes('fail') ? '#dc2626' : "#10B981", fontWeight: 600 }}>{msg}</span>}
            <button onClick={load} style={{ padding: "8px 16px", background: "#f1f5f9", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>Refresh</button>
            <Link href="/admin" style={{ padding: "8px 18px", background: "#0F172A", color: "white", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>← Back</Link>
          </div>
        </div>

        {editOrder && (
          <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
            <div style={{ background:'white', borderRadius:20, padding:32, width:'100%', maxWidth:620, maxHeight:'90vh', overflowY:'auto' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
                <h2 style={{ fontFamily:'serif', fontSize:20, fontWeight:700, color:'#0F172A' }}>Edit Order</h2>
                <button onClick={()=>setEditOrder(null)} style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'#64748b' }}>✕</button>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                <div>
                  <label style={labelStyle}>Name</label>
                  <input value={editOrder.name || ''} onChange={e=>setEditOrder({...editOrder,name:e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input value={editOrder.email || ''} onChange={e=>setEditOrder({...editOrder,email:e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Primary Domain</label>
                  <input value={editOrder.domain || ''} onChange={e=>setEditOrder({...editOrder,domain:e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Plan</label>
                  <select value={editOrder.plan || ''} onChange={e=>setEditOrder({...editOrder,plan:e.target.value})} style={selectStyle}>
                    <option value="Starter">Starter</option>
                    <option value="Growth">Growth</option>
                    <option value="Studio">Studio</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Total ($)</label>
                  <input type="number" value={editOrder.total || ''} onChange={e=>setEditOrder({...editOrder,total:e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Status</label>
                  <select value={editOrder.status || 'pending'} onChange={e=>setEditOrder({...editOrder,status:e.target.value})} style={selectStyle}>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Setup Date</label>
                  <input type="date" value={editOrder.setup_date || ''} onChange={e=>setEditOrder({...editOrder,setup_date:e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Setup Time</label>
                  <input type="time" value={editOrder.setup_time || ''} onChange={e=>setEditOrder({...editOrder,setup_time:e.target.value})} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginBottom:16, padding:16, background:'#f8f7f4', borderRadius:12, border:'1px solid #e2e8f0' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                  <label style={{ ...labelStyle, marginBottom:0, fontSize:12 }}>Design Styles</label>
                  {(editOrder.selected_designs || []).length < 3 && (
                    <button onClick={addDesign} style={{ padding:'3px 10px', background:'#0F172A', color:'white', border:'none', borderRadius:6, fontSize:11, cursor:'pointer' }}>+ Add</button>
                  )}
                </div>
                {(editOrder.selected_designs || []).map((d, i) => (
                  <div key={i} style={{ display:'flex', gap:8, marginBottom:8, alignItems:'center' }}>
                    <select value={d} onChange={e=>setDesign(i, e.target.value)} style={{ ...selectStyle, flex:1 }}>
                      <option value="">— Select design —</option>
                      {getAvailableDesigns(i).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      {d && !getAvailableDesigns(i).includes(d) && <option value={d}>{d}</option>}
                    </select>
                    {(editOrder.selected_designs || []).length > 1 && (
                      <button onClick={()=>removeDesign(i)} style={{ padding:'6px 10px', background:'#fff5f5', color:'#dc2626', border:'1px solid #fee2e2', borderRadius:6, fontSize:12, cursor:'pointer' }}>✕</button>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginBottom:16, padding:16, background:'#f8f7f4', borderRadius:12, border:'1px solid #e2e8f0' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
                  <label style={{ ...labelStyle, marginBottom:0, fontSize:12 }}>Extra Domains</label>
                  <button onClick={addDomain} style={{ padding:'3px 10px', background:'#0F172A', color:'white', border:'none', borderRadius:6, fontSize:11, cursor:'pointer' }}>+ Add</button>
                </div>
                {(editOrder.addon_domain_list || []).map((d, i) => (
                  <div key={i} style={{ display:'flex', gap:8, marginBottom:8, alignItems:'center' }}>
                    <input value={d} onChange={e=>setDomain(i, e.target.value)} placeholder="store.myshopify.com" style={{ ...inputStyle, flex:1 }} />
                    {(editOrder.addon_domain_list || []).length > 1 && (
                      <button onClick={()=>removeDomain(i)} style={{ padding:'6px 10px', background:'#fff5f5', color:'#dc2626', border:'1px solid #fee2e2', borderRadius:6, fontSize:12, cursor:'pointer' }}>✕</button>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginBottom:20 }}>
                <label style={labelStyle}>Notes</label>
                <textarea value={editOrder.notes || ''} onChange={e=>setEditOrder({...editOrder,notes:e.target.value})} style={{ ...inputStyle, height:70, resize:'vertical' }} />
              </div>

              <div style={{ display:'flex', gap:10 }}>
                <button onClick={saveEdit} style={{ padding:'10px 24px', background:'#0F172A', color:'white', border:'none', borderRadius:8, fontSize:13, fontWeight:600, cursor:'pointer' }}>Save Changes</button>
                <button onClick={()=>setEditOrder(null)} style={{ padding:'10px 24px', background:'#f1f5f9', color:'#64748b', border:'none', borderRadius:8, fontSize:13, cursor:'pointer' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>Loading...</div>
          ) : orders.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>No orders yet.</div>
          ) : (
            <div style={{ overflowX:'auto' }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f7f4", borderBottom: "2px solid #e2e8f0" }}>
                    {["Date","Name","Email","Domain","Plan","Designs","Extra Domains","Setup","Total","Status",""].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.8, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => {
                    const sc = STATUS_COLORS[o.status] || STATUS_COLORS.pending;
                    const designs = Array.isArray(o.selected_designs) ? o.selected_designs.filter(Boolean) : [];
                    const extraDomains = Array.isArray(o.addon_domain_list) ? o.addon_domain_list.filter(Boolean) : [];
                    return (
                      <tr key={o.id} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                        <td style={{ padding: "14px 16px", fontSize: 12, color: "#64748b", whiteSpace: "nowrap" }}>{fmt(o.created_at)}</td>
                        <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: "#0F172A", whiteSpace: "nowrap" }}>{o.name}</td>
                        <td style={{ padding: "14px 16px", fontSize: 12, color: "#64748b" }}>{o.email}</td>
                        <td style={{ padding: "14px 16px", fontSize: 12, fontFamily: "monospace", color: "#0F172A" }}>{o.domain}</td>
                        <td style={{ padding: "14px 16px", fontSize: 12, fontWeight: 600, color: "#0F172A", whiteSpace:"nowrap" }}>{o.plan}</td>
                        <td style={{ padding: "14px 16px", fontSize: 12 }}>
                          {designs.length > 0 ? designs.map((d,idx) => (
                            <span key={idx} style={{ display:"inline-block", padding:"2px 8px", background: idx===0 ? "#f1f5f9" : "#FEF3C7", borderRadius:20, fontSize:11, marginRight:4, marginBottom:2, color: idx===0 ? "#0F172A" : "#92400E", fontWeight:600 }}>{d}</span>
                          )) : <span style={{ color:"#94a3b8" }}>—</span>}
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 12 }}>
                          {extraDomains.length ? extraDomains.map((d,idx) => (
                            <div key={idx} style={{ fontFamily:"monospace", color:"#F59E0B", fontSize:11 }}>{d}</div>
                          )) : <span style={{ color:"#94a3b8" }}>—</span>}
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 12, color: o.setup_date ? "#0F172A" : "#94a3b8", whiteSpace:"nowrap" }}>
                          {o.setup_date ? `${o.setup_date}${o.setup_time ? ' ' + o.setup_time : ''}` : "—"}
                        </td>
                        <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 700, color: "#0F172A", whiteSpace: "nowrap" }}>${Number(o.total).toFixed(2)}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <select value={o.status || "pending"} onChange={e => updateStatus(o.id, e.target.value)}
                            style={{ padding: "4px 8px", borderRadius: 20, border: "none", fontSize: 11, fontWeight: 700, background: sc.bg, color: sc.color, cursor: "pointer" }}>
                            <option value="pending">Pending</option>
                            <option value="active">Active</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display:'flex', gap:6 }}>
                            <button onClick={() => openEdit(o)}
                              style={{ padding: "5px 10px", background: "#f1f5f9", color: "#0F172A", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>✏️</button>
                            <button onClick={() => deleteOrder(o.id)}
                              style={{ padding: "5px 10px", background: "#fff5f5", color: "#dc2626", border: "1px solid #fee2e2", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: "#94a3b8" }}>
          {orders.length} order{orders.length !== 1 ? "s" : ""} total · ${orders.reduce((s, o) => s + Number(o.total || 0), 0).toFixed(2)} revenue
        </div>
      </div>
    </div>
  );
}
