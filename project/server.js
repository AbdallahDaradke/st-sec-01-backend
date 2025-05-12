// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import { dot } from "node:test/reporters";
import { timeStamp } from "console";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello From Node.js + Express!");
});
app.get("/api/greet", (req, res) => {
  res.json({ message: "Hello, World!", timeStamp: Date.now() });
});

app.post("/api/echo", (req, res) => {
  res.json({ received: req.body });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// export default server; Or export default app;(don't know)
