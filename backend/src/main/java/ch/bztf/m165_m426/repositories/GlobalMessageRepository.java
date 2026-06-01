package ch.bztf.m165_m426.repositories;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.bztf.m165_m426.entities.GlobalMessage;
import ch.bztf.m165_m426.entities.GlobalMessage.MessageApiObject;

public interface GlobalMessageRepository extends JpaRepository<GlobalMessage, Long> {

    List<GlobalMessage> findByParentMessageId(Long parentMessageId);

    default List<MessageApiObject> getReplyTree(Long id) {
        List<MessageApiObject> replyTree = new ArrayList<>();

        for (GlobalMessage reply : findByParentMessageId(id)) {
            replyTree.add(reply.toMessageApiObject()); // Add current reply
            replyTree.addAll(getReplyTree(reply.getId())); // Add all sub-replies of the current reply
        }

        return replyTree;
    }
}
