// require("dotenv").config();
const { MongoClient } = require("mongodb");


class DatabaseHandler {
  constructor() {
    this.connectionString =
      "mongodb+srv://michellevel91:Vega23@events.y2gqwin.mongodb.net/Events";
    // this.connectionString = process.env.MONGODB_URI;
    this.client = null;
    this._createClient();
  }

  get db() {
    return this.client.db("Events");
  }

  /**
   * @private
   */
  async _createClient() {
    const parameters = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    this.client = new MongoClient(this.connectionString, parameters);
    await this.client.connect().then(this.test());
  }

  async _connect() {
    try {
      await this.client.connect();
      this.db = this.client.db();
    } catch (error) {
      console.error("Error connecting to MongoDB database", error);
    }
  }

  async test() {
    const dummy = [
      { name: "trutter", age: 31, city: "Odense" },
      { name: "muffer", age: 32, city: "Horsens" },
    ];

    try {
      const result = await this.db.collection("users").insertMany(dummy);
      console.log(`${result}`);
    } catch (error) {
      console.error("test failed", error);
    }
  }
}

module.exports = DatabaseHandler;
