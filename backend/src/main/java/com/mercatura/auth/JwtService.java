package com.mercatura.auth;

import org.springframework.stereotype.Service;

@Service
public class JwtService {
  public String generateToken(User user) {
    // TODO: real implementation in US02
    return "fake-jwt-for-" + user.getEmail();
  }
}
