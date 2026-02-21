const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
      trim: true,
    },
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    college: {
      type: String,
      required: [true, "College is required"],
      trim: true,
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
    },

    // CHALLENGE 1: Add a numeric field
    gwa: {
      type: Number,
      required: [true, "GWA is required"],
      min: 1.0,
      max: 5.0, // Or 100, depending on your school's grading system
    },
  },
  {
    timestamps: true,
  },
);

// CHALLENGE 2: Create a pre-save hook function
studentSchema.pre("save", function () {
  if (this.gwa) {
    // Automatically round the GWA to 2 decimal places before saving
    this.gwa = Math.round(this.gwa * 100) / 100;
  }
  console.log(`[Pre-Save Hook] Preparing to save data for: ${this.name}`);
  // No next() call is needed here anymore!
});

module.exports = mongoose.model("Student", studentSchema);
