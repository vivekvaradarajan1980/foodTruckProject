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
    const [showDrinks, setShowDrinks]=useState(false);
    const [id, setId] = useState<number>(0);

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

    const renderDrinks=()=>{
        setShowDrinks(!showDrinks)

    }

    const deleteItem= (id: string | number)=>{
        axios.delete("http://localhost:8080/api/menu/item/delete/" + id);
    }

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore

    const Foodpage=()=>{
        return(
        <>
            <ul className='foodList' data-testid="menu-items" >
                {foodList.filter(each => each.name.toLowerCase().includes(search.toLowerCase()) ||
                    each.description.toLowerCase().includes(search.toLowerCase())).map((each, index) =>
                    <li onClick={e=>setId(each.id)} key={index}>
                        {(!showDrinks && each.type=="food") && each.name +' '+ each.price }
                        {(showDrinks && each.type=="drinks")&& each.name +' '+ each.price}

                        <br/>
                        {(!showDrinks && each.type=="food" && showDescription) && <b >{each.description}</b>}
                        {(showDrinks && each.type=="drinks" && showDescription) && <b >{each.description}</b>}

                    </li>

                )}
            </ul>
            <button onClick={getDescriptionOfFoodItem}>Food Description</button>
            <button onClick={(e)=>deleteItem(id)}> Delete</button>
        </>
    )
}
    return <div className="App">
        <FoodTruckNavBar renderDrinks={renderDrinks} handleForm={handleForm} handleSearchBox={handleSearchBox}/>
        <div>
            <img src={png} />
        </div>

        {renderForm ? <FoodMenuForm handleForm={handleForm}/> : <Foodpage/>}

    </div>
}

export default App;
