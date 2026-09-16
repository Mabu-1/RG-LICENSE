"use client";
import { supabaseBrowser } from "@/lib/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useBranding } from "../hooks/useBranding";

const STATUS_COLORS = {
  pending: { bg: "#FEF3C7", color: "#92400E" },
  active: { bg: "#D1FAE5", color: "#065F46" },
  cancelled: { bg: "#FEE2E2", color: "#991B1B" },
};

const TRIAL_COLORS = {
  trial: { bg: "#FEF3C7", color: "#92400E", label: "🟡 Trial" },
  converted: { bg: "#D1FAE5", color: "#065F46", label: "✅ Converted" },
  cancelled: { bg: "#FEE2E2", color: "#991B1B", label: "❌ Cancelled" },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOrder, setEditOrder] = useState(null);
  const [msg, setMsg] = useState("");
  const { logo, logoHeight } = useBranding();

  const [filters, setFilters] = useState({
    status: "all",
    trial_status: "all",
    plan: "all",
    search: "",
    date_from: "",
    date_to: "",
  });

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    let result = [...orders];
    if (filters.status !== "all")
      result = result.filter((o) => o.status === filters.status);
    if (filters.trial_status !== "all")
      result = result.filter((o) => o.trial_status === filters.trial_status);
    if (filters.plan !== "all")
      result = result.filter((o) => o.plan === filters.plan);
    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(
        (o) =>
          o.name?.toLowerCase().includes(s) ||
          o.email?.toLowerCase().includes(s) ||
          o.domain?.toLowerCase().includes(s) ||
          o.whatsapp?.toLowerCase().includes(s),
      );
    }
    if (filters.date_from)
      result = result.filter((o) => o.created_at >= filters.date_from);
    if (filters.date_to)
      result = result.filter(
        (o) => o.created_at <= filters.date_to + "T23:59:59",
      );
    setFiltered(result);
  }, [orders, filters]);

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

  async function updateTrialStatus(id, trial_status) {
    const updates = { trial_status };
    if (trial_status === "converted") updates.is_trial = false;
    if (trial_status === "trial") updates.is_trial = true;
    await supabaseBrowser.from("orders").update(updates).eq("id", id);
    setMsg("Updated!");
    setTimeout(() => setMsg(""), 2000);
    load();
  }

  async function deleteOrder(id) {
    if (!confirm("Delete this order?")) return;
    const { error } = await supabaseBrowser
      .from("orders")
      .delete()
      .eq("id", id);
    if (error) {
      setMsg("Delete failed: " + error.message);
      return;
    }
    setMsg("Deleted!");
    setTimeout(() => setMsg(""), 2000);
    load();
  }

  async function saveEdit() {
    const { error } = await supabaseBrowser
      .from("orders")
      .update({
        name: editOrder.name,
        email: editOrder.email,
        whatsapp: editOrder.whatsapp || "",
        domain: editOrder.domain,
        plan: editOrder.plan,
        total: parseFloat(editOrder.total),
        notes: editOrder.notes,
        status: editOrder.status,
        trial_status: editOrder.trial_status || "trial",
        is_trial: editOrder.trial_status !== "converted",
        trial_start_date: editOrder.trial_start_date || "",
        setup_date: editOrder.setup_date || "",
        setup_time: editOrder.setup_time || "",
        addon_domain_list: (editOrder.addon_domain_list || []).filter(Boolean),
      })
      .eq("id", editOrder.id);
    if (error) {
      setMsg("Save failed: " + error.message);
      return;
    }
    setMsg("Saved!");
    setTimeout(() => setMsg(""), 2000);
    setEditOrder(null);
    load();
  }

  function openEdit(o) {
    setEditOrder({
      ...o,
      whatsapp: o.whatsapp || "",
      trial_status: o.trial_status || "trial",
      trial_start_date: o.trial_start_date || "",
      addon_domain_list:
        Array.isArray(o.addon_domain_list) && o.addon_domain_list.length
          ? o.addon_domain_list
          : [""],
    });
  }

  function setDomain(index, value) {
    const u = [...(editOrder.addon_domain_list || [])];
    u[index] = value;
    setEditOrder({ ...editOrder, addon_domain_list: u });
  }
  function addDomain() {
    setEditOrder({
      ...editOrder,
      addon_domain_list: [...(editOrder.addon_domain_list || []), ""],
    });
  }
  function removeDomain(index) {
    const u = [...(editOrder.addon_domain_list || [])];
    u.splice(index, 1);
    setEditOrder({ ...editOrder, addon_domain_list: u });
  }

  function fmt(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function trialDaysLeft(startDate) {
    if (!startDate) return null;
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 3);
    const diff = Math.ceil((end - new Date()) / (1000 * 60 * 60 * 24));
    return diff;
  }

  const inp = {
    width: "100%",
    padding: "8px 10px",
    border: "1px solid #e2e8f0",
    borderRadius: 7,
    fontSize: 13,
    boxSizing: "border-box",
    fontFamily: "inherit",
  };
  const lbl = {
    fontSize: 11,
    fontWeight: 600,
    color: "#64748b",
    display: "block",
    marginBottom: 3,
  };
  const sel = {
    width: "100%",
    padding: "8px 10px",
    border: "1px solid #e2e8f0",
    borderRadius: 7,
    fontSize: 13,
    boxSizing: "border-box",
    fontFamily: "inherit",
    background: "white",
    cursor: "pointer",
  };

  // Stats
  const totalRevenue = filtered.reduce((s, o) => s + Number(o.total || 0), 0);
  const activeTrials = filtered.filter(
    (o) => o.trial_status === "trial",
  ).length;
  const converted = filtered.filter(
    (o) => o.trial_status === "converted",
  ).length;
  const cancelled = filtered.filter(
    (o) => o.trial_status === "cancelled",
  ).length;

  const uniquePlans = [...new Set(orders.map((o) => o.plan).filter(Boolean))];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f7f4",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: 1500, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          <div>
            {logo ? (
              <img
                src={logo}
                alt="Logo"
                style={{ height: logoHeight, display: "block" }}
              />
            ) : (
              <h1
                style={{
                  fontFamily: "serif",
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#0F172A",
                  letterSpacing: -1,
                }}
              >
                📋 Orders
              </h1>
            )}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {msg && (
              <span
                style={{
                  fontSize: 13,
                  color: msg.includes("fail") ? "#dc2626" : "#10B981",
                  fontWeight: 600,
                }}
              >
                {msg}
              </span>
            )}
            <button
              onClick={load}
              style={{
                padding: "8px 16px",
                background: "#f1f5f9",
                border: "none",
                borderRadius: 8,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              ↻ Refresh
            </button>
            <Link
              href="/admin"
              style={{
                padding: "8px 18px",
                background: "#0F172A",
                color: "white",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              ← Back
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {[
            { label: "Total Orders", value: filtered.length, color: "#0F172A" },
            {
              label: "Revenue",
              value: `$${totalRevenue.toFixed(2)}`,
              color: "#2563EB",
            },
            { label: "Active Trials", value: activeTrials, color: "#D97706" },
            { label: "Converted", value: converted, color: "#059669" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "white",
                borderRadius: 12,
                padding: "16px 20px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  marginBottom: 6,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 900,
                  color: s.color,
                  fontFamily: "serif",
                }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div
          style={{
            background: "white",
            borderRadius: 12,
            padding: "16px 20px",
            border: "1px solid #e2e8f0",
            marginBottom: 16,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "flex-end",
          }}
        >
          <div style={{ flex: 2, minWidth: 180 }}>
            <label style={lbl}>Search</label>
            <input
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              placeholder="Name, email, domain, WhatsApp..."
              style={inp}
            />
          </div>
          <div style={{ minWidth: 130 }}>
            <label style={lbl}>Order Status</label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              style={sel}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div style={{ minWidth: 140 }}>
            <label style={lbl}>Trial Status</label>
            <select
              value={filters.trial_status}
              onChange={(e) =>
                setFilters({ ...filters, trial_status: e.target.value })
              }
              style={sel}
            >
              <option value="all">All Trials</option>
              <option value="trial">🟡 Trial</option>
              <option value="converted">✅ Converted</option>
              <option value="cancelled">❌ Cancelled</option>
            </select>
          </div>
          <div style={{ minWidth: 120 }}>
            <label style={lbl}>Plan</label>
            <select
              value={filters.plan}
              onChange={(e) => setFilters({ ...filters, plan: e.target.value })}
              style={sel}
            >
              <option value="all">All Plans</option>
              {uniquePlans.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div style={{ minWidth: 130 }}>
            <label style={lbl}>From Date</label>
            <input
              type="date"
              value={filters.date_from}
              onChange={(e) =>
                setFilters({ ...filters, date_from: e.target.value })
              }
              style={inp}
            />
          </div>
          <div style={{ minWidth: 130 }}>
            <label style={lbl}>To Date</label>
            <input
              type="date"
              value={filters.date_to}
              onChange={(e) =>
                setFilters({ ...filters, date_to: e.target.value })
              }
              style={inp}
            />
          </div>
          <button
            onClick={() =>
              setFilters({
                status: "all",
                trial_status: "all",
                plan: "all",
                search: "",
                date_from: "",
                date_to: "",
              })
            }
            style={{
              padding: "8px 14px",
              background: "#f1f5f9",
              border: "none",
              borderRadius: 8,
              fontSize: 12,
              cursor: "pointer",
              color: "#64748b",
            }}
          >
            Clear
          </button>
        </div>

        {/* Edit Modal */}
        {editOrder && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: 32,
                width: "100%",
                maxWidth: 640,
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <h2
                  style={{
                    fontFamily: "serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#0F172A",
                  }}
                >
                  Edit Order
                </h2>
                <button
                  onClick={() => setEditOrder(null)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: 20,
                    cursor: "pointer",
                    color: "#64748b",
                  }}
                >
                  ✕
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                <div>
                  <label style={lbl}>Name</label>
                  <input
                    value={editOrder.name || ""}
                    onChange={(e) =>
                      setEditOrder({ ...editOrder, name: e.target.value })
                    }
                    style={inp}
                  />
                </div>
                <div>
                  <label style={lbl}>Email</label>
                  <input
                    value={editOrder.email || ""}
                    onChange={(e) =>
                      setEditOrder({ ...editOrder, email: e.target.value })
                    }
                    style={inp}
                  />
                </div>
                <div>
                  <label style={lbl}>WhatsApp</label>
                  <input
                    type="tel"
                    value={editOrder.whatsapp || ""}
                    onChange={(e) =>
                      setEditOrder({ ...editOrder, whatsapp: e.target.value })
                    }
                    placeholder="+1 234 567 8900"
                    style={inp}
                  />
                </div>
                <div>
                  <label style={lbl}>Primary Domain</label>
                  <input
                    value={editOrder.domain || ""}
                    onChange={(e) =>
                      setEditOrder({ ...editOrder, domain: e.target.value })
                    }
                    style={inp}
                  />
                </div>
                <div>
                  <label style={lbl}>Plan</label>
                  <select
                    value={editOrder.plan || ""}
                    onChange={(e) =>
                      setEditOrder({ ...editOrder, plan: e.target.value })
                    }
                    style={sel}
                  >
                    <option value="Starter">Starter</option>
                    <option value="Growth">Growth</option>
                    <option value="Studio">Studio</option>
                  </select>
                </div>
                <div>
                  <label style={lbl}>Total ($)</label>
                  <input
                    type="number"
                    value={editOrder.total || ""}
                    onChange={(e) =>
                      setEditOrder({ ...editOrder, total: e.target.value })
                    }
                    style={inp}
                  />
                </div>
                <div>
                  <label style={lbl}>Order Status</label>
                  <select
                    value={editOrder.status || "pending"}
                    onChange={(e) =>
                      setEditOrder({ ...editOrder, status: e.target.value })
                    }
                    style={sel}
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label style={lbl}>Trial Status</label>
                  <select
                    value={editOrder.trial_status || "trial"}
                    onChange={(e) =>
                      setEditOrder({
                        ...editOrder,
                        trial_status: e.target.value,
                      })
                    }
                    style={sel}
                  >
                    <option value="trial">🟡 Trial</option>
                    <option value="converted">✅ Converted</option>
                    <option value="cancelled">❌ Cancelled</option>
                  </select>
                </div>
                <div>
                  <label style={lbl}>Trial Start Date</label>
                  <input
                    type="date"
                    value={editOrder.trial_start_date || ""}
                    onChange={(e) =>
                      setEditOrder({
                        ...editOrder,
                        trial_start_date: e.target.value,
                      })
                    }
                    style={inp}
                  />
                </div>
                <div>
                  <label style={lbl}>Setup Date</label>
                  <input
                    type="date"
                    value={editOrder.setup_date || ""}
                    onChange={(e) =>
                      setEditOrder({ ...editOrder, setup_date: e.target.value })
                    }
                    style={inp}
                  />
                </div>
                <div>
                  <label style={lbl}>Setup Time</label>
                  <input
                    type="time"
                    value={editOrder.setup_time || ""}
                    onChange={(e) =>
                      setEditOrder({ ...editOrder, setup_time: e.target.value })
                    }
                    style={inp}
                  />
                </div>
              </div>

              {/* Extra Domains */}
              <div
                style={{
                  marginBottom: 16,
                  padding: 16,
                  background: "#f8f7f4",
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <label style={{ ...lbl, marginBottom: 0 }}>
                    Extra Domains
                  </label>
                  <button
                    onClick={addDomain}
                    style={{
                      padding: "3px 10px",
                      background: "#0F172A",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      fontSize: 11,
                      cursor: "pointer",
                    }}
                  >
                    + Add
                  </button>
                </div>
                {(editOrder.addon_domain_list || []).map((d, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 8,
                      marginBottom: 8,
                      alignItems: "center",
                    }}
                  >
                    <input
                      value={d}
                      onChange={(e) => setDomain(i, e.target.value)}
                      placeholder="store.myshopify.com"
                      style={{ ...inp, flex: 1 }}
                    />
                    {(editOrder.addon_domain_list || []).length > 1 && (
                      <button
                        onClick={() => removeDomain(i)}
                        style={{
                          padding: "6px 10px",
                          background: "#fff5f5",
                          color: "#dc2626",
                          border: "1px solid #fee2e2",
                          borderRadius: 6,
                          fontSize: 12,
                          cursor: "pointer",
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={lbl}>Notes</label>
                <textarea
                  value={editOrder.notes || ""}
                  onChange={(e) =>
                    setEditOrder({ ...editOrder, notes: e.target.value })
                  }
                  style={{ ...inp, height: 70, resize: "vertical" }}
                />
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={saveEdit}
                  style={{
                    padding: "10px 24px",
                    background: "#0F172A",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditOrder(null)}
                  style={{
                    padding: "10px 24px",
                    background: "#f1f5f9",
                    color: "#64748b",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div
          style={{
            background: "white",
            borderRadius: 16,
            border: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>
              Loading...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>
              No orders found.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{
                      background: "#f8f7f4",
                      borderBottom: "2px solid #e2e8f0",
                    }}
                  >
                    {[
                      "Date",
                      "Name",
                      "Email",
                      "WhatsApp",
                      "Domain",
                      "Extra Domains",
                      "Plan",
                      "Trial Status",
                      "Trial Start",
                      "Days Left",
                      "Setup",
                      "Total",
                      "Order Status",
                      "",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 14px",
                          textAlign: "left",
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#64748b",
                          textTransform: "uppercase",
                          letterSpacing: 0.8,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((o, i) => {
                    const sc = STATUS_COLORS[o.status] || STATUS_COLORS.pending;
                    const tc =
                      TRIAL_COLORS[o.trial_status] || TRIAL_COLORS.trial;
                    const extraDomains = Array.isArray(o.addon_domain_list)
                      ? o.addon_domain_list.filter(Boolean)
                      : [];
                    const daysLeft =
                      o.trial_status === "trial"
                        ? trialDaysLeft(o.trial_start_date)
                        : null;
                    return (
                      <tr
                        key={o.id}
                        style={{
                          borderBottom: "1px solid #f1f5f9",
                          background: i % 2 === 0 ? "white" : "#fafafa",
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 14px",
                            fontSize: 12,
                            color: "#64748b",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {fmt(o.created_at)}
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#0F172A",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {o.name}
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            fontSize: 12,
                            color: "#64748b",
                          }}
                        >
                          {o.email}
                        </td>
                        <td style={{ padding: "12px 14px", fontSize: 12 }}>
                          {o.whatsapp ? (
                            <a
                              href={`https://wa.me/${o.whatsapp.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#25D366",
                                fontWeight: 600,
                                textDecoration: "none",
                              }}
                            >
                              {o.whatsapp}
                            </a>
                          ) : (
                            <span style={{ color: "#94a3b8" }}>—</span>
                          )}
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            fontSize: 12,
                            fontFamily: "monospace",
                            color: "#0F172A",
                          }}
                        >
                          {o.domain}
                        </td>
                        <td style={{ padding: "12px 14px", fontSize: 12 }}>
                          {extraDomains.length ? (
                            extraDomains.map((d, idx) => (
                              <div
                                key={idx}
                                style={{
                                  fontFamily: "monospace",
                                  color: "#2563EB",
                                  fontSize: 11,
                                }}
                              >
                                {d}
                              </div>
                            ))
                          ) : (
                            <span style={{ color: "#94a3b8" }}>—</span>
                          )}
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#0F172A",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {o.plan}
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <select
                            value={o.trial_status || "trial"}
                            onChange={(e) =>
                              updateTrialStatus(o.id, e.target.value)
                            }
                            style={{
                              padding: "4px 8px",
                              borderRadius: 20,
                              border: "none",
                              fontSize: 11,
                              fontWeight: 700,
                              background: tc.bg,
                              color: tc.color,
                              cursor: "pointer",
                            }}
                          >
                            <option value="trial">🟡 Trial</option>
                            <option value="converted">✅ Converted</option>
                            <option value="cancelled">❌ Cancelled</option>
                          </select>
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            fontSize: 12,
                            color: "#64748b",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {o.trial_start_date ? fmt(o.trial_start_date) : "—"}
                        </td>
                        <td
                          style={{ padding: "12px 14px", whiteSpace: "nowrap" }}
                        >
                          {daysLeft !== null ? (
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                padding: "2px 8px",
                                borderRadius: 20,
                                background:
                                  daysLeft <= 0
                                    ? "#FEE2E2"
                                    : daysLeft === 1
                                      ? "#FEF3C7"
                                      : "#D1FAE5",
                                color:
                                  daysLeft <= 0
                                    ? "#991B1B"
                                    : daysLeft === 1
                                      ? "#92400E"
                                      : "#065F46",
                              }}
                            >
                              {daysLeft <= 0 ? "Expired" : `${daysLeft}d left`}
                            </span>
                          ) : (
                            <span style={{ color: "#94a3b8", fontSize: 11 }}>
                              —
                            </span>
                          )}
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            fontSize: 12,
                            color: o.setup_date ? "#0F172A" : "#94a3b8",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {o.setup_date
                            ? `${o.setup_date}${o.setup_time ? " " + o.setup_time : ""}`
                            : "—"}
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#0F172A",
                            whiteSpace: "nowrap",
                          }}
                        >
                          ${Number(o.total).toFixed(2)}
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <select
                            value={o.status || "pending"}
                            onChange={(e) => updateStatus(o.id, e.target.value)}
                            style={{
                              padding: "4px 8px",
                              borderRadius: 20,
                              border: "none",
                              fontSize: 11,
                              fontWeight: 700,
                              background: sc.bg,
                              color: sc.color,
                              cursor: "pointer",
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="active">Active</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button
                              onClick={() => openEdit(o)}
                              style={{
                                padding: "5px 10px",
                                background: "#f1f5f9",
                                color: "#0F172A",
                                border: "1px solid #e2e8f0",
                                borderRadius: 6,
                                fontSize: 11,
                                cursor: "pointer",
                              }}
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => deleteOrder(o.id)}
                              style={{
                                padding: "5px 10px",
                                background: "#fff5f5",
                                color: "#dc2626",
                                border: "1px solid #fee2e2",
                                borderRadius: 6,
                                fontSize: 11,
                                cursor: "pointer",
                              }}
                            >
                              🗑
                            </button>
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

        <div
          style={{
            marginTop: 14,
            fontSize: 12,
            color: "#94a3b8",
            display: "flex",
            gap: 20,
          }}
        >
          <span>{filtered.length} orders shown</span>
          <span>💰 ${totalRevenue.toFixed(2)} revenue</span>
          <span>🟡 {activeTrials} active trials</span>
          <span>✅ {converted} converted</span>
          <span>❌ {cancelled} cancelled</span>
        </div>
      </div>
    </div>
  );
}
