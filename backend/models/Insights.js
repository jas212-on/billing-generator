import mongoose from "mongoose";

const insightsSchema = new mongoose.Schema({
    customers : [{
        name : String,
        moneySpent : Number
    }],
    products : [{
        name : String,
        quantity : Number
    }],
    monthlyRevenue : [{
        month : String,
        revenue : Number,
        year: Number,
        monthNumber: Number
    }]
});

const Insights = mongoose.model("Insights", insightsSchema);
export default Insights;