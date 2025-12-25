import mongoose from "mongoose";

const revenueSchema = new mongoose.Schema({
    month: String,
    revenue: Number,
    monthNumber: Number,
    year: Number
});

const RevenueData = mongoose.model("RevenueData", revenueSchema);
export default RevenueData;