import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StoreMap from './StoreMap';
import map from './assets/images/map.png';
import mapGrid from './assets/images/mapGrid.png';
import { getPathForShoppingList } from './pathfinding';
import { graph } from './StoreMap';


const itemToSectionMap = {
    // Dairy
    cheese: 'dairy',
    milk: 'dairy',
    yogurt: 'dairy',
    butter: 'dairy',
    eggs: 'dairy',
    cream: 'dairy',

    // Bakery
    bread: 'bakery',
    croissant: 'bakery',
    baguette: 'bakery',
    muffin: 'bakery',
    donut: 'bakery',
    cake: 'bakery',

    // Fruit
    tomato: 'fruit',
    apple: 'fruit',
    banana: 'fruit',
    grapes: 'fruit',
    orange: 'fruit',
    lemon: 'fruit',
    peach: 'fruit',
    kiwi: 'fruit',
    berries: 'fruit',

    // Vegetables
    carrot: 'vegetables',
    lettuce: 'vegetables',
    cucumber: 'vegetables',
    bellPepper: 'vegetables',
    spinach: 'vegetables',
    potato: 'vegetables',
    onion: 'vegetables',
    garlic: 'vegetables',

    // Snacks
    chocolate: 'snacks',
    chips: 'snacks',
    cookies: 'snacks',
    gum: 'snacks',
    candy: 'snacks',
    popcorn: 'snacks',
    nuts: 'snacks',

    // Meat & Fish
    steak: 'meat',
    chicken: 'meat',
    pork: 'meat',
    bacon: 'meat',
    sausage: 'meat',
    salami: 'meat',
    fish: 'fish',
    shrimp: 'fish',
    salmon: 'fish',
    tuna: 'fish',

    // Pasta & Rice
    spagetti: 'pasta',
    penne: 'pasta',
    macaroni: 'pasta',
    lasagna: 'pasta',
    rice: 'rice',
    brownRice: 'rice',
    basmati: 'rice',

    // Sauces & Condiments
    ketchup: 'condiments',
    mustard: 'condiments',
    mayo: 'condiments',
    bbqSauce: 'sauces',
    marinara: 'sauces',
    alfredo: 'sauces',
    soySauce: 'condiments',
    oliveOil: 'condiments',

    // Spices
    salt: 'spices',
    pepper: 'spices',
    paprika: 'spices',
    curryPowder: 'spices',
    cinnamon: 'spices',

    // Cereal
    oatmeal: 'cereal',
    cornflakes: 'cereal',
    granola: 'cereal',
    wheetabix: 'cereal',

    // Frozen Foods
    iceCream: 'frozen foods',
    frozenPizza: 'frozen foods',
    frozenVegetables: 'frozen foods',
    frozenDinners: 'frozen foods',
    frozenBerries: 'frozen foods',

    // Health & Beauty
    shampoo: 'health & beauty',
    soap: 'health & beauty',
    toothpaste: 'health & beauty',
    deodorant: 'health & beauty',
    lotion: 'health & beauty',

    // Household Supplies
    laundryDetergent: 'household supplies',
    dishSoap: 'household supplies',
    allPurposeCleaner: 'household supplies',
    paperTowels: 'household supplies',
    toiletPaper: 'household supplies',

    // Canned Goods
    beans: 'cans',
    chickpeas: 'cans',
    cannedFish: 'cans',
    cannedSoup: 'cans',
    cannedFruit: 'cans',

    // Beverages
    water: 'beverages',
    juice: 'beverages',
    soda: 'beverages',
    coffee: 'beverages',
    tea: 'beverages',

    // Pet Supplies
    dogFood: 'pet supplies',
    catFood: 'pet supplies',
    petShampoo: 'pet supplies',
    catLitter: 'pet supplies',
    petToys: 'pet supplies',
}

// ShoppingList component
const ShoppingList = () => {
    // State variables
    const [items, setItems] = useState([]); // Shopping list items
    const [newItemName, setNewItemName] = useState(''); // Name of new item
    const [quantity, setQuantity] = useState(1); // Quantity of new item
    const [editIndex, setEditIndex] = useState(-1); // Index of item being edited
    const [matchingItems, setMatchingItems] = useState([]); // Matching items in store
    const [selectedShop, setSelectedShop] = useState('aldi-galway'); // Selected shop
    const [route, setRoute] = useState([]); // Route for shopping list
  
    // Handlers for form inputs
    const handleNewItemNameChange = (event) => {
      setNewItemName(event.target.value);
    };
  
    const handleQuantityChange = (event) => {
      setQuantity(event.target.value);
    };
  
    const handleShopChange = (event) => {
      setSelectedShop(event.target.value);
    };
  
    // Function to get route for shopping list
    const onGetRoute = () => {
      const sections = items.map(item => itemToSectionMap[item.name.toLowerCase()]);
      const calculatedPath = getPathForShoppingList(graph, sections, 'entrance');
      setRoute(calculatedPath);
    };
  
    // Handlers for adding, editing, and deleting items
    const handleAddItem = (event) => {
      event.preventDefault();
      if (!newItemName) return;
  
      const section = itemToSectionMap[newItemName.toLowerCase()];
      if (!section) {
        console.error("Item location not found");
        return;
      }
  
      const newItem = { name: newItemName, section: section, quantity: Number(quantity) };
  
      if (editIndex >= 0) {
        const updatedItems = items.map((item, index) =>
          index === editIndex ? newItem : item
        );
        setItems(updatedItems);
        setEditIndex(-1);
      } else {
        setItems(prevItems => [...prevItems, newItem]);
      }
  
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
                    <StoreMap items={matchingItems} route={route} selectedShop={selectedShop} />
                </div>
            </div>
        </div>
    );
};

export default ShoppingList;
