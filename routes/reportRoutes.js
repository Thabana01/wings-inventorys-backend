const express = require("express");
const router = express.Router();
let db = require("../db.json");

// Simple report: return all sales
router.get("/", (req, res) => {
  res.json(db.sales);
});

module.exports = router;
