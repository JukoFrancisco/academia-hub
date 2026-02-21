import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">JUKO UNIVERSITY</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/students">Students</Link>
        <Link to="/analytics">Analytics</Link>
      </div>
    </nav>
  );
}
