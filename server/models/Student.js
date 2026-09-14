const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    rollNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: Number, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    cgpa: { type: Number, required: true },
    category: { type: String, default: "General" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Student || mongoose.model("Student", StudentSchema);
