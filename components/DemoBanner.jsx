"use client";

import React, { useState } from "react";
import { Sparkles, X } from "lucide-react";

export default function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Demo Mode Alert"
      style={{
        position: "relative",
        zIndex: 40,
        backgroundColor: "rgba(255, 247, 237, 0.95)",
        color: "#431407",
        borderBottom: "1px solid #FED7AA",
        fontSize: "0.75rem",
        padding: "0.5rem 1rem",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
      }}
    >
      <div
        className="container-max"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", minWidth: 0 }}>
          <span
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1.25rem",
              height: "1.25rem",
              borderRadius: "50%",
              backgroundColor: "#FFEDD5",
              color: "#EA580C",
              border: "1px solid #FDBA74",
            }}
          >
            <Sparkles size={12} />
          </span>
          <p style={{ margin: 0, fontSize: "0.75rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            <span style={{ fontWeight: 700, color: "#9A3412" }}>Demo Mode</span>
            <span style={{ margin: "0 0.4rem", color: "#FDBA74" }}>|</span>
            <span style={{ color: "#7C2D12" }}>
              Seeded sample data, no real students. Deterministic constraint engine active.
            </span>
          </p>
        </div>

        <button
          onClick={() => setDismissed(true)}
          style={{
            flexShrink: 0,
            padding: "2px",
            borderRadius: "4px",
            background: "none",
            border: "none",
            color: "#EA580C",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Dismiss Demo Mode banner"
          title="Dismiss banner"
        >
          <X size={14} />
        </button>
      </div>
    </aside>
  );
}
