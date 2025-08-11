import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createLocation,
  deleteLocation,
  getLocations,
  singleLocation,
  updateLocation,
} from "../controllers/locationController.js";

const router = express.Router();

//Create
router.post("/create-location", requireSignIn, isAdmin, createLocation);

//Update
router.put("/update-location/:id", requireSignIn, isAdmin, updateLocation);

//Get All Location
router.get("/locations", getLocations);

//Single Location
router.get("/location/:slug", singleLocation);

//Delete
router.delete("/delete-location/:id", requireSignIn, isAdmin, deleteLocation);

export default router;
