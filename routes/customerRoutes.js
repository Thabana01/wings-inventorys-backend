// backend/routes/customerRoutes.js
const express = require("express");
const router = express.Router();
const fs = require("fs");

const DB_FILE = "db.json";

// Helper functions
function readDB() {
  const data = fs.existsSync(DB_FILE) ? fs.readFileSync(DB_FILE, "utf-8") : '{"products":[],"customers":[],"sales":[]}';
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// GET all customers
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.customers || []);
});

// ADD new customer
router.post("/", (req, res) => {
  const db = readDB();
  const newCustomer = { id: Date.now(), ...req.body };
  db.customers = db.customers || [];
  db.customers.push(newCustomer);
  writeDB(db);
  res.status(201).json(newCustomer);
});

// UPDATE customer
router.put("/:id", (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  db.customers = db.customers || [];
  const index = db.customers.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ error: "Customer not found" });
  db.customers[index] = { id, ...req.body };
  writeDB(db);
  res.json(db.customers[index]);
});

// DELETE customer
router.delete("/:id", (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  db.customers = db.customers || [];
  db.customers = db.customers.filter(c => c.id !== id);
  writeDB(db);
  res.json({ message: "Customer deleted" });
});

module.exports = router;
