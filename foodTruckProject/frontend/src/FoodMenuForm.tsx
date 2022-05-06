import React, {useState} from "react";
import axios from "axios";

require('axios');


const FoodMenuForm = (props: { handleForm: () => void; }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const postFoodMenu = (event: React.FormEvent<HTMLFormElement>, name: string, description: string, price: string)=>{
         event.preventDefault();

        const dataToSave={name:name, price:price, description: description}

       axios.post('http://localhost:8080/api/menu/item',dataToSave,
           {headers:{"Content-Type" : "application/json"}}).catch(e=>alert(e))

       props.handleForm();

     };




    return(
        <form onSubmit={(e)=>postFoodMenu(e,name,description,price)} style={{paddingTop: '10px'}}>
        <label>
            Food Name:
            <input type="text" name="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Name of Food" required/>
        </label>

            <label>
                Food Description:
                <input type="text" name="description" value={description} onChange={e=>setDescription(e.target.value)} required placeholder="Description of Food"/>
            </label>

            <label>
                Food Price:
                <input type="number" name="price"  value={price} onChange={e=>setPrice(e.target.value)} required placeholder="Price of Food"/>
            </label>
        <input type="submit" value="Submit" />
    </form>)

}

export default FoodMenuForm;


















