const { Client } = require("pg");
const _DatabaseHandler = require("./Server./src/DatabaseInterface");

class DatabaseHandlerPostgres extends _DatabaseHandler {
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.client = null;
    this._createClient();
  }

  _createClient() {
    this.client = new Client({
      connectionString: this.connectionString,
    });
  }

  async connect() {
    try {
      await this._createClient.connect(); 
    } catch (error) {
      console.error("Error connecting to PostgreSQL", error);
    }
  }

  async close() {
    try {
      await this.client.end();
      console.log("PostgreSQL connection closed");
    } catch (error) {
      console.error("Error", error);
    }
  }
}

module.exports = DatabaseHandlerPostgres;
