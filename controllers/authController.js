import jwt from "jsonwebtoken";
import { compare, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import { sendVerificationCode } from "../middleware/email/Email.js";
import contactModel from "../models/contactModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.send({ error: " Name is required" });
    }
    if (!email) {
      return res.send({ error: " Email is required" });
    }
    if (!password) {
      return res.send({ error: " Password is required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "User already exist please login",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registered",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const match = await compare(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successful",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "somthing went wrong in the login controller",
      error,
    });
  }
};

// Forgot password
export const verifyTokenController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required!" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const verficationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    sendVerificationCode(email, verficationCode);
    await userModel.findByIdAndUpdate(user._id, {
      verificationToken: verficationCode,
      verificationDate: Date.now() + 15 * 60 * 1000,
    });
    res.status(200).send({
      success: true,
      message: "Verfication code has been sent to your Email.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Server error (FP)",
    });
  }
};

// Update user profile
export const updateController = async (req, res) => {
  try {
    const { name, email, _id } = req.body;
    if (!name || !email) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const user = await userModel.findByIdAndUpdate(
      _id,
      { name, email },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

//verify otp
export const verifyOtp = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await userModel.findOne({
      verificationToken: code,
    });
    if (code !== user?.verificationToken) {
      return res.status(400).send({
        success: false,
        message: "Invalid Token or Token Expired!!",
      });
    }
    user.verificationToken = "";
    user.save();
    res.status(200).send({
      success: true,
      message: "OTP verified",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

//forgot password
export const forgotPasswordController = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(404).send({
        success: false,
        message: "All feilds are required",
      });
    }
    const hashed = await hashPassword(password);
    await userModel.findByIdAndUpdate(req.body._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};


// Contact us controller
export const contactUSController = async (req, res) => {
  try {
    const {name , email , message} = req.body
    if(!name || !email || !message){
      return res.status(404).send({message: "All Feilds Must  Be Filled."})
    }
    await new contactModel({name, email, message}).save()
    res.status(201).send({
      success: true,
      message: "Thank You For Your Feedback."
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
}