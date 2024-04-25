const express = require('express');
const app = express();
const port = 5001;
const cors = require('cors');
// const path = require('path');
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//cors headers 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Mongo Connection
main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect('mongodb+srv://Admin:Admin@fooddatalist.zeatvsu.mongodb.net/?retryWrites=true&w=majority&appName=FoodDataList');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
    }
}

//Define schemas and models
const foodItemsScheme = new mongoose.Schema({
    name: String,
    type: String
});
const foodItemModel = mongoose.model('foodItemModel', foodItemsScheme);

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});
const UserModel = mongoose.model('User', userSchema, 'UserList');

const ShoppingListSchema = new mongoose.Schema({
    user: { type: ObjectId, ref: 'UserList' }, //Reference to the User model
    name: String,
    items: [String]
});

const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);

//Routes
app.post('/api/lists/:userId', async (req, res) => {
    try {
        //Extract list data and user ID from request body
        const{userId}=req.params;
        const{name,items}=req.body;
        //Create a new shopping list doucment wiht user ID
        const newShoppingList = {
            user: userId,
            name: name,
            items: items
        };

        //Insert the new shoping list document into MongoDB
        // const result = await Db.collection('shoppingLists').insertOne(newShoppingList);
        const result = await ShoppingList.create(newShoppingList);
        //Send success response
        res.status(201).json({ message: 'Shopping list added successfully: ', id: result._id });
    } catch (error) {
        //Send error response 
        console.error('Error adding shopping list: ', error);
        res.status(500).json({ errr: 'Failde to add shopping list' });
    }
});

app.get('/api/items', async (req, res) => {
    try {
        const items = await foodItemModel.find();
        res.json(items);
    } catch (error) {
        console.error('Error fetching items: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/items', async (req, res) => {
    try {
        const { foodName, type } = req.body;
        const newFood = new foodItemModel({ name: foodName, type: type }); // Create a new instance using the model
        const savedFoodItem = await newFood.save();

        const responseData = {
            name: savedFoodItem.name,
            type: savedFoodItem.type
        };

        console.log("Food item Added: ", responseData);
        res.status(201).json({ message: "Food item has been added successfully", data: responseData });
    } catch (error) {
        console.error("Error adding food item", error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Internal Server Error" });
        }
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

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await UserModel.findOne({ username: username });
        // Check if user exists and password matches
        if (user && user.password === password) {
            console.log('Login successful for user:', username);
            res.status(200).json({ message: "Login successful" });
        } else {
            // If user not found or password does not match
            console.error('Login failed for user:', username);
            res.status(401).json({ error: "Invalid username or password" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});