import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const genToken = async (userId) => {
  try {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "10y",
    });
    return token;
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

export default genToken;
