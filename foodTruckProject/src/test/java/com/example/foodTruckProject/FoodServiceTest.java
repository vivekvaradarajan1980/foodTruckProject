package com.example.foodTruckProject;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

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
    @Test
    public void shouldReturnFoodItemByPrice() {
        List<FoodItems> itemList = new ArrayList<>();
        FoodItems item1 = new FoodItems("Chicken Sandwich", "Chicken Sandwich on a white bread", 5.65);
        FoodItems item2 = new FoodItems("Pork Sandwich", "Pork Sandwich on a white bread", 3.25);
        itemList.addAll(Arrays.asList(item1, item2));

        System.out.println(Arrays.asList(item1));
        when(foodRepository.findAllByPrice(5.65)).thenReturn(Arrays.asList(item1));


        List<FoodItems> returnedItems = foodService.getFoodItemByPrice(5.65);

        verifyNoMoreInteractions(foodRepository);
        assertThat(returnedItems).isEqualTo(Arrays.asList(item1));

    }

    @Test
    public void shouldReturnFoodItemByName() {
        List<FoodItems> itemList = new ArrayList<>();
        FoodItems item1 = new FoodItems("Chicken Sandwich", "Chicken Sandwich on a white bread", 5.65);
        FoodItems item2 = new FoodItems("Pork Sandwich", "Pork Sandwich on a white bread", 3.25);
        itemList.addAll(Arrays.asList(item1, item2));

        System.out.println(Arrays.asList(item1));
        when(foodRepository.findAllByNameContainingIgnoreCase("pork")).thenReturn(itemList);


        List<FoodItems> returnedItems = foodService.getFoodItemByName("pork");

        assertThat(returnedItems).isEqualTo(itemList);

    }



}
