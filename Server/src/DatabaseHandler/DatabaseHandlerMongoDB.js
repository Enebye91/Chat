const { MongoClient } = require("mongodb");
const _DatabaseHandler = require("./Server./src/DatabaseInterface");
// const MongoDBDatabase = require('./path/to/MongoDBDatabase');

class DatabaseHandler extends _DatabaseHandler {
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.client = null;
    this._createClient();
  }

  /**
   * @private
   */
  _createClient() {
    const parameters = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    this.client = new MongoClient(this.connectionString, parameters);
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db();
    } catch (error) {
      console.error("Error connecting to MongoDB database", error);
    }
  }
}
