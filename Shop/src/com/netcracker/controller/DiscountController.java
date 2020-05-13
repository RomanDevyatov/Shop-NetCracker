package com.netcracker.controller;

import com.netcracker.entity.Discount;
import com.netcracker.intarface.IDiscountService;
import com.netcracker.service.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class DiscountController {

    @Autowired
    private DiscountService discountService;

    @Inject
    private IDiscountService iDiscountService;

    @GetMapping("/discounts")
    ResponseEntity<List<Discount>> getAllDiscounts(){
        return new ResponseEntity<>(discountService.scriptFindAll(), HttpStatus.OK);
    }

    @GetMapping("/discounts/{id}")
    ResponseEntity<Discount> getDiscount(@PathVariable("id") Long id){
        return new ResponseEntity<>(discountService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/discounts")
    public void createDiscount(@RequestBody Discount discount) {
        discountService.save(new Discount(discount.getPercent(), discount.getDescription()));
    }

    @PutMapping("/discounts/{id}")
    public ResponseEntity<Discount> updateDiscount(@PathVariable("id") Long id,
                                           @RequestBody Discount discount){
        return discountService.updateDiscount(id, discount);
    }

    @DeleteMapping("/discounts/{id}")
    ResponseEntity<String> deleteDiscount(@PathVariable("id") long id){
        discountService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/discounts")
    ResponseEntity<String> deleteAllDiscount() {
        discountService.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
