package com.netcracker.controller;

import com.netcracker.entity.Basket;
import com.netcracker.entity.Discount;
import com.netcracker.entity.OrderHistory;
import com.netcracker.entity.User;
import com.netcracker.service.BasketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class BasketController {

    @Autowired
    private BasketService basketService;

    private boolean isEmpty;

    @GetMapping("/baskets")
    ResponseEntity<List<Basket>> getAllBaskets(){
        return new ResponseEntity<>(basketService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/baskets/{id}")
    ResponseEntity<List<Basket>> getBasketForCurrentUser(@PathVariable("id") Long id){
        return new ResponseEntity<>( basketService.findByUserId(id), HttpStatus.OK);
    }

    @PutMapping("/baskets")
    public ResponseEntity<Basket> updateBaskets(@RequestBody Basket[] baskets){
        return basketService.updateBaskets(baskets);
    }

    @PostMapping("/baskets/add")
    public ResponseEntity<Basket> addToBasketItem(@RequestBody Basket basket) {
        return basketService.addToBasketItem(basket);
    }

    @PostMapping("/baskets/refresh")
    public ResponseEntity<Basket> refreshBasket() {
        return basketService.refreshBasket();
    }

    @PostMapping("/baskets/create")
    public ResponseEntity<String> createBasket(@RequestBody Basket[] baskets) {
        return basketService.addBasketList(baskets);
    }

    @PutMapping("/baskets/amount/{id}")
    public ResponseEntity<Basket> updateBasketAmount(@PathVariable("id") Long id, @RequestBody Long amount){
        return basketService.updateBasketAmount(id, amount);
    }

    @PutMapping("/baskets/discount/{id}")
    public ResponseEntity<Basket> updateBasketDiscount(@PathVariable("id") Long id, @RequestBody Discount discount){
        return basketService.updateBasketDiscount(id, discount);
    }

    @PutMapping("/baskets/addone/{id}")
    public ResponseEntity<Basket> addOneBasketAmount(@PathVariable("id") Long id, @RequestBody Long amount){
        return basketService.addOneBasketAmount(id, amount);
    }

    @DeleteMapping("/baskets/{id}")
    ResponseEntity<String> deleteBasket(@PathVariable("id") long id){
        return basketService.deleteById(id);
    }

    @DeleteMapping("/baskets")
    ResponseEntity<String> deleteAllBasket() {
        return basketService.deleteAll();
    }

    @DeleteMapping("/baskets/delete/{id}")
    ResponseEntity<String> deleteAllBasketByUserId(@PathVariable("id") long id){
        return basketService.scripDeleteByUserId(id);
    }
}
