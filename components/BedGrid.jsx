"use client";

import React from "react";

export default function BedGrid({ beds = [], roomNumber }) {
  if (!beds || beds.length === 0) {
    return (
      <div style={{ padding: "0.5rem", fontSize: "0.75rem", color: "#9CA3AF", fontStyle: "italic", textAlign: "center" }}>
        No bed slots mapped for this room.
      </div>
    );
  }

  const vacantCount = beds.filter((b) => !b.isOccupied).length;

  return (
    <div style={{ marginTop: "0.5rem", paddingTop: "0.75rem", borderTop: "1px dashed #CBD5E1" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Bed Slot Availability ({vacantCount}/{beds.length} Available)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "0.5rem" }}>
        {beds.map((bed, index) => {
          const isOccupied = bed.isOccupied;
          const slotLetter = String.fromCharCode(65 + index); // A, B, C...

          return (
            <div
              key={bed._id || index}
              style={{
                backgroundColor: isOccupied ? "#FFFFFF" : "#ECFDF5",
                border: isOccupied ? "1px solid #E2E8F0" : "1px dashed #6EE7B7",
                borderRadius: "8px",
                padding: "0.5rem 0.65rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    color: isOccupied ? "#EA580C" : "#065F46",
                  }}
                >
                  Bed {slotLetter}
                </span>
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: isOccupied ? "#F97316" : "#10B981",
                  }}
                />
              </div>

              <div
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: isOccupied ? "#64748B" : "#047857",
                }}
              >
                {isOccupied ? "Allocated" : "Vacant Slot"}
              </div>

              {isOccupied && bed.occupiedBy?.rollNumber && (
                <div className="font-mono" style={{ fontSize: "0.625rem", color: "#94A3B8" }}>
                  #{bed.occupiedBy.rollNumber}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
