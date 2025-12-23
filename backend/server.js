import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import cors from "cors"
import { createServer } from "http"
import productRoutes from "./routes/productRoutes.js"
import billRoutes from "./routes/billRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const httpServer = createServer(app)

app.use(cors({
    origin : ["http://localhost:5173"],
}))
app.use(express.json())



app.get('/', (req, res) => {
  res.send('Server running !');
});

app.use("/api/products",productRoutes)
app.use("/api/bills",billRoutes)

httpServer.listen(PORT,()=>{
    console.log("Server starting at port "+PORT )
    connectDB()
})