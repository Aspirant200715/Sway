import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    const decoded = jwt.verify(token, process.env.jwt_secret);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    console.log(decoded);

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.clearCookie("token", { httpOnly: true });
      return res.status(401).json({
        message: "Session expired. Please log in again.",
      });
    }

    console.log(error);
    return res.status(401).json({ message: "Token invalid" });
  }
};

export default isAuthenticated;
