import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './App.css';
import {FoodItem} from "./model/FoodItem";
import FoodTruckNavBar from "./FoodTruckNavBar";

function App() {
    const [foodList, setFoodList] = useState<FoodItem[] >([]);
    const [showDescription, setShowDescription] = useState<boolean>(false);
    const [search, setSearch] = useState("");

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
    // @ts-ignore
    return <div className="App">
        <FoodTruckNavBar handleSearchBox={handleSearchBox}/>
        <h1 >V & G Food Truck</h1>

        <ul className='foodList' data-testid="menu-items" >
            {foodList.filter(each => each.name.toLowerCase().includes(search.toLowerCase()) ||
                each.description.toLowerCase().includes(search.toLowerCase())).map((each, index) => <>
                    <li key={index}>
                        <div  key={index}>{each.name} {each.price}<br/></div>
                        {showDescription && <div  key={index}><b>{each.description}</b></div>}
                    </li>
                    <br/>

                </>)}
        </ul>
        <button onClick={getDescriptionOfFoodItem} key="index">Food Description</button>
    </div>;
}

export default App;
