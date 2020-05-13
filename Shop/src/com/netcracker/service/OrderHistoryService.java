package com.netcracker.service;

import com.netcracker.entity.Basket;
import com.netcracker.entity.Feedback;
import com.netcracker.entity.Good;
import com.netcracker.entity.OrderHistory;
import com.netcracker.repository.OrderHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderHistoryService {
    @Autowired
    private OrderHistoryRepository orderHistoryRepository;

    public List<OrderHistory> findAll(){ return orderHistoryRepository.findAll(); }

    public List<OrderHistory> findAllByUserId(long id){ return orderHistoryRepository.findAllByUserId(id); }

    public OrderHistory findById(long id){
        Optional<OrderHistory> optional = orderHistoryRepository.findById(id);
        return optional.orElse(new OrderHistory());
    }

    public List<OrderHistory> findByUserId(Long id) {
        return orderHistoryRepository.scripFindByUserId(id);
    }

    public OrderHistory save(OrderHistory orderHistory){
            return orderHistoryRepository.save(orderHistory);
    }

    public void deleteAll() {
        orderHistoryRepository.deleteAll();
    }
    public void deleteById(long id){
        orderHistoryRepository.deleteById(id);
    }

    public void addOrderHistory(OrderHistory[] orderHistory) {
        for (int i = 0; i < orderHistory.length; i++) {
            save(new OrderHistory(orderHistory[i].getDate(), orderHistory[i].getGood(), orderHistory[i].getUser(), orderHistory[i].getPrice(), orderHistory[i].getDiscount(), orderHistory[i].getAmount()));
        }
    }
}
