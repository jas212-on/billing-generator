import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    orders: Number,
    moneySpent: Number,
    role: String
});

const CustomerData = mongoose.model("CustomerData", customerSchema);
export default CustomerData;