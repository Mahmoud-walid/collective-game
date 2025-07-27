import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

let players: { [id: string]: { x: number; y: number; score: number } } = {};

io.on("connection", (socket) => {
  // إضافة لاعب جديد
  socket.on("player-join", (playerData) => {
    players[socket.id] = playerData;
    io.emit("players-update", players);
  });

  // تحديث حركة اللاعب
  socket.on("player-move", (data) => {
    if (players[socket.id]) {
      players[socket.id].x = data.x;
      players[socket.id].y = data.y;
      io.emit("players-update", players);
    }
  });

  // استقبال رسائل الشات
  socket.on("chat-message", (msg) => {
    io.emit("chat-message", { id: socket.id, msg });
  });

  // عند خروج اللاعب
  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("players-update", players);
  });
});

server.listen(3000, () => {
  console.log("🥰Server running on port 3000");
});

export default app;
