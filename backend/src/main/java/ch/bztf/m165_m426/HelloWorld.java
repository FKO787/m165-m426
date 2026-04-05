package ch.bztf.m165_m426;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class HelloWorld {

    @PostConstruct
    void Hello() {
        System.out.println("Hello World!");
    }
}
