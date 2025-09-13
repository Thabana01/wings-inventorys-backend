const fs = require("fs");
const path = require("path");

const salesFile = path.join(__dirname, "../data/sales.json");

const readData = () => JSON.parse(fs.readFileSync(salesFile));
const writeData = (data) => fs.writeFileSync(salesFile, JSON.stringify(data, null, 2));

exports.getSales = (req, res) => {
  const sales = readData();
  res.json(sales);
};

exports.recordSale = (req, res) => {
  const sales = readData();
  const newSale = { id: Date.now(), ...req.body };
  sales.push(newSale);
  writeData(sales);
  res.json(newSale);
};
