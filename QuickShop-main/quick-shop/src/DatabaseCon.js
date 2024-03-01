const {MongoClient} = require('mongodb');

const uri = 'mongodb+srv://Admin:Admin@fooddatalist.zeatvsu.mongodb.net/?retryWrites=true&w=majority&appName=FoodDataList';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function connectToDatabase(){
    try{
        await client.connect();
        console.log('Connected to the database');
    }catch(error){
        console.error('Error connecting to the databse: ', error);
    }
}

async function closeDatabaseConnection(){
    try{
        await client.close();
        console.log('Database connection closed');
    }catch(error){
        console.error('Error closing database connection', error);
    }
}

module.exports={client, connectToDatabase, closeDatabaseConnection};
