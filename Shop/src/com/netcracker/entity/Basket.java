package com.netcracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@ToString
@Table(schema = "public", name = "basket")
public class Basket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "good", nullable = false)
    private Good good;
    public Good getGood() { return good;}
    public void setGood(Good good) {
        this.good = good;
    }

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="user1", nullable = false)
    private User user;
    public User getUser() { return user;}
    public void setUser(User user) {
        this.user = user;
    }

    @Column(name="amount")
    @Getter @Setter private long amount;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="discount")
    private Discount discount;
    public Discount getDiscount() {
        return discount;
    }
    public void setDiscount(Discount discount) {
        this.discount = discount;
    }

    public Basket() {
    }

    public Basket(User user, Good good, long amount, Discount discount) {
        this.user=user;
        this.good=good;
        this.amount=amount;
        this.discount=discount;
    }

    public long getAmount() {
        return this.amount;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }
}
