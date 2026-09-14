const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true },
    floor: { type: Number, required: true },
    blockId: { type: mongoose.Schema.Types.ObjectId, ref: "Block", required: true },
    hostelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel", required: true },
    roomType: { type: String, enum: ["Single", "Double", "Triple", "Quad"], required: true },
    acType: { type: String, enum: ["AC", "Non-AC"], required: true },
    totalBeds: { type: Number, required: true },
    availableBeds: { type: Number, required: true },
    rentPerSemester: { type: Number, required: true },
    isPwDAccessible: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Room || mongoose.model("Room", RoomSchema);
