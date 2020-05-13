package com.netcracker.repository;

import com.netcracker.entity.ContactType;
import com.netcracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ContactTypeRepository extends JpaRepository<ContactType, Long> {

    @Transactional
    @Modifying
    @Query(value = "delete from contact_type where id=:id", nativeQuery = true)
    void scriptDeleteById(Long id);



    @Query(value = "SELECT * FROM public.contact_type", nativeQuery = true)
    List<ContactType> scriptFindAll();
}
