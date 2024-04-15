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
let participants = [];

io.on("connection", (socket) => {
  connectionCount++;
  participants.push(socket.id);
  console.log("a user connected", socket.id);
  console.log("Total connections: " + connectionCount);

  io.emit("updateUserCount", connectionCount, participants);

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
    participants = participants.filter((id) => id !== socket.id);
    io.emit("updateUserCount", connectionCount, participants); // Emit updated user count and participant list
    console.log("user disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
