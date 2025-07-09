import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./database/db.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import bookRouter from "./routers/book.router.js";
import authRouter from "./routers/auth.router.js";
import borrowRouter from "./routers/borrow.router.js";
import userRouter from "./routers/user.router.js";
import { v2 as cloudinary } from "cloudinary";
import expressFileUpload from "express-fileupload";
import { deleteUnverifiedUsers } from "./services/deleteUnverifiedUsers.js";
import { notifyUsers } from "./services/notifyUsers.js";
config();

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

connectDB().then(() => {
  console.log("DATABASE CONNECTED SUCCESSFULLY");
  deleteUnverifiedUsers();
  notifyUsers();
  app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT ${process.env.PORT}`);
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter);

app.use(errorMiddleware);
