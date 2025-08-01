import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { addBooks, deleteBooks, updateBooks } from "../controllers/book.controller.js";
import { recordBorrowBook, returnBook } from "../controllers/borrow.controller.js";
import { recordAssetAssignment, recordAssetRepaired, recordAssetRetired, recordAssetReturn, recordRepairAsset } from "../controllers/assetAssignment.controller.js";
import { updateAssetDetails } from "../controllers/asset.controller.js";
import { updateEmployee, updateEmployeeStatus } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", isAuthenticated, async (req, res, next) => {
  const { intent, parameters } = req.body;

  if (intent === "create_book") {
    const allowedRoles = ["Admin", "Librarian"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.body = parameters;
    return addBooks(req, res, next);
  }
  else if(intent === "delete_book"){
    const allowedRoles = ["Admin", "Librarian"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.params.id = parameters.id;
    return deleteBooks(req, res, next);
  }
  else if(intent === "assign_book"){
    const allowedRoles = ["Admin", "Librarian"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.params.id = parameters.id;
    req.body.email = parameters.email;
    return recordBorrowBook(req, res, next);
  }
  else if(intent === "return_book"){
    const allowedRoles = ["Admin", "Librarian"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.params.bookId = parameters.id;
    req.body.email = parameters.email;
    return returnBook(req, res, next);
  }
   else if(intent === "update_book"){
    const allowedRoles = ["Admin", "Librarian"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.params.id = parameters.id;
    req.body.updates = parameters.updates;
    return updateBooks(req, res, next);
  }
  else if(intent === "assign_asset"){
    const allowedRoles = ["Admin", "Asset Manager"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.params.sno = parameters.sno;
    req.body.email = parameters.email;
    return recordAssetAssignment(req, res, next);
  }
  else if(intent === "delete_asset"){
    const allowedRoles = ["Admin", "Asset Manager"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.params.sno = parameters.sno;
    return deleteAsset(req, res, next);
  }
  else if(intent === "return_asset"){
    const allowedRoles = ["Admin", "Asset Manager"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.params.sno = parameters.sno;
    return recordAssetReturn(req, res, next);
  }
  else if(intent === "update_asset"){
    const allowedRoles = ["Admin", "Asset Manager"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    console.log(parameters);
    req.params.sno = parameters.sno;
    req.body = parameters.updates;
    return updateAssetDetails(req, res, next);
  }
  else if(intent === "repair_asset"){
    const allowedRoles = ["Admin", "Asset Manager"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.params.sno = parameters.sno;
    if(parameters.remarks){
      req.body.remarks = parameters.remarks;
    }
    return recordRepairAsset(req, res, next);
  }
  else if(intent === "repaired_asset"){
    const allowedRoles = ["Admin", "Asset Manager"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.params.sno = parameters.sno;
    if(parameters.remarks){
      req.body.remarks = parameters.remarks;
    }
    return recordAssetRepaired(req, res, next);
  }
  else if(intent === "retire_asset"){
    const allowedRoles = ["Admin", "Asset Manager"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.params.sno = parameters.sno;
    return recordAssetRetired(req, res, next);
  }
  else if(intent === "update_employee_status"){
    const allowedRoles = ["Admin", "HR"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.params.id = parameters.id;
    req.body = parameters;
    return updateEmployeeStatus(req, res, next);
  }
  else if(intent === "update_employee"){
    const allowedRoles = ["Admin", "HR"];
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.params.id = parameters.id;
    req.body = parameters.updates;
    return updateEmployee(req, res, next);
  }
   else {
    return res.status(400).json({
      success: false,
      message: "Invalid intent",
    });
  }
});

export default router;
