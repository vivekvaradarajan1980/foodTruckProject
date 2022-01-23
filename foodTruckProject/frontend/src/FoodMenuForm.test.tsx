import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import FoodMenuForm  from './FoodMenuForm';
import userEvent from "@testing-library/user-event";
import {eventWrapper} from "@testing-library/user-event/dist/utils";

const axios = require('axios');


describe('it tests the food menu form', ()=>{
    it('tests if form has 3 text boxes, one for each field, and a button',()=>{

        render(<FoodMenuForm handleForm={jest.fn}/>)
        expect(screen.getByRole('button',{name:/Submit/})).toBeInTheDocument();

        });



    it('test axios post method', ()=>{

        const handleForm=jest.fn();
        render(<FoodMenuForm handleForm={handleForm}/>);

         axios.post = jest.fn().mockImplementation();

        userEvent.type(screen.getByRole('textbox',{name:/name/i}),'Chicken rice')

        userEvent.type(screen.getByRole('textbox',{name:/price/i}),'4.50')

        userEvent.type(screen.getByRole('textbox',{name:/description/i}),'on rice')

        userEvent.click(screen.getByRole("button",{name:/Submit/i}));

        expect(axios.post).toHaveBeenCalled();
})
})