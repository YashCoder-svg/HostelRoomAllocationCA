"use client";

import React, { useState } from "react";
import BedGrid from "./BedGrid";

export default function RoomCard({ room }) {
  const [showBeds, setShowBeds] = useState(false);

  return (
    <div
      className="glass-panel"
      style={{
        padding: "1.25rem",
        borderRadius: "var(--radius-md)",
        background: "var(--bg-surface-elevated)",
        transition: "all var(--transition-fast)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
        <div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Room {room.roomNumber}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Floor {room.floor} � {room.isPwDAccessible ? "? Accessible" : "Standard"}
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.35rem" }}>
          <span className="badge badge-primary">{room.roomType}</span>
          <span className={`badge ${room.acType === "AC" ? "badge-success" : "badge-warning"}`}>
            {room.acType}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem", fontSize: "0.875rem" }}>
        <div>
          <span style={{ color: "var(--text-muted)" }}>Rent: </span>
          <strong style={{ color: "var(--text-primary)" }}>?{room.rentPerSemester?.toLocaleString()}</strong>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}> / sem</span>
        </div>

        <div>
          <span style={{ color: "var(--text-muted)" }}>Available: </span>
          <span style={{ fontWeight: 700, color: room.availableBeds > 0 ? "var(--success)" : "var(--danger)" }}>
            {room.availableBeds} / {room.totalBeds} Beds
          </span>
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button
          type="button"
          onClick={() => setShowBeds(!showBeds)}
          className="btn btn-secondary btn-sm"
          style={{ width: "100%", fontSize: "0.8rem" }}
        >
          {showBeds ? "Hide Bed Slots ?" : "Inspect Bed Layout ?"}
        </button>
      </div>

      {showBeds && <BedGrid beds={room.beds} roomNumber={room.roomNumber} />}
    </div>
  );
}
