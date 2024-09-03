import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

async function dbConnect() {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    return conn.connection;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }

}

export default dbConnect;
