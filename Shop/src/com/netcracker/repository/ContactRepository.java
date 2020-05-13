package com.netcracker.repository;

import com.netcracker.entity.Basket;
import com.netcracker.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    @Query(value = "select * from contact", nativeQuery = true)
    List<Contact> scriptFindAll();

    @Query(value = "select user1, contact_type_value from  where user1=:id", nativeQuery = true)
    List<Contact> scriptFindByUserId(Long id);

    @Query(value = "select * from contact where user1=:uId and contact_type=:tId", nativeQuery = true)
    Contact scripFindByUserIdAndTypeId(Long uId, Long tId);

    @Transactional
    @Modifying
    @Query(value = "delete from contact where contact_type=:id", nativeQuery = true)
    void scriptDeleteTypeId(Long id);
}
