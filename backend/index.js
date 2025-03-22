const express = require("express");
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const socketSetup = require("./config/socket");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const billingRoutes = require("./routes/billingRoutes");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

// API routes
app.use("/api/billing", billingRoutes);

socketSetup(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
