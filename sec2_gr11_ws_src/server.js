const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const adminAccountWS = require("./adminAccountWS");
const productManageWS = require("./productManageWS");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/upload", express.static(path.join(__dirname, "upload")));

// API Routes
app.use("/api_service/", adminAccountWS);
app.use("/api_service/", productManageWS);

// 404 Handler
app.use((req, res) => {
  res.status(404).send("Endpoint not found");
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening at Port ${process.env.PORT}`);
});