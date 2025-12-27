import express from "express";
import CustomerData from "../models/CustomerData.js";
import { isAdmin, isUser } from "../middleware/authMiddleware.js";
import { orMiddleware } from "../middleware/orMiddleware.js";

const router = express.Router();

router.post("/add-user",isAdmin, async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const user = await CustomerData.create({ name, email, password, role, orders: 0, moneySpent: 0 });
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });        
    }
})

router.get("/get-users",isAdmin, async (req, res) => {
    try {
        const users = await CustomerData.find();
        res.status(201).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.put("/update-user/:id",isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;
        const user = await CustomerData.findByIdAndUpdate(id, { name, email, password, role }, { new: true });
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.delete("/delete-user/:id",isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await CustomerData.findByIdAndDelete(id);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;