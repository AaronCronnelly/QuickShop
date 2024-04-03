import axios from "axios";
import { response } from "express";
import react from "react";
import { useState } from "react";

function Create(){
    //Inputs
    const [fname, setFName] = useState('');
    const [type, setType] = useState('');

    //Handle submit of data
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("FoodName: " + fname + ", Type: " + type);

        const foodItemModel = {
            fname: fname,
            type: type
        };

        axios.post('http://localhost:5001/api/items', foodItemModel)
        .then(response => {

        }).catch(error => {
            console.log(console.error())
        });
    };

    return (
        <div className="`FoodItemEntry">
            <h1>Food Item Entry</h1>
            <form onSubmit={handleSubmit} className="FoodItemForm">
                <div>
                    <label><strong>Food Name</strong></label>
                    <input 
                    type="text"
                    className="Form-Entry"
                    value={fname}
                    onChange={(e)=>{setFName(e.target.value)}}
                    />
                </div>
                <div>
                <label><strong>Food Type</strong></label>
                    <input 
                    type="text"
                    className="Form-Entry"
                    value={type}
                    onChange={(e)=>{setType(e.target.value)}}
                    />
                </div>
                <div>
                    <input type="submit" value="Add Food Item"/>
                </div>
            </form>
        </div>
    )
}

export default Create;