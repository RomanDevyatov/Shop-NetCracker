package com.netcracker.controller;

import com.netcracker.entity.Basket;
import com.netcracker.entity.Contact;
import com.netcracker.entity.ContactType;
import com.netcracker.entity.User;
import com.netcracker.service.ContactService;
import com.netcracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @Autowired
    private UserService userService;

    @GetMapping("/contacts")
    ResponseEntity<List<Contact>> getAllContacts(){
        return new ResponseEntity<>(contactService.scriptFindAll(), HttpStatus.OK);
    }

    @PutMapping("/contacts/{id}")
    public ResponseEntity<List<Contact>> updateContact(@PathVariable("id") Long id, @RequestBody List<Contact> contacts){
        return new ResponseEntity<>( contactService.updateContacts(id, contacts), HttpStatus.OK);
    }

    @GetMapping("/contacts/{id}")
    ResponseEntity<List<Contact>> getContactListForCurrentUser(@PathVariable("id") Long id){
        return new ResponseEntity<>( contactService.findByUserId(id), HttpStatus.OK);
    }

    @PostMapping("/contacts/create")
    public void createContact(@RequestBody ContactType contactType) {
        contactService.createContact(userService.findAll(), contactType);
    }

    @DeleteMapping("/contacts/{id}")
    ResponseEntity<String> deleteContact(@PathVariable("id") long id){
        contactService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
