"use client";

import React, { useState, useEffect } from "react";
import WardenDashboard from "../../components/WardenDashboard";

export default function WardenPage() {
  const [stats, setStats] = useState();
  const [applications, setApplications] = useState([]);

  const loadWardenData = async () => {
    try {
      const [statsRes, appsRes] = await Promise.all([
        fetch("http://localhost:5000/api/stats").catch(() => null),
        fetch("http://localhost:5000/api/applications").catch(() => null),
      ]);

      if (statsRes && statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData.success) setStats(statsData.data);
      }
      if (appsRes && appsRes.ok) {
        const appsData = await appsRes.json();
        if (appsData.success) setApplications(appsData.data);
      }
    } catch (err) {
      console.warn("Warden data fetch notice:", err);
    }
  };

  useEffect(() => {
    loadWardenData();
  }, []);

  return (
    <div className="container-max" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <WardenDashboard stats={stats || {}} applications={applications || []} />
    </div>
  );
}
