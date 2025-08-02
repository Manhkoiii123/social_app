import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const suggestedUser = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } })
      .limit(5)
      .select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { name, userName, bio, profession, gender } = req.body;
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const sameUserWithUserName = await User.findOne({
      userName,
      _id: { $ne: req.userId },
    });
    if (sameUserWithUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }
    let profileImage;
    if (req.file) {
      profileImage = await uploadOnCloudinary(req.file.path);
    }
    user.name = name;
    user.userName = userName;
    user.bio = bio;
    user.profession = profession;
    user.gender = gender;
    user.profileImage = profileImage;
    await user.save();
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOne({ userName }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
