const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "https://hariselvan.vercel.app"
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "https://hariselvan.vercel.app" }
});

let rooms = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("create-room", (roomId) => {
    rooms[roomId] = { time: 0, playing: false };
    socket.join(roomId);
  });

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sync", ({ roomId, time, playing }) => {
    rooms[roomId] = { time, playing };
    socket.to(roomId).emit("sync", { time, playing });
  });

  socket.on("get-state", (roomId) => {
    if (rooms[roomId]) {
      socket.emit("sync", rooms[roomId]);
    }
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});