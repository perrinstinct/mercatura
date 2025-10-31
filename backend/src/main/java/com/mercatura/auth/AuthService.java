package com.mercatura.auth;

import com.mercatura.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository userRepository;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;
  private final BCryptPasswordEncoder passwordEncoder;

  public AuthResponse register(RegisterRequest request) {
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new IllegalArgumentException("Email already exists");
    }
    var user =
        User.builder()
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(User.Role.USER)
            .build();
    userRepository.save(user);
    String token = jwtService.generateToken(user);
    return new AuthResponse(token, user.getId(), user.getEmail(), user.getRole().name());
  }

  public AuthResponse login(LoginRequest request) {
    // 1) vérifier les creds via AuthenticationManager
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    // 2) charger l’utilisateur et générer un JWT
    var user =
        userRepository
            .findByEmail(request.getEmail())
            .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
    String token = jwtService.generateToken(user);
    return new AuthResponse(token, user.getId(), user.getEmail(), user.getRole().name());
  }
}
