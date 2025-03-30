import express from "express";
import { body } from "express-validator";
import userController from "../Controllers/user.controller.js";
import productController from "../Controllers/product.controller.js";
import authMiddleware from "../Middlewares/authMiddleware.js";
const router = express.Router();

router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('name')
            .isString()
            .isLength({ min: 3 })
            .withMessage('Name must be at least 3 characters long'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
    ],
    userController.registerUser
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password should be at least 6 characters long'),
    ],
    userController.loginUser
);

export default router;
