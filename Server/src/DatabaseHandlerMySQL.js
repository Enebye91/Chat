const mysql = require("mysql2/promise");
const _DatabaseHandler = require("./Server./src/DatabaseInterface");

class DatabaseHandlerMySQL extends _DatabaseHandler {
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.client = null;
    this._createClient();
  }

  /**
   * @private
   */
  _createClient() {
    this.connection = mysql.createPool({
      uri: this.connectionString,
      waitForConnection: true,
      connectionLimit: 10,
      quequeLimit: 0,
    });
  }

  async connect() {
    try {
      const connection = await this.connection.getConnection();
      console.log("Connected to the MySQL databese");
      connection.release();
    } catch (error) {
      console.error("Error connecting to MySQL database", error);
    }
  }

  async close() {
    try {
      await this.connection.end();
      console.log("MySQL connection closed");
    } catch (error) {
      console.error("Error closing MySQL connection", error);
    }
  }
}

module.exports = DatabaseHandlerMySQL;
