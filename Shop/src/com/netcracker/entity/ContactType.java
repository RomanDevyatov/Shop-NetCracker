package com.netcracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.netcracker.models.ERole;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.ScriptAssert;

import javax.persistence.*;
import java.util.List;

@Entity
@ToString
@Table(schema = "public", name = "contact_type")
public class ContactType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name",length = 20)
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "contactType", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<Contact> contacts;
    public List<Contact> getContacts(){
        return contacts;
    }
    public void setContacts(List<Contact> contacts) { this.contacts = contacts; }

    public ContactType() {
    }

    public ContactType(String name) {
        this.name=name;
    }

    public String getName() {
        return name;
    }
}
