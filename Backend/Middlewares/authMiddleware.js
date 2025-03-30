import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/user.model.js"; // Ensure correct model path

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id).select("-password"); // Fetch user without password

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token", error: error.message });
    }
};

export default authMiddleware;
