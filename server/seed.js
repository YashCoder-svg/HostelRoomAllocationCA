const { connectDB, closeDB } = require("./db");
const Hostel = require("./models/Hostel");
const Block = require("./models/Block");
const Room = require("./models/Room");
const Bed = require("./models/Bed");
const Student = require("./models/Student");
const Application = require("./models/Application");
const AllocationDraft = require("./models/AllocationDraft");

async function seedData() {
  console.log("[Seeder] Starting database seeding process...");
  await connectDB();

  await Promise.all([
    Hostel.deleteMany(),
    Block.deleteMany(),
    Room.deleteMany(),
    Bed.deleteMany(),
    Student.deleteMany(),
    Application.deleteMany(),
    AllocationDraft.deleteMany(),
  ]);
  console.log("[Seeder] Cleared previous database collections.");

  const hostelsData = [
    {
      name: "Himalaya Boys Hostel",
      code: "HBH-01",
      genderAllowed: "Male",
      campusLocation: "North Campus, Engineering Enclave",
      totalCapacity: 120,
      availableCapacity: 48,
      amenities: ["High-Speed WiFi", "Gymnasium", "24/7 Study Room", "Table Tennis", "Solar Hot Water", "Biometric Access"],
      imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      description: "Premier undergraduate residence designed for collaboration, sports facilities, and serene green surroundings.",
    },
    {
      name: "Nilgiri Girls Hostel",
      code: "NGH-02",
      genderAllowed: "Female",
      campusLocation: "South Campus, Science Precinct",
      totalCapacity: 100,
      availableCapacity: 35,
      amenities: ["24/7 Female Guard & CCTV", "Badminton Court", "Reading Room", "High-Speed WiFi", "Laundry Facility", "Infirmary Access"],
      imageUrl: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80",
      description: "Secure, modern, and vibrant accommodation featuring dedicated reading zones and landscaped courtyards.",
    },
    {
      name: "Vindhya PG & Research Hall",
      code: "VPG-03",
      genderAllowed: "Co-ed",
      campusLocation: "East Campus, Research Park",
      totalCapacity: 60,
      availableCapacity: 22,
      amenities: ["Individual Study Desks", "Gigabit LAN", "Quiet Hours Policy", "Attached Bathrooms", "Coffee Lounge", "Elevator"],
      imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      description: "Specially tailored for postgraduate scholars and doctoral researchers needing an undisturbed academic ambience.",
    },
    {
      name: "Sahyadri Executive & International Residence",
      code: "SER-04",
      genderAllowed: "Co-ed",
      campusLocation: "Central Campus, Near Academic Plaza",
      totalCapacity: 40,
      availableCapacity: 14,
      amenities: ["Central Air Conditioning", "En-Suite Kitchenette", "Weekly Housekeeping", "Multi-Cuisine Mess", "High-Speed WiFi"],
      imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      description: "Premium air-conditioned suite living with upscale housekeeping and proximity to core lecture theaters.",
    },
  ];

  const createdHostels = await Hostel.insertMany(hostelsData);
  console.log(`[Seeder] Seeded ${createdHostels.length} Hostels.`);

  const roomTypes = ["Single", "Double", "Triple"];
  const allBeds = [];

  for (const hostel of createdHostels) {
    const blocksCount = hostel.genderAllowed === "Co-ed" ? 1 : 2;
    for (let b = 1; b <= blocksCount; b++) {
      const blockCode = `${hostel.code}-B${b}`;
      const blockName = b === 1 ? "Alpha Wing" : "Beta Wing";
      const block = await Block.create({
        name: blockName,
        code: blockCode,
        hostelId: hostel._id,
        floorsCount: 3,
      });

      for (let floor = 1; floor <= 3; floor++) {
        for (let r = 1; r <= 2; r++) {
          const roomNumber = `${floor}0${r}`;
          const type = roomTypes[(floor + r) % roomTypes.length];
          const bedsCount = type === "Single" ? 1 : type === "Double" ? 2 : 3;
          const isAC = hostel.code === "SER-04" || (r === 2 && floor > 1);
          const rent = isAC ? 32000 + (type === "Single" ? 8000 : 0) : 22000 + (type === "Single" ? 6000 : 0);
          const occupiedCount = Math.floor(Math.random() * bedsCount);

          const room = await Room.create({
            roomNumber: `${blockCode}-${roomNumber}`,
            floor,
            blockId: block._id,
            hostelId: hostel._id,
            roomType: type,
            acType: isAC ? "AC" : "Non-AC",
            totalBeds: bedsCount,
            availableBeds: bedsCount - occupiedCount,
            rentPerSemester: rent,
            isPwDAccessible: floor === 1,
          });

          for (let bedIdx = 1; bedIdx <= bedsCount; bedIdx++) {
            const isOccupied = bedIdx <= occupiedCount;
            allBeds.push({
              bedNumber: `${room.roomNumber}-Bed${bedIdx}`,
              roomId: room._id,
              hostelId: hostel._id,
              isOccupied,
              occupiedBy: isOccupied
                ? {
                    rollNumber: `2024CS${100 + Math.floor(Math.random() * 800)}`,
                    name: `Resident ${bedIdx}`,
                    department: "Computer Science",
                  }
                : null,
            });
          }
        }
      }
    }
  }

  const createdBeds = await Bed.insertMany(allBeds);
  console.log(`[Seeder] Seeded ${createdBeds.length} Beds across rooms and blocks.`);

  const sampleApps = [
    {
      applicationId: "APP-2026-001",
      studentRollNumber: "2024CS1042",
      studentName: "Aarav Sharma",
      studentEmail: "aarav.sharma@campus.edu",
      department: "Computer Science & Engineering",
      year: 2,
      gender: "Male",
      cgpa: 8.92,
      preferences: [
        {
          hostelId: createdHostels[0]._id,
          hostelName: createdHostels[0].name,
          roomType: "Single",
          acPreference: "Non-AC",
          priority: 1,
        },
        {
          hostelId: createdHostels[3]._id,
          hostelName: createdHostels[3].name,
          roomType: "Double",
          acPreference: "AC",
          priority: 2,
        },
      ],
      specialAccommodations: "Prefers quiet study floor near elevator.",
      status: "SUBMITTED",
      submittedAt: new Date(Date.now() - 3600000 * 24 * 2),
    },
    {
      applicationId: "APP-2026-002",
      studentRollNumber: "2024EC2015",
      studentName: "Ananya Patel",
      studentEmail: "ananya.patel@campus.edu",
      department: "Electronics & Communication",
      year: 3,
      gender: "Female",
      cgpa: 9.35,
      preferences: [
        {
          hostelId: createdHostels[1]._id,
          hostelName: createdHostels[1].name,
          roomType: "Single",
          acPreference: "AC",
          priority: 1,
        },
        {
          hostelId: createdHostels[2]._id,
          hostelName: createdHostels[2].name,
          roomType: "Double",
          acPreference: "Non-AC",
          priority: 2,
        },
      ],
      specialAccommodations: "None",
      status: "UNDER_REVIEW",
      submittedAt: new Date(Date.now() - 3600000 * 18),
    },
    {
      applicationId: "APP-2026-003",
      studentRollNumber: "2023ME1088",
      studentName: "Rohan Verma",
      studentEmail: "rohan.verma@campus.edu",
      department: "Mechanical Engineering",
      year: 4,
      gender: "Male",
      cgpa: 7.84,
      preferences: [
        {
          hostelId: createdHostels[0]._id,
          hostelName: createdHostels[0].name,
          roomType: "Double",
          acPreference: "Non-AC",
          priority: 1,
        },
      ],
      specialAccommodations: "Ground floor preferred due to sports leg recovery.",
      status: "SUBMITTED",
      submittedAt: new Date(Date.now() - 3600000 * 5),
    },
    {
      applicationId: "APP-2026-004",
      studentRollNumber: "2025DS3004",
      studentName: "Diya Mukherjee",
      studentEmail: "diya.m@campus.edu",
      department: "Data Science & AI",
      year: 1,
      gender: "Female",
      cgpa: 8.70,
      preferences: [
        {
          hostelId: createdHostels[1]._id,
          hostelName: createdHostels[1].name,
          roomType: "Triple",
          acPreference: "Non-AC",
          priority: 1,
        },
      ],
      specialAccommodations: "First year orientation cohort roommate requested.",
      status: "SUBMITTED",
      submittedAt: new Date(Date.now() - 3600000 * 2),
    },
    {
      applicationId: "APP-2026-005",
      studentRollNumber: "2024EE1029",
      studentName: "Vikram Malhotra",
      studentEmail: "vikram.m@campus.edu",
      department: "Electrical Engineering",
      year: 2,
      gender: "Male",
      cgpa: 9.12,
      preferences: [
        {
          hostelId: createdHostels[3]._id,
          hostelName: createdHostels[3].name,
          roomType: "Single",
          acPreference: "AC",
          priority: 1,
        },
      ],
      specialAccommodations: "None",
      status: "ALLOCATED",
      submittedAt: new Date(Date.now() - 3600000 * 48),
    },
  ];

  await Application.insertMany(sampleApps);
  console.log(`[Seeder] Seeded ${sampleApps.length} Initial Applications for Warden inspection.`);

  console.log("[Seeder] Database seeding successfully completed!");
  return { hostelsCount: createdHostels.length, bedsCount: createdBeds.length, appsCount: sampleApps.length };
}

if (require.main === module) {
  seedData()
    .then(() => {
      console.log("[Seeder] Exiting seeder process cleanly.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("[Seeder] Seeding error:", err);
      process.exit(1);
    });
}

module.exports = seedData;
