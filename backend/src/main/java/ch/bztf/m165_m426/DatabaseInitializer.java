package ch.bztf.m165_m426;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import ch.bztf.m165_m426.entities.Users;
import ch.bztf.m165_m426.repositories.UsersRepository;

@Configuration
public class DatabaseInitializer {

    private final UsersRepository userRepo;

    public DatabaseInitializer(UsersRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Bean
    CommandLineRunner initDatabase() {
        return runCommand -> addTestUsers();
    }

    private void addTestUsers() {
        // SHA256 of the string "password"
        final String passwordHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";

        userRepo.save(Users.create("Max Mustermann", "max.mustermann@example.org", passwordHash));

        userRepo.save(Users.create("Esteban Venturello", "eve@bztf.ch", passwordHash));
        userRepo.save(Users.create("Flavio Köppel", "fko@bztf.ch", passwordHash));
        userRepo.save(Users.create("Tobias Nussbaumer", "tnu@bztf.ch", passwordHash));
        userRepo.save(Users.create("Noah Bösch", "nbo@bztf.ch", passwordHash));
    }
}
