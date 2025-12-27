import express from "express";
import CustomerData from "../models/CustomerData.js";

const router = express.Router();

router.post("/user/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check user
    const user = await CustomerData.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Compare password
    const isMatch = password===user.password;
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Create session
    req.session.userId = user._id;
    req.session.role = "user";
    req.session.name = user.name;

    res.json({
      message: "Signin successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        orders: user.orders,
        moneySpent: user.moneySpent,
        role: user.role
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signin failed" });
  }
});

router.post("/admin/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await CustomerData.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if(admin.role!=="admin"){
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isMatch = password===admin.password;
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.adminId = admin._id;
    req.session.role = "admin";
    req.session.name = admin.name;

    res.json({
      message: "Signin successful",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signin failed" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("session-id");
    res.json({ message: "Logged out" });
  });
});

export default router;


