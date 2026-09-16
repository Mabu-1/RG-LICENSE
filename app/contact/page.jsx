"use client";
import { useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase";

const LOGO_URL = "https://cdn.shopify.com/s/files/1/0673/0275/2339/files/main_logo_d9a41a64-87f3-442f-bfa0-3b8cf7e16514.png?v=1786536373";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) e.email = "Required";
    else if (!emailRegex.test(form.email.trim())) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setLoading(true);
    const { error } = await supabaseBrowser.from("contacts").insert({
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      message: form.message,
    });
    if (error) { console.error(error); setLoading(false); return; }
    setDone(true);
    setLoading(false);
  }

  const inp = (hasError) => ({
    width: "100%", padding: "11px 14px",
    border: `1px solid ${hasError ? "#ef4444" : "#BFDBFE"}`,
    borderRadius: 10, fontSize: 14, boxSizing: "border-box",
    fontFamily: "inherit", outline: "none", background: "white",
    transition: "border-color 0.2s",
  });
  const lbl = { fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 5 };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#fff 0%,#EFF6FF 60%,#DBEAFE 100%)", padding: "40px 24px 80px" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 48 }}>
          <Link href="/" style={{ fontSize: 13, color: "#64748b", textDecoration: "none" }}>← Back</Link>
          <a href="/"><img src={LOGO_URL} alt="ShopRevew" style={{ height: 36, display: "block", marginLeft: "auto" }} /></a>
        </div>

        {done ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ width: 64, height: 64, background: "#F0FDF4", border: "2px solid #86EFAC", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h2 style={{ fontFamily: "serif", fontSize: 28, fontWeight: 900, color: "#0F172A", marginBottom: 10, letterSpacing: -1 }}>Message sent!</h2>
            <p style={{ fontSize: 15, color: "#64748b", marginBottom: 28 }}>We will get back to you within 24 hours via email or WhatsApp.</p>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "#2563EB", color: "white", borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>← Back to Home</Link>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#2563EB", marginBottom: 12 }}>Contact</div>
            <h1 style={{ fontFamily: "serif", fontSize: 36, fontWeight: 900, color: "#0F172A", letterSpacing: -1.5, marginBottom: 8, lineHeight: 1.1 }}>Get in Touch</h1>
            <p style={{ fontSize: 15, color: "#64748b", marginBottom: 36, lineHeight: 1.7 }}>Have a question or need help? Fill in the form and we will get back to you within 24 hours.</p>

            <div style={{ background: "white", borderRadius: 20, padding: "32px", border: "1px solid #BFDBFE", boxShadow: "0 4px 24px rgba(37,99,235,0.07)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={lbl}>Full Name *</label>
                  <input value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }} placeholder="John Smith" style={inp(errors.name)} />
                  {errors.name && <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>⚠ {errors.name}</div>}
                </div>
                <div>
                  <label style={lbl}>Email *</label>
                  <input type="email" value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }} placeholder="john@store.com" style={inp(errors.email)} />
                  {errors.email && <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>⚠ {errors.email}</div>}
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={lbl}>WhatsApp (optional)</label>
                <input type="tel" value={form.whatsapp} onChange={e => { const val = e.target.value.replace(/[^0-9\s\+\-\(\)]/g, ""); setForm({ ...form, whatsapp: val }); }} placeholder="+1 234 567 8900" style={inp(false)} />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={lbl}>Message *</label>
                <textarea value={form.message} onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }} placeholder="How can we help you?" rows={5} style={{ ...inp(errors.message), resize: "vertical" }} />
                {errors.message && <div style={{ fontSize: 11, color: "#ef4444", marginTop: 4 }}>⚠ {errors.message}</div>}
              </div>

              <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "15px", background: loading ? "#94a3b8" : "#2563EB", color: "white", border: "none", borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s", boxShadow: loading ? "none" : "0 8px 24px rgba(37,99,235,0.3)" }}>
                {loading ? "⏳ Sending..." : "Send Message →"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
