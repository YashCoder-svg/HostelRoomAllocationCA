"use client";

import React from "react";

export default function StatusBadge({ status }) {
  const normalized = (status || "").toUpperCase();

  let bg = "#EFF6FF";
  let color = "#1D4ED8";
  let border = "#BFDBFE";
  let dot = "#3B82F6";
  let label = status;

  switch (normalized) {
    case "SUBMITTED":
      bg = "#FFF7ED";
      color = "#C2410C";
      border = "#FED7AA";
      dot = "#F97316";
      label = "Submitted";
      break;
    case "UNDER_REVIEW":
      bg = "#FFFBEB";
      color = "#B45309";
      border = "#FDE68A";
      dot = "#F59E0B";
      label = "Under Review";
      break;
    case "ALLOCATED":
      bg = "#ECFDF5";
      color = "#047857";
      border = "#A7F3D0";
      dot = "#10B981";
      label = "Allocated";
      break;
    case "REJECTED":
      bg = "#FEF2F2";
      color = "#B91C1C";
      border = "#FECACA";
      dot = "#EF4444";
      label = "Rejected";
      break;
    default:
      label = status;
  }

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "2px 8px",
        borderRadius: "9999px",
        fontSize: "0.6875rem",
        fontWeight: 700,
        backgroundColor: bg,
        color: color,
        border: `1px solid ${border}`,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: dot,
        }}
      />
      {label}
    </span>
  );
}
