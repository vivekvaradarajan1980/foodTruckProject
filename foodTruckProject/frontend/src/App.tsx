import React, {useEffect, useState} from 'react';

import logo from './logo.svg';
import './App.css';
import {FoodItem} from "./FoodItem";

type Props = {
    foodItems: FoodItem[];
};
function App() {
    const [foodList, setFoodList] = useState<FoodItem[] >([]);


    useEffect(()=>{
        fetch('http://localhost:8080/api/menu')
            .then(data=>data.json())
            .then(data=>setFoodList(data));

    },[])

    // @ts-ignore
    return (
        <div className="App">
            <h1 >V & G Food Truck</h1>
            <ul className='foodList'>
                {foodList.map((each, index) => (
                    <li key={index}>
                        {each.name} {each.price}

                    </li>))}
            </ul>
        </div>

    );
}

export default App;
