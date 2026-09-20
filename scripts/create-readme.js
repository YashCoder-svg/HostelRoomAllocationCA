const fs = require("fs");

const content = `# Policy-Driven Hostel Room Allocation Engine

> **Academic Session 2026–2027 Residential Housing Management Platform**  
> *Week 5 Foundation — College Evaluation Checkpoint*

---

## 1. Problem Statement & Objectives

### Problem Statement
Traditional university hostel room allocation is predominantly conducted via paper-based application queues or opaque spreadsheet workflows. This leads to:
- **Zero Real-Time Visibility**: Students cannot view actual bed-level vacancies, AC/Non-AC room specifications, or floor-level accessibility before applying.
- **Mismatched Preferences**: Inflexible allotment creates resident dissatisfaction, noisy roommate friction, and manual room-swap petitions.
- **Administrative Burden**: Wardens and hostel administrators spend weeks manually verifying eligibility criteria, CGPA thresholds, and medical accessibility requirements.

### Objectives
1. **Digitize the Application Lifecycle**: Provide students with an intuitive portal to inspect transparent bed-level inventories and submit ranked choices (1st, 2nd, 3rd preferences).
2. **Standardize Institutional Data Structures**: Establish unified Mongoose schemas for Hostels, Blocks, Rooms, Beds, Students, Applications, and Allocation Drafts.
3. **Streamline Warden Governance**: Give hall wardens a centralized oversight dashboard to inspect applicant queues, verify academic standing, and monitor real-time capacity.
4. **Lay Foundation for Deterministic Allocation**: Structure the system to support a constraint-satisfaction heuristic solver with roommate compatibility scoring in Week 9.

---

## 2. Deliverable Scope & Status (Week 5 Evaluation Checkpoint)

| Deliverable | Target Component | Status | Implementation Details |
| :--- | :--- | :---: | :--- |
| **D1: Architecture & Design** | Component decomposition, ERD, roles | **Completed** | Modular components (\`HostelList\`, \`RoomCard\`, \`BedGrid\`, \`PreferenceRanker\`, \`ApplicationForm\`, \`WardenDashboard\`, \`AllocationTable\`). 7 core Mongoose models. Roles: Student, Warden, Administrator. |
| **D2: Routing & Implementation** | Next.js 14 App Router | **Completed** | Routes: \`/\` (Landing), \`/hostels\` (Inventory), \`/apply\` (Application & Ranker), \`/warden\` (Warden Station). Props, composition, conditional rendering (empty/loading/error). |
| **D3: Rendering & Data Fetching** | Dynamic inventory & filters | **Completed** | Dynamic fetch from \`/api/hostels\`, gender filter pills, live search bar, expandable room & bed layout visualizer, skeleton shimmer loading. |
| **D4: Backend & Database** | Express API & MongoDB | **Completed** | Express REST server on port 5000 connected to MongoDB via Mongoose ODM. Endpoints: \`GET /api/hostels\`, \`GET /api/hostels/:id/rooms\`, \`POST /api/applications\`, \`GET /api/applications\`, \`GET /api/stats\`. Automated seeding script. |
| **D5: Product Workflow** | End-to-end user journey | **Completed** | Student browses hostels → Ranks preferences with \`PreferenceRanker\` → Submits application → Obtains instant verified receipt → Application immediately appears in Warden review queue. Header Role Switcher toggles views. |
| **D6: Documentation** | Architecture, backlog, guide | **Completed** | Detailed \`README.md\`, \`docs/architecture.md\`, feature roadmap, setup instructions, and team responsibilities. |

---

## 3. System Architecture & Diagram

\`\`\`mermaid
graph TD
    subgraph Frontend [Next.js 14 App Router - Port 3000]
        Nav[Navbar & RoleSwitcher]
        Landing["/ Landing Page"]
        Hostels["/hostels Inventory Browser"]
        Apply["/apply Student Application"]
        Warden["/warden Warden Review"]

        Hostels --> HostelList --> RoomCard --> BedGrid
        Apply --> ApplicationForm --> PreferenceRanker
        Warden --> WardenDashboard --> AllocationTable
    end

    subgraph Backend [Node.js / Express API - Port 5000]
        API[Express REST Router]
        API --> HRoute["GET /api/hostels"]
        API --> RRoute["GET /api/hostels/:id/rooms"]
        API --> ARoute["POST / GET /api/applications"]
        API --> SRoute["GET /api/stats"]
    end

    subgraph Database [MongoDB / Mongoose ODM]
        HostelsCol[("hostels")]
        BlocksCol[("blocks")]
        RoomsCol[("rooms")]
        BedsCol[("beds")]
        AppsCol[("applications")]
        StudentsCol[("students")]
    end

    HRoute --> HostelsCol & RoomsCol & BedsCol
    RRoute --> RoomsCol & BedsCol
    ARoute --> AppsCol & StudentsCol
    SRoute --> HostelsCol & BedsCol & AppsCol
    Frontend -->|"REST HTTP Fetch"| Backend
\`\`\`

---

## 4. State & Data-Flow Decisions

- **Server-Managed Data (Hostels, Rooms, Beds)**: Centralized in MongoDB to preserve an authoritative single source of truth across both student and warden views.
- **Dynamic Application Queue**: Warden dashboard queries \`/api/applications\` with server-side status filtering (\`SUBMITTED\`, \`UNDER_REVIEW\`, \`ALLOCATED\`) and optimistic local updates on status PATCH.
- **Client Preference Ranking**: Managed in local React state inside \`PreferenceRanker\` for zero-latency priority ordering (1st, 2nd, 3rd) before submitting over HTTP.
- **Role Context**: Controlled via \`RoleSwitcher\` in the top navigation bar, saved to \`localStorage\` to simulate role-based authorization without cumbersome login requirements during evaluation.

---

## 5. Technology Stack

- **Frontend**: Next.js 14 (App Router), React 18, Vanilla CSS Design System with CSS Custom Properties, Google Fonts (Outfit & Plus Jakarta Sans).
- **Backend**: Node.js, Express.js REST API, CORS, Dotenv.
- **Database**: MongoDB with Mongoose ODM (supports standard \`MONGODB_URI\` or automatic zero-config \`mongodb-memory-server\` fallback).
- **Tooling**: Concurrently (single command client + server launch).

---

## 6. Setup & Running Instructions

### Prerequisites
- Node.js 18+ or 20+
- npm 9+

### Installation
\`\`\`bash
# Clone or navigate to the project directory
cd C:/Users/vaiss/HostelRoomAllocationCA

# Install dependencies
npm install
\`\`\`

### Seeding Realistic Sample Data
Populates 4 realistic hostels (Himalaya Boys, Nilgiri Girls, Vindhya PG, Sahyadri International), 72+ bed slots, and sample student submissions:
\`\`\`bash
npm run seed
\`\`\`

### Running the Application
Launch both the Next.js frontend (Port 3000) and Express backend (Port 5000) concurrently:
\`\`\`bash
npm run dev
\`\`\`

Open your browser at:
- **Frontend Web App**: [http://localhost:3000](http://localhost:3000)
- **Backend API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **Live Hostels Endpoint**: [http://localhost:5000/api/hostels](http://localhost:5000/api/hostels)
- **Live Applications Endpoint**: [http://localhost:5000/api/applications](http://localhost:5000/api/applications)
- **Live Stats Endpoint**: [http://localhost:5000/api/stats](http://localhost:5000/api/stats)

---

## 7. Feature Roadmap & Backlog

\`\`\`
[Week 5: Current Foundation] ─────────► [Week 9: Engine & Matching] ─────────► [Week 13: Final Polish & Deploy]
 • Component decomposition                 • Full CRUD & validation                  • Containerization (Docker)
 • Dynamic inventory browser               • JWT Authentication & RBAC               • Cloud deployment (Vercel + Atlas)
 • Preference Ranker component             • Deterministic PRNG Matching             • Audit logging & QR verification
 • Multi-step application wizard           • Roommate compatibility scoring          • Stress testing (5,000+ applicants)
 • Warden review dashboard                 • PwD & distance policy engine            • Printable allotment letters (PDF)
 • Seeded MongoDB models                   • Waitlist management system              • Accessibility (WCAG 2.1 AA)
\`\`\`

### Module Plan Breakdown
- **Module 1: Inventory Management (Week 5: Core Complete)** — Hostel, block, room, bed mapping with live availability.
- **Module 2: Application Portal (Week 5: Complete)** — Multi-step student registration and preference ranking.
- **Module 3: Eligibility Rules (Week 9)** — Automated CGPA threshold, disciplinary clearance, distance sorting (outstation > 25km).
- **Module 4: Preferences & Lifestyle (Week 9)** — Consented lifestyle survey (sleep schedule, cleanliness, study habits).
- **Module 5: Compatibility Scoring (Week 9)** — Pairwise compatibility matrix (0–100%) for roommate grouping.
- **Module 6: Allocation Engine (Week 9)** — Seeded deterministic heuristic solver satisfying capacity and gender constraints.
- **Module 7: Warden Bed Map & Review (Week 5: Queue Complete, Week 9: Interactive Map)** — Floor visualizer with manual drag-and-drop override.
- **Module 8: Waitlist & Re-allocation (Week 9)** — Second-round re-allotment for unallocated students.
- **Module 9: Publication & Letters (Week 13)** — Cryptographic QR-verified printable allotment letters.

---

## 8. Team & Member Responsibilities

| Team Member | Focus Area | Week 5 Responsibilities | Week 9 & 13 Responsibilities |
| :--- | :--- | :--- | :--- |
| **Lead Full-Stack Engineer** | Core Architecture & Backend | MongoDB schemas, Express REST API, seed data pipeline, Next.js rewrite proxy. | Allocation engine solver, JWT authentication, waitlist logic. |
| **Frontend & UI/UX Engineer** | Design System & Components | Vanilla CSS design tokens, \`HostelList\`, \`RoomCard\`, \`BedGrid\`, and \`PreferenceRanker\`. | Interactive floor-plan bed map, dark/light theme toggle, accessibility. |
| **QA & Systems Analyst** | Workflow & Documentation | Primary student-to-warden clickable workflow, documentation (\`README.md\`, \`architecture.md\`), testing. | Algorithm benchmark tests, PDF allotment letter generator, CI/CD pipeline. |
`;

fs.writeFileSync("README.md", content, "utf8");
console.log("README.md created successfully.");
