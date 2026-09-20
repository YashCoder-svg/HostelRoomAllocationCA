"use client";

import React, { useState } from "react";
import { Search, UserCheck, ShieldCheck, X, Check, Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function AllocationTable({ initialApplications = [], onStatusChange }) {
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeApp, setActiveApp] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Fallback demo applications if database is empty
  const defaultApps = [
    {
      _id: "app-1",
      applicationId: "APP-2026-001",
      studentRollNumber: "2024CS101",
      studentName: "Arjun Patel",
      department: "Computer Science",
      year: 3,
      cgpa: 8.90,
      preferences: [{ hostelName: "BH1", roomType: "Double AC", priority: 1 }],
      status: "ALLOCATED",
      specialAccommodations: "Mutual roommate: 2024CS102 (Rohan Verma). Quiet zone corridor preferred.",
    },
    {
      _id: "app-2",
      applicationId: "APP-2026-002",
      studentRollNumber: "2024CS102",
      studentName: "Rohan Verma",
      department: "Computer Science",
      year: 3,
      cgpa: 8.65,
      preferences: [{ hostelName: "BH1", roomType: "Double AC", priority: 1 }],
      status: "ALLOCATED",
      specialAccommodations: "Mutual roommate: 2024CS101 (Arjun Patel).",
    },
    {
      _id: "app-3",
      applicationId: "APP-2026-003",
      studentRollNumber: "2024ME301",
      studentName: "Vikram Malhotra",
      department: "Mechanical Engineering",
      year: 2,
      cgpa: 9.12,
      preferences: [{ hostelName: "BH1", roomType: "Double Non-AC", priority: 1 }],
      status: "ALLOCATED",
      specialAccommodations: "Ground floor wheelchair accessible room requested.",
    },
    {
      _id: "app-4",
      applicationId: "APP-2026-004",
      studentRollNumber: "2024EC201",
      studentName: "Priya Sharma",
      department: "Electronics & Communication",
      year: 2,
      cgpa: 9.35,
      preferences: [{ hostelName: "GH1", roomType: "Single AC", priority: 1 }],
      status: "UNDER_REVIEW",
      specialAccommodations: "Prefers quiet study floor near elevator.",
    },
    {
      _id: "app-5",
      applicationId: "APP-2026-005",
      studentRollNumber: "2024CS199",
      studentName: "Rahul Gupta",
      department: "Computer Science",
      year: 4,
      cgpa: 8.40,
      preferences: [{ hostelName: "BH1", roomType: "Double AC", priority: 2 }],
      status: "SUBMITTED",
      specialAccommodations: "Night owl study habits.",
    },
  ];

  const applications = initialApplications.length > 0 ? initialApplications : defaultApps;

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
      const res = await fetch(`http://localhost:5000/api/applications/${activeApp._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success && onStatusChange) {
        onStatusChange(data.data);
      }
      setActiveApp((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.warn("Status update fallback:", err);
      setActiveApp((prev) => ({ ...prev, status: newStatus }));
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        padding: "1.5rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
      }}
    >
      {/* Title Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "1.25rem",
        }}
      >
        <div>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
            Applicant Review & Verification Queue
          </h3>
          <p style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "2px" }}>
            Deterministic solver allocations sorted by composite merit & accommodation constraints.
          </p>
        </div>

        {/* Search */}
        <div style={{ position: "relative", minWidth: "260px" }}>
          <input
            type="text"
            placeholder="Search by student, roll, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input-clean"
            style={{ paddingLeft: "32px", fontSize: "0.8125rem" }}
          />
          <div
            style={{
              position: "absolute",
              left: "10px",
              top: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              color: "#9CA3AF",
            }}
          >
            <Search size={14} />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
        {["ALL", "SUBMITTED", "UNDER_REVIEW", "ALLOCATED"].map((st) => {
          const active = filterStatus === st;
          return (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "8px",
                fontSize: "0.75rem",
                fontWeight: active ? 700 : 500,
                backgroundColor: active ? "#F97316" : "#F8FAFC",
                color: active ? "#FFFFFF" : "#475569",
                border: active ? "1px solid #F97316" : "1px solid #E2E8F0",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {st === "ALL" ? "All Records" : st.replace("_", " ")}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.8125rem" }}>
          <thead>
            <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0" }}>
              <th style={{ padding: "0.75rem 1rem", color: "#475569", fontWeight: 700 }}>App ID</th>
              <th style={{ padding: "0.75rem 1rem", color: "#475569", fontWeight: 700 }}>Student</th>
              <th style={{ padding: "0.75rem 1rem", color: "#475569", fontWeight: 700 }}>Dept & Year</th>
              <th style={{ padding: "0.75rem 1rem", color: "#475569", fontWeight: 700 }}>CGPA</th>
              <th style={{ padding: "0.75rem 1rem", color: "#475569", fontWeight: 700 }}>1st Preference</th>
              <th style={{ padding: "0.75rem 1rem", color: "#475569", fontWeight: 700 }}>Status</th>
              <th style={{ padding: "0.75rem 1rem", color: "#475569", fontWeight: 700, textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "2rem", textAlign: "center", color: "#9CA3AF" }}>
                  No student application records found.
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => (
                <tr
                  key={app._id}
                  style={{
                    borderBottom: "1px solid #F1F5F9",
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F8FAFC")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <td className="font-mono" style={{ padding: "0.75rem 1rem", fontSize: "0.75rem", color: "#64748B", fontWeight: 600 }}>
                    {app.applicationId || "APP-2026"}
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span style={{ fontWeight: 700, color: "#0F172A", display: "block" }}>
                      {app.studentName}
                    </span>
                    <span className="font-mono" style={{ fontSize: "0.6875rem", color: "#64748B" }}>
                      {app.studentRollNumber}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "#475569" }}>
                    <div>{app.department || "Engineering"}</div>
                    <span style={{ fontSize: "0.6875rem", color: "#9CA3AF" }}>Year {app.year || 1}</span>
                  </td>
                  <td className="font-mono" style={{ padding: "0.75rem 1rem", fontWeight: 700, color: "#0F172A" }}>
                    {app.cgpa?.toFixed(2) || "N/A"}
                  </td>
                  <td style={{ padding: "0.75rem 1rem", color: "#475569" }}>
                    <span style={{ fontWeight: 600, color: "#C2410C" }}>
                      {app.preferences?.[0]?.hostelName || "BH1"}
                    </span>
                    <span style={{ fontSize: "0.6875rem", color: "#9CA3AF", display: "block" }}>
                      {app.preferences?.[0]?.roomType || "Double"}
                    </span>
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <StatusBadge status={app.status} />
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                    <button
                      type="button"
                      onClick={() => setActiveApp(app)}
                      style={{
                        padding: "0.35rem 0.75rem",
                        borderRadius: "6px",
                        backgroundColor: "#FFF7ED",
                        color: "#C2410C",
                        border: "1px solid #FED7AA",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Eye size={12} />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Inspect / Verification Modal */}
      {activeApp && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              padding: "1.75rem",
              width: "100%",
              maxWidth: "520px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              border: "1px solid #E2E8F0",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    padding: "6px",
                    borderRadius: "8px",
                    backgroundColor: "#FFF7ED",
                    color: "#EA580C",
                  }}
                >
                  <ShieldCheck size={18} />
                </span>
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A", margin: 0 }}>
                    {activeApp.studentName}
                  </h4>
                  <span className="font-mono" style={{ fontSize: "0.75rem", color: "#64748B" }}>
                    Roll: {activeApp.studentRollNumber} • {activeApp.department}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveApp(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#9CA3AF",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
                padding: "0.75rem",
                backgroundColor: "#F8FAFC",
                borderRadius: "10px",
                border: "1px solid #E2E8F0",
                fontSize: "0.75rem",
              }}
            >
              <div>
                <span style={{ color: "#64748B" }}>CGPA:</span>{" "}
                <strong className="font-mono" style={{ color: "#0F172A" }}>{activeApp.cgpa?.toFixed(2) || "8.90"}</strong>
              </div>
              <div>
                <span style={{ color: "#64748B" }}>Current Status:</span>{" "}
                <StatusBadge status={activeApp.status} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <span style={{ color: "#64748B" }}>Special Requests & Pairing:</span>
                <p style={{ marginTop: "4px", color: "#0F172A", lineHeight: 1.4 }}>
                  {activeApp.specialAccommodations || "None"}
                </p>
              </div>
            </div>

            {/* Warden Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748B" }}>
                Update Authorization Status:
              </span>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => handleUpdateStatus("ALLOCATED")}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    borderRadius: "8px",
                    backgroundColor: "#059669",
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                >
                  <Check size={14} />
                  <span>Verify & Allocate</span>
                </button>

                <button
                  type="button"
                  disabled={updating}
                  onClick={() => handleUpdateStatus("UNDER_REVIEW")}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    borderRadius: "8px",
                    backgroundColor: "#D97706",
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                >
                  <span>Mark In Review</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
