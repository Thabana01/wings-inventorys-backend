const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/products.json");

const readData = () => JSON.parse(fs.readFileSync(filePath));
const writeData = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

exports.getProducts = (req, res) => {
  const products = readData();
  res.json(products);
};

exports.addProduct = (req, res) => {
  const products = readData();
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  writeData(products);
  res.json(newProduct);
};

exports.updateProduct = (req, res) => {
  const products = readData();
  const index = products.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });
  products[index] = { ...products[index], ...req.body };
  writeData(products);
  res.json(products[index]);
};

exports.deleteProduct = (req, res) => {
  let products = readData();
  products = products.filter(p => p.id != req.params.id);
  writeData(products);
  res.json({ success: true });
};
