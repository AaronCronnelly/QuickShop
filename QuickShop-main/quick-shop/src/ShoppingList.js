import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoreMap from './StoreMap';

const ShoppingList = () => {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [editIndex, setEditIndex] = useState(-1);
    const [matchingItems, setMatchingItems] = useState([]);
    // state to hold the selected shop
    const [selectedShop, setSelectedShop] = useState('aldi-galway');

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
    const onGetRoute = (selectedShop) => {
        console.log(`Getting route for: ${selectedShop}`);
    };

    const handleAddItem = async (event) => {
        event.preventDefault();
        if (!newItemName) return; // Basic validation

        const newItem = { name: newItemName, quantity: Number(quantity) };
        if (editIndex >= 0) {
            // Edit existing item
            const updatedItems = items.map((item, index) =>
                index === editIndex ? newItem : item
            );
            setItems(updatedItems);
            setEditIndex(-1); // Reset edit index
        } else {
            // Add new item
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
                <button className="get-route-button" onClick={() => onGetRoute(selectedShop)}>
                 Get Route
                </button>
            </div>
            <StoreMap items={matchingItems} />
        </div>
        </div>
        </div>
    );
};

export default ShoppingList;




