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
                    'Content-Type': 'application/json',
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
        <div className="admin-container">
            <h1 className="admin-title">Food Item Entry</h1>
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form-group">
                    <label><strong>Food Name</strong></label>
                    <input
                        type="text"
                        name="foodName"
                        value={formData.foodName}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <label><strong>Food Type</strong></label>
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="admin-input"
                    />
                </div>
                <div className="admin-form-group">
                    <button type="submit" className="admin-btn">Add Food</button>
                </div>
            </form>
        </div>
    );
}

export default Admin;