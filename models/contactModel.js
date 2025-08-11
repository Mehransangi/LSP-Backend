import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Contact-Us", ContactSchema);
