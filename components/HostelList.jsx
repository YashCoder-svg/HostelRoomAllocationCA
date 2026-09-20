"use client";

import React, { useState } from "react";
import { X, Building2 } from "lucide-react";
import HostelCard from "./HostelCard";
import RoomCard from "./RoomCard";

export default function HostelList({ hostels = [] }) {
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [roomFilterType, setRoomFilterType] = useState("All");

  const handleSelectHostel = async (hostel) => {
    setSelectedHostel(hostel);
    setLoadingRooms(true);
    try {
      const res = await fetch(`http://localhost:5000/api/hostels/${hostel._id}/rooms`).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setRooms(data.data);
          setLoadingRooms(false);
          return;
        }
      }
      // Fallback sample rooms
      setRooms([
        {
          _id: "r1",
          roomNumber: "001",
          floor: 1,
          roomType: "Double",
          acType: "Non-AC",
          rentPerSemester: 22000,
          totalBeds: 2,
          availableBeds: 1,
          isPwDAccessible: true,
          beds: [
            { _id: "b1", isOccupied: true, occupiedBy: { rollNumber: "2024ME301" } },
            { _id: "b2", isOccupied: false },
          ],
        },
        {
          _id: "r2",
          roomNumber: "002",
          floor: 1,
          roomType: "Double",
          acType: "AC",
          rentPerSemester: 32000,
          totalBeds: 2,
          availableBeds: 2,
          isPwDAccessible: true,
          beds: [
            { _id: "b3", isOccupied: false },
            { _id: "b4", isOccupied: false },
          ],
        },
        {
          _id: "r3",
          roomNumber: "101",
          floor: 2,
          roomType: "Single",
          acType: "AC",
          rentPerSemester: 42000,
          totalBeds: 1,
          availableBeds: 0,
          isPwDAccessible: false,
          beds: [
            { _id: "b5", isOccupied: true, occupiedBy: { rollNumber: "2024CS101" } },
          ],
        },
      ]);
    } catch (err) {
      console.warn("Room fetch notice:", err);
    } finally {
      setLoadingRooms(false);
    }
  };

  const filteredRooms = rooms.filter((room) => {
    if (roomFilterType !== "All" && room.roomType !== roomFilterType) return false;
    return true;
  });

  return (
    <div>
      <div className="grid-responsive-cards">
        {hostels.map((hostel) => (
          <HostelCard key={hostel._id} hostel={hostel} onSelect={handleSelectHostel} />
        ))}
      </div>

      {/* Room Inventory Modal */}
      {selectedHostel && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              padding: "1.75rem",
              width: "100%",
              maxWidth: "840px",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              border: "1px solid #E2E8F0",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span className="badge-tag-orange">{selectedHostel.code || selectedHostel.name}</span>
                <h2 style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0F172A", marginTop: "0.25rem" }}>
                  {selectedHostel.name} • Room Directory
                </h2>
                <p style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "2px" }}>
                  Real-time bed-level spatial inventory for {selectedHostel.campusLocation || "Main Campus"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedHostel(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#9CA3AF",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter Pills */}
            <div
              style={{
                display: "flex",
                gap: "0.4rem",
                alignItems: "center",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <span style={{ fontSize: "0.75rem", color: "#64748B", fontWeight: 700 }}>Filter by Type:</span>
              {["All", "Single", "Double", "Triple"].map((type) => {
                const active = roomFilterType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setRoomFilterType(type)}
                    style={{
                      padding: "0.3rem 0.65rem",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: active ? 700 : 500,
                      backgroundColor: active ? "#F97316" : "#F1F5F9",
                      color: active ? "#FFFFFF" : "#475569",
                      border: active ? "1px solid #F97316" : "1px solid #E2E8F0",
                      cursor: "pointer",
                    }}
                  >
                    {type}
                  </button>
                );
              })}
            </div>

            {/* Rooms Grid */}
            {loadingRooms ? (
              <div style={{ padding: "3rem", textAlign: "center", color: "#64748B", fontSize: "0.8125rem" }}>
                Loading room inventory and bed allocations...
              </div>
            ) : filteredRooms.length === 0 ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "#64748B", fontSize: "0.8125rem" }}>
                No rooms match the "{roomFilterType}" filter for this residence hall.
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
                {filteredRooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
