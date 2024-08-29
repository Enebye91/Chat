//express server
require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose");
const app = express();
const http = require("http");
const cors = require("cors"); // cors middleware. prevent you from getting connections errors.
const { Server } = require("socket.io"); // Henter class Server fra socket.io libery

app.use(cors());

// const mongoURI = process.env.Mongo_URI;
// console.log("Mongo URI:", process.env.Mongo_URI);
// mongoose
//   .connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("Failed to connect to MongoDB", err));

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

  socket.on("send_message", (data) => {
    // her skal alt den emit til alle som er connected til serveren. broadcast gør at man kan sende til alle andre end en selv.
    socket.broadcast.emit("receive_message", data); // Man giver den en ny event, som bliver listen til i frontend
  }); // callback function som vil modtage dataen fra objectet i App.jsx

  // Håndter afbrydelser
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// React køre på port 5173, derfor 5174
server.listen(5174, () => {
  console.log("Server is running");
});
