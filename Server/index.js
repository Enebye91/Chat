// backend

//express server
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
// cors middleware. prevent you from getting connections errors.
app.use(cors());

const { Server } = require("socket.io"); // Henter class Server fra socket.io libery

// HTTP server med express
const server = http.createServer(app);

// Vigtig variable, så man kan arbejde med socket.io
// new server, fordi server er en class ovenover
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// React køre på port 3000, derfor 3001
server.listen(3001, () => {
  console.log("Server is running");
});
