// product.service.js
import ProductModel from "../Models/product.model.js";

async function createProduct({ name, category, price, imageUrl, description, rating,createdBy }) {
    const product = await ProductModel.create({
        name,
        category,
        price,
        imageUrl,
        description,
        rating,
        createdBy,
        createdAt: new Date()
    });
    return product;
}

// ✅ Implementing `updateProduct`
async function updateProduct(productId, updatedData) {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            { $set: updatedData },
            { new: true } // Returns the updated document
        );

        return updatedProduct;
    } catch (error) {
        throw new Error("Error updating product: " + error.message);
    }
}

export default { createProduct, updateProduct };
