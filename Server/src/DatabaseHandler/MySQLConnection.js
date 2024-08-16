const DatabaseHandlerMySQL = require("./DatabaseHandlerMySQL");

class MySQLConnection extends DatabaseHandlerMySQL {
  constructor() {
    super("url");
  }
}
