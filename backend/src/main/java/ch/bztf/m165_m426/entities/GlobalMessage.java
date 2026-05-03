package ch.bztf.m165_m426.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.Immutable;

import jakarta.persistence.*;

@Entity
public class GlobalMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    // ManyToOne is FK to Users
    @Immutable
    @ManyToOne(optional = false)
    private Users createdBy;

    @Immutable
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Immutable
    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private boolean isDeleted;

    @Immutable
    @ManyToOne(optional = true)
    private GlobalMessage parentMessage;

    protected GlobalMessage() {
    }

    private GlobalMessage(Users createdBy, LocalDateTime createdAt, String message, GlobalMessage parentMessage) {
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.message = message;
        this.isDeleted = false;
        this.parentMessage = parentMessage;
    }

    public static GlobalMessage createMessage(Users createdBy, LocalDateTime createdAt, String message) {
        return new GlobalMessage(createdBy, createdAt, message, null);
    }

    public static GlobalMessage createReply(Users createdBy, LocalDateTime createdAt, String message, GlobalMessage parentMessage) {
        return new GlobalMessage(createdBy, createdAt, message, parentMessage);
    }

    public Long getId() {
        return id;
    }

    public Users getCreatedBy() {
        return createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getMessage() {
        return message;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void deleteMessage() {
        this.isDeleted = true;
    }

    public GlobalMessage getParentMessage() {
        return parentMessage;
    }
}
