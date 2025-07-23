import express from 'express';
const router = express.Router();
import { isAuthenticated, authorizeRoles } from '../middlewares/auth.middleware.js';
import { getAuditLogs } from '../controllers/auditLog.controller.js';
router.get('/', isAuthenticated, authorizeRoles("Admin"), getAuditLogs);

export default router;
