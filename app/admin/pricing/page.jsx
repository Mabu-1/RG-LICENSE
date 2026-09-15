"use client";
import { useState, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import Link from "next/link";
import { useBranding } from "../hooks/useBranding";

export default function PricingAdmin() {
  const [plan, setPlan]           = useState(null);
  const [addon, setAddon]         = useState(null);
  const [msg, setMsg]             = useState("");
  const [editPlan, setEditPlan]   = useState(null);
  const [editAddon, setEditAddon] = useState(null);
  const { logo, logoHeight }      = useBranding();

  useEffect(() => { load(); }, []);

  async function load() {
    const { data: p } = await supabaseBrowser.from("pricing_plans").select("*").order("sort_order");
    const { data: a } = await supabaseBrowser.from("pricing_addons").select("*").ilike("label", "%domain%");
    setPlan(p && p.length > 0 ? p[0] : null);
    setAddon(a && a.length > 0 ? a[0] : null);
  }

  async function savePlan(p) {
    const features = typeof p.features === "string"
      ? p.features.split("\n").map(f => f.trim()).filter(Boolean)
      : p.features;
    await supabaseBrowser.from("pricing_plans").update({
      name: p.name, description: p.description, price: p.price,
      cents: p.cents, badge: p.badge, cta: p.cta, features,
    }).eq("id", p.id);
    setMsg("Plan saved!"); setEditPlan(null); load(); setTimeout(() => setMsg(""), 2000);
  }

  async function saveAddon(a) {
    await supabaseBrowser.from("pricing_addons").update({
      label: a.label, sub: a.sub, price: a.price, unit: a.unit,
    }).eq("id", a.id);
    setMsg("Add-on saved!"); setEditAddon(null); load(); setTimeout(() => setMsg(""), 2000);
  }

  const inp = { width:"100%", padding:"9px 12px", border:"1px solid #BFDBFE", borderRadius:8, fontSize:13, boxSizing:"border-box", fontFamily:"inherit", outline:"none" };
  const lbl = { fontSize:12, fontWeight:600, color:"#64748b", display:"block", marginBottom:4 };
  const btn = (bg, color) => ({ padding:"9px 20px", background:bg, color, border:"none", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer" });

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#ffffff 0%,#EFF6FF 60%,#DBEAFE 100%)", padding:"40px 24px" }}>
      <div style={{ maxWidth:760, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32 }}>
          {logo
            ? <img src={logo} alt="Logo" style={{ height:logoHeight, display:"block" }} />
            : <div style={{ fontFamily:"serif", fontSize:22, fontWeight:900, color:"#0F172A" }}>Pricing Manager</div>}
          <Link href="/admin" style={{ padding:"8px 18px", background:"#0F172A", color:"white", borderRadius:8, fontSize:13, fontWeight:600, textDecoration:"none" }}>← Back to Admin</Link>
        </div>

        {msg && (
          <div style={{ background:"#d1fae5", color:"#065f46", padding:"10px 16px", borderRadius:8, marginBottom:20, fontSize:13, fontWeight:600 }}>{msg}</div>
        )}

        {/* Single Plan */}
        <div style={{ background:"white", borderRadius:16, padding:28, marginBottom:24, border:"1px solid #BFDBFE", boxShadow:"0 4px 16px rgba(37,99,235,0.07)" }}>
          <h2 style={{ fontSize:16, fontWeight:700, color:"#0F172A", marginBottom:20 }}>📦 Package</h2>

          {plan && (editPlan?.id === plan.id ? (
            <div style={{ background:"#F8FAFF", borderRadius:12, padding:20, border:"1px solid #BFDBFE" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                <div><label style={lbl}>Plan Name</label><input value={editPlan.name} onChange={e=>setEditPlan({...editPlan,name:e.target.value})} style={inp} /></div>
                <div><label style={lbl}>CTA Button Text</label><input value={editPlan.cta||""} onChange={e=>setEditPlan({...editPlan,cta:e.target.value})} style={inp} /></div>
                <div><label style={lbl}>Price (e.g. 49)</label><input value={editPlan.price} onChange={e=>setEditPlan({...editPlan,price:e.target.value})} style={inp} /></div>
                <div><label style={lbl}>Cents (e.g. .99)</label><input value={editPlan.cents||""} onChange={e=>setEditPlan({...editPlan,cents:e.target.value})} style={inp} /></div>
              </div>
              <div style={{ marginBottom:12 }}><label style={lbl}>Description</label><input value={editPlan.description||""} onChange={e=>setEditPlan({...editPlan,description:e.target.value})} style={inp} /></div>
              <div style={{ marginBottom:16 }}>
                <label style={lbl}>Features (one per line)</label>
                <textarea
                  value={Array.isArray(editPlan.features) ? editPlan.features.join("\n") : editPlan.features}
                  onChange={e=>setEditPlan({...editPlan,features:e.target.value})}
                  style={{ ...inp, height:140, resize:"vertical" }}
                />
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>savePlan(editPlan)} style={btn("#2563EB","white")}>Save</button>
                <button onClick={()=>setEditPlan(null)} style={btn("#f1f5f9","#64748b")}>Cancel</button>
              </div>
            </div>
          ) : (
            plan && (
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"16px 18px", background:"#F8FAFF", borderRadius:10, border:"1px solid #BFDBFE" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:16, color:"#0F172A", marginBottom:3 }}>{plan.name}</div>
                  <div style={{ fontSize:13, color:"#64748b", marginBottom:4 }}>${plan.price}{plan.cents} one-time — {plan.description}</div>
                  <div style={{ fontSize:11, color:"#94a3b8" }}>{Array.isArray(plan.features) ? plan.features.join(" · ") : ""}</div>
                </div>
                <button onClick={()=>setEditPlan({...plan})} style={{ padding:"7px 18px", background:"white", border:"1px solid #BFDBFE", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer" }}>Edit</button>
              </div>
            )
          ))}
        </div>

        {/* Extra Domain Addon only */}
        <div style={{ background:"white", borderRadius:16, padding:28, border:"1px solid #BFDBFE", boxShadow:"0 4px 16px rgba(37,99,235,0.07)" }}>
          <h2 style={{ fontSize:16, fontWeight:700, color:"#0F172A", marginBottom:6 }}>🌐 Extra Domain Add-on</h2>
          <p style={{ fontSize:13, color:"#64748b", marginBottom:20 }}>Customers pay this to license one additional Shopify store.</p>

          {addon && (editAddon?.id === addon.id ? (
            <div style={{ background:"#F8FAFF", borderRadius:12, padding:16, border:"1px solid #BFDBFE" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10, marginBottom:12 }}>
                <div><label style={lbl}>Label</label><input value={editAddon.label} onChange={e=>setEditAddon({...editAddon,label:e.target.value})} style={inp} /></div>
                <div><label style={lbl}>Sub text</label><input value={editAddon.sub} onChange={e=>setEditAddon({...editAddon,sub:e.target.value})} style={inp} /></div>
                <div><label style={lbl}>Price (e.g. +$10)</label><input value={editAddon.price} onChange={e=>setEditAddon({...editAddon,price:e.target.value})} style={inp} /></div>
                <div><label style={lbl}>Unit (e.g. /domain)</label><input value={editAddon.unit} onChange={e=>setEditAddon({...editAddon,unit:e.target.value})} style={inp} /></div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>saveAddon(editAddon)} style={btn("#2563EB","white")}>Save</button>
                <button onClick={()=>setEditAddon(null)} style={btn("#f1f5f9","#64748b")}>Cancel</button>
              </div>
            </div>
          ) : (
            addon && (
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"16px 18px", background:"#F8FAFF", borderRadius:10, border:"1px solid #BFDBFE" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:15, color:"#0F172A", marginBottom:2 }}>{addon.label}</div>
                  <div style={{ fontSize:13, color:"#64748b" }}>{addon.sub}</div>
                </div>
                <div style={{ fontFamily:"serif", fontSize:22, fontWeight:900, color:"#2563EB", marginRight:12 }}>{addon.price} <small style={{ fontFamily:"inherit", fontSize:12, fontWeight:500, color:"#64748b" }}>{addon.unit}</small></div>
                <button onClick={()=>setEditAddon({...addon})} style={{ padding:"7px 18px", background:"white", border:"1px solid #BFDBFE", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer" }}>Edit</button>
              </div>
            )
          ))}
        </div>

      </div>
    </div>
  );
}