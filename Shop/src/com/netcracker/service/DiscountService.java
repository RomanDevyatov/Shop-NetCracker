package com.netcracker.service;

import com.netcracker.entity.Discount;
import com.netcracker.entity.OrderHistory;
import com.netcracker.intarface.IDiscountService;
import com.netcracker.repository.DiscountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiscountService implements IDiscountService {

    @Autowired
    private DiscountRepository discountRepository;



    public List<Discount> findAll(){ return discountRepository.findAll(); }

    public List<Discount> scriptFindAll() {
        return discountRepository.scriptFindAll();
    }

    public Discount scriptFindById(long id) {
        return discountRepository.scriptFindById(id);
    }

    public Discount findById(long id){
        Optional<Discount> optional = discountRepository.findById(id);
        return optional.orElse(new Discount());
    }

    public Discount scriptFindByStatus(String status) {
        return discountRepository.scriptFindByStatus(status);
    }

    public Discount save(Discount discount){
        discountRepository.save(discount);
        return discount;
    }

    public void deleteAll() {
        discountRepository.deleteAll();
    }
    public void deleteById(long id){
        discountRepository.deleteById(id);
    }

    public ResponseEntity<Discount> updateDiscount(Long id, Discount discount) {
        Optional<Discount> discountData = Optional.ofNullable(findById(id));

        if (discountData.isPresent()){
            Discount newDiscount=discountData.get();
            newDiscount.setPercent(discount.getPercent());
            newDiscount.setDescription(discount.getDescription());
            return new ResponseEntity<Discount>(save(newDiscount), HttpStatus.OK);
        } else return  new ResponseEntity<Discount>(HttpStatus.NOT_FOUND);
    }

    @Override
    public String getDiscountName(List<OrderHistory> orderHistories) {
        long amount=0;
        for (OrderHistory o: orderHistories){
            amount = amount + o.getAmount();
        }
        if (amount >= 10) {
            return "gold";
        } else if (amount >= 5) {
            return "silver";
        }
        return "blue";
    }

    public Discount chooseDiscount(List<OrderHistory> orderHistories) {
        String discountName=getDiscountName(orderHistories);
        return scriptFindByStatus(discountName);
    }
}
