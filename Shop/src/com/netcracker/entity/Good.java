package com.netcracker.entity;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(schema = "public", name = "good")
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Good {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="name")
    private String name;

    @Column(name="brand")
    private String brand;

    @Column(name="amount")
    private long amount;

    @Column(name="category_name")
    private String categoryName;
    public String getCategoryName() { return categoryName;}
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    @Column(name="size")
    private String size;
    public String getSize() { return size;}
    public void setSize(String size) {
        this.size = size;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "good", fetch = FetchType.EAGER, orphanRemoval=true)
    private List<Feedback> feedbacks;
    public List<Feedback> getFeedbacks(){
        return feedbacks;
    }
    public void setFeedbacks(List<Feedback> feedbacks) { this.feedbacks = feedbacks; }

    @Column(name="price")
    private Long price;

    @JsonIgnore
    @OneToMany(mappedBy = "good", fetch = FetchType.EAGER, orphanRemoval=true)
    private List<Basket> baskets;
    public List<Basket> getBaskets(){ return baskets; }
    public void setBaskets(List<Basket> baskets) { this.baskets = baskets; }

    @JsonIgnore
    @OneToMany(mappedBy = "good",  fetch = FetchType.EAGER, orphanRemoval=true)
    private List<OrderHistory> orderHistorys;
    public List<OrderHistory> getOrderHistorys(){
        return orderHistorys;
    }
    public void setOrderHistorys(List<OrderHistory> baskets) { this.orderHistorys = orderHistorys; }

    @Column(name="img_path")
    private String imgPath;

    public Good(String name,
                String brand,
                long amount,
                String categoryName,
                String size,
                long price,
                String imgPath) {
        this.name = name;
        this.brand = brand;
        this.amount = amount;
        this.categoryName = categoryName;
        this.size = size;
        this.price = price;
        this.imgPath=imgPath;
    }

    public Good() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public  String getImgPath(){
        return imgPath;
    }

    public void setImgPath(String imgPath){
        this.imgPath=imgPath;
    }

    @Override
    public String toString() {
        return "Good[" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", brand='" + brand + '\'' +
                ", amount='" + amount + '\'' +
                ", categoryName='" + categoryName + '\'' +
                ", size='" + size + '\'' +
                ", price='" + price + '\'' +
                ", img='"+ imgPath+ '\'' +
                ']';
    }
}
