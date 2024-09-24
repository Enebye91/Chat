// const { MongoClient } = require("mongodb");
// const _DatabaseHandler = require("./_DatabaseHandler");

// class DatabaseHandlerMongoDB extends _DatabaseHandler {
//   constructor() {
//     super();
//     this.connectionString =
//       "mongodb+srv://michellevel91:Vega23@events.y2gqwin.mongodb.net/Events";
//     this.client = null;
//   }

//   async connect() {
//     if (this.client) {
//       console.log("Already connected to the database");
//       return;
//     }

//     const parameters = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     };

//     this.client = new MongoClient(this.connectionString, parameters);

//     try {
//       await this.client.connect();
//       console.log("Connected to the database");
//     } catch (error) {
//       console.error("Error connecting to MongoDB database", error);
//       throw error;
//     }
//   }

//   async saveMessage(message) {
//     try {
//       const result = await this.client
//         .db("Events")
//         .collection("messages")
//         .insertOne(message);
//       return result.insertedId;
//     } catch (error) {
//       console.error("Error saving message:", error);
//       throw error;
//     }
//   }

//   async findMessage(query) {
//     try {
//       const message = await this.client
//         .db("Events")
//         .collection("messages")
//         .findOne(query);
//       return message;
//     } catch (error) {
//       console.error("Error finding message:", error);
//       throw error;
//     }
//   }

//   async updateMessage(query, update) {
//     try {
//       const result = await this.client
//         .db("Events")
//         .collection("messages")
//         .updateOne(query, { $set: update });
//       return result.modifiedCount;
//     } catch (error) {
//       console.error("Error updating message:", error);
//       throw error;
//     }
//   }

//   async deleteMessage(query) {
//     try {
//       const result = await this.client
//         .db("Events")
//         .collection("messages")
//         .deleteOne(query);
//       return result.deletedCount;
//     } catch (error) {
//       console.error("Error deleting message:", error);
//       throw error;
//     }
//   }

//   async close() {
//     try {
//       if (this.client) {
//         await this.client.close();
//         this.client = null;
//         console.log("Database connection closed");
//       }
//     } catch (error) {
//       console.error("Error closing MongoDB connection", error);
//       throw error;
//     }
//   }
// }

// module.exports = DatabaseHandlerMongoDB;

const { MongoClient } = require("mongodb");
const _DatabaseHandler = require("./_DatabaseHandler");

class DatabaseHandler extends _DatabaseHandler {
  constructor() {
    super();
    this.connectionString =
      "mongodb+srv://michellevel91:Vega23@events.y2gqwin.mongodb.net/Events";
    // this.connectionString = process.env.MONGODB_URI;
    this.client = null;
    // this._createClient();
  }

  get db() {
    return this.client.db("Events");
  }

  /**
   * @private
   */

  async _connectToDatabase() {
    const parameters = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    this.client = new MongoClient(this.connectionString, parameters);

    try {
      await this.client.connect();
      await this.test(); // Kald test efter forbindelsen er etableret
    } catch (error) {
      console.error("Error creating client or testing connection", error);
    }
  }

  async connect() {
    if (this.client) {
      console.log("Already connected to the database");
      return;
    }

    const parameters = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    this.client = new MongoClient(this.connectionString, parameters);

    try {
      await this.client.connect();
      console.log("Connected to the database");
    } catch (error) {
      console.error("Error connecting to MongoDB database", error);
      throw error;
    }
  }
  async _connect() {
    try {
      await this.client.connect();
      this.db = this.client.db();
    } catch (error) {
      console.error("Error connecting to MongoDB database", error);
    }
  }

  // async test() {
  //   const dummy = [
  //     { name: "trutter", age: 31, city: "Odense" },
  //     { name: "muffer", age: 32, city: "Horsens" },
  //   ];

  //   try {
  //     const result = await this.db.collection("users").insertMany(dummy);
  //     console.log(`${result}`);
  //   } catch (error) {
  //     console.error("test failed", error);
  //   }
  // }
}

module.exports = DatabaseHandler;
