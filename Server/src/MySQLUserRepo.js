// MySQLUserRepository.js
const UserRepository = require("./UserRepository");

class MySQLUserRepository extends UserRepository {
  async findUser(query) {
    // MySQL kode til at finde en user
  }

  async createUser(user) {
    // MySQL kode til at oprette en bruger
  }

  async updateUser(query, update) {
    // MySQL kode til at opdatere en bruger
  }

  async deleteUser(query) {
    // MySQL kode til at slette en bruger
  }
}

module.exports = MySQLUserRepository;
