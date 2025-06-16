import cron from "node-cron";
import { User } from "../models/user.model.js";

export const deleteUnverifiedUsers = () => {
  // Schedule to run every 10 seconds
  cron.schedule("*/15 * * * *", async () => {
    const now = new Date();
    try {
      const result = await User.deleteMany({
        accountVerified: false,
        verificationCodeExpired: { $lt: now },
      });

      if (result.deletedCount > 0) {
        console.log(`🧹 Deleted ${result.deletedCount} unverified users`);
      } else {
        console.log("No expired unverified users at this moment");
      }
    } catch (err) {
      console.error("Error deleting unverified users:", err.message);
    }
  });
};
