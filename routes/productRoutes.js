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

// GET all products
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.products || []);
});

// ADD product
router.post("/", (req, res) => {
  const db = readDB();
  const newProduct = { id: Date.now(), ...req.body };
  db.products.push(newProduct);
  writeDB(db);
  res.status(201).json(newProduct);
});

// UPDATE product
router.put("/:id", (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const index = db.products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });
  db.products[index] = { id, ...req.body };
  writeDB(db);
  res.json(db.products[index]);
});

// DELETE product
router.delete("/:id", (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  db.products = db.products.filter(p => p.id !== id);
  writeDB(db);
  res.json({ message: "Product deleted" });
});

module.exports = router;
