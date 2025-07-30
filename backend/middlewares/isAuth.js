import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No authentication token provided" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid authentication token" });
    }
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export default isAuth;
