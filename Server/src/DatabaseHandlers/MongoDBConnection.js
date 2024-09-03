const DatabaseHandler = require("./DatabaseHandlerMongoDB");

class FirstDatabaseHandler extends DatabaseHandler {
  constructor() {
    super("url");
  }
}
