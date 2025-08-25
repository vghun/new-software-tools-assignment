import express, { Express } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import viewEngine from "./config/viewEngine.js";
import initWebRoutes from "./route/web.js";
import connectDB from "./config/configdb.js";

dotenv.config();

const app: Express = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View engine
viewEngine(app);

// Routes
initWebRoutes(app);

// Database connection
connectDB();

// Port
const port: number = Number(process.env.PORT) || 6969;

app.listen(port, () => {
  console.log(` Backend Node.js is running on port: ${port}`);
});
