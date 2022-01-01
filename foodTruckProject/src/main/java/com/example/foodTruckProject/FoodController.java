package com.example.foodTruckProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController

public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping("/api/menu")
    public List<FoodItems> getMenuItems(){
        return foodService.getMenuItems();
    }

    @GetMapping("/api/menu/{price}")
    public List<FoodItems> getFoodItemByPrice(@PathVariable double price) {
        return foodService.getFoodItemByPrice(price);
    }

    @GetMapping("/api/menu/item/{name}")
    public List<FoodItems> getFoodItemByName(@PathVariable String name) {
        return foodService.getFoodItemByName(name);
    }

}
