"use client";

import React, { useState } from "react";
import {
  Layers,
  ShieldCheck,
  Sparkles,
  Accessibility,
  ArrowRightLeft,
  CheckCircle2,
  Users,
  Search,
  Check,
  X
} from "lucide-react";
import AllocationTable from "./AllocationTable";

export default function WardenDashboard({ stats = {}, applications = [] }) {
  const [activeTab, setActiveTab] = useState("bedmap");
  const [selectedHostel, setSelectedHostel] = useState("BH1");
  const [selectedFloor, setSelectedFloor] = useState(0); // 0 = Ground, 1 = Floor 1, 2 = Floor 2
  const [draftApproved, setDraftApproved] = useState(false);
  const [draftPublished, setDraftPublished] = useState(false);

  // Sample floor rooms and beds for BH1 Ground Floor
  const [corridorRooms, setCorridorRooms] = useState([
    {
      roomNumber: "001",
      type: "DOUBLE NON_AC",
      isAccessible: true,
      beds: [
        {
          slot: "A",
          occupied: true,
          studentName: "Vikram Malhotra",
          rollNumber: "2024ME301",
          compatibility: "80%",
          choice: "Choice #1",
        },
        {
          slot: "B",
          occupied: false,
        },
      ],
    },
    {
      roomNumber: "002",
      type: "DOUBLE AC",
      isAccessible: true,
      beds: [
        { slot: "A", occupied: false },
        { slot: "B", occupied: false },
      ],
    },
    {
      roomNumber: "003",
      type: "DOUBLE NON_AC",
      isQuiet: true,
      beds: [
        { slot: "A", occupied: false },
        { slot: "B", occupied: false },
      ],
    },
    {
      roomNumber: "004",
      type: "DOUBLE AC",
      isQuiet: true,
      beds: [
        {
          slot: "A",
          occupied: true,
          studentName: "Arjun Patel",
          rollNumber: "2024CS101",
          compatibility: "80%",
          choice: "Choice #1",
        },
        {
          slot: "B",
          occupied: true,
          studentName: "Rohan Verma",
          rollNumber: "2024CS102",
          compatibility: "100%",
          choice: "Choice #1",
        },
      ],
    },
    {
      roomNumber: "005",
      type: "DOUBLE AC",
      isQuiet: true,
      beds: [
        {
          slot: "A",
          occupied: true,
          studentName: "Rahul Gupta",
          rollNumber: "2024CS199",
          compatibility: "85%",
          choice: "Choice #2",
        },
        { slot: "B", occupied: false },
      ],
    },
    {
      roomNumber: "006",
      type: "DOUBLE NON_AC",
      beds: [
        { slot: "A", occupied: false },
        { slot: "B", occupied: false },
      ],
    },
  ]);

  const hostelsList = [
    { code: "BH1", gender: "MALE" },
    { code: "GH1", gender: "FEMALE" },
    { code: "BH2", gender: "MALE" },
    { code: "BH3", gender: "MALE" },
    { code: "BH4", gender: "MALE" },
    { code: "BH5", gender: "MALE" },
    { code: "BH6", gender: "MALE" },
    { code: "GH2", gender: "FEMALE" },
    { code: "GH3", gender: "FEMALE" },
    { code: "GH4", gender: "FEMALE" },
  ];

  const handleOverrideBed = (roomIdx, bedIdx) => {
    alert(`Override reassignment requested for Room ${corridorRooms[roomIdx].roomNumber} Bed ${corridorRooms[roomIdx].beds[bedIdx].slot}. Warden manual lock enabled.`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* 1. Warden Bed Map & Allocation Review Controls Card */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "16px",
          padding: "1.5rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.625rem" }}>
              <h1
                style={{
                  fontSize: "1.375rem",
                  fontWeight: 800,
                  color: "#0F172A",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  margin: 0,
                }}
              >
                <Layers size={22} color="#EA580C" />
                <span>Warden Bed Map & Allocation Review</span>
              </h1>

              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  padding: "3px 8px",
                  borderRadius: "8px",
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  backgroundColor: draftPublished ? "#ECFDF5" : "#FFF7ED",
                  color: draftPublished ? "#047857" : "#9A3412",
                  border: draftPublished ? "1px solid #A7F3D0" : "1px solid #FED7AA",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: draftPublished ? "#10B981" : "#F97316",
                  }}
                  className="animate-pulse"
                />
                <span>
                  Cycle: {draftPublished ? "Published (Official)" : draftApproved ? "Approved by Warden" : "Draft (Pre-Review)"}
                </span>
              </span>
            </div>

            <p style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "0.35rem" }}>
              Floor-by-floor spatial layout with roommate match scores, reassignment options, and draft authorization.
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.625rem" }}>
            <button
              id="warden-approve-draft-btn"
              type="button"
              onClick={() => setDraftApproved(true)}
              className="btn-emerald-approve"
              style={{
                backgroundColor: draftApproved ? "#047857" : "#059669",
              }}
            >
              <ShieldCheck size={16} />
              <span>{draftApproved ? "Draft Approved ✓" : "Approve Draft"}</span>
            </button>

            <button
              id="publish-allocation-btn"
              type="button"
              onClick={() => {
                setDraftApproved(true);
                setDraftPublished(true);
              }}
              className="btn-orange-primary"
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.8125rem",
                borderRadius: "10px",
              }}
            >
              <Sparkles size={16} />
              <span>{draftPublished ? "Published ✓" : "Publish"}</span>
            </button>
          </div>
        </div>

        {/* Hostel and Floor Filters */}
        <div
          style={{
            marginTop: "1.25rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid #E2E8F0",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {/* Hostel Tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: "0.25rem" }}>
              Hostel:
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {hostelsList.map((h) => {
                const active = selectedHostel === h.code;
                return (
                  <button
                    key={h.code}
                    type="button"
                    onClick={() => setSelectedHostel(h.code)}
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
                    {h.code} ({h.gender})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Floor Tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: "0.25rem" }}>
              Floor:
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              <button
                type="button"
                onClick={() => setSelectedFloor(0)}
                style={{
                  padding: "0.35rem 0.85rem",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: selectedFloor === 0 ? 700 : 500,
                  backgroundColor: selectedFloor === 0 ? "#F97316" : "#F1F5F9",
                  color: selectedFloor === 0 ? "#FFFFFF" : "#475569",
                  border: selectedFloor === 0 ? "1px solid #F97316" : "1px solid #E2E8F0",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <Accessibility size={14} />
                <span>Ground Floor (Accessible)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFloor(1)}
                style={{
                  padding: "0.35rem 0.85rem",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: selectedFloor === 1 ? 700 : 500,
                  backgroundColor: selectedFloor === 1 ? "#F97316" : "#F1F5F9",
                  color: selectedFloor === 1 ? "#FFFFFF" : "#475569",
                  border: selectedFloor === 1 ? "1px solid #F97316" : "1px solid #E2E8F0",
                  cursor: "pointer",
                }}
              >
                Floor 1
              </button>

              <button
                type="button"
                onClick={() => setSelectedFloor(2)}
                style={{
                  padding: "0.35rem 0.85rem",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontWeight: selectedFloor === 2 ? 700 : 500,
                  backgroundColor: selectedFloor === 2 ? "#F97316" : "#F1F5F9",
                  color: selectedFloor === 2 ? "#FFFFFF" : "#475569",
                  border: selectedFloor === 2 ? "1px solid #F97316" : "1px solid #E2E8F0",
                  cursor: "pointer",
                }}
              >
                Floor 2
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Corridor Bed Map Spatial View */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "16px",
          padding: "1.5rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        {/* Header & Legend */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "1.5rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: "#0F172A", display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
              <span>{selectedHostel}</span>
              <span style={{ color: "#CBD5E1" }}>•</span>
              <span style={{ color: "#EA580C", fontWeight: 600 }}>
                {selectedFloor === 0 ? "Ground Floor (Accessible)" : `Floor ${selectedFloor}`}
              </span>
            </h3>
            <p style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "2px" }}>
              Corridor view showing room occupancy, bed slots, and compatibility scores.
            </p>
          </div>

          {/* Legend */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontSize: "0.75rem",
              color: "#475569",
              backgroundColor: "#F8FAFC",
              padding: "0.4rem 0.85rem",
              borderRadius: "8px",
              border: "1px solid #E2E8F0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10B981" }} />
              <span>Vacant</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#F97316" }} />
              <span>Allocated</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#F59E0B" }} />
              <span>Overridden</span>
            </div>
          </div>
        </div>

        {/* Room & Bed Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {corridorRooms.map((room, rIdx) => (
            <div
              key={room.roomNumber}
              style={{
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                backgroundColor: "#F8FAFC",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {/* Room Top Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "0.75rem",
                  borderBottom: "1px solid #E2E8F0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className="font-mono" style={{ fontSize: "1rem", fontWeight: 800, color: "#0F172A" }}>
                    Room {room.roomNumber}
                  </span>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontWeight: 700,
                      backgroundColor: "#FFFFFF",
                      color: "#475569",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    {room.type}
                  </span>
                </div>

                {room.isAccessible && (
                  <span
                    title="Wheelchair Accessible / Ground Floor"
                    style={{
                      padding: "3px",
                      borderRadius: "4px",
                      backgroundColor: "#FAF5FF",
                      color: "#7E22CE",
                      border: "1px solid #E9D5FF",
                      display: "inline-flex",
                    }}
                  >
                    <Accessibility size={14} />
                  </span>
                )}
              </div>

              {/* Bed Slots */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {room.beds.map((bed, bIdx) => {
                  if (bed.occupied) {
                    return (
                      <div key={bed.slot} className="bed-occupied">
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span
                              className="font-mono"
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "4px",
                                backgroundColor: "#FFEDD5",
                                color: "#EA580C",
                                fontSize: "0.75rem",
                                fontWeight: 800,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid #FED7AA",
                              }}
                            >
                              {bed.slot}
                            </span>
                            <div>
                              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0F172A", display: "block" }}>
                                {bed.studentName}
                              </span>
                              <span className="font-mono" style={{ fontSize: "0.625rem", color: "#64748B" }}>
                                #{bed.rollNumber}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleOverrideBed(rIdx, bIdx)}
                            style={{
                              padding: "4px 8px",
                              borderRadius: "6px",
                              backgroundColor: "#F1F5F9",
                              color: "#475569",
                              border: "1px solid #E2E8F0",
                              fontSize: "0.6875rem",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              cursor: "pointer",
                            }}
                            title="Reassign Bed"
                          >
                            <ArrowRightLeft size={12} />
                            <span>Override</span>
                          </button>
                        </div>

                        <div
                          style={{
                            marginTop: "0.5rem",
                            paddingTop: "0.5rem",
                            borderTop: "1px solid #F1F5F9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            fontSize: "0.6875rem",
                          }}
                        >
                          <span style={{ color: "#059669", fontWeight: 600 }}>
                            {bed.compatibility} Compatibility
                          </span>
                          <span className="font-mono" style={{ color: "#64748B", fontSize: "0.625rem" }}>
                            {bed.choice}
                          </span>
                        </div>
                      </div>
                    );
                  }

                  // Vacant Bed Slot
                  return (
                    <div
                      key={bed.slot}
                      className="bed-vacant"
                      onClick={() => alert(`Vacant slot ${bed.slot} in Room ${room.roomNumber} selected for manual assignment.`)}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span
                          className="font-mono"
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "4px",
                            backgroundColor: "#D1FAE5",
                            color: "#065F46",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #6EE7B7",
                          }}
                        >
                          {bed.slot}
                        </span>
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#065F46" }}>
                          Vacant Bed Slot
                        </span>
                      </div>
                      <span className="font-mono" style={{ fontSize: "0.625rem", color: "#047857" }}>
                        Available
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Applicant Queue Table */}
      <div style={{ marginTop: "1rem" }}>
        <AllocationTable initialApplications={applications} onStatusChange={() => {}} />
      </div>
    </div>
  );
}
