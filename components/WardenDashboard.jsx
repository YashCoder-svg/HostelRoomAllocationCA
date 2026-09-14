"use client";

import React, { useState } from "react";
import AllocationTable from "./AllocationTable";

export default function WardenDashboard({ stats = {}, applications = [] }) {
  const [appList, setAppList] = useState(applications);

  const handleStatusUpdate = (updatedApp) => {
    setAppList((prev) =>
      prev.map((a) => (a._id === updatedApp._id ? { ...a, status: updatedApp.status } : a))
    );
  };

  return (
    <div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(90deg, rgba(99, 102, 241, 0.12), rgba(6, 182, 212, 0.12))",
          border: "1px solid rgba(99, 102, 241, 0.3)",
          borderRadius: "var(--radius-lg)",
          padding: "1rem 1.5rem",
          marginBottom: "2rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "1.5rem" }}>???</span>
          <div>
            <h4 style={{ fontSize: "1rem", color: "var(--text-primary)" }}>
              Chief Warden Review Station � Academic Cycle 2026�2027
            </h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              Review student application queues, verify eligibility metrics, and monitor residential occupancy.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <span className="badge badge-success">? Active Round 1</span>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: "2.5rem" }}>
        <div className="glass-panel" style={{ padding: "1.25rem", borderRadius: "var(--radius-md)" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Total Capacity</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--text-primary)" }}>
            {stats.totalBeds || 0}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Across {stats.totalHostels || 4} Hostels
          </div>
        </div>

        <div className="glass-panel" style={{ padding: "1.25rem", borderRadius: "var(--radius-md)" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Available Beds</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--success)" }}>
            {stats.availableBeds || 0}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            {stats.occupancyRate || 0}% Occupancy
          </div>
        </div>

        <div className="glass-panel" style={{ padding: "1.25rem", borderRadius: "var(--radius-md)" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Applications Received</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--primary)" }}>
            {appList.length}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Real-time MongoDB Sync
          </div>
        </div>

        <div className="glass-panel" style={{ padding: "1.25rem", borderRadius: "var(--radius-md)" }}>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Pending Warden Action</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--warning)" }}>
            {appList.filter((a) => a.status === "SUBMITTED" || a.status === "UNDER_REVIEW").length}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
            Awaiting Verification
          </div>
        </div>
      </div>

      <div
        className="glass-panel"
        style={{
          padding: "1.25rem 1.5rem",
          borderRadius: "var(--radius-md)",
          border: "1px dashed rgba(99, 102, 241, 0.4)",
          background: "rgba(99, 102, 241, 0.04)",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h4 style={{ fontSize: "0.95rem", color: "var(--text-primary)" }}>
            ?? Policy-Driven Allocation Engine (Planned for Week 9 Milestone)
          </h4>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
            Deterministic PRNG heuristic solver with roommate compatibility scoring, PwD floor enforcement, and CGPA distance sorting will run here.
          </p>
        </div>

        <button type="button" disabled className="btn btn-secondary btn-sm" style={{ opacity: 0.6, cursor: "not-allowed" }}>
          Run Allocation Engine (Week 9)
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>Student Application Review Queue</h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
          Inspect individual submissions, verify GPA / departmental details, and transition status to Under Review or Allocated.
        </p>
        <AllocationTable applications={appList} onStatusUpdate={handleStatusUpdate} />
      </div>
    </div>
  );
}
