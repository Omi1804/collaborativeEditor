const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = express();

const server = createServer(app);
const io = new Server();

app.get("/", (req, res) => {
  res.send("Welcome to the world of express");
});

app.listen(5050, () => {
  console.log("listening on port 5050");
});
