package com.netcracker.controller;

import com.netcracker.entity.Good;
import com.netcracker.entity.User;
import com.netcracker.service.GoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController @CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class GoodController {
    @Autowired
    private GoodService goodService;

    @GetMapping("/goods")
    ResponseEntity<List<Good>> getAllGoods(){
        return new ResponseEntity<>(goodService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/goods/{id}")
    ResponseEntity<Good> getGood(@PathVariable("id") Long id){
        return new ResponseEntity<Good>(goodService.scriptFindById(id), HttpStatus.OK);
    }

    @PostMapping("/goods/byname")
    ResponseEntity<Good> getGoodName(@RequestBody String name){
        return new ResponseEntity<Good>(goodService.findByName(name), HttpStatus.OK);
    }

    @PostMapping("/goods")
    public void createGood(@RequestBody Good good) {
        goodService.save(new Good(good.getName(), good.getBrand(), good.getAmount(), good.getCategoryName(), good.getSize(), good.getPrice(), good.getImgPath()));
    }

    @PutMapping("/goods/{id}")
    public ResponseEntity<Good> updateGood( @PathVariable("id") Long id,
                                            @RequestBody Good good){
        return goodService.updateGood(id, good);
    }

    @PostMapping("/goods/amount/{id}")
    public ResponseEntity<Good> updateGoodAmount( @PathVariable("id") long id,
                                                  @RequestBody Long amount){
        return goodService.upadateGoodAmount(id, amount);
    }

    @DeleteMapping("/goods/{id}")
    ResponseEntity<String> deleteGood(@PathVariable("id") long id){
        goodService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/goods")
    ResponseEntity<String> deleteAllGood() {
        goodService.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
