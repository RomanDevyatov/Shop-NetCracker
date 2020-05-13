package com.netcracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(schema = "public", name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "good")
    private Good good;
    public Good getGood() { return good;}
    public void setGood(Good good) {
        this.good = good;
    }

    @Column(name="date")
    private String date;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user1")
    private User user;
    public User getUser() { return user;}
    public void setUser(User user) {
        this.user = user;
    }

    @Column(name="text")
    private String text;

    public  Feedback(){}

    public Feedback(Good good, String date, User user, String text) {
        this.good = good;
        this.date = date;
        this.user = user;
        this.text = text;
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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return "Feedback{" +
                "id=" + id +
                ", good=" + good +
                ", date=" + date +
                ", user=" + user +
                ", text='" + text + '\'' +
                '}';
    }
}
