package ch.bztf.m165_m426.api;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.web.bind.annotation.*;

import ch.bztf.m165_m426.entities.GlobalMessage;
import ch.bztf.m165_m426.entities.GlobalMessage.CreateMessageRequest;
import ch.bztf.m165_m426.entities.GlobalMessage.CreateReplyRequest;
import ch.bztf.m165_m426.entities.GlobalMessage.MessageApiObject;
import ch.bztf.m165_m426.entities.Users;
import ch.bztf.m165_m426.repositories.GlobalMessageRepository;
import ch.bztf.m165_m426.repositories.UsersRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MessageApi {

    private final GlobalMessageRepository messageRepo;
    private final UsersRepository userRepo;

    public MessageApi(GlobalMessageRepository messageRepo, UsersRepository userRepo) {
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
    }

    @GetMapping("/messages")
    public List<MessageApiObject> getAllMessages() {
        return messageRepo.findAll().stream()
                .map(message -> message.toMessageApiObject())
                .toList();
    }

    @GetMapping("/messages/{id}")
    public MessageApiObject getMessage(@PathVariable Long id) {
        return messageRepo.findById(id).orElseThrow()
                .toMessageApiObject();
    }

    @GetMapping("/messages/{id}/replies")
    public List<MessageApiObject> getMessageReplies(@PathVariable Long id) {
        return messageRepo.getReplyTree(id);
    }

    @PostMapping("/messages")
    public MessageApiObject sendMessage(@RequestBody CreateMessageRequest message) {
        // getReferenceById skips the inmediate repository call
        Users user = userRepo.getReferenceById(message.createdById());

        return messageRepo.save(
                GlobalMessage.createMessage(user, message.message()))
                .toMessageApiObject();
    }

    @PostMapping("/messages/{id}/replies")
    public MessageApiObject replyToMessage(@RequestBody CreateReplyRequest reply) {
        Users user = userRepo.getReferenceById(reply.createdById());
        GlobalMessage parentMessage = messageRepo.getReferenceById(reply.parentMessageId());

        return messageRepo.save(
                GlobalMessage.createReply(user, reply.message(), parentMessage))
                .toMessageApiObject();
    }

    @DeleteMapping("/messages/{id}")
    public void deleteMessage(@PathVariable Long id) {
        if (!messageRepo.existsById(id)) {
            throw new NoSuchElementException("Message with id " + id + " not found");
        }

        messageRepo.deleteById(id);
    }
}
