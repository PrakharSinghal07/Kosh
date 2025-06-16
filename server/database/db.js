import mongoose from "mongoose";
import { deleteUnverifiedUsers } from "../services/deleteUnverifiedUsers.js";
import { notifyUsers } from "../services/notifyUsers.js";
export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`, {
      dbName: "LIBRARY",
    });
    console.log("DATABASE CONNECTED SUCCESSFULLY");
    deleteUnverifiedUsers();
    notifyUsers()
  } catch (err) {
    console.log("Error connecting to database", err);
  }
};
