import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import App from './App';
import {FoodItem} from "./FoodItem";

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

    const{ getByTestId }= render(<App/>);
    const  list= getByTestId("menu-items").children;
    await waitFor(()=>expect(list[0]).toHaveTextContent("Chicken"));
    await waitFor(()=>expect(list[1]).toHaveTextContent("Pork"));

  });

  it('should a description button of food item', async () => {
    render(<App />);
    //screen.getByRole('button', {name: /description/i})
    await screen.getByText("Description ").click();
    expect(screen.findByText("on a hoggy bread")).toBeInTheDocument();
  });

});
