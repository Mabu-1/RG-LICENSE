"use client";
import { useState, useEffect } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import Link from "next/link";

const STATUS_COLORS = {
  pending:   { bg: '#FEF3C7', color: '#92400E' },
  active:    { bg: '#D1FAE5', color: '#065F46' },
  cancelled: { bg: '#FEE2E2', color: '#991B1B' },
}

export default function OrdersPage() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg]         = useState("");

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data, error } = await supabaseBrowser
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    setOrders(data || []);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    await supabaseBrowser.from("orders").update({ status }).eq("id", id);
    setMsg("Updated!");
    setTimeout(() => setMsg(""), 2000);
    load();
  }

  async function deleteOrder(id) {
    if (!confirm("Delete this order?")) return;
    await supabaseBrowser.from("orders").delete().eq("id", id);
    load();
  }

  function fmt(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f7f4", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "serif", fontSize: 28, fontWeight: 900, color: "#0F172A", letterSpacing: -1 }}>📋 Orders</h1>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {msg && <span style={{ fontSize: 13, color: "#10B981", fontWeight: 600 }}>{msg}</span>}
            <button onClick={load} style={{ padding: "8px 16px", background: "#f1f5f9", border: "none", borderRadius: 8, fontSize: 12, cursor: "pointer" }}>Refresh</button>
            <Link href="/admin" style={{ padding: "8px 18px", background: "#0F172A", color: "white", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>← Back to Admin</Link>
          </div>
        </div>

        <div style={{ background: "white", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>Loading...</div>
          ) : orders.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>No orders yet.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8f7f4", borderBottom: "2px solid #e2e8f0" }}>
                  {["Date", "Name", "Email", "Domain", "Plan", "Add-ons", "Total", "Status", "Notes", ""].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.8, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => {
                  const sc = STATUS_COLORS[o.status] || STATUS_COLORS.pending;
                  const addons = [
                    o.addon_domain && "Extra Domain",
                    o.addon_design_count > 0 && `+${o.addon_design_count} Design${o.addon_design_count > 1 ? "s" : ""}`,
                  ].filter(Boolean).join(", ");
                  return (
                    <tr key={o.id} style={{ borderBottom: "1px solid #f1f5f9", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                      <td style={{ padding: "14px 16px", fontSize: 12, color: "#64748b", whiteSpace: "nowrap" }}>{fmt(o.created_at)}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: "#0F172A", whiteSpace: "nowrap" }}>{o.name}</td>
                      <td style={{ padding: "14px 16px", fontSize: 12, color: "#64748b" }}>{o.email}</td>
                      <td style={{ padding: "14px 16px", fontSize: 12, fontFamily: "monospace", color: "#0F172A" }}>{o.domain}</td>
                      <td style={{ padding: "14px 16px", fontSize: 12, fontWeight: 600, color: "#0F172A", whiteSpace: "nowrap" }}>{o.plan}</td>
                      <td style={{ padding: "14px 16px", fontSize: 12, color: addons ? "#F59E0B" : "#94a3b8" }}>{addons || "—"}</td>
                      <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 700, color: "#0F172A", whiteSpace: "nowrap" }}>${Number(o.total).toFixed(2)}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <select
                          value={o.status || "pending"}
                          onChange={e => updateStatus(o.id, e.target.value)}
                          style={{ padding: "4px 8px", borderRadius: 20, border: "none", fontSize: 11, fontWeight: 700, background: sc.bg, color: sc.color, cursor: "pointer" }}>
                          <option value="pending">Pending</option>
                          <option value="active">Active</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: 12, color: "#64748b", maxWidth: 180 }}>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.notes || "—"}</div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <button onClick={() => deleteOrder(o.id)}
                          style={{ padding: "5px 10px", background: "#fff5f5", color: "#dc2626", border: "1px solid #fee2e2", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>
                          🗑
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: "#94a3b8" }}>
          {orders.length} order{orders.length !== 1 ? "s" : ""} total · ${orders.reduce((s, o) => s + Number(o.total || 0), 0).toFixed(2)} revenue
        </div>

      </div>
    </div>
  );
}
