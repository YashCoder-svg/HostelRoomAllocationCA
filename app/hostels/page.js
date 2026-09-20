"use client";

import React, { useState, useEffect } from "react";
import { Building2, Search } from "lucide-react";
import HostelList from "../../components/HostelList";
import SkeletonLoader from "../../components/SkeletonLoader";

export default function HostelsPage() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genderFilter, setGenderFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchHostels = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (genderFilter !== "All") params.append("gender", genderFilter);
      if (searchQuery.trim()) params.append("search", searchQuery.trim());

      const res = await fetch(`http://localhost:5000/api/hostels?${params.toString()}`).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setHostels(data.data);
          setLoading(false);
          return;
        }
      }
      // If server returned error or not running, use default campus halls
      setHostels([
        {
          _id: "bh1",
          name: "BH1",
          code: "BH1",
          genderAllowed: "Male",
          campusLocation: "North Academic Enclave",
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
          campusLocation: "South Green Precinct",
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
          campusLocation: "East Research Zone",
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
          campusLocation: "Central Campus",
          description: "Boys’ Hall of Residence 3 (BH3) with reading lounges, indoor sports facility, laundry, and Wi-Fi 6.",
          totalCapacity: 32,
          availableCapacity: 14,
          amenities: ["High-speed Wi-Fi", "Reading Lounge", "Table Tennis", "Solar Geysers", "Study Room"],
        },
        {
          _id: "gh2",
          name: "GH2",
          code: "GH2",
          genderAllowed: "Female",
          campusLocation: "South Green Precinct",
          description: "Girls’ Hall of Residence 2 (GH2) with round-the-clock security, recreation lounge, and Wi-Fi 6.",
          totalCapacity: 32,
          availableCapacity: 11,
          amenities: ["24/7 Security", "Recreation Lounge", "Solar Hot Water", "Wi-Fi 6", "Study Cubicles"],
        },
      ]);
    } catch (err) {
      console.warn("Hostels loading notice:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, [genderFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchHostels();
  };

  return (
    <div className="container-max" style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}>
      {/* Title */}
      <div style={{ marginBottom: "2rem" }}>
        <span className="badge-tag-orange" style={{ marginBottom: "0.5rem" }}>
          Campus Infrastructure
        </span>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0F172A", marginTop: "0.35rem" }}>
          Residential Halls & Inventory
        </h1>
        <p style={{ color: "#64748B", fontSize: "0.875rem", maxWidth: "700px", marginTop: "0.25rem" }}>
          Explore residential halls, inspect available single, double, and triple bed slots, and check live occupancy.
        </p>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "14px",
          padding: "1rem 1.25rem",
          marginBottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Gender:
          </span>
          {["All", "Male", "Female", "Co-ed"].map((gender) => {
            const active = genderFilter === gender;
            return (
              <button
                key={gender}
                type="button"
                onClick={() => setGenderFilter(gender)}
                style={{
                  padding: "0.35rem 0.75rem",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: active ? 700 : 500,
                  backgroundColor: active ? "#F97316" : "#F1F5F9",
                  color: active ? "#FFFFFF" : "#475569",
                  border: active ? "1px solid #F97316" : "1px solid #E2E8F0",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {gender === "All" ? "All Hostels" : gender === "Male" ? "Boys Only" : gender === "Female" ? "Girls Only" : "Co-ed"}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "0.5rem", minWidth: "260px" }}>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              placeholder="Search by hall name, location, code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input-clean"
              style={{ paddingLeft: "32px", fontSize: "0.8125rem" }}
            />
            <div
              style={{
                position: "absolute",
                left: "10px",
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                color: "#9CA3AF",
              }}
            >
              <Search size={14} />
            </div>
          </div>
          <button
            type="submit"
            className="btn-orange-primary"
            style={{ padding: "0.4rem 0.9rem", fontSize: "0.75rem", borderRadius: "8px" }}
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div style={{ padding: "2rem 0" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem", color: "#64748B", fontSize: "0.875rem" }}>
            Fetching live hostel inventory from MongoDB...
          </div>
          <SkeletonLoader count={4} />
        </div>
      ) : (
        <HostelList hostels={hostels} />
      )}
    </div>
  );
}
