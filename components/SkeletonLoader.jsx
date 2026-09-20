"use client";

import React from "react";

export default function SkeletonLoader({ count = 3, type = "card" }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E2E8F0",
            padding: "1.5rem",
            borderRadius: "14px",
            minHeight: type === "card" ? "240px" : "120px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            className="animate-pulse"
            style={{
              height: "20px",
              width: "50%",
              backgroundColor: "#F1F5F9",
              borderRadius: "6px",
            }}
          />
          <div
            className="animate-pulse"
            style={{
              height: "14px",
              width: "75%",
              backgroundColor: "#F8FAFC",
              borderRadius: "4px",
            }}
          />
          <div
            className="animate-pulse"
            style={{
              height: "70px",
              width: "100%",
              backgroundColor: "#F1F5F9",
              borderRadius: "8px",
              marginTop: "auto",
            }}
          />
        </div>
      ))}
    </div>
  );
}
