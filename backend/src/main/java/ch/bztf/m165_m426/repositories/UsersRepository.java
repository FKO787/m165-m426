package ch.bztf.m165_m426.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.bztf.m165_m426.entities.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
}
