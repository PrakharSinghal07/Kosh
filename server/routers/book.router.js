import express from "express";
import { addBooks, deleteBooks, getAllBooks } from "../controllers/book.controller.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.get("/getAllBooks", isAuthenticated, getAllBooks);
router.post("/admin/addBooks", isAuthenticated, authorizeRoles("Admin", "Librarian"), addBooks);
router.delete("/admin/deleteBooks/:id", isAuthenticated, authorizeRoles("Admin", "Librarian"), deleteBooks);
export default router;
