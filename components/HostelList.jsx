"use client";

import React, { useState } from "react";
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
      const res = await fetch(`/api/hostels/${hostel._id}/rooms`);
      const data = await res.json();
      if (data.success) {
        setRooms(data.data);
      }
    } catch (err) {
      console.error("Error fetching rooms:", err);
    } finally {
      setLoadingRooms(false);
    }
  };

  const filteredRooms = rooms.filter((room) => {
    if (roomFilterType !== "All" && room.roomType !== roomFilterType) return false;
    return true;
  });

  if (!hostels || hostels.length === 0) {
    return (
      <div
        className="glass-panel"
        style={{
          padding: "3rem",
          textAlign: "center",
          borderRadius: "var(--radius-lg)",
          color: "var(--text-secondary)",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>??</div>
        <h3>No hostels matched your filter criteria.</h3>
        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Try clearing your search query or selecting "All" under gender and room filters.
        </p>
      </div>
    );
  }

  return (
    <div>

      <div className="grid-2">
        {hostels.map((hostel) => (
          <HostelCard key={hostel._id} hostel={hostel} onSelect={handleSelectHostel} />
        ))}
      </div>

      {selectedHostel && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            className="glass-panel animate-fade-in"
            style={{
              width: "100%",
              maxWidth: "850px",
              maxHeight: "88vh",
              overflowY: "auto",
              padding: "2rem",
              borderRadius: "var(--radius-xl)",
              background: "var(--bg-surface)",
              boxShadow: "var(--shadow-lg)",
            }}
          >

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <span className="badge badge-primary">{selectedHostel.code}</span>
                <h2 style={{ fontSize: "1.5rem", marginTop: "0.35rem" }}>{selectedHostel.name} � Room Directory</h2>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Real-time inventory and bed slots for {selectedHostel.campusLocation}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedHostel(null)}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: "50%", width: "2rem", height: "2rem", padding: 0, fontSize: "1rem" }}
              >
                ?
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                marginBottom: "1.5rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Filter by Type:</span>
              {["All", "Single", "Double", "Triple"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setRoomFilterType(type)}
                  className={`btn btn-sm ${roomFilterType === type ? "btn-primary" : "btn-secondary"}`}
                  style={{ fontSize: "0.775rem" }}
                >
                  {type}
                </button>
              ))}
            </div>

            {loadingRooms ? (
              <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                Loading room inventory and bed allocations...
              </div>
            ) : filteredRooms.length === 0 ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                No rooms match the "{roomFilterType}" filter for this hostel.
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
                {filteredRooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))}
              </div>
            )}

            <div style={{ marginTop: "2rem", textAlign: "right" }}>
              <button
                type="button"
                onClick={() => setSelectedHostel(null)}
                className="btn btn-secondary"
              >
                Close Room Browser
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
