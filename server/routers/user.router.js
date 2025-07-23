import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.middleware.js";
import { 
  getAllUsers, 
  registerNewAdmin, 
  getUserById, 
  registerNewEmployee,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  updateEmployeeStatus,
  uploadDocument,
  deleteEmployee
} from "../controllers/user.controller.js";
import { uploadImage } from "../middlewares/multer.middleware.js";
const router = express.Router();
router.get("/all", isAuthenticated, authorizeRoles("Admin", "HR", "Asset Manager", "Librarian"), getAllUsers);
router.get("/all/:id", isAuthenticated, getUserById);
router.post("/add/newAdmin", isAuthenticated, authorizeRoles("Admin", "HR"), registerNewAdmin);   
router.get("/employees", isAuthenticated, authorizeRoles("Admin", "HR"), getAllEmployees);
router.route("/employees/:id")
  .get(isAuthenticated, authorizeRoles("Admin", "HR"), getEmployeeById)
  .patch(isAuthenticated, authorizeRoles("Admin", "HR"), uploadImage.single('avatar'),updateEmployee);

router.patch(
  "/employees/:id/status",
  isAuthenticated,
  authorizeRoles("Admin", "HR"),
  updateEmployeeStatus
);



router.post(
  "/employees/:id/documents",
  isAuthenticated,
  authorizeRoles("Admin", "HR"),
  uploadImage.single('document'),
  uploadDocument
);
router.post("/register/employee", isAuthenticated, authorizeRoles("Admin", "HR"),uploadImage.single('avatar'),registerNewEmployee);
router.get("/verify-email/:token", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.delete("/employees/:id", isAuthenticated, authorizeRoles("Admin", "HR"), deleteEmployee);
export default router;