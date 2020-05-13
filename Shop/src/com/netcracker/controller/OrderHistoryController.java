package com.netcracker.controller;

import com.netcracker.ShopApplication;
import com.netcracker.entity.Basket;
import com.netcracker.entity.Discount;
import com.netcracker.entity.OrderHistory;
import com.netcracker.service.DiscountService;
import com.netcracker.service.OrderHistoryService;
import com.netcracker.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class OrderHistoryController {

    @Autowired
    private UserService userService;

    @Autowired
    DiscountService discountService;

    private Discount chooseDiscount(Long id){
        return discountService.chooseDiscount(orderHistoryService.findByUserId(id));
    }

    @Autowired
    private OrderHistoryService orderHistoryService;
    private static final Logger log = LoggerFactory.getLogger(ShopApplication.class);
    @GetMapping("/orderhistorys")
    ResponseEntity<List<OrderHistory>> getAllOrderHistorys(){
        return new ResponseEntity<>(orderHistoryService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/orderhistorys/{id}")
    ResponseEntity<OrderHistory> getFeedback(@PathVariable("id") Long id){
        return new ResponseEntity<OrderHistory>(orderHistoryService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/orderhistorys/personal/{id}")
    ResponseEntity<List<OrderHistory>> getBasketForCurrentUser(@PathVariable("id") Long id){
        return new ResponseEntity<>( orderHistoryService.findByUserId(id), HttpStatus.OK);
    }

    @PostMapping("/orderhistorys/create")
    public ResponseEntity<String> createOrderHistory(@RequestBody OrderHistory[] orderHistory) {
        orderHistoryService.addOrderHistory(orderHistory);
        if(orderHistory!=null) {
            long id=orderHistory[0].getUser().getId();
            userService.updateDiscount(orderHistory[0].getUser().getId(), chooseDiscount(id));
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/orderhistorys/{id}")
    ResponseEntity<String> deleteOrderHistory(@PathVariable("id") long id){
        orderHistoryService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/orderhistorys")
    ResponseEntity<String> deleteAllOrderHistory() {
        orderHistoryService.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
