//express server
const express = require("express");
// const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors"); // cors middleware. prevent you from getting connections errors.
const { Server } = require("socket.io"); // Henter class Server fra socket.io libery
const DatabaseHandler = require("../Server/src/DatabaseHandlers/DatabaseHandlerMongoDB.js");
const db = new DatabaseHandler();
const userRoutes = require("../Server/src/routes/userRoute.js");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const corsOptions = {
  origin: "*",
  methods: "GET,POST",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use("/users", userRoutes);

(async function startServer() {
  try {
    await db.connect();
    console.log("Connected to MongoDB");

    // Start socket.io forbindelse
    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on("send_message", (data) => {
        // Emit til alle som er connected til serveren
        socket.broadcast.emit("receive_message", data);
      });

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });

    server.listen(5174, () => {
      console.log("Server is running on port 5174");
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
})();
