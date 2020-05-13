package com.netcracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(schema = "public", name="discount")
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="percent")
    private double percent;

    @Column(name="description")
    private String description;

    @JsonIgnore
    @OneToMany(mappedBy = "discount", fetch = FetchType.EAGER, orphanRemoval = true)
    private List<Basket> baskets;
    public List<Basket> getBaskets(){
        return baskets;
    }
    public void setBaskets(List<Basket> baskets) { this.baskets = baskets; }

    @JsonIgnore
    @OneToMany(mappedBy = "discount", fetch = FetchType.EAGER, orphanRemoval = true)
    private List<OrderHistory> orderHistorys;
    public List<OrderHistory> getOrderHistorys(){
        return orderHistorys;
    }
    public void setOrderHistorys(List<OrderHistory> baskets) { this.orderHistorys = orderHistorys; }

    public Discount() {
    }

    public Discount(double percent, String description) {
        this.percent=percent;
        this.description=description;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setPercent(double percent) {
        this.percent = percent;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public double getPercent() {
        return percent;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return "Discount[" +
                "id=" + id +
                ", percent='" + percent + '\'' +
                ", description='" +description + '\'' +
                ']';
    }
}
