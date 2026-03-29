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
        userRepo.save(Users.create("Max Mustermann", "max.mustermann@example.org", "password"));

        userRepo.save(Users.create("Esteban Venturello", "eve@bztf.ch", "password"));
        userRepo.save(Users.create("Flavio Köppel", "fko@bztf.ch", "password"));
        userRepo.save(Users.create("Tobias Nussbaumer", "tnu@bztf.ch", "password"));
        userRepo.save(Users.create("Noah Bösch", "nbo@bztf.ch", "password"));
    }
}
