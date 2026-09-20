"use client";

import React, { useState } from "react";
import { Accessibility, Eye, ChevronDown } from "lucide-react";
import BedGrid from "./BedGrid";

export default function RoomCard({ room }) {
  const [showBeds, setShowBeds] = useState(false);

  return (
    <div
      style={{
        padding: "1.25rem",
        borderRadius: "12px",
        backgroundColor: "#F8FAFC",
        border: "1px solid #E2E8F0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "0.75rem",
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div className="font-mono" style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0F172A" }}>
              Room {room.roomNumber}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "2px", display: "flex", alignItems: "center", gap: "4px" }}>
              <span>Floor {room.floor}</span>
              <span>•</span>
              <span>{room.isPwDAccessible ? "Accessible Ramp" : "Standard"}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.35rem" }}>
            <span
              style={{
                fontSize: "0.6875rem",
                padding: "2px 6px",
                borderRadius: "4px",
                fontWeight: 700,
                backgroundColor: "#FFFFFF",
                color: "#475569",
                border: "1px solid #E2E8F0",
              }}
            >
              {room.roomType}
            </span>
            <span
              style={{
                fontSize: "0.6875rem",
                padding: "2px 6px",
                borderRadius: "4px",
                fontWeight: 700,
                backgroundColor: room.acType === "AC" ? "#FFF7ED" : "#F1F5F9",
                color: room.acType === "AC" ? "#C2410C" : "#475569",
                border: room.acType === "AC" ? "1px solid #FED7AA" : "1px solid #E2E8F0",
              }}
            >
              {room.acType}
            </span>
          </div>
        </div>

        {/* Rent & Beds Count */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "0.85rem",
            fontSize: "0.8125rem",
          }}
        >
          <div>
            <span style={{ color: "#64748B" }}>Rent: </span>
            <strong style={{ color: "#0F172A" }}>₹{room.rentPerSemester?.toLocaleString() || "24,000"}</strong>
            <span style={{ fontSize: "0.6875rem", color: "#9CA3AF" }}> / sem</span>
          </div>

          <div>
            <span style={{ color: "#64748B" }}>Available: </span>
            <strong style={{ color: room.availableBeds > 0 ? "#059669" : "#DC2626" }}>
              {room.availableBeds} / {room.totalBeds} Beds
            </strong>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowBeds(!showBeds)}
        style={{
          width: "100%",
          padding: "0.45rem",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #CBD5E1",
          color: "#334155",
          fontSize: "0.75rem",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          marginTop: "0.5rem",
        }}
      >
        <span>{showBeds ? "Hide Bed Slots" : "Inspect Bed Layout"}</span>
        <ChevronDown size={14} style={{ transform: showBeds ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
      </button>

      {showBeds && <BedGrid beds={room.beds} roomNumber={room.roomNumber} />}
    </div>
  );
}
