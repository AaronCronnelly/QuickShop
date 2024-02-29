import React, { useState } from 'react';

const ShoppingList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleNewItemChange = (event) => {
        setNewItem(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleAddItem = (event) => {
        event.preventDefault(); 
        if (!newItem) return; 

        // Add the new item to the items array
        setItems([...items, { name: newItem, quantity }]);
        
        // Reset the input fields
        setNewItem('');
        setQuantity(1);
    };

    return (
        <div>
            <h1>Create Your Shopping List</h1>
            <form onSubmit={handleAddItem}>
                <input 
                    type="text" 
                    placeholder="Item name" 
                    value={newItem} 
                    onChange={handleNewItemChange} 
                />
                <input 
                    type="number" 
                    placeholder="Quantity" 
                    value={quantity} 
                    min="1" 
                    onChange={handleQuantityChange} 
                />
                <button type="submit">Add Item</button>
            </form>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name} - Quantity: {item.quantity}</li>
                ))}
            </ul>
        </div>
    );
};

export default ShoppingList;


