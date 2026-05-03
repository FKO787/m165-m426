package ch.bztf.m165_m426;

import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import ch.bztf.m165_m426.entities.GlobalMessage;
import ch.bztf.m165_m426.entities.Users;
import ch.bztf.m165_m426.repositories.GlobalMessageRepository;
import ch.bztf.m165_m426.repositories.UsersRepository;

@Configuration
public class DatabaseInitializer {

    private final UsersRepository userRepo;
    private final GlobalMessageRepository messageRepo;

    public DatabaseInitializer(UsersRepository userRepo, GlobalMessageRepository messageRepo) {
        this.userRepo = userRepo;
        this.messageRepo = messageRepo;
    }

    @Bean
    CommandLineRunner initDatabase() {
        return runCommands -> addTestUsers();
    }

    private void addTestUsers() {
        LocalDateTime now = LocalDateTime.now();

        // Hash of the string "password"
        final String pwdHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";

        Users muster = userRepo.save(Users.create("Max Mustermann", "max.mustermann@example.org", pwdHash));
        messageRepo.save(GlobalMessage.createMessage(muster, now, "TestNachricht"));

        Users esteban = userRepo.save(Users.create("Esteban Venturello", "eve@bztf.ch", pwdHash));
        Users flavio = userRepo.save(Users.create("Flavio Köppel", "fko@bztf.ch", pwdHash));
        Users tobias = userRepo.save(Users.create("Tobias Nussbaumer", "tnu@bztf.ch", pwdHash));
        Users noah = userRepo.save(Users.create("Noah Bösch", "nbo@bztf.ch", pwdHash));

        GlobalMessage estebMessage = messageRepo.save(GlobalMessage.createMessage(esteban, now.plusSeconds(15), "Hallo!"));

        messageRepo.save(GlobalMessage.createMessage(flavio, now.plusSeconds(30), "Wilkommen"));
        messageRepo.save(GlobalMessage.createMessage(tobias, now.plusSeconds(45), "sup"));

        GlobalMessage noahReply = messageRepo.save(GlobalMessage.createReply(noah, now.plusSeconds(60), "Hallo, wie läufts?", estebMessage));
        messageRepo.save(GlobalMessage.createReply(esteban, now.plusSeconds(75), "Ganz okay", noahReply));

    }
}
