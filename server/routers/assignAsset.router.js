import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.middleware.js";
import { getAllAssignments, getUserAssignments, recordAssetAssignment, recordAssetRepaired, recordAssetRetired, recordAssetReturn, recordRepairAsset } from "../controllers/assetAssignment.controller.js";

const router = express.Router();

router.post("/recordAssetAssignment/:sno", isAuthenticated, authorizeRoles("Admin"), recordAssetAssignment);
router.post("/recordAssetReturn/:sno", isAuthenticated, authorizeRoles("Admin"), recordAssetReturn);
router.post("/recordAssetRepair/:sno", isAuthenticated, authorizeRoles("Admin"), recordRepairAsset);
router.post("/recordAssetRepaired/:sno", isAuthenticated, authorizeRoles("Admin"), recordAssetRepaired);
router.post("/recordAssetRetired/:sno", isAuthenticated, authorizeRoles("Admin"), recordAssetRetired);
router.get("/getAllAssignments", isAuthenticated, authorizeRoles("Admin"), getAllAssignments);
router.get("/getAllAssignments/:userId", isAuthenticated, authorizeRoles("Admin"), getUserAssignments);

export default router;
