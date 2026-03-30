package ch.bztf.m165_m426;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        Thread.currentThread().setName("main"); // Replace verbose "restartedMain" thread name
        SpringApplication.run(Application.class, args);
    }
}
