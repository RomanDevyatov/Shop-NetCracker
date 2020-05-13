package com.netcracker.repository;

import com.netcracker.entity.Basket;
import com.netcracker.entity.OrderHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Long> {

    @Query(value = "DELETE FROM public.order_history", nativeQuery = true)
    void scriptDeleteAll();

    @Query(value = "select * from order_history where user1=:id", nativeQuery = true)
    List<OrderHistory> scripFindByUserId(Long id);

    @Query(value = "select * from order_history where user1=:id", nativeQuery = true)
    List<OrderHistory> findAllByUserId(Long id);
}
