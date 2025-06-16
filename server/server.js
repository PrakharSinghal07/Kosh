import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./database/db.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import bookRouter from "./routers/book.router.js"
import authRouter from "./routers/user.router.js";
import borrowRouter from "./routers/borrow.router.js"
config({ path: "./config/config.env" });

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/book", bookRouter)
app.use("/api/v1/borrow", borrowRouter)

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT ${process.env.PORT}`);
});
