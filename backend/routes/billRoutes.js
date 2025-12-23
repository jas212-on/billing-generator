import express from "express";
import Bill from "../models/Bill.js";

const router = express.Router();

router.get("/get-bills", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(201).json(bills);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message});
  }
});

router.post("/add-bill", async (req, res) => {
  try {
    const {
      id,
      date,
      customerName,
      email,
      phone,
      items,
      amount,
      status,
      items_detail,
      labourCharges,
    } = req.body;
    const bill = await Bill.create({
      id,
      date,
      customerName,
      email,
      phone,
      items,
      amount,
      status,
      items_detail,
      labourCharges,
    });
    res.status(201).json(bill);
  } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message});
  }
});

export default router;
