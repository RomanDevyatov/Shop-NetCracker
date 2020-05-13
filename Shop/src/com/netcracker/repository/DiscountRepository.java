package com.netcracker.repository;

import com.netcracker.entity.Discount;
import com.netcracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {

    @Query(value = "select id, percent, description from discount", nativeQuery = true)
    List<Discount> scriptFindAll();

    @Query(value = "select id, percent, description from discount d where d.id = :id", nativeQuery = true)
    Discount scriptFindById(@Param("id") long id);

    @Query(value = "select id, percent, description from discount d where d.description = :status", nativeQuery = true)
    Discount scriptFindByStatus(String status);
}
