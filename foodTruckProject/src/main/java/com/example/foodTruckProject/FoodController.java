package com.example.foodTruckProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class FoodController {

    @Autowired
    private FoodService foodService;

    @GetMapping("/api/menu")
    public List<FoodItems> getMenuItems(){
        return foodService.getMenuItems();
    }

    @PostMapping("/api/menu/item")
    @ResponseStatus(HttpStatus.CREATED)
    public FoodItems postMenuItems(@RequestBody FoodItems item){return foodService.postMenuItem(item);
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
