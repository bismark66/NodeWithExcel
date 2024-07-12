/** @format */

let xlsx = require("xlsx");
let fs = require("fs");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const dataSchema = new mongoose.Schema({
  voltage: Number,
  current: Number,
  temperature: Number,
  power: Number,
  time: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Data = mongoose.model("Data", dataSchema);

let workbook = xlsx.readFile("fyp-datadraft.xlsx");
const worksheet = workbook.Sheets["Sheet1"];

const aoo = xlsx.utils.sheet_to_json(worksheet);

async function insertData() {
  const db = mongoose.connection;

  await db
    .collection("datapoints")
    .insertMany(aoo, { ordered: true })
    .then(() => console.log("Data inserted successfully!"))
    .catch((err) => console.error("Error inserting data:", err));
}

insertData();
