import express from "express"
import { getBorrowedBooks, getBorrowedBooksForAdmin, recordBorrowBook, returnBook } from "../controllers/borrow.controller.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/recordBorrowBook/:id", isAuthenticated ,recordBorrowBook);
router.put("/returnBook/:bookId", isAuthenticated ,returnBook);
router.get("/getBorrowedBooks/", isAuthenticated ,getBorrowedBooks);
router.get("/getAllBorrows/", isAuthenticated ,authorizeRoles("Admin", "Librarian"),getBorrowedBooksForAdmin);
export default router;