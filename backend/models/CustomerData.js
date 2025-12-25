import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    moneySpent: Number
});

const CustomerData = mongoose.model("CustomerData", customerSchema);
export default CustomerData;