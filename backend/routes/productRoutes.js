import express from "express";
import Product from "../models/Product.js";
import { orMiddleware } from "../middleware/orMiddleware.js";
import { isAdmin, isUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add-product",isAdmin, async (req,res)=>{
    try {
        const {name,price,stock,retailerId,retailerName} = req.body;
        const product = await Product.create({name,price,retailerId,retailerName,stock});
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }   
})

router.get("/get-products",orMiddleware(isAdmin, isUser),  async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(201).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
})

router.put("/update-product/:id", isAdmin,async (req,res)=>{
    try {
        const {id} = req.params;
        const {name,price,stock,retailerId,retailerName} = req.body;
        const product = await Product.findByIdAndUpdate(id,{name,price,retailerId,retailerName,stock});
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
})

router.delete("/delete-product/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
})

export default router;