"use client";

import React, { useState, useEffect } from "react";
import ApplicationForm from "../../components/ApplicationForm";
import SkeletonLoader from "../../components/SkeletonLoader";

export default function ApplyPage() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHostels() {
      try {
        const res = await fetch("/api/hostels");
        const data = await res.json();
        if (data.success) {
          setHostels(data.data);
        }
      } catch (err) {
        console.error("Failed to load hostels for application form:", err);
      } finally {
        setLoading(false);
      }
    }
    loadHostels();
  }, []);

  return (
    <div className="container" style={{ maxWidth: "860px" }}>

      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{ display: "inline-block", marginBottom: "0.5rem" }}>
          <span className="badge badge-primary">Student Application</span>
        </div>
        <h1 style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>Hostel Room Application</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Submit your profile details, rank your preferred residential halls and room types, and obtain your official submission receipt.
        </p>
      </div>

      {loading ? (
        <div>
          <div style={{ textAlign: "center", marginBottom: "1rem", color: "var(--text-muted)" }}>
            Loading available hostel options...
          </div>
          <SkeletonLoader count={2} />
        </div>
      ) : (
        <ApplicationForm hostels={hostels} />
      )}
    </div>
  );
}
