const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const path = require('path');

app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Starting server
app.listen(port, () => {
    console.log('server is running on port ${port}');
});

app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require('mongoose');

mainModule().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect('mongodb+srv://JohnDoe:JohnDoe@cluster0.g3xygxt.mongodb.net/?retryWrites=true&w=majority');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
    }
}

//Define foodItems and monndel for MongoDB
const foodItemsScheme = new mongoose.Schema({
    name: String,
});

const foodItemModel = mongoose.model('foodItemModel', foodItemsScheme);

app.get('/api/items', async (req, res) => {
    try {
        const items = await foodItemModel.find();
        res.json(items);
    } catch (error) {
        console.error('Error fetching items: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log('Server is running on port ${port}');
});