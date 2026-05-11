package ch.bztf.m165_m426.api;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import ch.bztf.m165_m426.entities.Users;
import ch.bztf.m165_m426.entities.Users.LoginRequest;
import ch.bztf.m165_m426.entities.Users.UserData;
import ch.bztf.m165_m426.entities.Users.UsersObject;
import ch.bztf.m165_m426.repositories.UsersRepository;
import ch.bztf.m165_m426.services.JwtService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserApi {

    private final UsersRepository userRepo;
    private final JwtService jwtService;

    public UserApi(UsersRepository userRepo, JwtService jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }

    @GetMapping("/users")
    public List<Users> getAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/users/{id}")
    public Users getUser(@PathVariable Long id) {
        return userRepo.findById(id).orElseThrow();
    }

    @PostMapping("/users/authenticate")
    public AuthResponse authenticateUser(@RequestBody LoginRequest loginData) {
        Users dbUser = userRepo.findByEmail(loginData.email());

        if (dbUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        if (!loginData.password().equals(dbUser.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        return new AuthResponse(jwtService.generateToken(dbUser.getEmail()));
    }

    @PostMapping("/users/register")
    public boolean registerUser(@RequestBody UsersObject loginData) {

        if (userRepo.existsByEmail(loginData.email())) {
            return false;
        }

        userRepo.save(Users.create(loginData));
        return true;
    }

    @GetMapping("/users/me")
    public UserData getCurrentUser(Principal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing authentication");
        }

        String email = principal.getName();
        Users user = userRepo.findByEmail(email);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");
        }

        return new UserData(user.getId(), user.getName(), user.getEmail());
    }

    // Remove/Separate into individual actions?

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

    public record AuthResponse(String token) {
    }
}
