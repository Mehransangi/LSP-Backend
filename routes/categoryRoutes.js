import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();
//Create category
router.post("/create-category", requireSignIn, isAdmin, createCategory);

//Update category
router.put("/Update-category/:id", requireSignIn, isAdmin, updateCategory);

//Get all category
router.get("/categories", getCategories);

//Get single category
router.get("/category/:slug", getCategory);

//Delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategory);

export default router;
