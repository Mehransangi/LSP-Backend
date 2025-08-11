import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createLevel,
  deleteLevel,
  getLevels,
  singleLevel,
  updateLevel,
} from "../controllers/levelController.js";

const router = express.Router();

//create Level
router.post("/create-level", requireSignIn, isAdmin, createLevel);

//Update Level
router.put("/update-level/:id", requireSignIn, isAdmin, updateLevel);

//Get All Level
router.get("/levels", getLevels);

//Single Level
router.get("/level/:slug", singleLevel);

//Delete Level
router.delete("/delete-level/:id", requireSignIn, isAdmin, deleteLevel);

export default router;