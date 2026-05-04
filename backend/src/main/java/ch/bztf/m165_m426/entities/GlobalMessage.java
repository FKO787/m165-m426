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

    public static GlobalMessage create(Users createdBy, LocalDateTime createdAt, String message, GlobalMessage parentMessage) {
        return new GlobalMessage(createdBy, createdAt, message, parentMessage);
    }

    public static GlobalMessage createMessage(Users createdBy, String message) {
        return create(createdBy, LocalDateTime.now(), message, null);
    }

    public static GlobalMessage createReply(Users createdBy, String message, GlobalMessage parentMessage) {
        return create(createdBy, LocalDateTime.now(), message, parentMessage);
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

    // DTO for API, so that the JSON does not include the entire User object and parent messages
    public record MessageApiObject(
            Long id,
            Long createdById, String createdByName,
            LocalDateTime createdAt, String message, boolean isDeleted,
            Long parentMessageId) {
    }

    public MessageApiObject toMessageApiObject() {
        return new MessageApiObject(
                id,
                createdBy.getId(), createdBy.getName(),
                createdAt, message, isDeleted,
                parentMessage != null ? parentMessage.getId() : null);
    }

    public record CreateMessageRequest(Long createdById, String message) {
    }

    public record CreateReplyRequest(Long createdById, String message, Long parentMessageId) {
    }
}
