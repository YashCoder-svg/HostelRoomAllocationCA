const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let memoryServer = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const uri = process.env.MONGODB_URI;

  if (uri) {
    try {
      console.log(`[Database] Attempting connection to configured MONGODB_URI...`);
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log(`[Database] Successfully connected to external MongoDB.`);
      return mongoose.connection;
    } catch (err) {
      console.warn(`[Database] External MongoDB connection failed (${err.message}). Falling back to in-memory instance...`);
    }
  }

  try {
    console.log(`[Database] Initializing in-memory MongoDB server...`);
    memoryServer = await MongoMemoryServer.create({ spawn: { timeout: 120000 } });
    const memUri = memoryServer.getUri();
    await mongoose.connect(memUri);
    console.log(`[Database] Connected to in-memory MongoDB at: ${memUri}`);
    return mongoose.connection;
  } catch (err) {
    console.error(`[Database] Fatal: Failed to initialize in-memory database:`, err);
    throw err;
  }
}

async function closeDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (memoryServer) {
    await memoryServer.stop();
  }
}

module.exports = { connectDB, closeDB };
