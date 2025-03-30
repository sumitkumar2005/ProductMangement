import { validationResult } from "express-validator";
import ProductService from "../Services/product.service.js";
import ProductModel from "../Models/product.model.js";

async function CreateProduct(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, category, price, imageUrl, description, rating } = req.body;
        const userId = req.user._id;

        const product = await ProductService.createProduct({
            name,
            category,
            price,
            imageUrl,
            description,
            rating,
            createdBy: userId,
            userId
        });

        return res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while creating the product.",
            error: error.message
        });
    }
}

async function GetAllProduct(req, res, next) {
    try {
        const userId = req.user._id;
        const products = await ProductModel.find({ createdBy: userId });

        return res.status(200).json({
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching products.",
            error: error.message
        });
    }
}

async function UpdateProduct(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { productId } = req.params;
        const { name, category, price, imageUrl, description, rating } = req.body;
        const userId = req.user._id;

        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized to update this product" });
        }

        const updatedProduct = await ProductService.updateProduct(productId, {
            name,
            category,
            price,
            imageUrl,
            description,
            rating
        });

        return res.status(200).json({
            message: "Product updated successfully",
            updatedProduct
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while updating the product.",
            error: error.message
        });
    }
}

async function DeleteProduct(req, res, next) {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this product" });
        }

        await ProductService.deleteProduct(productId);

        return res.status(200).json({
            message: "Product deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while deleting the product.",
            error: error.message
        });
    }
}

export default { CreateProduct, GetAllProduct, UpdateProduct, DeleteProduct };
