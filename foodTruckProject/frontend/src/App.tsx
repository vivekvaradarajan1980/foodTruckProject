import React, {useEffect, useState} from 'react';
import './App.css';
import {FoodItem} from "./FoodItem";

type Props = {
    foodItems: FoodItem[];
};
function App() {
    const [foodList, setFoodList] = useState<FoodItem[] >([]);
    const [showDescription, setShowDescription] = useState<boolean>(false);

    useEffect(()=>{
        fetch('http://localhost:8080/api/menu')
            .then(data=>data.json())
            .then(data=>setFoodList(data));

    },[])

    const getDescriptionOfFoodItem = () =>{
        setShowDescription(!showDescription)
    }
    // @ts-ignore
    return (
        <div className="App">
            <h1 >V & G Food Truck</h1>
            <ul className='foodList'>
                {foodList.map((each, index) => (
                    <>
                        <li key={index}>
                            <div>{each.name} {each.price}</div>
                            {showDescription && <div>{each.description}</div>}
                        </li>
                        <button onClick={getDescriptionOfFoodItem} key="index">Description {each.name}</button>
                    </>))}
            </ul>
        </div>

    );
}
//<Button variant="text">Text</Button>

export default App;
