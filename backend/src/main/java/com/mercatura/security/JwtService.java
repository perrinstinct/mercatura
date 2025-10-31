package com.mercatura.security;

import com.mercatura.auth.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

  // NOTE: pour dev; en prod => env var + rotation + durée courte
  private static final String SECRET = "change-me-in-env-very-long-secret-change-me-in-env";
  private static final long EXP_MS = 1000L * 60 * 60; // 1h

  private Key key() {
    return Keys.hmacShaKeyFor(SECRET.getBytes());
  }

  public String generateToken(User user) {
    return Jwts.builder()
        .setSubject(user.getEmail())
        .claim("role", user.getRole().name())
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + EXP_MS))
        .signWith(key(), SignatureAlgorithm.HS256)
        .compact();
  }

  public String extractUsername(String token) {
    return parse(token).getBody().getSubject();
  }

  public boolean isValid(String token) {
    try {
      parse(token);
      return true;
    } catch (JwtException e) {
      return false;
    }
  }

  private Jws<Claims> parse(String token) {
    return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token);
  }
}
