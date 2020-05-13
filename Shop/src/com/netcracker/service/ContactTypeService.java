package com.netcracker.service;

import com.netcracker.entity.Basket;
import com.netcracker.entity.ContactType;
import com.netcracker.repository.ContactTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactTypeService {

    @Autowired
    private ContactTypeRepository contactTypeRepository;


    public List<ContactType> findAll() {
        return contactTypeRepository.findAll();
    }

    public List<ContactType> scriptFindAll(){
        return contactTypeRepository.scriptFindAll();
    }

    public ContactType save(ContactType contactType){
        return contactTypeRepository.save(contactType);
    }

    public ResponseEntity<String> deleteById(long id) {
        contactTypeRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ContactType createContactType(ContactType contactType) {
        return save(new ContactType(contactType.getName()));
    }

    public ResponseEntity<String> scriptDeleteById(long id) {
        contactTypeRepository.scriptDeleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public void deleteAll() {
        contactTypeRepository.deleteAll();
    }
}
