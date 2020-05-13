package com.netcracker.service;

import com.netcracker.entity.Good;
import com.netcracker.repository.GoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GoodService {
    @Autowired
    private GoodRepository goodRepository;

    public List<Good> findAll(){ return goodRepository.findAll(); }
    public List<Good> scriptFindAll(){ return goodRepository.scriptFindAll(); }

    public Good findById(long id){
        Optional<Good> optional = goodRepository.findById(id);
        return optional.orElse(new Good());
    }

    public Good scriptFindById(long id){
        return goodRepository.scriptFindById(id);
    }

    public Good findByName(String name) {
        return goodRepository.findByName(name);
    }

    public Good save(Good good){
        return goodRepository.save(good);
    }

    public void deleteAll() {
        goodRepository.deleteAll();
    }
    public void deleteById(Long id){
        goodRepository.deleteById(id);
    }

    public ResponseEntity<Good> updateGood(Long id, Good good) {
        Optional<Good> goodData = Optional.ofNullable(findById(id));

        if (goodData.isPresent()){
            Good newGood=goodData.get();
            newGood.setName(good.getName());
            newGood.setBrand((good.getBrand()));
            newGood.setAmount(good.getAmount());
            newGood.setCategoryName(good.getCategoryName());
            newGood.setSize(good.getSize());
            newGood.setPrice(good.getPrice());
            newGood.setImgPath(good.getImgPath());
            return new ResponseEntity<Good>(save(newGood), HttpStatus.OK);
        } else return  new ResponseEntity<Good>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Good> upadateGoodAmount(long id, Long amount) {
        Optional<Good> goodData = Optional.ofNullable(findById(id));

        if (goodData.isPresent()){
            Good newGood=goodData.get();
            newGood.setAmount(amount);
            return new ResponseEntity<Good>(save(newGood), HttpStatus.OK);
        } else return  new ResponseEntity<Good>(HttpStatus.NOT_FOUND);
    }
}
