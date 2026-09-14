"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RoleSwitcher from "./RoleSwitcher";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Overview" },
    { href: "/hostels", label: "Browse Hostels" },
    { href: "/apply", label: "Apply Now" },
    { href: "/warden", label: "Warden Portal" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(11, 15, 25, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "4.5rem",
        }}
      >

        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, var(--primary), var(--secondary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
              boxShadow: "0 0 15px rgba(99, 102, 241, 0.4)",
            }}
          >
            ???
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.15rem", letterSpacing: "-0.02em" }}>
              EduHostel <span style={{ color: "var(--primary)" }}>Alloc</span>
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1 }}>
              Policy-Driven Allocation Engine
            </div>
          </div>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "0.5rem 0.9rem",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "var(--primary)" : "var(--text-secondary)",
                  background: isActive ? "rgba(99, 102, 241, 0.1)" : "transparent",
                  border: isActive ? "1px solid rgba(99, 102, 241, 0.25)" : "1px solid transparent",
                  transition: "all var(--transition-fast)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <RoleSwitcher />
        </div>
      </div>
    </header>
  );
}
