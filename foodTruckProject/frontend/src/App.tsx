import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './App.css';
import {FoodItem} from "./model/FoodItem";
import FoodTruckNavBar from "./FoodTruckNavBar";
import foodTruck from "./foodTruck.gif";
import png from "./PngItem_1227140.png";



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
    
      });

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
        <div>
            <img src={png} />
        </div>

        {renderForm ? <FoodMenuForm handleForm={handleForm}/> : <>


        <ul className='foodList' data-testid="menu-items" >
            {foodList.filter(each => each.name.toLowerCase().includes(search.toLowerCase()) ||
                each.description.toLowerCase().includes(search.toLowerCase())).map((each, index) =>
                    <li key={index}>
                        {each.name} {each.price}
                        <br/>
                        {showDescription && <b >{each.description}</b>}
                    </li>
                )}
        </ul>
        <button onClick={getDescriptionOfFoodItem}>Food Description</button></>}
    </div>
}

export default App;
