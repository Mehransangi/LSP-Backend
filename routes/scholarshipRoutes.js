import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import multer from "multer";
import {
  createScholarship,
  deleteScholarship,
  getScholarships,
  getSingleScholarship,
  updateScholarship,
  uploader,
} from "../controllers/scholarshipController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });



//Create
router.post("/create-scholarship", requireSignIn, isAdmin, createScholarship);

//Get All Scholarships
router.get("/scholarships", getScholarships);

//Get Single Scholarship
router.get("/scholarship/:slug", getSingleScholarship);

//Delete Scholarship
router.delete("/delete-scholarship/:id", requireSignIn, isAdmin, deleteScholarship);

//Update Scholarship
router.put("/update-scholarship/:id", requireSignIn, isAdmin, updateScholarship);

// Upload Image
router.post("/upload-image", upload.single("image"), uploader)

export default router;
