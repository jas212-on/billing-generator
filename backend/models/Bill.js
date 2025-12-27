import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
        date: String,
        customerName: String,
        email: String,
        phone: String,
        userId: String,
        items: Number,
        amount: Number,
        items_detail: Array,
        paymentMode: String,
        paidAmount: Number,
        balance: Number,
        billedBy: String,
        billerId : String
    });
    
const Bill = mongoose.model("Bill", billSchema);
export default Bill;