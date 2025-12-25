import mongoose from "mongoose";

const productDataSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    id: String
});

const ProductData = mongoose.model("ProductData", productDataSchema);
export default ProductData;