import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const API_URL = "http://localhost:5001/api/students";

const collegeData = {
  "College of Computer Studies": [
    "BS Information Technology",
    "BS Computer Science",
    "BS Information Systems",
    "Associate in Computer Technology",
  ],
  "College of Engineering": [
    "BS Civil Engineering",
    "BS Electrical Engineering",
    "BS Computer Engineering",
  ],
  "College of Business": [
    "BS Accountancy",
    "BS Business Administration",
    "BS Real Estate Management",
  ],
  "College of Arts and Sciences": [
    "BA Communication",
    "BS Psychology",
    "BS Biology",
  ],
};

export default function Students() {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [gwa, setGwa] = useState("");

  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // NEW: State for sorting
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      toast.error("Could not connect to database.");
    }
  };

  const handleCollegeChange = (e) => {
    const selectedCollege = e.target.value;
    setCollege(selectedCollege);
    setCourse(
      selectedCollege && collegeData[selectedCollege]
        ? collegeData[selectedCollege][0]
        : "",
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = {
      studentId,
      name,
      email,
      college,
      course,
      gwa: Number(gwa),
    };

    try {
      const response = await fetch(
        isEditing ? `${API_URL}/${editingId}` : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        },
      );

      if (response.ok) {
        toast.success(isEditing ? "Student updated!" : "Student added!");
        resetForm();
        fetchStudents();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to save data.");
      }
    } catch (error) {
      toast.error("Network error: Could not save student.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Student deleted.");
        fetchStudents();
      }
    } catch (error) {
      toast.error("Failed to delete student.");
    }
  };

  const handleEditClick = (student) => {
    setStudentId(student.studentId || "");
    setName(student.name);
    setEmail(student.email);
    setCollege(student.college || "");
    setCourse(student.course);
    setGwa(student.gwa || "");
    setEditingId(student._id);
    setIsEditing(true);
  };

  const resetForm = () => {
    setStudentId("");
    setName("");
    setEmail("");
    setCollege("");
    setCourse("");
    setGwa("");
    setEditingId(null);
    setIsEditing(false);
  };

  // --- NEW: CSV EXPORT LOGIC ---
  const exportToCSV = () => {
    if (students.length === 0) return toast.error("No students to export.");

    // Create CSV headers and rows based on currently visible/searched students
    const headers = ["Student ID", "Name", "Email", "College", "Course", "GWA"];
    const rows = sortedStudents.map((s) => [
      s.studentId,
      `"${s.name}"`, // Quotes prevent commas in names from breaking formatting
      s.email,
      `"${s.college}"`,
      `"${s.course}"`,
      s.gwa,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "Juko_University_Registry.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Exported!");
  };

  // --- NEW: SORTING LOGIC ---
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.studentId &&
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    // Handle string comparisons
    if (typeof aVal === "string") aVal = aVal.toLowerCase();
    if (typeof bVal === "string") bVal = bVal.toLowerCase();

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="page-animate students-no-scroll">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            color: "#1d1d1f",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            padding: "12px 24px",
            fontWeight: "600",
          },
        }}
      />

      <div className="container">
        <div className="dashboard-layout">
          {/* COMPACT FORM SECTION */}
          <div className="form-container compact-form">
            <h2>{isEditing ? "Edit Student" : "Add Student"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Student ID</label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>College</label>
                <select value={college} onChange={handleCollegeChange} required>
                  <option value="" disabled>
                    Select College
                  </option>
                  {Object.keys(collegeData).map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Course</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                  disabled={!college}
                >
                  <option value="" disabled>
                    Select Course
                  </option>
                  {college &&
                    collegeData[college].map((crs) => (
                      <option key={crs} value={crs}>
                        {crs}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label>GWA</label>
                <input
                  type="number"
                  value={gwa}
                  onChange={(e) => setGwa(e.target.value)}
                  required
                  step="0.01"
                  min="1.0"
                  max="5.0"
                />
              </div>
              <div className="form-actions">
                <button type="submit" id="submit-btn">
                  {isEditing ? "Update" : "Add"}
                </button>
                {isEditing && (
                  <button type="button" id="cancel-btn" onClick={resetForm}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* TABLE SECTION WITH INTERNAL SCROLL */}
          <div className="table-container table-container-flexible">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <h2 style={{ margin: 0 }}>Registry</h2>

              {/* TOOLBAR: Search, Sort Buttons, CSV */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    backgroundColor: "rgba(255,255,255,0.6)",
                    outline: "none",
                    width: "160px",
                    fontSize: "0.85rem",
                  }}
                />

                {/* NEW: Explicit Sort Buttons */}
                <div className="sort-controls">
                  <span className="sort-label">Sort:</span>
                  <button
                    type="button"
                    onClick={() => requestSort("name")}
                    className={`btn-sort ${sortConfig.key === "name" ? "active" : ""}`}
                  >
                    Name{" "}
                    {sortConfig.key === "name" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </button>
                  <button
                    type="button"
                    onClick={() => requestSort("gwa")}
                    className={`btn-sort ${sortConfig.key === "gwa" ? "active" : ""}`}
                  >
                    GWA{" "}
                    {sortConfig.key === "gwa" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </button>
                </div>

                <button
                  onClick={exportToCSV}
                  className="btn-secondary-hero"
                  style={{
                    padding: "8px 16px",
                    fontSize: "0.85rem",
                    margin: 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginRight: "6px" }}
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  CSV
                </button>
              </div>
            </div>

            <div className="table-scroll-area">
              {students.length === 0 ? (
                <p id="no-students">No students found.</p>
              ) : sortedStudents.length === 0 ? (
                <p id="no-students">No matching students found.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      {/* Clean headers with no hidden click events */}
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>College</th>
                      <th>Course</th>
                      <th>GWA</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedStudents.map((student) => (
                      <tr key={student._id}>
                        <td>{student.studentId}</td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.college}</td>
                        <td>{student.course}</td>
                        <td
                          style={{
                            fontWeight: "600",
                            color: student.gwa > 3.0 ? "#FF3B30" : "inherit",
                          }}
                        >
                          {student.gwa}
                        </td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => handleEditClick(student)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(student._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
