"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, UserCheck, Layers, Building2, ChevronDown } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Overview", icon: Home },
    { href: "/apply", label: "Student", icon: UserCheck },
    { href: "/warden", label: "Warden", icon: Layers },
    { href: "/hostels", label: "Inventory", icon: Building2 },
  ];

  const handlePersonaChange = (e) => {
    const val = e.target.value;
    if (val.startsWith("stu-")) {
      router.push("/apply");
    } else if (val.startsWith("warden-")) {
      router.push("/warden");
    }
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid #E5E7EB",
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        width: "100%",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
      }}
    >
      <div className="container-max">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "4rem",
            gap: "1rem",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "14px",
                boxShadow: "0 2px 8px rgba(249, 115, 22, 0.3)",
              }}
            >
              EH
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
              <span style={{ fontWeight: 800, fontSize: "1rem", color: "#1A1A1A", letterSpacing: "-0.02em" }}>
                EduHostel
              </span>
              <span className="badge-os">OS</span>
            </div>
          </Link>

          {/* Center Segmented Pill Navigation */}
          <nav className="nav-pill-wrapper">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-pill-item ${isActive ? "active" : ""}`}
                >
                  <Icon size={14} color={isActive ? "#F97316" : "#9CA3AF"} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Persona Switcher */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <div style={{ position: "relative" }}>
              <select
                id="role-switcher-select"
                aria-label="Select Testing Persona"
                className="persona-select"
                defaultValue="stu-1"
                onChange={handlePersonaChange}
              >
                <optgroup label="Students">
                  <option value="stu-1">🎓 Arjun Patel (2024CS101)</option>
                  <option value="stu-2">🎓 Rohan Verma (2024CS102)</option>
                  <option value="stu-3">🎓 Priya Sharma (2024EC201)</option>
                  <option value="stu-4">🎓 Vikram Malhotra (2024ME301)</option>
                </optgroup>
                <optgroup label="Staff & Wardens">
                  <option value="warden-1">🧑‍🏫 Dr. S. Sharma (Warden)</option>
                  <option value="warden-chief">🏛️ Prof. V. Raman (Chief Warden)</option>
                  <option value="warden-admin">⚙️ Admin Verma (DSW Secretariat)</option>
                </optgroup>
              </select>
              <div
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: "8px",
                  display: "flex",
                  alignItems: "center",
                  color: "#9CA3AF",
                }}
              >
                <ChevronDown size={12} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
