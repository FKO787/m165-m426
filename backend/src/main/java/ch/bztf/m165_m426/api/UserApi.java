package ch.bztf.m165_m426.api;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import ch.bztf.m165_m426.entities.Users;
import ch.bztf.m165_m426.entities.Users.UsersObject;
import ch.bztf.m165_m426.repositories.UsersRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
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
    public boolean authenticateUser(@RequestBody UsersObject loginData) {
        Users dbUser = userRepo.findByEmail(loginData.email());

        if (dbUser != null) {
            return loginData.password().equals(dbUser.getPassword());
        }

        return false;
    }

    @PostMapping("/users/register")
    public boolean registerUser(@RequestBody UsersObject loginData) {

        if (!userRepo.existsByEmail(loginData.email())) {
            userRepo.save(Users.create(loginData));
            return true;
        }

        return false;
    }

    @PutMapping("/users/{id}")
    public Users replaceUser(@PathVariable Long id, @RequestBody UsersObject updatedUser) {
        Users storedUser = userRepo.findById(id).orElseThrow();

        boolean nameChange = !storedUser.getName().equals(updatedUser.name());
        boolean emailChange = !storedUser.getEmail().equals(updatedUser.email());
        boolean passwordChange = !storedUser.getPassword().equals(updatedUser.password());

        if (nameChange) {
            storedUser.setName(updatedUser.name());
        }
        if (emailChange) {
            storedUser.setEmail(updatedUser.email());
        }
        if (passwordChange) {
            storedUser.setPassword(updatedUser.password());
        }

        return userRepo.save(storedUser);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepo.deleteById(id);
    }
}
