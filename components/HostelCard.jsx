"use client";

import React from "react";

export default function HostelCard({ hostel, onSelect }) {
  const percentAvailable =
    hostel.totalCapacity > 0
      ? Math.round((hostel.availableCapacity / hostel.totalCapacity) * 100)
      : 0;

  const getGenderBadge = (gender) => {
    switch (gender) {
      case "Male":
        return <span className="badge badge-primary">?? Boys Hostel</span>;
      case "Female":
        return <span className="badge badge-warning">?? Girls Hostel</span>;
      default:
        return <span className="badge badge-success">?? Co-ed Residence</span>;
    }
  };

  return (
    <div
      className="glass-panel"
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform var(--transition-normal), box-shadow var(--transition-normal)",
      }}
    >

      <div
        style={{
          height: "160px",
          background: `linear-gradient(180deg, rgba(0,0,0,0.1), rgba(17,24,39,0.9)), url(${hostel.imageUrl || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"}) center/cover no-repeat`,
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, background: "rgba(0,0,0,0.6)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
            {hostel.code}
          </span>
          {getGenderBadge(hostel.genderAllowed)}
        </div>

        <div>
          <h3 style={{ fontSize: "1.25rem", color: "#ffffff", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
            {hostel.name}
          </h3>
          <p style={{ fontSize: "0.8rem", color: "#cbd5e1" }}>
            ?? {hostel.campusLocation}
          </p>
        </div>
      </div>

      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1, gap: "1rem" }}>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
          {hostel.description}
        </p>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "0.35rem" }}>
            <span style={{ color: "var(--text-muted)" }}>Available Capacity:</span>
            <strong style={{ color: hostel.availableCapacity > 0 ? "var(--success)" : "var(--danger)" }}>
              {hostel.availableCapacity} / {hostel.totalCapacity} Beds ({percentAvailable}%)
            </strong>
          </div>
          <div style={{ height: "6px", width: "100%", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${percentAvailable}%`,
                background: percentAvailable > 20 ? "var(--success)" : "var(--warning)",
                borderRadius: "3px",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {(hostel.amenities || []).slice(0, 4).map((amenity, idx) => (
            <span
              key={idx}
              style={{
                fontSize: "0.725rem",
                padding: "0.2rem 0.5rem",
                background: "var(--bg-surface-elevated)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                color: "var(--text-secondary)",
              }}
            >
              ? {amenity}
            </span>
          ))}
          {(hostel.amenities || []).length > 4 && (
            <span style={{ fontSize: "0.725rem", padding: "0.2rem 0.4rem", color: "var(--text-muted)" }}>
              +{hostel.amenities.length - 4} more
            </span>
          )}
        </div>

        <div style={{ marginTop: "auto", paddingTop: "0.75rem" }}>
          <button
            type="button"
            onClick={() => onSelect(hostel)}
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            Explore Rooms & Beds ?
          </button>
        </div>
      </div>
    </div>
  );
}
