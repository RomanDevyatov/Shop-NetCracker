package com.netcracker.repository;

import com.netcracker.entity.Good;
import org.hibernate.annotations.SQLDeleteAll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface GoodRepository extends JpaRepository<Good, Long> {

    void deleteById(long id);

    @Query(value = "select * from good", nativeQuery = true)
    List<Good> scriptFindAll();

    Good findByName(String name);

    @Query(value = "select * from good where id=:id", nativeQuery = true)
    Good scriptFindById(Long id);
}
