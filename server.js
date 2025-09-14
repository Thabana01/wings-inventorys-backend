const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");

app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);

// --- Serve React Frontend ---
const frontendBuildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendBuildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
