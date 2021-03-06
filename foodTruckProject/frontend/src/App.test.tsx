import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import App from './App';
import {FoodItem} from "./model/FoodItem";
import userEvent from "@testing-library/user-event";

const axios = require('axios');

jest.mock('axios');
describe('Food Truck Project',()=>{



it('should render V & G Food Truck title', () => {
  render(<App />);
  const headerElement = screen.getByText(/V & G Food Truck/i);
  expect(headerElement).toBeInTheDocument();
});

  it('should render list of food items', async () => {

    axios.get.mockResolvedValue({
      data: [
        {
          name: 'Chicken',
          price: 4.58
        },
        {
          name: 'Pork',
          price: 5.59
        }
      ]
    });

    render(<App/>);
    const fooditems = await screen.findAllByRole("listitem");
    expect(fooditems.map(item=>item.textContent)).toEqual(["Chicken 4.58","Pork 5.59"]);


  });



  it('should description button of food item', async () => {

    axios.get.mockResolvedValue({
      data: [
        {
          name: 'Chicken',
          description: 'On a bread',
          price: 4.58
        },
        {
          name: 'Pork',
          description: 'On rice',
          price: 5.59
        }
      ]
    });
    render(<App />);
    screen.getByRole("button",{name:/Food Description/}).click();
    expect(await screen.findByText(/on a bread/i)).toBeInTheDocument();
  });

  it('should search for food items', async () => {

    axios.get.mockResolvedValue({
      data: [
        {
          name: 'Chicken',
          description: 'On a bread',
          price: 4.58
        },
        {
          name: 'Pork',
          description: 'On rice',
          price: 5.59
        }
      ]
    });
    render(<App />);
    userEvent.type(screen.getByRole('textbox'),'on rice')
    screen.getByRole("button",{name:/Food Description/}).click();
    expect(await screen.findByText(/pork/i)).toBeInTheDocument();
  });



});
