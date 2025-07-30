import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signUp = async (req, res) => {
  try {
    const { name, email, password, userName } = req.body;
    const findByEmail = await User.findOne({ email });
    if (findByEmail) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }
    const findByUserName = await User.findOne({ userName });
    if (findByUserName) {
      return res.status(400).json({
        message: "User with this username already exists",
      });
    }
    if (!name || !email || !password || !userName) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      userName,
      password: hashPassword,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    return res.status(201).json({
      message: "User signed in successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "User signed out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
