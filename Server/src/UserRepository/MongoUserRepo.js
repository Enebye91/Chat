// MongoUserRepository.js
const UserRepository = require("./UserRepository");
// const DatabaseHandler = require("../Server/src/DatabaseHandlers/DatabaseHandlerMongoDB.js");

class MongoUserRepository extends UserRepository {
  constructor(databaseHandler) {
    super();
    this.dbHandler = databaseHandler;
  }

  async init(connectionString) {
    await this.dbHandler.connect(connectionString); //Forbinder til DB
  }

  async findUser(query) {
    // MongoDB kode til at finde en user
    try {
      const result = await this.dbHandler.db
        .collection("users")
        .find.one(query);
      return result;
    } catch (error) {
      console.log("Can't find user", error);
    }
  }

  async createUser(user) {
    // MongoDB kode til at oprette en bruger
  }

  async updateUser(query, update) {
    // MongoDB kode til at opdatere en bruger
  }

  async deleteUser(query) {
    // MongoDB kode til at slette en bruger
  }
}

module.exports = MongoUserRepository;
