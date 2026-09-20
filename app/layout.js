import "./globals.css";
import Navbar from "../components/Navbar";
import DemoBanner from "../components/DemoBanner";
import Footer from "../components/Footer";

export const metadata = {
  title: "EduHostel OS | Policy-Driven Hostel Allocation & Roommate Matching",
  description:
    "University residential housing management platform with deterministic constraint-satisfaction allocation, consented encrypted lifestyle roommate matching, and warden governance review.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <DemoBanner />
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 12rem)" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
