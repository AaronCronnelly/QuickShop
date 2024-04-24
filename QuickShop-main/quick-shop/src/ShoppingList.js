import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoreMap from './StoreMap';
import map from './assets/images/map.png';
import mapGrid from './assets/images/mapGrid.png';
import { getPathForShoppingList } from './pathfinding';
import { graph } from './StoreMap';


const itemToSectionMap = {
    cheese: 'dairy',
    bread: 'bakery',
    tomato: 'fruit',
    chocolate: 'snacks',
    gum: 'snacks',
    carrot: 'vegetables',
    steak: 'meat',
    spagetti: 'pasta',
    carbonara: 'sauce',
    ketchup: 'condiments',
    salt: 'spices',
    pepper: 'spices'
};

const ShoppingList = () => {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [editIndex, setEditIndex] = useState(-1);
    const [matchingItems, setMatchingItems] = useState([]);
    // state to hold the selected shop
    const [selectedShop, setSelectedShop] = useState('aldi-galway');
    const [route, setRoute] = useState([]);

    //Getting item from database
    useEffect(() => {
        async function fetchItems() {
            try {
                const response = await axios.get('/api/item');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items: ', error);
            }
        }
        fetchItems();
    }, []);

    //Compaing user entered item to fetch database item
    useEffect(() => {
        const matching = items.filter(item => item.name.toLowerCase() === newItemName.toLowerCase());
        if (matching.length > 0) {
            setMatchingItems(matching);
        }
    }, [items, newItemName]);

    const handleNewItemNameChange = (event) => {
        setNewItemName(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleShopChange = (event) => {
        setSelectedShop(event.target.value);
    };

    // GetRoute function
    const onGetRoute = () => {
        console.log("Graph just before pathfinding:", graph);
        console.log("Entrance node details:", graph['entrance']);
        const sections = items.map(item => itemToSectionMap[item.name.toLowerCase()]);

        // calculate the path for these sections
        const calculatedPath = getPathForShoppingList(graph, sections, 'entrance');
        console.log("Calculated Path:", calculatedPath);

        // Update the route state with the calculated path
        setRoute(calculatedPath);
    };

    const handleAddItem = async (event) => {
        event.preventDefault();
        if (!newItemName) return; // Basic validation

        // Find the section for the new item
        const section = itemToSectionMap[newItemName.toLowerCase()];

        if (!section) {
            console.error("Item location not found"); // Handle this appropriately
            return;
        }

        const newItem = { name: newItemName, section: section, quantity: Number(quantity) };

        if (editIndex >= 0) {
            // Edit existing item
            const updatedItems = items.map((item, index) =>
                index === editIndex ? newItem : item
            );
            setItems(updatedItems);
            setEditIndex(-1); // Reset edit index
        } else {
            // Add new item to the shopping list
            setItems(prevItems => [...prevItems, newItem]);
        }

        // Reset the input fields
        setNewItemName('');
        setQuantity(1);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setNewItemName(items[index].name);
        setQuantity(items[index].quantity);
    };

    const handleDelete = (index) => {
        setItems(items.filter((_, i) => i !== index));
        // If currently editing and delete that item, reset the edit index
        if (index === editIndex) {
            setEditIndex(-1);
            setNewItemName('');
            setQuantity(1);
        }
    };

    return (
        <div className="list-and-map-container">
            <div className="shopping-list-container">
                <h1 className="shopping-list-title">Create Your Shopping List</h1>
                <form onSubmit={handleAddItem} className="shopping-list-form">
                    <input
                        type="text"
                        placeholder="Item name"
                        value={newItemName}
                        onChange={handleNewItemNameChange}
                        className="shopping-list-input"
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={quantity}
                        min="1"
                        onChange={handleQuantityChange}
                        className="shopping-list-input"
                    />
                    <button type="submit" className="shopping-list-button">
                        {editIndex >= 0 ? 'Update Item' : 'Add Item'}
                    </button>
                </form>
                <ul className="shopping-list-items">
                    {items.map((item, index) => (
                        <li key={index} className="shopping-list-item">
                            {item.name} - Quantity: {item.quantity}
                            <button onClick={() => handleEdit(index)} className="edit-item-button">Edit</button>
                            <button onClick={() => handleDelete(index)} className="delete-item-button">Delete</button>
                        </li>
                    ))}
                </ul>
                <div className="shopping-list-page">
                    <div className="shop-selector">
                        <label htmlFor="shop-select">Choose a shop:</label>
                        <select id="shop-select" value={selectedShop} onChange={handleShopChange}>
                            <option value="aldi-galway">Aldi Galway</option>
                        </select>
                        <button className="get-route-button" onClick={onGetRoute}>
                            Get Route
                        </button>
                    </div>
                    {/* Include StoreMap component within the return statement */}
                    <StoreMap items={matchingItems} route={route} selectedShop={selectedShop} />
                </div>
            </div>
        </div>
    );
};

export default ShoppingList;
