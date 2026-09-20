"use client";

import React, { useState, useEffect } from "react";
import ApplicationForm from "../../components/ApplicationForm";

export default function ApplyPage() {
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    async function loadHostels() {
      try {
        const res = await fetch("http://localhost:5000/api/hostels");
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setHostels(data.data);
        }
      } catch (err) {
        console.warn("Backend load notice:", err);
      }
    }
    loadHostels();
  }, []);

  return (
    <div className="container-max" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <div className="container-inner" style={{ maxWidth: "1020px" }}>
        <ApplicationForm hostels={hostels} />
      </div>
    </div>
  );
}
