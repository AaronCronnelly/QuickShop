import React, { useState } from 'react';

const ShoppingList = () => {
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [editIndex, setEditIndex] = useState(-1);

    const handleNewItemNameChange = (event) => {
        setNewItemName(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleAddItem = (event) => {
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
        </div>
    );
};

export default ShoppingList;




