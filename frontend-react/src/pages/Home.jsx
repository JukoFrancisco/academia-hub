import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-hero-container">
      {/* MAIN HERO CARD (Features your PNG) */}
      <div className="hero-main-card page-animate">
        <div className="hero-image-banner">
          {/* Swap this src for your actual image filename! */}
          <img src="/pix.jpeg" alt="Juko University Students" />
        </div>

        <div className="hero-text-section">
          <div className="badge">System v1.0 Live</div>
          <h1 className="hero-title">
            Built for <span className="text-gradient">Juko University.</span>
          </h1>
          <p className="hero-subtitle">
            Student management platform for Juko University. Designed by Juko,
            for Juko University. ◡̈ ◡̈ ◡̈
          </p>

          <div className="hero-actions">
            <Link to="/students" className="btn-primary-hero">
              Enter Portal
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: "8px" }}
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <Link to="/analytics" className="btn-secondary-hero">
              View Analytics
            </Link>
          </div>
        </div>
      </div>

      {/* COMPACT BENTO FEATURES (With Real Icons) */}
      <div
        className="bento-grid page-animate"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="bento-card">
          <div className="bento-icon">
            {/* Users / Registry Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3>Live Registry</h3>
          <p>
            Instantly update, search, and manage profiles without reloading.
          </p>
        </div>

        <div className="bento-card">
          <div className="bento-icon">
            {/* Analytics / Chart Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="16" y1="12" x2="16" y2="16"></line>
              <line x1="8" y1="10" x2="8" y2="16"></line>
            </svg>
          </div>
          <h3>Dynamic Analytics</h3>
          <p>
            Visualize GWA distributions and pass rates with real-time charts.
          </p>
        </div>

        <div className="bento-card">
          <div className="bento-icon">
            {/* Shield / Security Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h3>Built for Juko Univ</h3>
          <p>Powered by a robust backend and a sleek glassmorphic interface.</p>
        </div>
      </div>
    </div>
  );
}
