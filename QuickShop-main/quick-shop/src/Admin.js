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

        axios.post('http://localhost:5001/api/items', foodInfo)
        .then(response => {

        }).catch(error => {

        });
    };

}

export default Create;