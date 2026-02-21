import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Analytics from "./pages/Analytics"; // 1. IMPORT THE NEW PAGE

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/analytics" element={<Analytics />} />{" "}
        {/* 2. ADD THE ROUTE */}
        <Route
          path="/page-three"
          element={
            <div className="container">
              <h1>Settings</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
