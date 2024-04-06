import React, { useState } from "react";

function Admin() {
    const [formData, setFormData] = useState({
        foodName: '',
        type: '',
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.foodName || !formData.type) {
            alert("Please fill in data. ");
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json',
                },
                body: JSON.stringify(formData),
            });

        } catch (error) {
            console.error('Admin Error: ', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="`FoodItemEntry">
            <h1>Food Item Entry</h1>
            <form onSubmit={handleSubmit} className="FoodItemForm">
                <div>
                    <label><strong>Food Name</strong></label>
                    <input
                        type="text"
                        name="foodName"
                        value={formData.foodName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label><strong>Food Type</strong></label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="submit">Add Food</button>
                </div>
            </form>
        </div>
    );
}

export default Admin;