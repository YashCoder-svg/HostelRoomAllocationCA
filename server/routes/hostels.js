const express = require("express");
const router = express.Router();
const Hostel = require("../models/Hostel");
const Room = require("../models/Room");
const Bed = require("../models/Bed");

router.get("/", async (req, res) => {
  try {
    const { gender, search } = req.query;
    const query = {};

    if (gender && gender !== "All") {
      query.genderAllowed = gender;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
        { campusLocation: { $regex: search, $options: "i" } },
      ];
    }

    const hostels = await Hostel.find(query).sort({ name: 1 }).lean();

    const enriched = await Promise.all(
      hostels.map(async (hostel) => {
        const rooms = await Room.find({ hostelId: hostel._id }).lean();
        const totalRooms = rooms.length;
        const totalBeds = rooms.reduce((acc, r) => acc + (r.totalBeds || 0), 0);
        const availableBeds = rooms.reduce((acc, r) => acc + (r.availableBeds || 0), 0);

        return {
          ...hostel,
          totalRooms,
          totalBeds,
          availableBeds,
        };
      })
    );

    res.json({ success: true, count: enriched.length, data: enriched });
  } catch (err) {
    console.error("[API:Hostels] Error fetching hostels:", err);
    res.status(500).json({ success: false, message: "Internal server error fetching hostels." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id).lean();
    if (!hostel) {
      return res.status(404).json({ success: false, message: "Hostel not found." });
    }
    res.json({ success: true, data: hostel });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching hostel details." });
  }
});

router.get("/:id/rooms", async (req, res) => {
  try {
    const { id } = req.params;
    const { roomType, acType } = req.query;
    const query = { hostelId: id };

    if (roomType && roomType !== "All") query.roomType = roomType;
    if (acType && acType !== "All") query.acType = acType;

    const rooms = await Room.find(query).sort({ floor: 1, roomNumber: 1 }).lean();

    const roomsWithBeds = await Promise.all(
      rooms.map(async (room) => {
        const beds = await Bed.find({ roomId: room._id }).sort({ bedNumber: 1 }).lean();
        return {
          ...room,
          beds,
        };
      })
    );

    res.json({ success: true, count: roomsWithBeds.length, data: roomsWithBeds });
  } catch (err) {
    console.error("[API:Rooms] Error fetching rooms for hostel:", err);
    res.status(500).json({ success: false, message: "Error fetching rooms." });
  }
});

module.exports = router;
