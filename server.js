const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- API Routes ---
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");

app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);

// --- Serve React frontend ---
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
