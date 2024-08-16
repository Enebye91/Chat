// MongoUserRepository.js
const UserRepository = require("./UserRepository");
// const DatabaseHandlerMongoDB = require("./DatabaseHandlerMongoDB");

class MongoUserRepository extends UserRepository {
    constructor(databaseHandler) {
        super();
        this.dbHandler = databaseHandler; 
    }
//   constructor() {
//     super();
//     this.dbHandler = new DatabaseHandlerMongoDB(); // Initialize med MongoDB handleren
//   }

//   async init(connectionString) {
//     await this.dbHandler.connect(connectionString); //Forbinder til DB
//   } 

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
