// product.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
     
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const ProductModel = mongoose.model("Product", productSchema);


export default ProductModel;