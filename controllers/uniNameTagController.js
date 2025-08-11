import uniNametageModel from "../models/uniNametageModel.js";

//Create
export const createNameTagController = async (req, res) => {
  try {
    const { name, link, forDisabled } = req.body;
    if (!name) {
      return res.status(404).send({ message: "Name is Required." });
    }
    if (!link) {
      return res.status(404).send({ message: "Link is Required." });
    }
    const uniNametag = await new uniNametageModel({
      name,
      link,
      forDisabled,
    }).save();
    res.status(201).send({
      success: true,
      message: "University NameTag Created.",
      uniNametag,
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
export const updateNameTagController = async (req, res) => {
  try {
    const updateData = { ...req.body };
    const { id } = req.params;

    const uniNametag = await uniNametageModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "University Nametag updated successfully.",
      uniNametag,
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
export const deleteUnametag = async (req, res) => {
  try {
    await uniNametageModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "University Nametag deleted Successfully.",
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

//Getting All
export const getAllUnametag = async (req, res) => {
  try {
    let { limit } = req.query;
    limit = parseInt(limit) || 100;
    const total = await uniNametageModel.countDocuments({});
    const uniNametag = await uniNametageModel.find({}).limit(limit);
    res.status(200).send({
      success: true,
      message: "Got All University Nametag.",
      uniNametag,
      total,
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
