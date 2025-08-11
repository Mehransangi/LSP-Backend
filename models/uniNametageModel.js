import mongoose from "mongoose";

const uniNameTageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  forDisabled: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("University-NameTag", uniNameTageSchema);
