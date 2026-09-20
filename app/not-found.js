import Link from "next/link";
import { Building2, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="container-max"
      style={{
        padding: "5rem 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "14px",
          backgroundColor: "#FFF7ED",
          border: "1px solid #FED7AA",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#EA580C",
          marginBottom: "1.25rem",
        }}
      >
        <Building2 size={28} />
      </div>

      <span className="font-mono" style={{ fontSize: "0.875rem", fontWeight: 700, color: "#EA580C" }}>
        404 • Page Not Found
      </span>

      <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0F172A", marginTop: "0.5rem" }}>
        Hall or Sector Not Located
      </h1>

      <p style={{ color: "#64748B", fontSize: "0.875rem", maxWidth: "480px", margin: "0.5rem auto 1.75rem" }}>
        The residential room or administrative route you requested is not indexed in the campus allocation database.
      </p>

      <Link href="/" className="btn-orange-primary" style={{ padding: "0.6rem 1.25rem", fontSize: "0.8125rem" }}>
        <ArrowLeft size={16} />
        <span>Return to Campus Overview</span>
      </Link>
    </div>
  );
}
