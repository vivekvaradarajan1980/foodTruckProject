import {useState} from "react";
import {FoodItem} from "./model/FoodItem";
import axios from "axios";



require('axios');



 const FoodMenuForm =(props: { handleForm: () => void; })=>{
    const [name, setName]=useState('');
    const [price,setPrice]=useState('');
    const [description,setDescription]=useState('');

     const postFoodMenu = (name: string, price: string, description: string) =>{
    // axios.post....
       props.handleForm();
     };




    return(<>

        <input value={name}  onChange={(e)=>setName(e.target.value)} aria-label="food_name"/>

        <input value={description} onChange={(e)=>setDescription(e.target.value )} aria-label="food_description"/>

        <input value={price} onChange={(e)=>setPrice(e.target.value)} aria-label="food_price"/>

         <button onClick={(event)=>postFoodMenu(name,price,description)}>Create item</button>

        </>)

}

export default FoodMenuForm;


















