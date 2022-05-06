package com.example.foodTruckProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    public List<FoodItems> getMenuItems() {
        return foodRepository.findAll();
    }

    public List<FoodItems> getFoodItemByPrice(double price) {
        return foodRepository.findAllByPrice(price);
    }

    public List<FoodItems> getFoodItemByName(String name) {

        return foodRepository.findAllByNameContainingIgnoreCase(name);

    }

    public FoodItems postMenuItem(FoodItems item) {
        return foodRepository.save(item);
    }
}
