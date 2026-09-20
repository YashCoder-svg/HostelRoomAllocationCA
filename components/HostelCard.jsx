"use client";

import React from "react";
import { Building2, ArrowRight } from "lucide-react";

export default function HostelCard({ hostel, onSelect }) {
  const percentAvailable =
    hostel.totalCapacity > 0
      ? Math.round((hostel.availableCapacity / hostel.totalCapacity) * 100)
      : 0;

  return (
    <div className="eduhostel-card" style={{ height: "100%" }}>
      <div>
        {/* Top Bar */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <span className="badge-tag-orange">
              {hostel.code || hostel.name} • {hostel.genderAllowed ? hostel.genderAllowed.toUpperCase() : "CO-ED"}
            </span>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0F172A", marginTop: "0.5rem" }}>
              {hostel.name}
            </h3>
            {hostel.campusLocation && (
              <p style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "2px" }}>
                {hostel.campusLocation}
              </p>
            )}
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
        <p style={{ fontSize: "0.75rem", color: "#475569", marginTop: "0.75rem", lineHeight: 1.5 }}>
          {hostel.description || "Hall of Residence with study halls, high-speed Wi-Fi, and laundry facilities."}
        </p>

        {/* Amenities */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", paddingTop: "1rem" }}>
          {(hostel.amenities || ["Wi-Fi 6", "Study Hall", "Solar Geysers", "24/7 Security"]).slice(0, 5).map((amenity, idx) => (
            <span key={idx} className="badge-amenity">
              {amenity}
            </span>
          ))}
          {(hostel.amenities || []).length > 5 && (
            <span className="badge-amenity" style={{ color: "#9CA3AF" }}>
              +{hostel.amenities.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Footer / Progress Bar */}
      <div style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #F1F5F9" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.4rem" }}>
          <span style={{ color: "#64748B" }}>Available Beds:</span>
          <strong className="font-mono" style={{ color: hostel.availableCapacity > 0 ? "#059669" : "#DC2626" }}>
            {hostel.availableCapacity || 18} / {hostel.totalCapacity || 48} ({percentAvailable || 38}%)
          </strong>
        </div>

        <div style={{ height: "5px", width: "100%", backgroundColor: "#F1F5F9", borderRadius: "3px", overflow: "hidden", marginBottom: "1rem" }}>
          <div
            style={{
              height: "100%",
              width: `${percentAvailable || 38}%`,
              backgroundColor: (percentAvailable || 38) > 20 ? "#10B981" : "#F59E0B",
              borderRadius: "3px",
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => onSelect(hostel)}
          className="btn-orange-primary"
          style={{
            width: "100%",
            fontSize: "0.8125rem",
            padding: "0.55rem 1rem",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.4rem",
          }}
        >
          <span>Explore Rooms & Beds</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
