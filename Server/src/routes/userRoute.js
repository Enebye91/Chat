const express = require("express");
const router = express.Router();
const MongoUserRepository = require("../UserRepository/MongoUserRepo.js");
const DatabaseHandler = require("../DatabaseHandlers/DatabaseHandlerMongoDB.js");

// Initialiser database handler
const db = new DatabaseHandler();
const userRepository = new MongoUserRepository(db);

async function connect() {
  try {
    await db.connect();
    console.log("Connected to database in userRoute.js");
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
}

connect();

// router.get("/", async (req, res) => {
//   res.send("Hello from server");
// });

// API Endpoint
router.post("/create", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await userRepository.findUser({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const userId = await userRepository.createUser({ name, email, password });
    res.status(201).json({ id: userId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
