const express = require('express');
const app = express();
const port = 5001;
const cors = require('cors');
const path = require('path');

app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect('mongodb+srv://JohnDoe:JohnDoe@cluster0.g3xygxt.mongodb.net/?retryWrites=true&w=majority');
        //const mongoUri = 'mongodb+srv://Admin:admin@fooddatalist.zeatvsu.mongodb.net/FoodDataList?retryWrites=true&w=majority&appName=FoodDataList';
        
        //await mongoose.connect(mongoUri);   
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
    }
}

// Define foodItems and model for MongoDB
const foodItemsScheme = new mongoose.Schema({
    name: String,
});

// Define user schema and model for MongoDB
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
  });
  
const UserModel = mongoose.model('User', userSchema, 'UserList');

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

app.post('/api/register', async (req, res) => {
    try {
        // Get user data from request body
        const { username, password, email } = req.body;
        
        // Check if user already exists
        const userExists = await UserModel.findOne({ email: email });
        if (userExists) {
            return res.status(409).json({ error: "User already exists" });
        }
        
        // Create a new user instance with the plaintext password (Not secure)
        const newUser = new UserModel({ username, password, email });
        
        // Save the new user to the database and log the result
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error('Error registering new user:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
