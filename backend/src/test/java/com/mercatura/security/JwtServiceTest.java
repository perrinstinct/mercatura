package com.mercatura.security;

import static org.junit.jupiter.api.Assertions.*;

import com.mercatura.auth.User;
import org.junit.jupiter.api.Test;

class JwtServiceTest {

  @Test
  void shouldGenerateAndValidateToken() {
    var svc = new JwtService();
    var user = User.builder().email("a@b.com").role(User.Role.USER).build();
    String token = svc.generateToken(user);
    assertNotNull(token);
    assertTrue(svc.isValid(token));
    assertEquals("a@b.com", svc.extractUsername(token));
  }
}
