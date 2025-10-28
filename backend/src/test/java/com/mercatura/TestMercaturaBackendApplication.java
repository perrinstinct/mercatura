package com.mercatura;

import org.springframework.boot.SpringApplication;

public class TestMercaturaBackendApplication {

  public static void main(String[] args) {
    SpringApplication.from(MercaturaBackendApplication::main)
        .with(TestcontainersConfiguration.class)
        .run(args);
  }
}
