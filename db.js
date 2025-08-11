import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();


connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err.message));
