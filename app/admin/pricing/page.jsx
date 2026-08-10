"use client";
import { useState, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import Link from "next/link";

export default function PricingAdmin() {
  const [plans, setPlans]   = useState([]);
  const [addons, setAddons] = useState([]);
  const [msg, setMsg]       = useState("");
  const [editPlan, setEditPlan]   = useState(null);
  const [editAddon, setEditAddon] = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    const { data: p } = await supabaseBrowser.from("pricing_plans").select("*").order("sort_order");
    const { data: a } = await supabaseBrowser.from("pricing_addons").select("*").order("sort_order");
    setPlans(p || []);
    setAddons(a || []);
  }

  async function savePlan(plan) {
    const features = typeof plan.features === "string"
      ? plan.features.split("\n").map(f => f.trim()).filter(Boolean)
      : plan.features;
    await supabaseBrowser.from("pricing_plans").update({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      cents: plan.cents,
      featured: plan.featured,
      badge: plan.badge,
      cta: plan.cta,
      features: features
    }).eq("id", plan.id);
    setMsg("Plan saved!");
    setEditPlan(null);
    load();
    setTimeout(() => setMsg(""), 2000);
  }

  async function saveAddon(addon) {
    await supabaseBrowser.from("pricing_addons").update({
      label: addon.label,
      sub: addon.sub,
      price: addon.price,
      unit: addon.unit
    }).eq("id", addon.id);
    setMsg("Add-on saved!");
    setEditAddon(null);
    load();
    setTimeout(() => setMsg(""), 2000);
  }

  const inputStyle = { width:"100%", padding:"9px 12px", border:"1px solid #e2e8f0", borderRadius:8, fontSize:13, boxSizing:"border-box", fontFamily:"inherit" };
  const labelStyle = { fontSize:12, fontWeight:600, color:"#64748b", display:"block", marginBottom:4 };

  return (
    <div style={{ minHeight:"100vh", background:"#f8f7f4", padding:"40px 24px" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32 }}>
          <h1 style={{ fontFamily:"serif", fontSize:28, fontWeight:900, color:"#0F172A", letterSpacing:-1 }}>💰 Pricing Manager</h1>
          <Link href="/admin" style={{ padding:"8px 18px", background:"#0F172A", color:"white", borderRadius:8, fontSize:13, fontWeight:600, textDecoration:"none" }}>← Back to Admin</Link>
        </div>

        {msg && <div style={{ background:"#d1fae5", color:"#065f46", padding:"10px 16px", borderRadius:8, marginBottom:20, fontSize:13, fontWeight:600 }}>{msg}</div>}

        <div style={{ background:"white", borderRadius:16, padding:28, marginBottom:24, border:"1px solid #e2e8f0" }}>
          <h2 style={{ fontSize:16, fontWeight:700, color:"#0F172A", marginBottom:20 }}>Pricing Plans</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {plans.map(plan => (
              <div key={plan.id}>
                {editPlan?.id === plan.id ? (
                  <div style={{ background:"#f8f7f4", borderRadius:12, padding:20, border:"1px solid #e2e8f0" }}>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                      <div><label style={labelStyle}>Plan Name</label><input value={editPlan.name} onChange={e=>setEditPlan({...editPlan,name:e.target.value})} style={inputStyle} /></div>
                      <div><label style={labelStyle}>CTA Button Text</label><input value={editPlan.cta} onChange={e=>setEditPlan({...editPlan,cta:e.target.value})} style={inputStyle} /></div>
                      <div><label style={labelStyle}>Price (e.g. 39)</label><input value={editPlan.price} onChange={e=>setEditPlan({...editPlan,price:e.target.value})} style={inputStyle} /></div>
                      <div><label style={labelStyle}>Cents (e.g. .99)</label><input value={editPlan.cents} onChange={e=>setEditPlan({...editPlan,cents:e.target.value})} style={inputStyle} /></div>
                      <div><label style={labelStyle}>Badge (leave empty for none)</label><input value={editPlan.badge || ""} onChange={e=>setEditPlan({...editPlan,badge:e.target.value})} style={inputStyle} placeholder="e.g. Most Popular" /></div>
                      <div style={{ display:"flex", alignItems:"center", gap:8, paddingTop:20 }}>
                        <input type="checkbox" id={"feat-"+plan.id} checked={editPlan.featured} onChange={e=>setEditPlan({...editPlan,featured:e.target.checked})} />
                        <label htmlFor={"feat-"+plan.id} style={{ fontSize:13, color:"#0F172A", fontWeight:500 }}>Featured (dark card)</label>
                      </div>
                    </div>
                    <div style={{ marginBottom:12 }}><label style={labelStyle}>Description</label><input value={editPlan.description} onChange={e=>setEditPlan({...editPlan,description:e.target.value})} style={inputStyle} /></div>
                    <div style={{ marginBottom:16 }}>
                      <label style={labelStyle}>Features (one per line)</label>
                      <textarea
                        value={Array.isArray(editPlan.features) ? editPlan.features.join("\n") : editPlan.features}
                        onChange={e=>setEditPlan({...editPlan,features:e.target.value})}
                        style={{ ...inputStyle, height:120, resize:"vertical" }}
                      />
                    </div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={() => savePlan(editPlan)} style={{ padding:"9px 20px", background:"#0F172A", color:"white", border:"none", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer" }}>Save</button>
                      <button onClick={() => setEditPlan(null)} style={{ padding:"9px 20px", background:"#f1f5f9", color:"#64748b", border:"none", borderRadius:8, fontSize:13, cursor:"pointer" }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", background:"#f8f7f4", borderRadius:10, border:"1px solid #e2e8f0" }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                        <span style={{ fontWeight:700, fontSize:15, color:"#0F172A" }}>{plan.name}</span>
                        {plan.featured && <span style={{ fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20, background:"#F59E0B", color:"white" }}>Featured</span>}
                        {plan.badge && <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background:"#e2e8f0", color:"#64748b" }}>{plan.badge}</span>}
                      </div>
                      <div style={{ fontSize:13, color:"#64748b" }}>${plan.price}{plan.cents} — {plan.description}</div>
                      <div style={{ fontSize:11, color:"#94a3b8", marginTop:4 }}>{Array.isArray(plan.features) ? plan.features.join(" · ") : ""}</div>
                    </div>
                    <button onClick={() => setEditPlan({ ...plan })} style={{ padding:"7px 16px", background:"white", border:"1px solid #e2e8f0", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer" }}>Edit</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background:"white", borderRadius:16, padding:28, border:"1px solid #e2e8f0" }}>
          <h2 style={{ fontSize:16, fontWeight:700, color:"#0F172A", marginBottom:20 }}>Add-ons</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {addons.map(addon => (
              <div key={addon.id}>
                {editAddon?.id === addon.id ? (
                  <div style={{ background:"#f8f7f4", borderRadius:12, padding:16, border:"1px solid #e2e8f0" }}>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10, marginBottom:12 }}>
                      <div><label style={labelStyle}>Label</label><input value={editAddon.label} onChange={e=>setEditAddon({...editAddon,label:e.target.value})} style={inputStyle} /></div>
                      <div><label style={labelStyle}>Sub text</label><input value={editAddon.sub} onChange={e=>setEditAddon({...editAddon,sub:e.target.value})} style={inputStyle} /></div>
                      <div><label style={labelStyle}>Price</label><input value={editAddon.price} onChange={e=>setEditAddon({...editAddon,price:e.target.value})} style={inputStyle} /></div>
                      <div><label style={labelStyle}>Unit</label><input value={editAddon.unit} onChange={e=>setEditAddon({...editAddon,unit:e.target.value})} style={inputStyle} /></div>
                    </div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={() => saveAddon(editAddon)} style={{ padding:"8px 18px", background:"#0F172A", color:"white", border:"none", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer" }}>Save</button>
                      <button onClick={() => setEditAddon(null)} style={{ padding:"8px 18px", background:"#f1f5f9", color:"#64748b", border:"none", borderRadius:8, fontSize:13, cursor:"pointer" }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", background:"#f8f7f4", borderRadius:10, border:"1px solid #e2e8f0" }}>
                    <div style={{ flex:1 }}>
                      <span style={{ fontWeight:600, fontSize:14, color:"#0F172A" }}>{addon.label}</span>
                      <span style={{ fontSize:12, color:"#64748b", marginLeft:8 }}>{addon.sub}</span>
                    </div>
                    <span style={{ fontFamily:"serif", fontSize:18, fontWeight:900, color:"#0F172A" }}>{addon.price} <small style={{ fontSize:11, fontWeight:400, color:"#64748b" }}>{addon.unit}</small></span>
                    <button onClick={() => setEditAddon({...addon})} style={{ padding:"6px 14px", background:"white", border:"1px solid #e2e8f0", borderRadius:8, fontSize:12, cursor:"pointer" }}>Edit</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
