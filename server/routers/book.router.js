import express from "express";
import { addBooks, deleteBooks, getAllBooks } from "../controllers/book.controller.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/getAllBooks", isAuthenticated, getAllBooks);
router.post("/admin/addBooks", isAuthenticated, authorizeRoles("Admin"), addBooks);
router.delete("/admin/deleteBooks/:id", isAuthenticated, authorizeRoles("Admin"), deleteBooks);

export default router;
