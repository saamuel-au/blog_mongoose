import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import orderController from "./controllers/orderController"

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  console.error("you forgot to add the mongo connection string");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("Database connection initiated"))
  .catch((error) => console.error("Database connection error:", error));

const database = mongoose.connection;

database.on("error", (error) => {
  console.log("Database error:", error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use('/', orderController)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
