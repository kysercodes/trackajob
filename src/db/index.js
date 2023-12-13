const { MongoClient } = require('mongodb');
require('dotenv').config();

async function connectToDatabase() {
    
    try{
        const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.urtu5cf.mongodb.net/?retryWrites=true&w=majority`, { useUnifiedTopology: true });
        return client.db('tracked-jobs');
    }
    catch (error){
            console.log(error)
    }
   
    
   
  
}

module.exports = connectToDatabase;
