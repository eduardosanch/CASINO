package com.casino;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.casino")
public class CasinoApplication {

    public static void main(String[] args) {
        SpringApplication.run(CasinoApplication.class, args);
    }
}
