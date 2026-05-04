package ch.bztf.m165_m426.api;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.web.bind.annotation.*;

import ch.bztf.m165_m426.entities.GlobalMessage;
import ch.bztf.m165_m426.entities.GlobalMessage.MessageApiObject;
import ch.bztf.m165_m426.repositories.GlobalMessageRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MessageApi {

    private final GlobalMessageRepository messageRepo;

    public MessageApi(GlobalMessageRepository messageRepo) {
        this.messageRepo = messageRepo;
    }

    @GetMapping("/messages")
    public List<MessageApiObject> getAllMessages() {
        return messageRepo.findAll()
                .stream()
                .map(message -> message.toMessageApiObject())
                .toList();
    }

    @GetMapping("/messages/{id}")
    public MessageApiObject getMessage(@PathVariable Long id) {
        return messageRepo.findById(id).orElseThrow()
                .toMessageApiObject();
    }

    @PostMapping("/messages")
    public GlobalMessage sendMessage(
            @RequestBody GlobalMessage message) {
        return messageRepo.save(message);
    }

    @PostMapping("/messages/{id}/reply")
    public GlobalMessage replyToMessage(@PathVariable Long id, @RequestBody GlobalMessage reply) {
        messageRepo.findById(id).orElseThrow();
        return messageRepo.save(reply);
    }

    @DeleteMapping("/messages/{id}")
    public void deleteMessage(@PathVariable Long id) {
        if (!messageRepo.existsById(id)) {
            throw new NoSuchElementException("Message with id " + id + " not found");
        }

        messageRepo.deleteById(id);
    }
}
