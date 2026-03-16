package ch.bztf.m165_m426;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class HelloWorld {

    @Bean
    void Hello() {
        System.out.println("Hello World!");
    }
}
