const fs = require("fs");
const path = require("path");

const productsFile = path.join(__dirname, "../data/products.json");
const salesFile = path.join(__dirname, "../data/sales.json");

// Helper functions
const readData = (file) => JSON.parse(fs.readFileSync(file));
const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// Get all sales (for reports)
exports.getSales = (req, res) => {
  const sales = readData(salesFile);
  res.json(sales);
};

// Record a new sale
exports.recordSale = (req, res) => {
  const { productId, quantity, customerId, date } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: "Product ID and quantity are required" });
  }

  // Read current products and sales
  const products = readData(productsFile);
  const sales = readData(salesFile);

  const productIndex = products.findIndex(p => p.id == productId);
  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Check stock
  if (products[productIndex].quantity < quantity) {
    return res.status(400).json({ error: "Insufficient stock" });
  }

  // Deduct product quantity
  products[productIndex].quantity -= quantity;
  writeData(productsFile, products);

  // Record sale
  const newSale = {
    id: Date.now(),
    productId,
    quantity,
    customerId: customerId || null,
    date: date || new Date().toISOString()
  };
  sales.push(newSale);
  writeData(salesFile, sales);

  res.json(newSale);
};
