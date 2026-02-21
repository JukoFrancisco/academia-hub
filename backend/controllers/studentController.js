const Student = require("../models/Student");

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single student
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create student
const createStudent = async (req, res) => {
  try {
    const { studentId, name, email, college, course, gwa } = req.body;

    // This triggers the pre-save hook we just fixed
    const student = await Student.create({
      studentId,
      name,
      email,
      college,
      course,
      gwa,
    });

    res.status(201).json(student);
  } catch (error) {
    // This sends the "next is not a function" error string to your React Toast
    res.status(400).json({ message: error.message });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const { studentId, name, email, college, course, gwa } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { studentId, name, email, college, course, gwa },
      { new: true, runValidators: true },
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
