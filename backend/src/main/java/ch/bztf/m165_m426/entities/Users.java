package ch.bztf.m165_m426.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String email;

    private String password;

    protected Users() {
        // Hibernate requires Entities to have an empty constructor. Its protected so the IDE stops whining.
    }

    private Users(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public static Users create(String name, String email, String password) {
        return new Users(name, email, password);
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
