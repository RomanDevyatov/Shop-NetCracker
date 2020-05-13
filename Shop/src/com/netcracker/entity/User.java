package com.netcracker.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.netcracker.models.CategoryNameEnum;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.time.LocalDate;
import java.util.Set;


@Entity
@Table(schema = "public", name = "user",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "user_name"),
                @UniqueConstraint(columnNames = "email")
        })
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    @Size(max = 20)
    @Column(name="user_name")
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    @Column(name="email", nullable = false)
    private String email;

    @Size(max = 120)
    @Column(name="password")
    private String password;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="birth_date")
    private LocalDate birthDate;

    @Column(name="category_name")
    private String categoryName;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="discount")
    private Discount discount;
    public Discount getDiscount() {
        return discount;
    }
    public void setDiscount(Discount discount) {
        this.discount = discount;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "user",  fetch = FetchType.EAGER, orphanRemoval = true)
    private List<Feedback> feedbacks;
    public List<Feedback> getFeedbacks(){
        return feedbacks;
    }
    public void setFeedbacks(List<Feedback> feedbacks) { this.feedbacks = feedbacks; }

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, orphanRemoval = true)
    private List<Basket> baskets;
    public List<Basket> getBaskets(){
        return baskets;
    }
    public void setBaskets(List<Basket> baskets) { this.baskets = baskets; }

    @JsonIgnore
    @OneToMany(mappedBy = "user",  fetch = FetchType.EAGER, orphanRemoval = true)
    private List<OrderHistory> orderHistorys;
    public List<OrderHistory> getOrderHistorys(){
        return orderHistorys;
    }
    public void setOrderHistorys(List<OrderHistory> baskets) { this.orderHistorys = orderHistorys; }

    @JsonIgnore
    @OneToMany(mappedBy = "user",  fetch = FetchType.EAGER, orphanRemoval = true)
    private List<Contact> contacts;
    public List<Contact> getContacts(){
        return contacts;
    }
    public void setContacts(List<Contact> contacts) { this.contacts = contacts; }

    @ManyToMany( fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable( name = "user_roles",
                joinColumns = @JoinColumn(name = "user_id"),
                inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles=new HashSet<>();

    public User() {
    }

    public User(String username, String email, String password, String firstName, String lastName, LocalDate birthDate, String categoryName, Discount discount) {
        this.username=username;
        this.email=email;
        this.password=password;
        this.firstName=firstName;
        this.lastName=lastName;
        this.birthDate=birthDate;
        this.categoryName=categoryName;
        this.discount=discount;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername(){
        return this.username;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public String getCategoryName() {
        return categoryName;
    }

    @Override
    public String toString() {
        return "User[" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", birthDate='" + birthDate + '\'' +
                ", categoryName='" + categoryName + '\'' +
                ", discount='" + discount + '\'' +
                ']';
    }
}