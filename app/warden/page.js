"use client";

import React, { useState, useEffect } from "react";
import WardenDashboard from "../../components/WardenDashboard";
import SkeletonLoader from "../../components/SkeletonLoader";

export default function WardenPage() {
  const [stats, setStats] = useState();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWardenData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, appsRes] = await Promise.all([
        fetch("/api/stats"),
        fetch("/api/applications"),
      ]);

      const statsData = await statsRes.json();
      const appsData = await appsRes.json();

      if (statsData.success) setStats(statsData.data);
      if (appsData.success) setApplications(appsData.data);
    } catch (err) {
      console.error("Failed to load warden dashboard data:", err);
      setError("Unable to retrieve applications data. Please ensure the backend server is operational.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWardenData();
  }, []);

  return (
    <div className="container">

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
        <div>
          <div style={{ display: "inline-block", marginBottom: "0.5rem" }}>
            <span className="badge badge-warning">??? Administrative Portal</span>
          </div>
          <h1 style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>Warden Oversight Station</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Verify student eligibility, review submitted preferences, and monitor hall capacity metrics.
          </p>
        </div>

        <button
          type="button"
          onClick={loadWardenData}
          disabled={loading}
          className="btn btn-secondary btn-sm"
        >
          {loading ? "Refreshing..." : "? Refresh Queue"}
        </button>
      </div>

      {loading ? (
        <div>
          <div style={{ textAlign: "center", marginBottom: "1.5rem", color: "var(--text-muted)" }}>
            Loading warden metrics and application queue...
          </div>
          <SkeletonLoader count={3} />
        </div>
      ) : error ? (
        <div
          className="glass-panel"
          style={{
            padding: "3rem",
            textAlign: "center",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--danger)",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>??</div>
          <h3 style={{ color: "var(--danger)", marginBottom: "0.5rem" }}>Service Offline</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{error}</p>
          <button type="button" onClick={loadWardenData} className="btn btn-primary">
            Retry Loading Dashboard
          </button>
        </div>
      ) : (
        <WardenDashboard stats={stats} applications={applications} />
      )}
    </div>
  );
}
