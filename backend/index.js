import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on http://localhost:${PORT}`);
});
