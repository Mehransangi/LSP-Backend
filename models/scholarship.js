import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  slug: {
    type: String,
    lowercase: true
  },
  descriptionHTML: {
    type: String,
  },
  applicationURL: {
    type: String,
  },
  applicationDeadline: {
    type: String,
  },
  universityName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University-Name",
  },
  programLevel: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Level",
  }],
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  forDisabled:{
    type: Boolean,
    default: false
  },
  dateScraped: { type: Date, default: Date.now },
});

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

export default Scholarship;
