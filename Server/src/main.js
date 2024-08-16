const MongoDBUserRepository = require("./UserRepository/MongoUserRepo");
const MySQLUserRepository = require("./MySQLUserRepo");
const PostgresSQLUserRepo = require("./PostgresSQLUserRepo");

const DatabaseHandlerMongoDB = require("./DatabaseHandler/DatabaseHandlerMongoDB");
const DatabaseHandlerMySQL = require("./DatabaseHandler/DatabaseHandlerMySQL");
const DatabaseHandlerPostgresSQL = require("./DatabaseHandler/DatabaseHandlerPostgreSQL");
const MongoUserRepository = require("./UserRepository/MongoUserRepo");

async function main() {
  //For MongoDB
  const mongoDBHandler = new DatabaseHandlerMongoDB();
  await mongoDBHandler.connect("Your URL");
  const MongoDBUserRepository = new MongoUserRepository(mongoDBHandler);
}
