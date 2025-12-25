import express from "express";
import RevenueData from "../models/RevenueData.js";
import CustomerData from "../models/CustomerData.js";
import ProductData from "../models/ProductData.js";

const router = express.Router();

router.get("/get-revenue", async (req, res) => {
  try {
    const year = 2025;
    const data = await RevenueData.find({ year }).sort({ monthNumber: 1 });
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/get-customers", async (req, res) => {
  try {
    const data = await CustomerData.find().sort({ moneySpent: -1 }).limit(5);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/get-products", async (req, res) => {
  try {
    const data = await ProductData.find().sort({ quantity: -1 }).limit(5);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;