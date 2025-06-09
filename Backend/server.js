const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");

const userRoutes = require("./routes/user.route");

const server = express();
env.config();

// Global Middlewares
server.use(express.json());

const port = process.env.PORT;
const URI = process.env.URI;

// Modular Routes
server.use("/api/v1/user", userRoutes);

mongoose
  .connect(URI)
  .then(() => {
    console.log("Database is connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});
