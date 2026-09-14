"use client";

import React from "react";

export default function BedGrid({ beds = [], roomNumber }) {
  if (!beds || beds.length === 0) {
    return (
      <div style={{ padding: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "italic" }}>
        No bed slots mapped for this room.
      </div>
    );
  }

  return (
    <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px dashed var(--border-subtle)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
          Bed Slot Availability ({beds.filter(b => !b.isOccupied).length}/{beds.length} Available)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem" }}>
        {beds.map((bed, index) => {
          const isOccupied = bed.isOccupied;
          return (
            <div
              key={bed._id || index}
              style={{
                background: isOccupied ? "rgba(30, 41, 59, 0.6)" : "rgba(16, 185, 129, 0.08)",
                border: isOccupied ? "1px solid var(--border-subtle)" : "1px solid rgba(16, 185, 129, 0.4)",
                borderRadius: "var(--radius-sm)",
                padding: "0.6rem 0.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
                transition: "all var(--transition-fast)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                  ??? Slot {index + 1}
                </span>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: isOccupied ? "var(--text-muted)" : "var(--success)",
                  }}
                />
              </div>

              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: isOccupied ? "var(--text-muted)" : "var(--success)" }}>
                {isOccupied ? "Occupied" : "Vacant / Available"}
              </div>

              {isOccupied && bed.occupiedBy?.rollNumber && (
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                  Assigned: {bed.occupiedBy.rollNumber}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
