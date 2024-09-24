// MongoUserRepository.js
const User = require("../../models/users.jsx");
const UserRepository = require("../UserRepository/UserRepository");

class MongoUserRepository extends UserRepository {
  constructor(databaseHandler) {
    super();
    this.dbHandler = databaseHandler;
    this.dbHandler.connect();
  }

  async createUser(user) {
    try {
      const result = await this.dbHandler.collection("users").insertOne(user);
      return result.insertedId;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async findUser(query) {
    try {
      const user = await User.findOne(query);
      return user;
    } catch (error) {
      console.error("Error finding user", error);
      throw error;
    }
  }

  // async updateUser(query, update) {
  //   return await this.dbHandler.updateMessage(query, update);
  // }

  // async deleteUser(query) {
  //   return await this.dbHandler.deleteMessage(query);
  // }
}

module.exports = MongoUserRepository;
