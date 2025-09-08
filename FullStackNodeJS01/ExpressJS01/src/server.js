import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import viewEngine from "./config/viewEngine.js";
import connectDB from "./config/configdb.js";

// Import routes
import authRoutes from "./route/web.js";
import categoryRoutes from "./route/categoryRoutes.js";
import productRoutes from "./route/productRoutes.js";

dotenv.config();

const app = express();

// Middleware parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS cho React frontend
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// View engine (nếu bạn render EJS)
viewEngine(app);

// API routes
app.use("/", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// Kết nối DB
connectDB();

// Server listen
const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log("Backend Node.js is running on port: " + port);
});
