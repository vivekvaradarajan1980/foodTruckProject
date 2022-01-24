package com.example.foodTruckProject;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class FoodTruckControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FoodService foodService;
    private List<FoodItems> itemList;
    private  FoodItems item1;
    private FoodItems item2;


    @BeforeEach
    public void setUp(){
        itemList = new ArrayList<>();
        item1 = new FoodItems("Chicken Sandwich", "Chicken Sandwich on a white bread", 5.65);
        item2 = new FoodItems("Pork Sandwich", "Pork Sandwich on a white bread", 3.25);
        itemList.addAll(Arrays.asList(item1,item2));
    }

    @Test
    public void shouldReturnFoodMenuItems() throws Exception {
        when(foodService.getMenuItems()).thenReturn(itemList);

        MockHttpServletRequestBuilder getRequest = get("/api/menu")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);

        mockMvc.perform(getRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value(item1.getName()))
                .andExpect(jsonPath("$[0].description").value(item1.getDescription()))
                .andExpect(jsonPath("$[0].price").value(item1.getPrice()))
                .andExpect(jsonPath("$[1].name").value(item2.getName()))
                .andExpect(jsonPath("$[1].description").value(item2.getDescription()))
                .andExpect(jsonPath("$[1].price").value(item2.getPrice()));

    }

    @Test
    public void shouldReturnTheFoodItemByPrice() throws Exception{
        when(foodService.getFoodItemByPrice(5.65)).thenReturn(itemList);

        MockHttpServletRequestBuilder getRequest = get("/api/menu/5.65")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);

        mockMvc.perform(getRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name", is(item1.getName())))
                .andExpect(jsonPath("$[0].price", is(item1.getPrice())))
                .andExpect(jsonPath("$[0].description", is(item1.getDescription())));
    }

    @Test
    public void shouldReturnTheFoodItemByName() throws Exception{
        when(foodService.getFoodItemByName("pork")).thenReturn(itemList);

        MockHttpServletRequestBuilder getRequest = get("/api/menu/item/pork")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);

        mockMvc.perform(getRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[1].name", is(item2.getName())))
                .andExpect(jsonPath("$[1].price", is(item2.getPrice())))
                .andExpect(jsonPath("$[1].description", is(item2.getDescription())));
    }

    @Test
    public void shoulPostFoodMenuItem() throws Exception {
        when(foodService.postMenuItem(item2)).thenReturn(item2);

        ObjectMapper objectMapper = new ObjectMapper();

        MockHttpServletRequestBuilder postRequest = post("/api/menu/item")
                .content(objectMapper.writeValueAsString(item2))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON);

        mockMvc.perform(postRequest)
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$[0].name", is(item2.getName())))
                .andExpect(jsonPath("$[0].price", is(item2.getPrice())))
                .andExpect(jsonPath("$[0].description", is(item2.getDescription())));



    }

}
