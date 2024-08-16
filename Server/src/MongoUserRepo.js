// MongoUserRepository.js
const UserRepository = require("./UserRepository");

class MongoUserRepository extends UserRepository {
  async findUser(query) {
    // MongoDB kode til at finde en user
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
