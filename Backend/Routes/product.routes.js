import express from "express";
import { body } from "express-validator";
import productController from "../Controllers/product.controller.js";
import authMiddleware from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post(
    '/create',
    authMiddleware,
    [
        body('name').trim().notEmpty().withMessage('Product name is required'),
        body('category').trim().notEmpty().withMessage('Product category is required'),
        body('price')
            .notEmpty().withMessage('Price is required')
            .isNumeric().withMessage('Price must be a number'),
        body('imageUrl').optional().isURL().withMessage('Invalid image URL'),
        body('description').optional().trim(),
        body('rating')
            .optional()
            .isNumeric().withMessage('Rating must be a number')
            .custom(value => {
                if (value < 0 || value > 5) {
                    throw new Error('Rating must be between 0 and 5');
                }
                return true;
            })
    ],
    productController.CreateProduct
);

router.put(
    "/update/:productId",
    authMiddleware,
    [
        body('name').trim().notEmpty().withMessage('Product name is required'),
        body('category').trim().notEmpty().withMessage('Product category is required'),
        body('price')
            .notEmpty().withMessage('Price is required')
            .isNumeric().withMessage('Price must be a number'),
        body('imageUrl').optional().isURL().withMessage('Invalid image URL'),
        body('description').optional().trim(),
        body('rating')
            .optional()
            .isNumeric().withMessage('Rating must be a number')
            .custom(value => {
                if (value < 0 || value > 5) {
                    throw new Error('Rating must be between 0 and 5');
                }
                return true;
            })
    ],
    productController.UpdateProduct
);

router.get("/all",authMiddleware,productController.GetAllProduct);
router.delete("/delete/:")
export default router;
