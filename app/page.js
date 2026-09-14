import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container" style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>

      <section
        className="glass-panel"
        style={{
          padding: "4rem 2.5rem",
          textAlign: "center",
          borderRadius: "var(--radius-xl)",
          position: "relative",
          overflow: "hidden",
          background: "radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15), transparent 70%), var(--bg-surface)",
        }}
      >
        <div style={{ display: "inline-flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
          <span className="badge badge-primary">Week 5 Foundation</span>
          <span className="badge badge-success">Academic Cycle 2026�2027</span>
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 800,
            maxWidth: "850px",
            margin: "0 auto 1.25rem",
            letterSpacing: "-0.03em",
          }}
        >
          Digitized, Policy-Driven{" "}
          <span style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Hostel Room Allocation
          </span>
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            maxWidth: "680px",
            margin: "0 auto 2rem",
            lineHeight: 1.6,
          }}
        >
          Replacing opaque paper applications with auditable bed-level inventory,
          student preference ranking, and streamlined warden verification.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/hostels" className="btn btn-primary" style={{ padding: "0.8rem 1.6rem", fontSize: "1rem" }}>
            Explore Hostels & Beds ?
          </Link>
          <Link href="/apply" className="btn btn-secondary" style={{ padding: "0.8rem 1.6rem", fontSize: "1rem" }}>
            Submit Application
          </Link>
          <Link href="/warden" className="btn btn-secondary" style={{ padding: "0.8rem 1.6rem", fontSize: "1rem" }}>
            ??? Warden Station
          </Link>
        </div>
      </section>

      <section>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.85rem", marginBottom: "0.5rem" }}>Core Architectural Pillars</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Modular system decomposition separating inventory, application workflows, and administrative review.
          </p>
        </div>

        <div className="grid-3">
          <div className="glass-panel" style={{ padding: "1.75rem", borderRadius: "var(--radius-lg)" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>??</div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Bed-Level Inventory</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
              Hierarchical data structure (<code style={{ color: "var(--primary)" }}>Hostel ? Block ? Room ? Bed</code>) tracking live occupancy, AC status, and floor-level accessibility.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: "1.75rem", borderRadius: "var(--radius-lg)" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>??</div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Ranked Preferences</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
              Students select and prioritize choices (1st, 2nd, 3rd) with room-type and AC requirements for the allocation matcher.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: "1.75rem", borderRadius: "var(--radius-lg)" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>???</div>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Warden Verification</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
              Dedicated dashboard for hall wardens to review student queues, inspect special medical requests, and verify academic standing.
            </p>
          </div>
        </div>
      </section>

      <section className="glass-panel" style={{ padding: "2.5rem", borderRadius: "var(--radius-xl)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Primary User Journey Flow</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "2rem" }}>
          From initial discovery to final published room allotment.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
          <div style={{ borderLeft: "3px solid var(--primary)", paddingLeft: "1rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 700, textTransform: "uppercase" }}>Phase 1 (Active)</div>
            <h4 style={{ fontSize: "1.05rem", margin: "0.25rem 0" }}>1. Browse & Filter</h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Student browses hostels by gender, AC, and inspects room layouts.
            </p>
          </div>

          <div style={{ borderLeft: "3px solid var(--secondary)", paddingLeft: "1rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--secondary)", fontWeight: 700, textTransform: "uppercase" }}>Phase 2 (Active)</div>
            <h4 style={{ fontSize: "1.05rem", margin: "0.25rem 0" }}>2. Rank & Submit</h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Student enters GPA, reorders ranked choices, and submits to MongoDB.
            </p>
          </div>

          <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "1rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase" }}>Phase 3 (Active)</div>
            <h4 style={{ fontSize: "1.05rem", margin: "0.25rem 0" }}>3. Warden Review</h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Warden reviews incoming queue and verifies academic standing.
            </p>
          </div>

          <div style={{ borderLeft: "3px solid var(--text-muted)", paddingLeft: "1rem", opacity: 0.7 }}>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>Phase 4 (Week 9)</div>
            <h4 style={{ fontSize: "1.05rem", margin: "0.25rem 0" }}>4. Engine Allocation</h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Deterministic solver matches preferences and publishes allotment letters.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.25rem" }}>Select Your Portal</h2>
        <div className="grid-3">
          <Link
            href="/apply"
            className="glass-panel"
            style={{
              padding: "1.5rem",
              borderRadius: "var(--radius-lg)",
              display: "block",
              border: "1px solid var(--border-subtle)",
              transition: "transform var(--transition-fast), border-color var(--transition-fast)",
            }}
          >
            <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>??</div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.35rem" }}>Student Portal</h3>
            <p style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>
              Submit application, configure ranked hostel choices, and obtain submission receipt.
            </p>
          </Link>

          <Link
            href="/warden"
            className="glass-panel"
            style={{
              padding: "1.5rem",
              borderRadius: "var(--radius-lg)",
              display: "block",
              border: "1px solid var(--border-subtle)",
              transition: "transform var(--transition-fast), border-color var(--transition-fast)",
            }}
          >
            <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>???</div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.35rem" }}>Warden Portal</h3>
            <p style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>
              Review applicant queue, check GPA criteria, and monitor bed availability.
            </p>
          </Link>

          <Link
            href="/hostels"
            className="glass-panel"
            style={{
              padding: "1.5rem",
              borderRadius: "var(--radius-lg)",
              display: "block",
              border: "1px solid var(--border-subtle)",
              transition: "transform var(--transition-fast), border-color var(--transition-fast)",
            }}
          >
            <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>??</div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.35rem" }}>Campus Directory</h3>
            <p style={{ fontSize: "0.825rem", color: "var(--text-muted)" }}>
              Explore real-time floor plans, room categories, and bed slot status.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
