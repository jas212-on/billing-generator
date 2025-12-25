import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
        date: String,
        customerName: String,
        email: String,
        phone: String,
        items: Number,
        amount: Number,
        status: String,
        items_detail: Array,
        labourCharges: Array,
        paymentMode: String
    });
    
const Bill = mongoose.model("Bill", billSchema);
export default Bill;