import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
    createUniName,
  deleteUniName,
  getAllUniName,
  singleUniName,
  updateUniName,
} from "../controllers/uniNameController.js";

const router = express.Router();

//Create
router.post("/create-uniname", requireSignIn, isAdmin, createUniName);

//Update
router.put("/update-uniname/:id", requireSignIn, isAdmin, updateUniName);

//Get All
router.get("/uninames", getAllUniName);

//Get Single
router.get("/uniname/:slug", singleUniName);

//Delete
router.delete("/delete-uniname/:id", requireSignIn, isAdmin, deleteUniName);

export default router;
