package com.example.foodTruckProject;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class FoodServiceTest {

    @Mock
    private FoodRepository foodRepository;


    @InjectMocks
    private FoodService foodService;


    @Test
    public void shouldReturnFoodMenuItems() {
        List<FoodItems> itemList = new ArrayList<>();
        FoodItems item1 = new FoodItems("Chicken Sandwich", "Chicken Sandwich on a white bread", 5.65);
        FoodItems item2 = new FoodItems("Pork Sandwich", "Pork Sandwich on a white bread", 3.25);
        itemList.addAll(Arrays.asList(item1, item2));

        when(foodRepository.findAll()).thenReturn(itemList);

        List<FoodItems> returnedItems = foodService.getMenuItems();

        assertThat(returnedItems).isEqualTo(itemList);


    }

}
