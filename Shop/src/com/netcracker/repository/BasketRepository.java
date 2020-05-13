package com.netcracker.repository;

import com.netcracker.entity.Basket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Long> {

    @Query(value = "select * from basket", nativeQuery = true)
    List<Basket> scriptFindAll();

    void deleteById(long id);

    @Query(value = "select * from basket where name=:username", nativeQuery = true)
    Basket scripFindByUsername(String username);

    @Query(value = "select * from basket where user1=:id", nativeQuery = true)
    List<Basket> scripFindByUserId(Long id);

    @Query(value = "delete from basket where good=:id", nativeQuery = true)
    void deleteByGoodId(Long id);

    @Transactional
    @Modifying
    @Query(value = "delete from basket where user1=:id", nativeQuery = true)
    void scriptDeleteByUserId(Long id);
}
