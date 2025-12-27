import express from "express";
import Bill from "../models/Bill.js";
import CustomerData from "../models/CustomerData.js";
import ProductData from "../models/ProductData.js";
import RevenueData from "../models/RevenueData.js";
import { orMiddleware } from "../middleware/orMiddleware.js";
import { isAdmin, isUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get-bills",isAdmin, async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(201).json(bills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/get-bill", isUser, async (req, res) => {
  try {
    const userId = req.session.userId;

    const bills = await Bill.find({ billerId: userId });

    res.status(200).json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


router.post("/add-bill",orMiddleware(isAdmin, isUser), async (req, res) => {
  try {
    const {
      date,
      customerName,
      email,
      phone,
      items,
      amount,
      items_detail,
      labourCharges,
      paymentMode,
      billedBy,
      paidAmount,
      balance,
      billerId
    } = req.body;
    const bill = await Bill.create({
      date,
      customerName,
      email,
      phone,
      items,
      amount,
      items_detail,
      labourCharges,
      paymentMode,
      billedBy,
      paidAmount,
      balance,
      billerId
    });

    const employee = await CustomerData.findByIdAndUpdate(billerId, { $inc: { orders: 1, moneySpent: amount } }, { new: true });

    items_detail.forEach(async (item) => {
      const { id, name, quantity } = item;
      await ProductData.findOneAndUpdate(
        { id, name },
        { $inc: { quantity: quantity } },
        { new: true, upsert: true }
      );
    });

    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("en-US", { month: "long" });
    const year = dateObj.getFullYear();
    const monthNumber = dateObj.getMonth() + 1;

    await RevenueData.findOneAndUpdate(
      { year, monthNumber },
      {
        $setOnInsert: { month },
        $inc: { revenue: amount },
      },
      { upsert: true, new: true }
    );

    res.status(201).json(bill);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
