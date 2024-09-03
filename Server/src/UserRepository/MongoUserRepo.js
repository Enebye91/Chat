// MongoUserRepository.js
const DatabaseHandler = require("../src/DatabaseHandlers/DatabaseHandlerMongoDB.js");

class MongoUserRepository extends UserRepository {
  constructor(databaseHandler) {
    super();
    this.dbHandler = new DatabaseHandler();
  }

  async init(connectionString) {
    await this.dbHandler.connect(connectionString); //Forbinder til DB
  }

  async findUser(query) {
    try {
      const result = await this.dbHandler.db.collection("users").findOne(query);
      return result;
    } catch (error) {
      console.log("Can't find user", error);
    }
  }

  async createUser(user) {
    try {
      const result = await this.dbHandler.db
        .collection("users")
        .insertOne(user);
      return result.insertedId;
    } catch (error) {
      console.error("Can't create user", error);
    }
  }

  async updateUser(query, update) {
    try {
      const result = await this.dbHandler.db
        .collection("users")
        .updateOne(query, { $set: update });
      return result;
    } catch (error) {
      console.error("Cant update user", error);
    }
  }

  async deleteUser(query) {
    try {
      const result = await this.dbHandler.db
        .collection("users")
        .deleteOne(query);
      return result;
    } catch (error) {
      console.error("Cant delete user", error);
    }
  }
}

module.exports = MongoUserRepository;
