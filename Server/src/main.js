const MongoDBUserRepository = require('./MongoUserRepo'); 
const MySQLUserRepository = require('./MySQLUserRepo'); 
const PostgresSQLUserRepo = require('./PostgresSQLUserRepo'); 

const DatabaseHandlerMongoDB = require('./DatabaseHandlerMongoDB');
const DatabaseHandlerMySQL =  require('./DatabaseHandlerMySQL');
const DatabaseHandlerPostgresSQL = require('./DatabaseHandlerPostgreSQL');
const MongoUserRepository = require('./MongoUserRepo');

async function main() {
    //For MongoDB
    const mongoDBHandler = new DatabaseHandlerMongoDB(); 
    await mongoDBHandler.connect('Your URL')
    const MongoDBUserRepository = new MongoUserRepository(mongoDBHandler); 
}