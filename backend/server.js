import express from "express"
import dotenv from "dotenv"
import session from "express-session";
import MongoStore from "connect-mongo";
import { connectDB } from "./lib/db.js"
import cors from "cors"
import { createServer } from "http"
import productRoutes from "./routes/productRoutes.js"
import billRoutes from "./routes/billRoutes.js"
import insightsRoutes from "./routes/insightsRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import path from "path";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const httpServer = createServer(app)


const __dirname = path.resolve();

app.use(express.json())

app.use(cors({
    origin : ["http://localhost:5173","https://billing-generator-2.onrender.com"],
    credentials: true
}))

const isProduction = process.env.NODE_ENV === "production";

app.set("trust proxy", 1);

app.use(
  session({
    name: "session-id",
    secret: process.env.SESSION_SECRET, // move to .env in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: isProduction ? "none" : "lax", // REQUIRED for frontend-backend different domains
      secure: isProduction ? true : false,     // true in production (https)
    },
  })
);

app.get('/', (req, res) => {
  res.send('Server running !');
});

app.get("/api/role", (req, res) => {
  if (req.session.userId) {
    res.json({ role: req.session.role, userId: req.session.userId, name: req.session.name });
  } else if (req.session.adminId) {
    res.json({ role: req.session.role, adminId: req.session.adminId, name: req.session.name });
  } else {
    res.json({ message: "Unauthorized" });
  }
});

app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes)
app.use("/api/bills",billRoutes)
app.use("/api/insights",insightsRoutes)
app.use("/api/admin",adminRoutes)

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

httpServer.listen(PORT,()=>{
    console.log("Server starting at port "+PORT )
    connectDB()
})