package com.netcracker.service;

import com.netcracker.entity.Basket;
import com.netcracker.entity.Discount;
import com.netcracker.repository.BasketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BasketService {

    @Autowired
    private BasketRepository basketRepository;

    public List<Basket> findAll(){ return basketRepository.findAll(); }
    public List<Basket> scriptFindAll(){ return basketRepository.scriptFindAll(); }

    public Optional<Basket> findById(long id){
        Optional<Basket> optional = basketRepository.findById(id);
        return optional;
    }

    public Basket findByUsername(String userName) {
        return basketRepository.scripFindByUsername(userName);
    }

    public List<Basket> findByUserId(Long id) {
        return basketRepository.scripFindByUserId(id);
    }

    public Basket save(Basket basket){
        return basketRepository.save(basket);
    }

    public ResponseEntity<String> deleteAll() {
        basketRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<String> deleteById(Long id){
        basketRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public void deleteByGoodId(Long id) {
        basketRepository.deleteByGoodId(id);
    }

    public ResponseEntity<String> scripDeleteByUserId(Long id) {
        basketRepository.scriptDeleteByUserId(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<Basket> addOneBasketAmount(Long id, Long amount) {
        Optional<Basket> basketData = findById(id);
        if (basketData.isPresent()){
            Basket newBasket=basketData.get();
            newBasket.setAmount(newBasket.getAmount() + amount);
            return new ResponseEntity<Basket>(save(newBasket), HttpStatus.OK);
        } else return  new ResponseEntity<Basket>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Basket> updateBasketDiscount(Long id, Discount discount) {
        Optional<Basket> basketData = findById(id);
        if (basketData.isPresent()){
            Basket newBasket=basketData.get();
            newBasket.setDiscount(discount);
            return new ResponseEntity<Basket>(save(newBasket), HttpStatus.OK);
        } else return  new ResponseEntity<Basket>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<Basket> updateBasketAmount(Long id, Long amount) {
        Optional<Basket> basketData = findById(id);
        if (basketData.isPresent()){
            Basket newBasket=basketData.get();
            newBasket.setAmount(amount);
            return new ResponseEntity<Basket>(save(newBasket), HttpStatus.OK);
        } else return  new ResponseEntity<Basket>(HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<String> addBasketList(Basket[] baskets) {
        for (Basket basket : baskets) {
            save(new Basket(basket.getUser(), basket.getGood(),basket.getAmount(),basket.getDiscount()));
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<Basket> updateBaskets(Basket[] baskets) {
        for (Basket basket : baskets) {
            Optional<Basket> basketData = findById(basket.getId());

            if (basketData.isPresent()){
                Basket newBasket=basketData.get();
                newBasket.setUser(basket.getUser());
                newBasket.setDiscount(basket.getDiscount());
                newBasket.setGood(basket.getGood());
                newBasket.setAmount(basket.getAmount());
                new ResponseEntity<Basket>(save(newBasket), HttpStatus.OK);
            } else return  new ResponseEntity<Basket>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Basket>(HttpStatus.OK);
    }

    public ResponseEntity<Basket> addToBasketItem(Basket basket) {
        List<Basket> baskets = findAll();
        for(Basket basketItem:baskets){
            String str1=basketItem.getGood().getName(),
                    str2=basket.getGood().getName();
            if(str1.equals(str2) && basketItem.getUser().getUsername().equals(basket.getUser().getUsername())){
                if(basketItem.getGood().getAmount()>basketItem.getAmount()) {
                    basketItem.setAmount(basketItem.getAmount() + basket.getAmount());
                    return new ResponseEntity<Basket>(save(basketItem), HttpStatus.OK);
                } else return new ResponseEntity<>(HttpStatus.OK);
            }
        }
        save(new Basket(basket.getUser(), basket.getGood(), basket.getAmount(), basket.getDiscount()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<Basket> refreshBasket() {
        List<Basket> baskets=findAll();
        for(Basket basketItem : baskets){
            if(basketItem.getGood().getAmount() == 0){
                deleteByGoodId(basketItem.getGood().getId());
            }
            else if(basketItem.getGood().getAmount() < basketItem.getAmount()){
                basketItem.setAmount(basketItem.getGood().getAmount());
                save(basketItem);
            }
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
