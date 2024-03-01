const {MongoClient, ClientSession} = require('mongodb');

const uri = 'mongodb+srv://Admin:<password>@fooddatalist.zeatvsu.mongodb.net/?retryWrites=true&w=majority&appName=FoodDataList';

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
