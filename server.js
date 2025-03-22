const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const formRoutes = require("./routes/formRoutes");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/forms", formRoutes);

const PORT = process.env.PORT || 5080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
