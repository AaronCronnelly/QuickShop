const {client} = require('./db');

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