import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.middleware.js";
import { getAllUsers, registerNewAdmin } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/all", isAuthenticated, authorizeRoles("Admin"), getAllUsers);
router.post("/add/newAdmin", isAuthenticated, authorizeRoles("Admin"), registerNewAdmin);


export default router;
