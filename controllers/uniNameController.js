import slugify from "slugify";
import universityNameModel from "../models/universityNameModel.js";

//Create
export const createUniName = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).send({ message: "University Name is required." });
    }
    const exist = await universityNameModel.findOne({ name });
    if (exist) {
      return res
        .status(200)
        .send({ message: "University Name already exists." });
    }
    const uniName = await new universityNameModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(200).send({
      success: true,
      message: "University Name Created.",
      uniName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

//Update
export const updateUniName = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).send({ message: "University Name is required." });
    }
    const uniName = await universityNameModel.findByIdAndUpdate(
      req.params.id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "University Name Updated.",
      uniName,
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
export const getAllUniName = async (req, res) => {
  try {
    const uniNames = await universityNameModel.find({});
    res.status(200).send({
      success: true,
      message: "Got All University Name.",
      uniNames,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

//Get Single UniName
export const singleUniName = async (req, res) => {
  try {
    const uniName = await universityNameModel.findOne({
      slug: req.params.slug,
    });
    res.status(200).send({
      success: true,
      message: "Got the single university name.",
      uniName,
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

//Delete 
export const deleteUniName = async (req,res) => {
  try {
    await universityNameModel.findByIdAndDelete(req.params.id)
    res.status(200).send({
      success: true,
      message: "University Name Deleted.",
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error.",
      error,
    });
  }
}
