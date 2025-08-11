import slugify from "slugify";
import Scholarship from "../models/scholarship.js";

//Create
export const createScholarship = async (req, res) => {
  try {
    const {
      title,
      descriptionHTML,
      applicationURL,
      applicationDeadline,
      universityName,
      programLevel,
      location,
      category,
      forDisabled,
    } = req.body;
    if (!title) {
      return res.status(404).send({ error: "Title is Required!" });
    }
    if (!descriptionHTML) {
      return res.status(404).send({ error: "Description is Required!" });
    }
    if (!applicationDeadline) {
      return res
        .status(404)
        .send({ error: "ApplicationDeadline is Required!" });
    }
    if (!universityName) {
      return res.status(404).send({ error: "UniversityName is Required!" });
    }
    if (!programLevel) {
      return res.status(404).send({ error: "ProgramLevel is Required!" });
    }
    if (!location) {
      return res.status(404).send({ error: "Location is Required!" });
    }
    if (!category) {
      return res.status(404).send({ error: "Category is Required!" });
    }

    const scholarship = await new Scholarship({
      title,
      slug: slugify(title),
      descriptionHTML,
      applicationURL,
      applicationDeadline,
      universityName,
      programLevel,
      location,
      category,
      forDisabled,
    }).save();

    res.status(201).send({
      success: true,
      message: "Scholarship Created.",
      scholarship,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error.",
      error,
    });
  }
};

//Get All Scholarships
export const getScholarships = async (req, res) => {
  try {
     const {
      categories,
      locations,
      universities,
      levels,
      page = 1,
      limit = 10,
      search = '',
      isForDisabled
    } = req.query;

    const filter = {};

    if (categories) filter.category = { $in: categories.split(',') };
    if (locations) filter.location = { $in: locations.split(',') };
    if (universities) filter.universityName = { $in: universities.split(',') };
    if (levels) filter.programLevel = { $in: levels.split(',') };
    if (isForDisabled === 'true') filter.forDisabled = true;
    if (search.trim()) {
      filter.title = { $regex: search.trim(), $options: 'i' }; // case-insensitive search
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const total = await Scholarship.countDocuments(filter);

    const scholarships = await Scholarship.find(filter)
      .populate("category")
      .populate("location")
      .populate("universityName")
      .populate("programLevel")
      .sort({ applicationDeadline: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).send({
      success: true,
      message: "Scholarships fetched successfully.",
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      scholarships,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error.",
      error,
    });
  }
};

//Get Single Scholarship
export const getSingleScholarship = async (req, res) => {
  try {
    
    const scholarship = await Scholarship.findOne({ slug: req.params.slug })
      .populate("universityName")
      .populate("programLevel")
      .populate("location")
      .populate("category");

    if (!scholarship) {
      return res
        .status(404)
        .send({ success: false, message: "Scholarship not found." });
    }

    res.status(200).send({
      success: true,
      message: "Scholarship fetched successfully.",
      scholarship,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error.",
      error,
    });
  }
};

//Delete Scholarship
export const deleteScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
    if (!scholarship) {
      return res
        .status(404)
        .send({ success: false, message: "Scholarship not found." });
    }
    res.status(200).send({
      success: true,
      message: "Scholarship deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error.",
      error,
    });
  }
};

//Update Scholarship
export const updateScholarship = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.title) {
      updateData.slug = slugify(updateData.title);
    }
    const scholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!scholarship) {
      return res
        .status(404)
        .send({ success: false, message: "Scholarship not found." });
    }
    res.status(200).send({
      success: true,
      message: "Scholarship updated successfully.",
      scholarship,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error.",
      error,
    });
  }
};

// Image Uploader
export const uploader = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    res.json({
      success: true,
      message: "Image uploaded successfully.",
      url: imageUrl,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).send({
      success: false,
      message: "Image upload failed.",
      error,
    });
  }
};
