import slugify from "slugify";
import locationModel from "../models/locationModel.js";

//Create
export const createLocation = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).send({ message: "Location is required!" });
    }
    const exist = await locationModel.findOne({ name });
    if (exist) {
      return res.status(200).send({ message: "Location Already Exists!" });
    }
    const location = await new locationModel({ name, slug: slugify(name) }).save();
    res.status(200).send({
      success: true,
      message: "Location Created.",
      location,
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

//Update Location
export const updateLocation = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(404).send({ message: "Location is required." });
    }
    const location = await locationModel
      .findByIdAndUpdate(
        req.params.id,
        { name, slug: slugify(name) },
        { new: true }
      )
    res.status(200).send({
      success: true,
      message: "Location Updated.",
      location,
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

//Get All Location
export const getLocations = async (req, res) => {
  try {
    const locations = await locationModel.find({});
    res.status(200).send({
      success: true,
      messsage: "Got All Locations",
      locations,
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

//Single Location
export const singleLocation = async (req, res) => {
  try {
    const location = await locationModel.findOne({slug: req.params.slug});
    res.status(200).send({
      success: true,
      message: "One location",
      location,
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

//Delete
export const deleteLocation = async (req, res) => {
  try {
    await locationModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Location Deleted",
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
