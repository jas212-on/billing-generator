import express from "express";
import Bill from "../models/Bill.js";
import CustomerData from "../models/CustomerData.js";
import ProductData from "../models/ProductData.js";
import RevenueData from "../models/RevenueData.js";

const router = express.Router();

router.get("/get-bills", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(201).json(bills);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.put("/update-bill/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bill = await Bill.findById(id);
    bill.status = "paid";
    bill.save();
    res.status(201).json(bill);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/add-bill", async (req, res) => {
  try {
    const {
      date,
      customerName,
      email,
      phone,
      items,
      amount,
      status,
      items_detail,
      labourCharges,
      paymentMode,
    } = req.body;
    const bill = await Bill.create({
      date,
      customerName,
      email,
      phone,
      items,
      amount,
      status,
      items_detail,
      labourCharges,
      paymentMode,
    });

    await CustomerData.findOneAndUpdate(
      { email: email },
      {
        $set: { name: customerName },
        $inc: { moneySpent: amount },
      },
      {
        upsert: true,
        new: true,
      }
    );

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
