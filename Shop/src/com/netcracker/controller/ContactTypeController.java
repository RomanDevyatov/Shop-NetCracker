package com.netcracker.controller;

import com.netcracker.entity.Basket;
import com.netcracker.entity.Contact;
import com.netcracker.entity.ContactType;
import com.netcracker.entity.Good;
import com.netcracker.service.ContactService;
import com.netcracker.service.ContactTypeService;
import com.netcracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class ContactTypeController {

    @Autowired
    ContactTypeService contactTypeService;

    @Autowired
    ContactService contactService;

    @Autowired
    UserService userService;

    @GetMapping("/contacts/type")
    ResponseEntity<List<ContactType>> getAllBaskets(){
        return new ResponseEntity<>(contactTypeService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/contacts/type/create")
    public void createContactType(@RequestBody ContactType contactType) {
        ContactType contactType1=contactTypeService.createContactType(contactType);
        contactService.createContact(userService.scriptFindAll(), contactType1);//
    }

    @DeleteMapping("/contacts/type/{id}")
    ResponseEntity<String> deleteContactType(@PathVariable("id") long id){
        contactService.scriptDeleteTypeId(id);
        return contactTypeService.scriptDeleteById(id);
    }
}
