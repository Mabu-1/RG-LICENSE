"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabase";
import { useBranding } from "./hooks/useBranding";

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [logging, setLogging] = useState(false);
  const { logo, logoHeight, setLogo, setLogoHeight } = useBranding();
  const [newLogo, setNewLogo] = useState("");
  const [newHeight, setNewHeight] = useState("");
  const [brandMsg, setBrandMsg] = useState("");
  const [sites, setSites] = useState([]);
  const [sitesLoading, setSitesLoading] = useState(false);
  const [newSite, setNewSite] = useState({ domain: "", label: "", notes: "" });
  const [siteMsg, setSiteMsg] = useState("");
  const [editSite, setEditSite] = useState(null);
  const [stats, setStats] = useState({ orders: 0, contacts: 0, sites: 0, revenue: 0, trials: 0 });

  useEffect(() => {
    const token = localStorage.getItem("rg_admin_token");
    if (token) validateToken(token);
    else setChecking(false);
  }, []);

  async function validateToken(token) {
    const res = await fetch("/api/admin/login", { headers: { "x-admin-token": token } });
    if (res.ok) { setAuthed(true); loadData(); }
    setChecking(false);
  }

  async function loadData() {
    setSitesLoading(true);
    const { data: sitesData } = await supabaseBrowser.from("sites").select("*").order("created_at", { ascending: false });
    setSites(sitesData || []);
    setSitesLoading(false);

    const { data: orders } = await supabaseBrowser.from("orders").select("id, total, trial_status");
    const { data: contacts } = await supabaseBrowser.from("contacts").select("id");
    const { data: sitesCount } = await supabaseBrowser.from("sites").select("id");

    setStats({
      orders: orders?.length || 0,
      contacts: contacts?.length || 0,
      sites: sitesCount?.length || 0,
      revenue: orders?.reduce((s, o) => s + Number(o.total || 0), 0) || 0,
      trials: orders?.filter(o => o.trial_status === "trial").length || 0,
    });
  }

  async function handleLogin() {
    setLogging(true); setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem("rg_admin_token", token);
      setAuthed(true);
      loadData();
    } else {
      setError("Invalid username or password");
    }
    setLogging(false);
  }

  function handleLogout() {
    localStorage.removeItem("rg_admin_token");
    setAuthed(false);
  }

  async function saveBranding() {
    const token = localStorage.getItem("rg_admin_token");
    if (newLogo) {
      await fetch("/api/sites", { method: "PATCH", headers: { "Content-Type": "application/json", "x-admin-token": token }, body: JSON.stringify({ key: "branding_logo", value: newLogo }) });
      setLogo(newLogo);
    }
    if (newHeight) {
      await fetch("/api/sites", { method: "PATCH", headers: { "Content-Type": "application/json", "x-admin-token": token }, body: JSON.stringify({ key: "branding_logo_height", value: newHeight }) });
      setLogoHeight(parseInt(newHeight));
    }
    setBrandMsg("Saved!"); setTimeout(() => setBrandMsg(""), 2000);
    setNewLogo(""); setNewHeight("");
  }

  async function addSite() {
    if (!newSite.domain.trim()) return;
    const token = localStorage.getItem("rg_admin_token");
    await fetch("/api/sites", { method: "POST", headers: { "Content-Type": "application/json", "x-admin-token": token }, body: JSON.stringify(newSite) });
    setNewSite({ domain: "", label: "", notes: "" });
    setSiteMsg("Site added!"); setTimeout(() => setSiteMsg(""), 2000);
    loadData();
  }

  async function deleteSite(id) {
    if (!confirm("Delete this site?")) return;
    const token = localStorage.getItem("rg_admin_token");
    await fetch(`/api/sites?id=${id}`, { method: "DELETE", headers: { "x-admin-token": token } });
    loadData();
  }

  async function saveEditSite() {
    const token = localStorage.getItem("rg_admin_token");
    await fetch("/api/sites", { method: "PATCH", headers: { "Content-Type": "application/json", "x-admin-token": token }, body: JSON.stringify({ id: editSite.id, domain: editSite.domain, label: editSite.label, notes: editSite.notes, active: editSite.active }) });
    setEditSite(null); loadData();
  }

  const inp = { width: "100%", padding: "9px 12px", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, boxSizing: "border-box", fontFamily: "inherit", outline: "none" };
  const lbl = { fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 };
  const card = { background: "white", borderRadius: 14, padding: "24px", border: "1px solid #e2e8f0", marginBottom: 20 };
  const navCard = { display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", background: "white", borderRadius: 12, border: "1px solid #e2e8f0", textDecoration: "none", transition: "all 0.2s", cursor: "pointer" };

  if (checking) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f7f4" }}>
      <div style={{ color: "#94a3b8" }}>Loading...</div>
    </div>
  );

  if (!authed) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#fff 0%,#EFF6FF 60%,#DBEAFE 100%)", padding: 24 }}>
      <div style={{ background: "white", borderRadius: 20, padding: 40, width: "100%", maxWidth: 380, border: "1px solid #BFDBFE", boxShadow: "0 8px 40px rgba(37,99,235,0.08)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          {logo && <a href="/"><img src={logo} alt="Logo" style={{ height: logoHeight, display: "block", margin: "0 auto 20px" }} /></a>}
          <h1 style={{ fontFamily: "serif", fontSize: 24, fontWeight: 900, color: "#0F172A", marginBottom: 6 }}>Admin Login</h1>
          <p style={{ fontSize: 13, color: "#64748b" }}>ShopRevew dashboard</p>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="username" style={inp} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={lbl}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="••••••••" style={inp} />
        </div>
        {error && <div style={{ color: "#dc2626", fontSize: 12, marginBottom: 14, textAlign: "center" }}>{error}</div>}
        <button onClick={handleLogin} disabled={logging} style={{ width: "100%", padding: "12px", background: logging ? "#94a3b8" : "#2563EB", color: "white", border: "none", borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: logging ? "not-allowed" : "pointer" }}>
          {logging ? "Logging in..." : "Login →"}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", padding: "40px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <a href="/">
            {logo
              ? <img src={logo} alt="Logo" style={{ height: logoHeight, display: "block" }} />
              : <h1 style={{ fontFamily: "serif", fontSize: 26, fontWeight: 900, color: "#0F172A" }}>Admin</h1>}
          </a>
          <button onClick={handleLogout} style={{ padding: "8px 18px", background: "white", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, cursor: "pointer", color: "#64748b" }}>Logout</button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Orders", value: stats.orders, color: "#0F172A" },
            { label: "Revenue", value: `$${stats.revenue.toFixed(2)}`, color: "#2563EB" },
            { label: "Active Trials", value: stats.trials, color: "#D97706" },
            { label: "Contacts", value: stats.contacts, color: "#7C3AED" },
            { label: "Sites", value: stats.sites, color: "#059669" },
          ].map(s => (
            <div key={s.label} style={{ background: "white", borderRadius: 12, padding: "14px 16px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: s.color, fontFamily: "serif" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Nav cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          {[
            { href: "/admin/orders", icon: "📋", title: "Orders", sub: "View and manage all orders" },
            { href: "/admin/contacts", icon: "📬", title: "Contacts", sub: "View contact form submissions" },
            { href: "/admin/pricing", icon: "💰", title: "Pricing", sub: "Edit plan and addon pricing" },
            { href: "/admin/media", icon: "🖼️", title: "Media", sub: "Upload and manage images & videos" },
          ].map(n => (
            <Link key={n.href} href={n.href} style={navCard}>
              <span style={{ fontSize: 28 }}>{n.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: "#0F172A", fontSize: 14 }}>{n.title}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{n.sub}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Branding */}
        <div style={card}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", marginBottom: 16 }}>🎨 Branding</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div>
              <label style={lbl}>Logo URL</label>
              <input value={newLogo} onChange={e => setNewLogo(e.target.value)} placeholder={logo || "https://..."} style={inp} />
            </div>
            <div>
              <label style={lbl}>Logo Height (px)</label>
              <input type="number" value={newHeight} onChange={e => setNewHeight(e.target.value)} placeholder={logoHeight?.toString() || "40"} style={inp} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={saveBranding} style={{ padding: "8px 20px", background: "#0F172A", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Save Branding</button>
            {brandMsg && <span style={{ fontSize: 13, color: "#10B981", fontWeight: 600 }}>{brandMsg}</span>}
          </div>
        </div>

        {/* Sites */}
        <div style={card}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", marginBottom: 16 }}>🌐 Licensed Sites</div>

          {editSite && (
            <div style={{ background: "#f8f7f4", borderRadius: 10, padding: 16, marginBottom: 16, border: "1px solid #e2e8f0" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
                <div><label style={lbl}>Domain</label><input value={editSite.domain} onChange={e => setEditSite({ ...editSite, domain: e.target.value })} style={inp} /></div>
                <div><label style={lbl}>Label</label><input value={editSite.label || ""} onChange={e => setEditSite({ ...editSite, label: e.target.value })} style={inp} /></div>
                <div><label style={lbl}>Notes</label><input value={editSite.notes || ""} onChange={e => setEditSite({ ...editSite, notes: e.target.value })} style={inp} /></div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={saveEditSite} style={{ padding: "7px 16px", background: "#0F172A", color: "white", border: "none", borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Save</button>
                <button onClick={() => setEditSite(null)} style={{ padding: "7px 16px", background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: 7, fontSize: 12, cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 10, marginBottom: 12 }}>
            <input value={newSite.domain} onChange={e => setNewSite({ ...newSite, domain: e.target.value })} placeholder="Domain" style={inp} />
            <input value={newSite.label} onChange={e => setNewSite({ ...newSite, label: e.target.value })} placeholder="Label" style={inp} />
            <input value={newSite.notes} onChange={e => setNewSite({ ...newSite, notes: e.target.value })} placeholder="Notes" style={inp} />
            <button onClick={addSite} style={{ padding: "9px 16px", background: "#2563EB", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>+ Add</button>
          </div>
          {siteMsg && <div style={{ fontSize: 12, color: "#10B981", fontWeight: 600, marginBottom: 10 }}>{siteMsg}</div>}

          {sitesLoading ? (
            <div style={{ color: "#94a3b8", fontSize: 13 }}>Loading...</div>
          ) : sites.length === 0 ? (
            <div style={{ color: "#94a3b8", fontSize: 13 }}>No sites yet.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                    {["Domain", "Label", "Notes", "Active", ""].map(h => (
                      <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sites.map(s => (
                    <tr key={s.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "10px 12px", fontSize: 13, fontFamily: "monospace", color: "#0F172A" }}>{s.domain}</td>
                      <td style={{ padding: "10px 12px", fontSize: 13, color: "#64748b" }}>{s.label || "—"}</td>
                      <td style={{ padding: "10px 12px", fontSize: 13, color: "#64748b" }}>{s.notes || "—"}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: s.active ? "#D1FAE5" : "#FEE2E2", color: s.active ? "#065F46" : "#991B1B" }}>
                          {s.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => setEditSite(s)} style={{ padding: "4px 10px", background: "#f1f5f9", border: "none", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>✏️</button>
                          <button onClick={() => deleteSite(s.id)} style={{ padding: "4px 10px", background: "#fff5f5", color: "#dc2626", border: "1px solid #fee2e2", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
