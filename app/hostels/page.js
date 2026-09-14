"use client";

import React, { useState, useEffect } from "react";
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

      const res = await fetch(`/api/hostels?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.success) {
        setHostels(data.data);
      } else {
        throw new Error(data.message || "Failed to load hostels");
      }
    } catch (err) {
      console.error("Error loading hostels:", err);
      setError("Unable to connect to the backend inventory service. Please ensure the API is running.");
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
    <div className="container">

      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "inline-block", marginBottom: "0.5rem" }}>
          <span className="badge badge-primary">Campus Inventory</span>
        </div>
        <h1 style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>Browse University Hostels</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "700px" }}>
          Explore residential halls, inspect available single, double, and triple bed slots, and check live occupancy.
        </p>
      </div>

      <div
        className="glass-panel"
        style={{
          padding: "1.25rem",
          borderRadius: "var(--radius-lg)",
          marginBottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>
            Gender Allowed:
          </span>
          {["All", "Male", "Female", "Co-ed"].map((gender) => (
            <button
              key={gender}
              type="button"
              onClick={() => setGenderFilter(gender)}
              className={`btn btn-sm ${genderFilter === gender ? "btn-primary" : "btn-secondary"}`}
            >
              {gender === "All" ? "All Hostels" : gender === "Male" ? "?? Boys Only" : gender === "Female" ? "?? Girls Only" : "?? Co-ed"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "0.5rem", minWidth: "280px" }}>
          <input
            type="text"
            placeholder="Search by name, location, code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ padding: "0.5rem 0.85rem", fontSize: "0.875rem" }}
          />
          <button type="submit" className="btn btn-secondary btn-sm">
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div>
          <div style={{ textAlign: "center", marginBottom: "1.5rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Fetching live hostel inventory from MongoDB...
          </div>
          <SkeletonLoader count={4} />
        </div>
      ) : error ? (
        <div
          className="glass-panel"
          style={{
            padding: "3rem",
            textAlign: "center",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--danger)",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>??</div>
          <h3 style={{ color: "var(--danger)", marginBottom: "0.5rem" }}>Connection Error</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>{error}</p>
          <button type="button" onClick={fetchHostels} className="btn btn-primary">
            Retry Loading Hostels
          </button>
        </div>
      ) : (
        <HostelList hostels={hostels} />
      )}
    </div>
  );
}
