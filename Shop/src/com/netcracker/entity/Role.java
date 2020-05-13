package com.netcracker.entity;

import com.netcracker.models.ERole;
import com.netcracker.models.ERole.*;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(schema = "public", name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name="name",length = 20)
    private ERole name;

    @ManyToMany(mappedBy = "roles", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<User> users;

    public Role() {
    }

    public Role(ERole name) {
        this.name=name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Role[" +
                "id=" + id +
                ", name='" + name + '\'' +
                ']';
    }
}
