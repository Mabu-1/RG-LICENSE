"use client";
import { useState, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import Link from "next/link";
import { useBranding } from "../hooks/useBranding";

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const { logo, logoHeight } = useBranding();

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabaseBrowser.from("contacts").select("*").order("created_at", { ascending: false });
    setContacts(data || []);
    setLoading(false);
  }

  async function deleteContact(id) {
    if (!confirm("Delete this contact?")) return;
    await supabaseBrowser.from("contacts").delete().eq("id", id);
    setMsg("Deleted!"); setTimeout(() => setMsg(""), 2000); load();
  }

  function fmt(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  const filtered = contacts.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.whatsapp?.toLowerCase().includes(search.toLowerCase()) ||
    c.message?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <a href="/">
            {logo
              ? <img src={logo} alt="Logo" style={{ height: logoHeight, display: "block" }} />
              : <h1 style={{ fontFamily: "serif", fontSize: 24, fontWeight: 900, color: "#0F172A" }}>📬 Contacts</h1>}
          </a>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {msg && <span style={{ fontSize: 13, color: "#10B981", fontWeight: 600 }}>{msg}</span>}
            <button onClick={load} style={{ padding: "8px 16px", background: "#f1f5f9", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>↻ Refresh</button>
            <Link href="/admin" style={{ padding: "8px 18px", background: "#0F172A", color: "white", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>← Back</Link>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Total Contacts", value: contacts.length, color: "#0F172A" },
            { label: "This Month", value: contacts.filter(c => new Date(c.created_at).getMonth() === new Date().getMonth()).length, color: "#2563EB" },
            { label: "With WhatsApp", value: contacts.filter(c => c.whatsapp).length, color: "#22C55E" },
          ].map(s => (
            <div key={s.label} style={{ background: "white", borderRadius: 12, padding: "16px 20px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.color, fontFamily: "serif" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={{ background: "white", borderRadius: 12, padding: "14px 18px", border: "1px solid #e2e8f0", marginBottom: 16 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, WhatsApp or message..."
            style={{ width: "100%", border: "none", outline: "none", fontSize: 14, fontFamily: "inherit", background: "transparent" }}
          />
        </div>

        {/* Table */}
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>Loading...</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>No contacts yet.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f7f4", borderBottom: "2px solid #e2e8f0" }}>
                    {["Date", "Name", "Email", "WhatsApp", "Message", ""].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.8, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <tr key={c.id} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                      <td style={{ padding: "14px 16px", fontSize: 12, color: "#64748b", whiteSpace: "nowrap" }}>{fmt(c.created_at)}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: "#0F172A", whiteSpace: "nowrap" }}>{c.name}</td>
                      <td style={{ padding: "14px 16px", fontSize: 12, color: "#64748b" }}>
                        <a href={`mailto:${c.email}`} style={{ color: "#2563EB", textDecoration: "none" }}>{c.email}</a>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 12 }}>
                        {c.whatsapp ? (
                          <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" style={{ color: "#25D366", fontWeight: 600, textDecoration: "none" }}>{c.whatsapp}</a>
                        ) : <span style={{ color: "#94a3b8" }}>—</span>}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 13, color: "#0F172A", maxWidth: 360 }}>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.message}</div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <button onClick={() => deleteContact(c.id)} style={{ padding: "5px 10px", background: "#fff5f5", color: "#dc2626", border: "1px solid #fee2e2", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div style={{ marginTop: 14, fontSize: 12, color: "#94a3b8" }}>
          {filtered.length} contact{filtered.length !== 1 ? "s" : ""} shown
        </div>
      </div>
    </div>
  );
}
