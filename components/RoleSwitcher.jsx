"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RoleSwitcher() {
  const router = useRouter();
  const [currentRole, setCurrentRole] = useState("Student");

  useEffect(() => {
    const saved = localStorage.getItem("hostel_user_role");
    if (saved) setCurrentRole(saved);
  }, []);

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setCurrentRole(newRole);
    localStorage.setItem("hostel_user_role", newRole);

    if (newRole === "Warden") {
      router.push("/warden");
    } else if (newRole === "Student") {
      router.push("/apply");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
        Role:
      </span>
      <select
        value={currentRole}
        onChange={handleRoleChange}
        style={{
          background: "var(--bg-surface-elevated)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-sm)",
          padding: "0.3rem 0.6rem",
          fontSize: "0.8rem",
          fontWeight: 600,
          cursor: "pointer",
          outline: "none",
        }}
      >
        <option value="Student">?? Student</option>
        <option value="Warden">??? Warden</option>
        <option value="Hostel Administrator">?? Administrator</option>
      </select>
    </div>
  );
}
