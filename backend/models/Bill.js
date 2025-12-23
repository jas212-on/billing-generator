import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
        id: String,
        date: String,
        customerName: String,
        email: String,
        phone: String,
        items: Number,
        amount: Number,
        status: String,
        items_detail: Array,
        labourCharges: Array,
    });
    
const Bill = mongoose.model("Bill", billSchema);
export default Bill;