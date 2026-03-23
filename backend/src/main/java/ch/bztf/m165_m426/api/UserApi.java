package ch.bztf.m165_m426.api;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import ch.bztf.m165_m426.entities.Users;
import ch.bztf.m165_m426.repositories.UsersRepository;

@RestController
public class UserApi {

    private final UsersRepository userRepo;

    public UserApi(UsersRepository userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("/users")
    public List<Users> getAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/users/{id}")
    public Users getUser(@PathVariable Long id) {
        return userRepo.findById(id).orElseThrow();
    }

    // Simple authentication
    @PostMapping("/users/authenticate")
    public boolean authenticateUser(@RequestBody Users loginData) {
        String loginName = loginData.getName();
        String loginEmail = loginData.getEmail();

        if (userRepo.existsByNameAndEmail(loginName, loginEmail)) {
            String loginPassword = loginData.getPassword();
            String dbPassword = userRepo.findByNameAndEmail(loginName, loginEmail).getPassword();
            return loginPassword.equals(dbPassword);
        } else {
            return false;
        }
    }

    @PostMapping("/users")
    public void postUser(@RequestBody Users newUser) {
        userRepo.save(newUser);
    }

    @PutMapping("/users/{id}")
    public Users replaceUser(@PathVariable Long id, @RequestBody Users newUser) {
        Users savedUser = userRepo.findById(id).orElseThrow();

        if (!savedUser.equals(newUser)) {
            savedUser.setName(newUser.getName());
            savedUser.setEmail(newUser.getEmail());
            userRepo.save(savedUser);
        }
        return savedUser;
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepo.deleteById(id);
    }
}
