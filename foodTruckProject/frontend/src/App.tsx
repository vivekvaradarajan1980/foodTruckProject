import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './App.css';
import {FoodItem} from "./FoodItem";

type Props = {
    foodItems: FoodItem[];
};
function App() {
    const [foodList, setFoodList] = useState<FoodItem[] >([]);
    const [showDescription, setShowDescription] = useState<boolean>(false);




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
    // @ts-ignore
    return (
        <div className="App">
            <h1 >V & G Food Truck</h1>
            <input type="text" placeholder="search..."/>
            <ul className='foodList' data-testid="menu-items" >
                {foodList.map((each, index) => (
                    <>
                        <li key={index}>
                            <div  key={index}>{each.name} {each.price}<br></br></div>
                            {showDescription && <div  key={index}><b>{each.description}</b></div>}
                        </li>
                        <br></br>
                       
                    </>))}
            </ul>
            <button onClick={getDescriptionOfFoodItem} key="index">Food Description</button>
        </div>

    );
}
//<Button variant="text">Text</Button>

export default App;
