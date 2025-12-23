import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/add-product",async (req,res)=>{
    try {
        const {name,price} = req.body;
        const product = await Product.create({name,price});
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }   
})

router.get("/get-products",async (req,res)=>{
    try {
        const products = await Product.find();
        res.status(201).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
})

router.put("/update-product/:id",async (req,res)=>{
    try {
        const {id} = req.params;
        const {name,price} = req.body;
        const product = await Product.findByIdAndUpdate(id,{name,price});
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