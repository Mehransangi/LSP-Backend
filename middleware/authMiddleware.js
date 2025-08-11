import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.JWT_KEY);
    req.user = decode
    next();
  } catch (error) {
    console.log(error);
  }
};

// Admin Routes
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unathorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
