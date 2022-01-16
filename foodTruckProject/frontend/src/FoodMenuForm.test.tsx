import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import FoodMenuForm  from './FoodMenuForm';
import userEvent from "@testing-library/user-event";
import {eventWrapper} from "@testing-library/user-event/dist/utils";

const axios = require('axios');


describe('it tests the food menu form', ()=>{
    it('tests if form has 3 text boxes, one for each field, and a button',()=>{

        render(<FoodMenuForm/>)
        expect(screen.getByRole('textbox',{name:/food_price/})).toBeInTheDocument();


        });



    it('test axios post method', ()=>{

        const handleForm=jest.fn();
        render(<FoodMenuForm handleForm={handleForm}/>);



        userEvent.type(screen.getByRole('textbox',{name:/food_name/i}),'Chicken rice')
        userEvent.type(screen.getByRole('textbox',{name:/food_price/i}),'4.50')
        userEvent.type(screen.getByRole('textbox',{name:/food_description/i}),'on rice')
        userEvent.click(screen.getByRole("button",{name:/create item/i}));
        expect(handleForm).toHaveBeenCalledTimes(1)
    })
})