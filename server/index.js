const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let connectionCount = 0;
io.on("connection", (socket) => {
  connectionCount++;
  console.log("a user connected", socket.id);
  console.log("Total connections: " + connectionCount);

  io.emit("updateUserCount", connectionCount); // Emit to all clients

  socket.on("textChange", (text) => {
    socket.broadcast.emit("textUpdate", text);
  });

  socket.on("cursorMove", (data) => {
    socket.broadcast.emit("cursorUpdate", data);
  });

  socket.on("highlightText", (data) => {
    socket.broadcast.emit("receiveHighlight", data);
  });

  socket.on("disconnect", () => {
    connectionCount--;
    io.emit("userDisconnected", socket.id);
    console.log("user disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
