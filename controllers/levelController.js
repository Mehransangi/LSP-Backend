import slugify from "slugify";
import levelModel from "../models/levelModel.js";

export const createLevel = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).send({ message: " Program Level Is Required." });
    }
    const exist = await levelModel.findOne({ name });
    if (exist) {
      return res.status(200).send({ message: "Program Level Already Exists." });
    }
    const level = await new levelModel({ name, slug: slugify(name) }).save();
    res.status(200).send({
      success: true,
      message: "Program Level Created.",
      level,
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

//Update Level
export const updateLevel = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) {
      return res.status(404).send({ message: "Program Level Is Required." });
    }
    const level = await levelModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Program Level Updated.",
      level,
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

//Get All
export const getLevels = async (req, res) => {
  try {
    const levels = await levelModel.find({});
    res.status(200).send({
      success: true,
      message: "All Programs Level.",
      levels,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Internal Server Error.",
      error,
    });
  }
};

// Get Single
export const singleLevel = async (req, res) => {
  try {
    const { slug } = req.params;
    const level = await levelModel.findOne({ slug });
    res.status(200).send({
      success: true,
      message: "Single Level",
      level,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Internal Server Error.",
      error,
    });
  }
};

//Delete
export const deleteLevel = async (req, res) => {
  try {
    await levelModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Program Level deleted.",
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
