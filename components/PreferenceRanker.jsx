"use client";

import React, { useState } from "react";
import { Check, Info, Sparkles } from "lucide-react";

export default function PreferenceRanker({
  hostels = [],
  preferences = [],
  roomConfigs = ["DOUBLE AC", "SINGLE AC"],
  onConfigsChange,
  onPreferencesChange,
}) {
  // Default list of hostels to display if API is still fetching or empty
  const defaultHostels = [
    { _id: "bh1", code: "BH1", name: "BH1", description: "Boys’ Hall of Residence (BH1) with sports ground, study halls, laundry, and Wi-Fi 6" },
    { _id: "bh2", code: "BH2", name: "BH2", description: "Postgraduate & Research Boys’ Residence (BH2) with individual study carrels and silent floors" },
    { _id: "bh3", code: "BH3", name: "BH3", description: "Boys’ Hall of Residence 3 (BH3) with reading lounges, indoor sports facility, laundry, and Wi-Fi 6." },
    { _id: "bh4", code: "BH4", name: "BH4", description: "Boys’ Hall of Residence 4 (BH4) with gym annex, cafeteria, study carrels, and 24/7 power backup." },
    { _id: "bh5", code: "BH5", name: "BH5", description: "Boys’ Hall of Residence 5 (BH5) with central courtyard, basketball quad, and solar hot water." },
    { _id: "bh6", code: "BH6", name: "BH6", description: "Boys’ Hall of Residence 6 (BH6) with air-conditioned reading halls, recreation room, and Wi-Fi 6." },
  ];

  const availableHostels = hostels.length > 0 ? hostels : defaultHostels;

  // Toggle hostel in ranked preferences
  const toggleHostelRank = (hostel) => {
    const existingIndex = preferences.findIndex(
      (p) => (p.hostelId && p.hostelId === hostel._id) || p.hostelName === (hostel.name || hostel.code)
    );

    if (existingIndex >= 0) {
      // Remove from preferences
      const updated = preferences.filter((_, idx) => idx !== existingIndex);
      // Re-assign priorities
      updated.forEach((p, idx) => {
        p.priority = idx + 1;
      });
      onPreferencesChange(updated);
    } else {
      // Add as next priority
      const newPriority = preferences.length + 1;
      const newPref = {
        hostelId: hostel._id,
        hostelName: hostel.name || hostel.code,
        roomType: "Double",
        acPreference: "AC",
        priority: newPriority,
      };
      onPreferencesChange([...preferences, newPref]);
    }
  };

  const getRankNumber = (hostel) => {
    const idx = preferences.findIndex(
      (p) => (p.hostelId && p.hostelId === hostel._id) || p.hostelName === (hostel.name || hostel.code)
    );
    return idx >= 0 ? idx + 1 : null;
  };

  // Toggle room configuration
  const toggleConfig = (cfg) => {
    if (roomConfigs.includes(cfg)) {
      if (roomConfigs.length === 1) return; // keep at least 1
      onConfigsChange(roomConfigs.filter((c) => c !== cfg));
    } else {
      onConfigsChange([...roomConfigs, cfg]);
    }
  };

  const allConfigs = ["DOUBLE AC", "SINGLE AC", "DOUBLE NON AC", "TRIPLE NON AC"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* 1. Ranked Residence Choices */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#1F2937" }}>
            Ranked Residence Choices
          </label>
          <span style={{ fontSize: "0.6875rem", color: "#9CA3AF" }}>
            Click card to toggle preference order
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {availableHostels.map((hostel) => {
            const rank = getRankNumber(hostel);
            const isRanked = rank !== null;

            return (
              <div
                key={hostel._id || hostel.code}
                onClick={() => toggleHostelRank(hostel)}
                className={`pref-rank-card ${isRanked ? "ranked" : ""}`}
              >
                <div style={{ marginBottom: "0.25rem" }}>
                  {isRanked ? (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: "#EA580C",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Choice {rank}
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#9CA3AF",
                      }}
                    >
                      Unranked (Click to rank)
                    </span>
                  )}
                </div>

                <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#111827", margin: "0.2rem 0" }}>
                  {hostel.name || hostel.code}
                </h4>

                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#4B5563",
                    marginTop: "0.25rem",
                    lineHeight: 1.45,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {hostel.description || "Hall of Residence with study halls, sports quad, and Wi-Fi 6."}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Preferred Room Configurations */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        <label style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#1F2937" }}>
          Preferred Room Configurations
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {allConfigs.map((cfg) => {
            const active = roomConfigs.includes(cfg);
            return (
              <button
                type="button"
                key={cfg}
                onClick={() => toggleConfig(cfg)}
                style={{
                  padding: "0.45rem 0.9rem",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: active ? 700 : 500,
                  border: active ? "1px solid #EA580C" : "1px solid #E5E7EB",
                  backgroundColor: active ? "#FFF7ED" : "#FFFFFF",
                  color: active ? "#C2410C" : "#374151",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {cfg}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
