// PostgresSQLUserRepository.js
const UserRepository = require("./UserRepository");

class PostgresSQLUserRepository extends UserRepository {
  async findUser(query) {
    // PostgresSQL kode til at finde en user
  }

  async createUser(user) {
    // PostgresSQL kode til at oprette en bruger
  }

  async updateUser(query, update) {
    // PostgresSQL kode til at opdatere en bruger
  }

  async deleteUser(query) {
    // PostgresSQL kode til at slette en bruger
  }
}

module.exports = PostgresSQLUserRepository;
