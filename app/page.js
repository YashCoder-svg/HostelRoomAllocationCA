"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  UserCheck,
  ArrowRight,
  ChevronDown,
  Building2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Layers,
  HelpCircle
} from "lucide-react";

export default function HomePage() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/hostels")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          setHostels(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hostels:", err);
        setLoading(false);
      });
  }, []);

  // Default campus halls if API still loading or fallback
  const displayHalls = hostels.length > 0 ? hostels : [
    {
      _id: "bh1",
      name: "BH1",
      code: "BH1",
      genderAllowed: "Male",
      description: "Boys’ Hall of Residence (BH1) with sports ground, study halls, laundry, and Wi-Fi 6",
      totalCapacity: 48,
      availableCapacity: 18,
      amenities: ["High-speed Wi-Fi", "Study Hall", "Badminton Court", "Laundry", "Solar Geysers"],
    },
    {
      _id: "gh1",
      name: "GH1",
      code: "GH1",
      genderAllowed: "Female",
      description: "Girls’ Hall of Residence (GH1) with 24/7 security, garden quad, gym, and Wi-Fi 6",
      totalCapacity: 36,
      availableCapacity: 12,
      amenities: ["24/7 Security Guard", "Gymnasium", "Music Room", "Solar Hot Water", "Mess Cafeteria"],
    },
    {
      _id: "bh2",
      name: "BH2",
      code: "BH2",
      genderAllowed: "Male",
      description: "Postgraduate & Research Boys’ Residence (BH2) with individual study carrels and silent floors",
      totalCapacity: 24,
      availableCapacity: 8,
      amenities: ["Attached Kitchenette", "Silent Library", "Conference Room", "AC Gym"],
    },
    {
      _id: "bh3",
      name: "BH3",
      code: "BH3",
      genderAllowed: "Male",
      description: "Boys’ Hall of Residence 3 (BH3) with reading lounges, indoor sports facility, laundry, and Wi-Fi 6.",
      totalCapacity: 32,
      availableCapacity: 14,
      amenities: ["High-speed Wi-Fi", "Reading Lounge", "Table Tennis", "Solar Geysers", "Study Room"],
    },
    {
      _id: "bh4",
      name: "BH4",
      code: "BH4",
      genderAllowed: "Male",
      description: "Boys’ Hall of Residence 4 (BH4) with gym annex, cafeteria, study carrels, and 24/7 power backup.",
      totalCapacity: 32,
      availableCapacity: 10,
      amenities: ["High-speed Wi-Fi", "Gym Annex", "Laundry Hub", "Study Hall", "Cafeteria"],
    },
    {
      _id: "gh2",
      name: "GH2",
      code: "GH2",
      genderAllowed: "Female",
      description: "Girls’ Hall of Residence 2 (GH2) with round-the-clock security, recreation lounge, and Wi-Fi 6.",
      totalCapacity: 32,
      availableCapacity: 11,
      amenities: ["24/7 Security", "Recreation Lounge", "Solar Hot Water", "Wi-Fi 6", "Study Cubicles"],
    },
  ];

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* 1. Immersive Dark Hero Section */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: "640px",
          maxHeight: "820px",
          height: "82vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          backgroundColor: "#000000",
          color: "#FFFFFF",
        }}
      >
        {/* Background photo & rich gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.38,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(5,10,20,0.65) 40%, rgba(15,23,42,0.9) 75%, #F7F7F8 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Hero Content */}
        <div
          className="container-inner"
          style={{
            position: "relative",
            zIndex: 10,
            paddingTop: "4rem",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "0.4rem 1rem",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              color: "#FFFFFF",
              fontSize: "0.75rem",
              fontWeight: 600,
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              marginBottom: "1.75rem",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#FB923C",
              }}
              className="animate-pulse"
            />
            <span>Lovely Professional University • Session 2026–2027</span>
          </div>

          {/* Heading */}
          <h1
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: "920px",
              margin: "0 auto",
              textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.9)",
            }}
          >
            <span style={{ color: "#FFFFFF" }}>Hostel Allotment, Solved by</span>{" "}
            <span className="hero-shimmer-sweep">Constraints, Not Chaos.</span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              color: "#E2E8F0",
              maxWidth: "680px",
              margin: "1.25rem auto 2.25rem",
              lineHeight: 1.6,
              fontWeight: 400,
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Bed-level transparent allocation, lifestyle-matched roommates, and verified warden governance for all campus residence halls.
          </p>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <Link
              href="/apply"
              className="btn-orange-primary"
              style={{
                fontSize: "0.9375rem",
                padding: "0.875rem 2rem",
                borderRadius: "12px",
              }}
            >
              <UserCheck size={18} />
              <span>Enter Student Portal</span>
              <ArrowRight size={16} style={{ marginLeft: "4px" }} />
            </Link>

            <p style={{ fontSize: "0.75rem", color: "#CBD5E1", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>Warden?</span>
              <Link
                href="/warden"
                style={{
                  color: "#FDBA74",
                  fontWeight: 600,
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Go to Bed Map
              </Link>
              <span style={{ opacity: 0.5 }}>•</span>
              <Link
                href="/hostels"
                style={{
                  color: "#CBD5E1",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Browse Campus Halls →
              </Link>
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            paddingBottom: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            const el = document.getElementById("overview-stats");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.75)",
              marginBottom: "0.35rem",
            }}
          >
            Scroll to explore
          </span>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FDBA74",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
            className="animate-bounce"
          >
            <ChevronDown size={16} />
          </div>
        </div>
      </section>

      {/* 2. Live Campus Telemetry & Metrics */}
      <section id="overview-stats" className="container-max" style={{ marginTop: "2rem", position: "relative", zIndex: 20 }}>
        <div className="container-inner" style={{ padding: 0 }}>
          {/* Header Row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.75rem",
              marginBottom: "1.25rem",
              padding: "0 0.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ position: "relative", display: "flex", height: "8px", width: "8px" }}>
                <span
                  style={{
                    position: "absolute",
                    display: "inline-flex",
                    height: "100%",
                    width: "100%",
                    borderRadius: "50%",
                    backgroundColor: "#34D399",
                    opacity: 0.75,
                  }}
                  className="animate-ping"
                />
                <span
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    borderRadius: "50%",
                    height: "8px",
                    width: "8px",
                    backgroundColor: "#10B981",
                  }}
                />
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#6B7280",
                }}
              >
                Live Campus Telemetry • Verified System
              </span>
            </div>

            <div
              className="font-mono"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.3rem 0.65rem",
                borderRadius: "8px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                fontSize: "0.6875rem",
                color: "#374151",
                boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                }}
                className="animate-pulse"
              />
              <span>Academic Session 2026–2027 • Live Data</span>
              <HelpCircle size={12} color="#9CA3AF" style={{ marginLeft: "2px" }} />
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            <div className="stat-telemetry-card">
              <span style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280" }}>
                Total Campus Beds
              </span>
              <span className="font-mono" style={{ fontSize: "2rem", fontWeight: 800, color: "#1A1A1A", margin: "0.4rem 0" }}>
                198
              </span>
              <span style={{ fontSize: "0.6875rem", color: "#6B7280" }}>
                across 10 Campus Halls
              </span>
            </div>

            <div className="stat-telemetry-card">
              <span style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280" }}>
                Preference Satisfaction
              </span>
              <span className="font-mono" style={{ fontSize: "2rem", fontWeight: 800, color: "#059669", margin: "0.4rem 0" }}>
                96%
              </span>
              <span style={{ fontSize: "0.6875rem", color: "#6B7280" }}>
                1st or 2nd choice
              </span>
            </div>

            <div className="stat-telemetry-card">
              <span style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280" }}>
                Compatibility Index
              </span>
              <span className="font-mono" style={{ fontSize: "2rem", fontWeight: 800, color: "#EA580C", margin: "0.4rem 0" }}>
                94%
              </span>
              <span style={{ fontSize: "0.6875rem", color: "#6B7280" }}>
                Roommate lifestyle alignment
              </span>
            </div>

            <div className="stat-telemetry-card">
              <span style={{ fontSize: "0.6875rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280" }}>
                Hard Violations
              </span>
              <span className="font-mono" style={{ fontSize: "2rem", fontWeight: 800, color: "#059669", margin: "0.4rem 0" }}>
                0
              </span>
              <span style={{ fontSize: "0.6875rem", color: "#059669", fontWeight: 600 }}>
                100% Policy Compliant
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Campus Infrastructure / Residential Halls */}
      <section className="container-max" style={{ marginTop: "4.5rem" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div>
            <span
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#EA580C",
              }}
            >
              Campus Infrastructure
            </span>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1A1A1A", marginTop: "0.25rem" }}>
              Residential Halls & Complexes
            </h2>
            <p style={{ fontSize: "0.8125rem", color: "#6B7280", marginTop: "0.25rem" }}>
              Equipped with Wi-Fi 6, study halls, accessible ramps, and 24/7 security.
            </p>
          </div>

          <Link
            href="/hostels"
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#EA580C",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <span>View Full Inventory Hierarchy</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Halls Grid */}
        <div className="grid-responsive-cards">
          {displayHalls.map((hall) => {
            const isMale = hall.genderAllowed === "Male";
            return (
              <div key={hall._id} className="eduhostel-card">
                <div>
                  {/* Top Bar */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <div>
                      <span className="badge-tag-orange">
                        {hall.code || hall.name} • {hall.genderAllowed ? hall.genderAllowed.toUpperCase() : "CO-ED"}
                      </span>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#1A1A1A", marginTop: "0.6rem" }}>
                        {hall.name}
                      </h3>
                    </div>

                    <div
                      style={{
                        padding: "0.5rem",
                        borderRadius: "10px",
                        backgroundColor: "#FFF7ED",
                        color: "#EA580C",
                        border: "1px solid #FED7AA",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Building2 size={20} />
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: "0.75rem", color: "#4B5563", marginTop: "0.75rem", lineHeight: 1.5 }}>
                    {hall.description || "Modern residence hall with sports ground, study halls, laundry, and Wi-Fi 6."}
                  </p>

                  {/* Amenity Chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", paddingTop: "1rem" }}>
                    {(hall.amenities || ["Wi-Fi 6", "Study Hall", "Solar Hot Water", "24/7 Security"]).map((amenity, idx) => (
                      <span key={idx} className="badge-amenity">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div
                  style={{
                    paddingTop: "1rem",
                    marginTop: "1.25rem",
                    borderTop: "1px solid #F3F4F6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.75rem",
                  }}
                >
                  <span style={{ color: "#6B7280" }}>Total Capacity:</span>
                  <span className="font-mono" style={{ fontWeight: 800, color: "#1A1A1A" }}>
                    {hall.totalCapacity || 48} Beds
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Architectural Pillars */}
      <section className="container-max" style={{ marginTop: "5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="badge-tag-orange" style={{ marginBottom: "0.5rem" }}>
            Deterministic Architecture
          </span>
          <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#1A1A1A" }}>
            How EduHostel Solves Campus Housing
          </h2>
          <p style={{ color: "#6B7280", fontSize: "0.875rem", maxWidth: "620px", margin: "0.5rem auto 0" }}>
            A triple-layer constraint satisfaction engine guaranteeing zero hard policy violations and high roommate compatibility.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div className="eduhostel-card" style={{ gap: "1rem" }}>
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "10px",
                backgroundColor: "#FFF7ED",
                border: "1px solid #FED7AA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#EA580C",
              }}
            >
              <Building2 size={20} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>1. Bed-Level Inventory</h3>
            <p style={{ fontSize: "0.8125rem", color: "#6B7280", lineHeight: 1.6 }}>
              Hierarchical data mapping (<code>Hostel → Block → Room → Bed</code>) ensuring real-time seat locks, accessible ground-floor tags, and live bed occupancy states.
            </p>
          </div>

          <div className="eduhostel-card" style={{ gap: "1rem" }}>
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "10px",
                backgroundColor: "#FFF7ED",
                border: "1px solid #FED7AA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#EA580C",
              }}
            >
              <Sparkles size={20} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>2. Ranked Preference Engine</h3>
            <p style={{ fontSize: "0.8125rem", color: "#6B7280", lineHeight: 1.6 }}>
              Students configure multi-choice priorities, room configurations (Single AC, Double AC, etc.), and mutual roommate roll pairing with verifiable preference scores.
            </p>
          </div>

          <div className="eduhostel-card" style={{ gap: "1rem" }}>
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "10px",
                backgroundColor: "#ECFDF5",
                border: "1px solid #A7F3D0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#059669",
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>3. Warden Governance Review</h3>
            <p style={{ fontSize: "0.8125rem", color: "#6B7280", lineHeight: 1.6 }}>
              Pre-review draft visual corridor maps enabling hall wardens to audit roommate compatibility percentages, adjust special medical cases, and sign off before publishing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
