import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './App.css';
import {FoodItem} from "./FoodItem";



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
    return (
        <div className="App">
            <AppBar position="sticky" style={{backgroundColor: "darkolivegreen", color: "black"}}>
                <Toolbar>
                    <IconButton aria-label="app">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6"> V & G Food Truck </Typography>
                </Toolbar>
            </AppBar>
            <h1 >V & G Food Truck</h1>
            <input onChange={(event => handleSearchBox(event))} type="text" placeholder="search for food..."/>
            <ul className='foodList' data-testid="menu-items" >
                {foodList.filter(each => each.name.toLowerCase().includes(search.toLowerCase()) ||
                    each.description.toLowerCase().includes(search.toLowerCase())).map((each, index) => (
                    <>
                        <li key={index}>
                            <div  key={index}>{each.name} {each.price}<br/></div>
                            {showDescription && <div  key={index}><b>{each.description}</b></div>}
                        </li>
                        <br/>
                       
                    </>))}
            </ul>
            <button onClick={getDescriptionOfFoodItem} key="index">Food Description</button>
        </div>

    );
}

export default App;
