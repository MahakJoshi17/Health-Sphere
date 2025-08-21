const express = require("express");
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socketSetup = require("./config/socket");
const billingRoutes = require("./routes/billingRoutes");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB");
    console.error(err.message);
    process.exit(1); // Exit if DB connection fails
  });

// API routes
app.use("/api/billing", billingRoutes);

// Setup Socket.io
socketSetup(server);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
