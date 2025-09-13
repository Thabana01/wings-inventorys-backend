const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/customers.json");

const readData = () => JSON.parse(fs.readFileSync(filePath));
const writeData = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

exports.getCustomers = (req, res) => {
  const customers = readData();
  res.json(customers);
};

exports.addCustomer = (req, res) => {
  const customers = readData();
  const newCustomer = { id: Date.now(), ...req.body };
  customers.push(newCustomer);
  writeData(customers);
  res.json(newCustomer);
};

exports.updateCustomer = (req, res) => {
  const customers = readData();
  const index = customers.findIndex(c => c.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Customer not found" });
  customers[index] = { ...customers[index], ...req.body };
  writeData(customers);
  res.json(customers[index]);
};

exports.deleteCustomer = (req, res) => {
  let customers = readData();
  customers = customers.filter(c => c.id != req.params.id);
  writeData(customers);
  res.json({ success: true });
};
