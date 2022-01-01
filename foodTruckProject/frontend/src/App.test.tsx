import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {FoodItem} from "./FoodItem";


describe('Food Truck Project',()=>{
it('should render V & G Food Truck title', () => {
  render(<App />);
  const headerElement = screen.getByText(/V & G Food Truck/i);
  expect(headerElement).toBeInTheDocument();
});

  it('should render list of food items', async () => {
    const foodItem1: FoodItem = {
      name: 'Chicken',
      description: 'On a bread',
      price: 4.58
    };
    const foodItem2: FoodItem = {
      name: 'Pork',
      description: 'On rice',
      price: 5.59
    };

    const foodList: FoodItem[] =[foodItem1, foodItem2];


    // @ts-ignore
    global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(foodList),
        })
    );
    render(<App />);
    const list = await screen.getAllByRole('listitem')
    //const list = await screen.getAllByRole('list')
    expect(list.map(foodItem => foodItem.textContent)).toEqual("Chicken, pork");
  });

  it('should a description button of food item', async () => {
    render(<App />);
    //screen.getByRole('button', {name: /description/i})
    await screen.getByText("Description ").click();
    expect(screen.findByText("on a hoggy bread")).toBeInTheDocument();
  });

});
