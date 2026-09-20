"use client";

import Link from "next/link";
import { Building2, MapPin, Phone, Mail, Shield, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #E5E7EB",
        backgroundColor: "#FFFFFF",
        color: "#4B5563",
        fontSize: "0.75rem",
        marginTop: "5rem",
      }}
    >
      <div className="container-max" style={{ padding: "3rem 1.25rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {/* Col 1: System Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "8px",
                  backgroundColor: "#F97316",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  boxShadow: "0 2px 4px rgba(249, 115, 22, 0.25)",
                }}
              >
                <Building2 size={18} />
              </div>
              <span style={{ color: "#1A1A1A", fontWeight: 700, fontSize: "0.9375rem" }}>
                EduHostel · LPU
              </span>
            </div>

            <p style={{ fontSize: "0.75rem", lineHeight: 1.6, color: "#6B7280" }}>
              Hostel Affairs & Student Housing System.<br />
              Office of the Dean of Student Welfare (DSW).<br />
              Hostel Management & Residence Secretariat.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "#6B7280" }}>
              <MapPin size={14} color="#F97316" />
              <span>Block 30, Division of Student Welfare</span>
            </div>
          </div>

          {/* Col 2: Residential Halls */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <h4 style={{ color: "#1A1A1A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.75rem" }}>
              Residential Halls
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.75rem" }}>
              <div>
                <span style={{ fontWeight: 700, display: "block", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#C2410C" }}>
                  Boys’ Halls (BH1–BH6)
                </span>
                <p className="font-mono" style={{ color: "#6B7280", fontSize: "0.6875rem", marginTop: "2px" }}>
                  BH1, BH2, BH3, BH4, BH5, BH6
                </p>
              </div>

              <div>
                <span style={{ fontWeight: 700, display: "block", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#C2410C" }}>
                  Girls’ Halls (GH1–GH4)
                </span>
                <p className="font-mono" style={{ color: "#6B7280", fontSize: "0.6875rem", marginTop: "2px" }}>
                  GH1, GH2, GH3, GH4
                </p>
              </div>

              <p style={{ fontSize: "0.6875rem", color: "#059669", fontWeight: 600 }}>
                ● 10 Campus Halls Active & Mapped
              </p>
            </div>
          </div>

          {/* Col 3: Quick Access */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <h4 style={{ color: "#1A1A1A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.75rem" }}>
              Quick Access
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.75rem", padding: 0 }}>
              <li>
                <Link href="/" style={{ color: "#EA580C", fontWeight: 600 }}>
                  Overview & Telemetry Dashboard →
                </Link>
              </li>
              <li>
                <Link href="/apply" style={{ color: "#4B5563" }}>
                  Student Application Portal ➔
                </Link>
              </li>
              <li>
                <Link href="/warden" style={{ color: "#4B5563" }}>
                  Warden Bed Map & Review ➔
                </Link>
              </li>
              <li>
                <Link href="/hostels" style={{ color: "#4B5563" }}>
                  Residential Halls & Inventory ➔
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Helpline & Assistance */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <h4 style={{ color: "#1A1A1A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.75rem" }}>
              Helpline & Assistance
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.75rem" }}>
              <p style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#4B5563" }}>
                <Phone size={14} color="#059669" />
                <span>Hostel Control Desk: +91 1824 517000</span>
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#4B5563" }}>
                <Mail size={14} color="#F97316" />
                <span>hostel.helpdesk@lpu.co.in</span>
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#E11D48", fontWeight: 600 }}>
                <Shield size={14} color="#E11D48" />
                <span>Anti-Ragging 24/7 Helpline: 1800-180-5522</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid #E5E7EB",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            fontSize: "0.6875rem",
            color: "#9CA3AF",
          }}
        >
          <p>© 2026 EduHostel • University Residential Housing Allocation System.</p>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "#6B7280" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span>Policy-Driven Constraint Solver</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
