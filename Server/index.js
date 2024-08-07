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
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Listen to an event. Så lige så snart en user logger ind, vil det her starte med at køre.
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data => {
   // her skal alt den emit til alle som er connected til serveren. broadcast gør at man kan sende til alle andre end en selv. 
   socket.broadcast.emit("receive_message, data") // Man giver den en ny event, som bliver listen til i frontend


  })); // callback function som vil modtage dataen fra objectet i App.jsx
});

// React køre på port 5173, derfor 5174
server.listen(5174, () => {
  console.log("Server is running");
});
