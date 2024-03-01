<<<<<<< HEAD
<<<<<<< HEAD
const {client} = require('./DatabaseCon');
=======
const {client} = require('./db');
>>>>>>> 12d9c7bdc6b3a3564d23c48bf8522ff64b2319b8
=======
const {client} = require('./db');
>>>>>>> 12d9c7bdc6b3a3564d23c48bf8522ff64b2319b8

async function checkItemInDatabase(newItemName){
    try{
        const database = client.db('FoodDataList');

        const collection = database.collection('Food');
        
        const result = await collection.findOne({name: newItemName});

        return result !== null;
    }catch(error){
        console.error('Error checking item in database: ', error);
        return false;
    }
}

module.exports = {checkItemInDatabase };