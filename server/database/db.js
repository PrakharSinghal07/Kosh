import mongoose from "mongoose";
import { deleteUnverifiedUsers } from "../services/cronJobs.js";
export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`, {
      dbName: "LIBRARY",
    });
    console.log("DATABASE CONNECTED SUCCESSFULLY");
    deleteUnverifiedUsers();
  } catch (err) {
    console.log("Error connecting to database", err);
  }
};
