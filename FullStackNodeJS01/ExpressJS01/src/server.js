import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import viewEngine from "./config/viewEngine.js";
import connectDB from "./config/configdb.js";

import authRoutes from "./route/web.js";
import categoryRoutes from "./route/categoryRoutes.js";
import productRoutes from "./route/productRoutes.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

viewEngine(app);

app.use("/", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

const port = process.env.PORT || 8088;

(async function startServer() {
  try {
    // await DB connect
    await connectDB();
    console.log("Connection has been established successfully");

    // app.listen phải chắc chắn chạy
    app.listen(port, () => {
      console.log(`Backend Node.js is running on port: ${port}`);
    });

    // Giữ event loop "alive" bằng cách tạo listener dummy (cần nếu process exit quá sớm)
    process.stdin.resume(); 

  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
