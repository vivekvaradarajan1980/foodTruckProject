package com.example.foodTruckProject;

import net.bytebuddy.asm.Advice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface  FoodRepository extends JpaRepository<FoodItems, Long> {

    List<FoodItems> findAllByPrice(double price);

    List<FoodItems> findAllByNameContainingIgnoreCase(String name);

}
