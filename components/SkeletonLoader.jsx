"use client";

import React from "react";

export default function SkeletonLoader({ count = 3, type = "card" }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="glass-panel"
          style={{
            padding: "1.5rem",
            borderRadius: "var(--radius-lg)",
            minHeight: type === "card" ? "260px" : "120px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "20px",
              width: "60%",
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              height: "14px",
              width: "40%",
              backgroundColor: "rgba(255,255,255,0.04)",
              borderRadius: "4px",
            }}
          />
          <div
            style={{
              height: "80px",
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.03)",
              borderRadius: "8px",
              marginTop: "auto",
            }}
          />
        </div>
      ))}
    </div>
  );
}
