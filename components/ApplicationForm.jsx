"use client";

import React, { useState } from "react";
import Link from "next/link";
import PreferenceRanker from "./PreferenceRanker";
import StatusBadge from "./StatusBadge";

export default function ApplicationForm({ hostels = [] }) {
  const [formData, setFormData] = useState({
    studentRollNumber: "2024CS1099",
    studentName: "Shreya Sharma",
    studentEmail: "shreya.sharma@campus.edu",
    department: "Computer Science & Engineering",
    year: "2",
    gender: "Female",
    cgpa: "8.85",
    specialAccommodations: "Prefers second floor or higher near study room.",
  });

  const [preferences, setPreferences] = useState([
    {
      hostelId: hostels[1]?._id || "",
      hostelName: hostels[1]?.name || "Nilgiri Girls Hostel",
      roomType: "Single",
      acPreference: "AC",
      priority: 1,
    },
    {
      hostelId: hostels[2]?._id || "",
      hostelName: hostels[2]?.name || "Vindhya PG & Research Hall",
      roomType: "Double",
      acPreference: "Non-AC",
      priority: 2,
    },
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.studentRollNumber || !formData.studentName || !formData.studentEmail) {
      setErrorMessage("Please complete all required student profile fields.");
      return;
    }

    if (preferences.length === 0) {
      setErrorMessage("Please rank at least one hostel preference before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        year: Number(formData.year),
        cgpa: parseFloat(formData.cgpa) || 7.0,
        preferences,
      };

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        setSubmittedApp(result.data);
      } else {
        setErrorMessage(result.message || "Submission failed. Please check your inputs.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("Network error communicating with the allocation server.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedApp) {
    return (
      <div
        className="glass-panel animate-fade-in"
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "2.5rem",
          borderRadius: "var(--radius-xl)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "4rem",
            height: "4rem",
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.15)",
            color: "var(--success)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            margin: "0 auto 1.5rem",
            border: "1px solid rgba(16, 185, 129, 0.3)",
          }}
        >
          ?
        </div>

        <h2 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
          Application Successfully Submitted!
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
          Your hostel room allocation application has been securely recorded in MongoDB.
        </p>

        <div
          style={{
            background: "var(--bg-surface-elevated)",
            padding: "1.5rem",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-subtle)",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.75rem" }}>
            <div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Application ID</div>
              <strong style={{ fontSize: "1.1rem", color: "var(--primary)" }}>{submittedApp.applicationId}</strong>
            </div>
            <div>
              <StatusBadge status={submittedApp.status} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.875rem" }}>
            <div>
              <span style={{ color: "var(--text-muted)" }}>Student: </span>
              <strong>{submittedApp.studentName}</strong>
            </div>
            <div>
              <span style={{ color: "var(--text-muted)" }}>Roll No: </span>
              <strong>{submittedApp.studentRollNumber}</strong>
            </div>
            <div>
              <span style={{ color: "var(--text-muted)" }}>Department: </span>
              <span>{submittedApp.department}</span>
            </div>
            <div>
              <span style={{ color: "var(--text-muted)" }}>Academic Year: </span>
              <span>Year {submittedApp.year} (CGPA: {submittedApp.cgpa})</span>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "0.75rem" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.35rem" }}>
              Ranked Preferences:
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              {(submittedApp.preferences || []).map((p, idx) => (
                <div key={idx} style={{ fontSize: "0.85rem" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>#{p.priority}</span> {p.hostelName} � {p.roomType} ({p.acPreference})
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button
            type="button"
            onClick={() => setSubmittedApp(null)}
            className="btn btn-secondary"
          >
            Submit Another Application
          </button>
          <Link href="/warden" className="btn btn-primary">
            View in Warden Review Queue ?
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {errorMessage && (
        <div
          className="badge-danger"
          style={{
            padding: "1rem",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span>??</span>
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="glass-panel" style={{ padding: "2rem", borderRadius: "var(--radius-lg)" }}>
        <h3 style={{ fontSize: "1.25rem", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>??</span> Step 1: Student Profile & Eligibility Data
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          Provide verified academic registration details. These are matched against allocation eligibility policies.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          <div className="form-group">
            <label className="form-label">Roll Number *</label>
            <input
              type="text"
              name="studentRollNumber"
              className="form-input"
              value={formData.studentRollNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="studentName"
              className="form-input"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Campus Email *</label>
            <input
              type="email"
              name="studentEmail"
              className="form-input"
              value={formData.studentEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Department *</label>
            <select
              name="department"
              className="form-select"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Electronics & Communication">Electronics & Communication</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Data Science & AI">Data Science & AI</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Civil & Infrastructure">Civil & Infrastructure</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Study Year *</label>
            <select
              name="year"
              className="form-select"
              value={formData.year}
              onChange={handleChange}
            >
              <option value="1">1st Year (Freshman)</option>
              <option value="2">2nd Year (Sophomore)</option>
              <option value="3">3rd Year (Junior)</option>
              <option value="4">4th Year (Senior)</option>
              <option value="5">PG / Doctoral Scholar</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Gender *</label>
            <select
              name="gender"
              className="form-select"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Current CGPA (out of 10) *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              name="cgpa"
              className="form-input"
              value={formData.cgpa}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <PreferenceRanker
        hostels={hostels}
        preferences={preferences}
        onChange={setPreferences}
      />

      <div className="glass-panel" style={{ padding: "2rem", borderRadius: "var(--radius-lg)" }}>
        <h3 style={{ fontSize: "1.25rem", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>??</span> Step 3: Accommodations & Consent
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
          Optional medical, accessibility, or dietary requirements for warden review.
        </p>

        <div className="form-group">
          <label className="form-label">Special Requests / Medical Accessibility Notes</label>
          <textarea
            name="specialAccommodations"
            className="form-textarea"
            rows={3}
            placeholder="E.g., Ground floor accessibility required, quiet study floor, etc."
            value={formData.specialAccommodations}
            onChange={handleChange}
          />
        </div>

        <div
          style={{
            background: "rgba(99, 102, 241, 0.08)",
            padding: "1rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            fontSize: "0.825rem",
            color: "var(--text-secondary)",
            marginBottom: "1.5rem",
          }}
        >
          ?? <strong>Policy Agreement:</strong> By submitting, you affirm that all academic information is accurate.
          Allocations are processed subject to university residential eligibility guidelines, hostel availability, and warden review.
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary"
          style={{ width: "100%", padding: "0.85rem", fontSize: "1.05rem" }}
        >
          {submitting ? "Submitting Application to MongoDB..." : "Submit Hostel Application ?"}
        </button>
      </div>
    </form>
  );
}
