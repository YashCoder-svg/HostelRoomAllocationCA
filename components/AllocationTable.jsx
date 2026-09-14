"use client";

import React, { useState } from "react";
import StatusBadge from "./StatusBadge";

export default function AllocationTable({ applications = [], onStatusUpdate }) {
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeApp, setActiveApp] = useState(null);
  const [updating, setUpdating] = useState(false);

  const filteredApps = applications.filter((app) => {
    if (filterStatus !== "ALL" && app.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchRoll = app.studentRollNumber?.toLowerCase().includes(q);
      const matchName = app.studentName?.toLowerCase().includes(q);
      const matchDept = app.department?.toLowerCase().includes(q);
      const matchId = app.applicationId?.toLowerCase().includes(q);
      if (!matchRoll && !matchName && !matchDept && !matchId) return false;
    }
    return true;
  });

  const handleUpdateStatus = async (newStatus) => {
    if (!activeApp) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/applications/${activeApp._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        if (onStatusUpdate) onStatusUpdate(data.data);
        setActiveApp((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.25rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {["ALL", "SUBMITTED", "UNDER_REVIEW", "ALLOCATED"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`btn btn-sm ${filterStatus === st ? "btn-primary" : "btn-secondary"}`}
              style={{ fontSize: "0.8rem" }}
            >
              {st === "ALL" ? "All Applications" : st.replace("_", " ")}
            </button>
          ))}
        </div>

        <div style={{ minWidth: "260px" }}>
          <input
            type="text"
            placeholder="Search by roll number, name, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ padding: "0.45rem 0.85rem", fontSize: "0.85rem" }}
          />
        </div>
      </div>

      <div
        className="glass-panel"
        style={{
          overflowX: "auto",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.875rem" }}>
          <thead>
            <tr style={{ background: "var(--bg-surface-elevated)", borderBottom: "1px solid var(--border-subtle)" }}>
              <th style={{ padding: "0.85rem 1rem", color: "var(--text-secondary)", fontWeight: 600 }}>App ID</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--text-secondary)", fontWeight: 600 }}>Student</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--text-secondary)", fontWeight: 600 }}>Dept & Year</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--text-secondary)", fontWeight: 600 }}>CGPA</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--text-secondary)", fontWeight: 600 }}>1st Preference</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--text-secondary)", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "0.85rem 1rem", color: "var(--text-secondary)", fontWeight: 600, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                  No applications found matching the selected status or query.
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => (
                <tr
                  key={app._id}
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                    transition: "background var(--transition-fast)",
                  }}
                >
                  <td style={{ padding: "0.85rem 1rem", fontFamily: "monospace", color: "var(--primary)", fontWeight: 600 }}>
                    {app.applicationId}
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{app.studentName}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{app.studentRollNumber}</div>
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <div>{app.department}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Year {app.year}</div>
                  </td>
                  <td style={{ padding: "0.85rem 1rem", fontWeight: 700 }}>
                    {app.cgpa}
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <div style={{ fontSize: "0.825rem", color: "var(--text-primary)" }}>
                      {app.preferences?.[0]?.hostelName || "None"}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {app.preferences?.[0]?.roomType}
                    </div>
                  </td>
                  <td style={{ padding: "0.85rem 1rem" }}>
                    <StatusBadge status={app.status} />
                  </td>
                  <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                    <button
                      type="button"
                      onClick={() => setActiveApp(app)}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: "0.775rem", padding: "0.3rem 0.65rem" }}
                    >
                      Review ?
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {activeApp && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            className="glass-panel animate-fade-in"
            style={{
              width: "100%",
              maxWidth: "650px",
              padding: "2rem",
              borderRadius: "var(--radius-xl)",
              background: "var(--bg-surface)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div>
                <span className="badge badge-primary">{activeApp.applicationId}</span>
                <h3 style={{ fontSize: "1.35rem", marginTop: "0.4rem" }}>{activeApp.studentName}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {activeApp.studentRollNumber} � {activeApp.department} � Year {activeApp.year}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveApp(null)}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: "50%", width: "2rem", height: "2rem", padding: 0 }}
              >
                ?
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
              <div style={{ background: "var(--bg-surface-elevated)", padding: "0.85rem", borderRadius: "var(--radius-md)" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Academic Standing</span>
                <strong>CGPA: {activeApp.cgpa} / 10.0</strong>
              </div>
              <div style={{ background: "var(--bg-surface-elevated)", padding: "0.85rem", borderRadius: "var(--radius-md)" }}>
                <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", display: "block" }}>Contact Email</span>
                <strong>{activeApp.studentEmail}</strong>
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                Ranked Hostel Choices
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {(activeApp.preferences || []).map((pref, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0.6rem 0.85rem",
                      background: "var(--bg-surface-elevated)",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.85rem",
                    }}
                  >
                    <span>
                      <strong style={{ color: "var(--primary)" }}>#{pref.priority}</strong> {pref.hostelName}
                    </span>
                    <span style={{ color: "var(--text-muted)" }}>
                      {pref.roomType} ({pref.acPreference})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {activeApp.specialAccommodations && (
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
                  Special Accommodations Request
                </div>
                <div style={{ padding: "0.75rem", background: "var(--bg-surface-elevated)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem" }}>
                  {activeApp.specialAccommodations}
                </div>
              </div>
            )}

            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
                Update Application Workflow Status:
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => handleUpdateStatus("UNDER_REVIEW")}
                  className="btn btn-secondary btn-sm"
                >
                  Mark Under Review
                </button>
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => handleUpdateStatus("ALLOCATED")}
                  className="btn btn-primary btn-sm"
                >
                  ? Approve for Allocation
                </button>
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => handleUpdateStatus("REJECTED")}
                  className="btn btn-danger btn-sm"
                >
                  Reject Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
