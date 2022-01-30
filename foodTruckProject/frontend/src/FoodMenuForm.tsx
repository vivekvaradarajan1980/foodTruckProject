import React, {FormEvent, useState} from "react";
import {FoodItem} from "./model/FoodItem";
import axios from "axios";


require('axios');


const FoodMenuForm = (props: { handleForm: () => void; }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [type,setType] = useState('');
    const [description, setDescription] = useState('');

    const postFoodMenu = (event: React.FormEvent<HTMLFormElement>, name: string, description: string, price: string, type: string)=>{
         event.preventDefault();

        const dataToSave={name:name, price:price, description: description, type:type}

       axios.post('http://localhost:8080/api/menu/item',dataToSave,
           {headers:{"Content-Type" : "application/json"}}).catch(e=>alert(dataToSave))

       props.handleForm();

     };




    return(
        <form onSubmit={(e)=>postFoodMenu(e,name,description,price, type)}>
        <label>
            Food Name:
            <input type="text" name="name" value={name} onChange={e=>setName(e.target.value)}  required />
        </label>

            <label>
                Food Description:
                <input type="text" name="description" value={description} onChange={e=>setDescription(e.target.value)} required/>
            </label>

            <label>
                Food Price:
                <input type="text" name="price"  value={price} onChange={e=>setPrice(e.target.value)} required/>
            </label>
            <br/>
                <label>
                    Food type:
                    <input type="text" name="type" value={type} onChange={e=>setType(e.target.value)} required/>
                </label>
        <input type="submit" value="Submit" />
    </form>)

}

export default FoodMenuForm;


















