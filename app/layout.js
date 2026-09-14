import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "EduHostel Alloc � Policy-Driven Hostel Allocation Engine",
  description:
    "Next.js, Node.js and MongoDB foundation for digitized hostel room allocation, preference ranking, and warden review.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 4.5rem - 120px)", padding: "2rem 0" }}>
          {children}
        </main>
        <footer className="site-footer">
          <div className="container">
            <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
              EduHostel Alloc Engine � Week 5 College Evaluation Foundation
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
              Built with Next.js 14 App Router, Express.js REST API, and MongoDB / Mongoose ODM.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
