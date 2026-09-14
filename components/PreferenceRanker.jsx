"use client";

import React, { useState } from "react";

export default function PreferenceRanker({ hostels = [], preferences = [], onChange }) {
  const [selectedHostelId, setSelectedHostelId] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("Single");
  const [selectedAcPref, setSelectedAcPref] = useState("Either");

  const handleAddPreference = () => {
    if (!selectedHostelId) return;

    const hostel = hostels.find((h) => h._id === selectedHostelId);
    if (!hostel) return;

    const exists = preferences.some((p) => p.hostelId === selectedHostelId);
    if (exists) {
      alert("This hostel has already been added to your preference list. Reorder its priority instead.");
      return;
    }

    const newPref = {
      hostelId: hostel._id,
      hostelName: hostel.name,
      roomType: selectedRoomType,
      acPreference: selectedAcPref,
      priority: preferences.length + 1,
    };

    const updated = [...preferences, newPref];
    onChange(updated);
    setSelectedHostelId("");
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updated = [...preferences];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;

    updated.forEach((p, idx) => (p.priority = idx + 1));
    onChange(updated);
  };

  const moveDown = (index) => {
    if (index === preferences.length - 1) return;
    const updated = [...preferences];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;

    updated.forEach((p, idx) => (p.priority = idx + 1));
    onChange(updated);
  };

  const removePref = (index) => {
    const updated = preferences.filter((_, idx) => idx !== index);
    updated.forEach((p, idx) => (p.priority = idx + 1));
    onChange(updated);
  };

  return (
    <div className="glass-panel" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
      <div style={{ marginBottom: "1rem" }}>
        <h3 style={{ fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>??</span> Ranked Hostel Preferences
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
          Rank your choices from 1st to 3rd priority. The policy allocation engine matches top-ranked choices first.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr)) auto",
          gap: "0.75rem",
          alignItems: "flex-end",
          padding: "1rem",
          background: "var(--bg-surface-elevated)",
          borderRadius: "var(--radius-md)",
          marginBottom: "1.25rem",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" style={{ fontSize: "0.8rem" }}>Hostel Choice</label>
          <select
            className="form-select"
            value={selectedHostelId}
            onChange={(e) => setSelectedHostelId(e.target.value)}
            style={{ fontSize: "0.85rem", padding: "0.5rem" }}
          >
            <option value="">-- Choose Hostel --</option>
            {hostels.map((h) => (
              <option key={h._id} value={h._id}>
                {h.name} ({h.genderAllowed})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" style={{ fontSize: "0.8rem" }}>Room Type</label>
          <select
            className="form-select"
            value={selectedRoomType}
            onChange={(e) => setSelectedRoomType(e.target.value)}
            style={{ fontSize: "0.85rem", padding: "0.5rem" }}
          >
            <option value="Single">Single Occupancy</option>
            <option value="Double">Double Sharing</option>
            <option value="Triple">Triple Sharing</option>
          </select>
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" style={{ fontSize: "0.8rem" }}>AC Requirement</label>
          <select
            className="form-select"
            value={selectedAcPref}
            onChange={(e) => setSelectedAcPref(e.target.value)}
            style={{ fontSize: "0.85rem", padding: "0.5rem" }}
          >
            <option value="Either">Either (No Preference)</option>
            <option value="AC">AC Mandatory</option>
            <option value="Non-AC">Non-AC</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleAddPreference}
          disabled={!selectedHostelId}
          className="btn btn-primary"
          style={{ height: "2.5rem", fontSize: "0.85rem" }}
        >
          + Add Choice
        </button>
      </div>

      {preferences.length === 0 ? (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            border: "2px dashed var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            color: "var(--text-muted)",
            fontSize: "0.875rem",
          }}
        >
          No preferences selected yet. Use the dropdown above to add your 1st, 2nd, and 3rd choices.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {preferences.map((pref, idx) => (
            <div
              key={pref.hostelId || idx}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.85rem 1rem",
                background: "var(--bg-surface-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    background: idx === 0 ? "var(--primary)" : "var(--bg-surface-hover)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                  }}
                >
                  #{idx + 1}
                </div>

                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{pref.hostelName}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Preference: <strong style={{ color: "var(--text-secondary)" }}>{pref.roomType} Room</strong> � {pref.acPreference}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <button
                  type="button"
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  className="btn btn-secondary btn-sm"
                  title="Move Up"
                  style={{ opacity: idx === 0 ? 0.3 : 1, padding: "0.3rem 0.5rem" }}
                >
                  ?
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(idx)}
                  disabled={idx === preferences.length - 1}
                  className="btn btn-secondary btn-sm"
                  title="Move Down"
                  style={{ opacity: idx === preferences.length - 1 ? 0.3 : 1, padding: "0.3rem 0.5rem" }}
                >
                  ?
                </button>
                <button
                  type="button"
                  onClick={() => removePref(idx)}
                  className="btn btn-danger btn-sm"
                  title="Remove Preference"
                  style={{ padding: "0.3rem 0.5rem", marginLeft: "0.35rem" }}
                >
                  ?
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
