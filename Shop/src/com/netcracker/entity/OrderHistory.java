package com.netcracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(schema = "public", name = "order_history")
public class OrderHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="date")
    private String  date;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "good")
    private Good good;
    public Good getGood(){
        return good;
    }
    public void setGood(Good good){
        this.good=good;
    }

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="user1")
    private User user;
    public User getUser() { return user;}
    public void setUser(User user) {
        this.user = user;
    }

    @Column(name = "price")
    private long price;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name="discount")
    private Discount discount;

    @Column(name="amount")
    private Long amount;

    public OrderHistory(String date, Good good, User user, long price, Discount discount, long amount) {
           this.date=date;
           this.good=good;
           this.user=user;
           this.price=price;
           this.discount=discount;
           this.amount=amount;
    }

    public OrderHistory() {}

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public Discount getDiscount() {
        return discount;
    }

    public void setDiscount(Discount discount) {
        this.discount = discount;
    }

    @Override
    public String toString() {
        return "OrderHistory[" +
                "id=" + id +
                ", date=" + date +
                ", goodId=" + good.getId() +
                ", userId=" + user.getId() +
                ", price=" + good.getPrice() +
                ", discountId=" + discount.getId() +
                ']';
    }
}
