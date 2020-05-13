package com.netcracker.service;

import com.netcracker.entity.Contact;
import com.netcracker.entity.ContactType;
import com.netcracker.entity.User;
import com.netcracker.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public List<Contact> findAll() {
        return contactRepository.findAll();
    }


    public Contact findById(long id){
        Optional<Contact> optional = contactRepository.findById(id);
        return optional.orElse(new Contact());
    }

    public Optional<List<Contact>> scripFindByUserId(long id){
        Optional<List<Contact>> optional= Optional.ofNullable(contactRepository.scriptFindByUserId(id));
        return optional;
    }

    public Optional<Contact> scripFindByUserIdAndTypeId(long userId, long typeId){
        Optional<Contact> optional = Optional.ofNullable(contactRepository.scripFindByUserIdAndTypeId(userId, typeId));
        return optional;
    }

    public Contact save(Contact contact){
        return contactRepository.save(contact);
    }

    public ResponseEntity<String> deleteById(long id) {
        contactRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public void createContact(List<User> users, ContactType contactType){
        for( User u : users){
            save(new Contact(u, contactType, ""));
        }
    }

    public void createContactAfterRegUser(User user, List<ContactType> contactTypes){
        for(ContactType ct: contactTypes) {
            save(new Contact(user, ct, ""));
        }
    }

    public ResponseEntity<Contact> updateContact(Long id, Contact contact) {
        Optional<Contact> contactData = scripFindByUserIdAndTypeId(id, contact.getContactType().getId());

        if (contactData.isPresent()){
            Contact newContact= (Contact) contactData.get();
            newContact.setUser(contact.getUser());
            newContact.setContactType(contact.getContactType());
            newContact.setValue(contact.getValue());
            return new ResponseEntity<Contact>(save(newContact), HttpStatus.OK);
        } else return  new ResponseEntity<Contact>(HttpStatus.NOT_FOUND);
    }

    public List<Contact> updateContacts(Long id, List<Contact> contacts){
        for( Contact c: contacts) {
            updateContact(id, c);
        }

        return contacts;
    }

    public List<Contact> scriptFindAll() {
        return contactRepository.scriptFindAll();
    }

    public void scriptDeleteTypeId(long id) {
        contactRepository.scriptDeleteTypeId(id);
    }

    public List<Contact> findByUserId(Long id) {
        return contactRepository.scriptFindByUserId(id);
    }
}
