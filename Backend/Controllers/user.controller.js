import {validationResult} from "express-validator";

import UserModel from "../Models/user.model.js";
import UserService  from "../Services/user.service.js";

async function registerUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const isUser = await UserModel.findOne({ email });
        if (isUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await UserModel.hashPassword(password);

        // Create user
        const user = await UserService.createUser({
            name,
            email,
            password: hashedPassword,
        });

        // Generate token
        const token = user.generateAuthToken();

        // Send success response
        return res.status(201).json({ token, user });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while registering the user.', error: error.message });
    }
}



async function loginUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = user.generateAuthToken();
        res.cookie('token', token);
        res.status(200).json({ token, user });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred during login.', error: error.message });
    }
}
export default  {registerUser,loginUser}