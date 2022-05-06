import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './App.css';
import {FoodItem} from "./model/FoodItem";
import FoodTruckNavBar from "./FoodTruckNavBar";
import FoodMenuForm from "./FoodMenuForm";

function App() {
    const [foodList, setFoodList] = useState<FoodItem[] >([]);
    const [showDescription, setShowDescription] = useState<boolean>(false);
    const [search, setSearch] = useState("");

    const [renderForm, setRenderForm] = useState(false);

    useEffect(() => {
        
        async function getFoodMenu() {
            const response = await axios.get('http://localhost:8080/api/menu');
          setFoodList(response.data);
        }

        getFoodMenu();
    
      },[]);

    const getDescriptionOfFoodItem = () =>{
        setShowDescription(!showDescription)
    }

    const handleSearchBox = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setSearch(event.target.value)
    }

    const handleForm=()=>{
        setRenderForm(!renderForm)

    }

    // @ts-ignore
    return <div className="App">
        <FoodTruckNavBar handleForm={handleForm} handleSearchBox={handleSearchBox}/>

        {renderForm ? <FoodMenuForm handleForm={handleForm}/> : <>


        <ul style={{paddingLeft:'inherit'}} className='foodList' data-testid="menu-items" >
            {foodList.filter(each => each.name.toLowerCase().includes(search.toLowerCase()) ||
                each.description.toLowerCase().includes(search.toLowerCase())).map((each, index) =>
                    <li key={index}>
                        {each.name} {each.price}
                        <br/>
                        {showDescription && <b >{each.description}</b>}
                        <br/>
                        <br/>
                    </li>
                )}
        </ul>
        <button style={{borderRadius:'5px'}} onClick={getDescriptionOfFoodItem}>Food Description</button></>}
    </div>
}

export default App;
