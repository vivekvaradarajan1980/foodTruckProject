package com.example.foodTruckProject;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  FoodRepository extends JpaRepository<FoodItems, Long> {

}
