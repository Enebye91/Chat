const DatabaseHandlerPostgreSQL = require("./DatabaseHandlerPostgres");

class PostSQLConnection extends DatabaseHandlerPostgreSQL {
  constructor() {
    super("url");
  }
}
