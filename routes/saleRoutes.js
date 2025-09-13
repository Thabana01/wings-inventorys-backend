const express = require("express");
const router = express.Router();
const fs = require("fs");
const DB_FILE = "db.json";

function readDB() {
  const data = fs.existsSync(DB_FILE) ? fs.readFileSync(DB_FILE, "utf-8") : '{"products":[],"customers":[],"sales":[]}';
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// GET all sales
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.sales || []);
});

// ADD sale
router.post("/", (req, res) => {
  const db = readDB();
  const newSale = { id: Date.now(), status: "active", ...req.body };
  db.sales.push(newSale);
  writeDB(db);
  res.status(201).json(newSale);
});

// UPDATE sale (for soft delete)
router.put("/:id", (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const index = db.sales.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ error: "Sale not found" });
  db.sales[index] = { ...db.sales[index], ...req.body };
  writeDB(db);
  res.json(db.sales[index]);
});

module.exports = router;
