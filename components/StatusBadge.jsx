"use client";

import React from "react";

export default function StatusBadge({ status }) {
  const normalized = (status || "").toUpperCase();

  let badgeClass = "badge-primary";
  let label = status;

  switch (normalized) {
    case "SUBMITTED":
      badgeClass = "badge-primary";
      label = "Submitted";
      break;
    case "UNDER_REVIEW":
      badgeClass = "badge-warning";
      label = "Under Review";
      break;
    case "ALLOCATED":
      badgeClass = "badge-success";
      label = "Allocated";
      break;
    case "REJECTED":
      badgeClass = "badge-danger";
      label = "Rejected";
      break;
    case "DRAFT":
      badgeClass = "badge-primary";
      label = "Draft";
      break;
    default:
      badgeClass = "badge-primary";
      label = status;
  }

  return (
    <span className={`badge ${badgeClass}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "currentColor",
        }}
      />
      {label}
    </span>
  );
}
