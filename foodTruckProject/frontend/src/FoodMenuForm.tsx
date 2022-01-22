import {FormEvent, useState} from "react";
import {FoodItem} from "./model/FoodItem";
import axios from "axios";


require('axios');


const FoodMenuForm = (props: { handleForm: () => void; }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const postFoodMenu = (event: FormEvent<HTMLFormElement>, name: string, price: string, description: string) =>{
         event.preventDefault()
       axios.post('http://localhost:8080/api/menu',{name:name, price:price, description: description});
       props.handleForm();
     };




    return(
        <form onSubmit={(e)=>postFoodMenu(e,name,price,description)}>
        <label>
            Food Name:
            <input type="text" name="name" />
        </label>

            <label>
                Food Description:
                <input type="text" name="description" />
            </label>

            <label>
                Food Price:
                <input type="text" name="price" />
            </label>
        <input type="submit" value="Submit" />
    </form>)

}

export default FoodMenuForm;


















