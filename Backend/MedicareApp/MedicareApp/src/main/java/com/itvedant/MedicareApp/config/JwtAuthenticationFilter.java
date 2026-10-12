package com.itvedant.MedicareApp.config;

import com.itvedant.MedicareApp.entities.User;
import com.itvedant.MedicareApp.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String SECRET_KEY =
            "MedicareAppSecretKeyForJwtAuthentication123456";

    private final SecretKey key =
            Keys.hmacShaKeyFor(
                    SECRET_KEY.getBytes(StandardCharsets.UTF_8)
            );

    private final UserRepository userRepository;

    public JwtAuthenticationFilter(
            UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println(
                "========== JWT FILTER =========="
        );

        System.out.println(
                "REQUEST URL: " + request.getRequestURI()
        );

        String authHeader =
                request.getHeader("Authorization");

        System.out.println(
                "AUTH HEADER EXISTS: "
                        + (authHeader != null)
        );

        // No token
        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            System.out.println(
                    "NO BEARER TOKEN"
            );

            filterChain.doFilter(request, response);
            return;
        }

        String token =
                authHeader.substring(7);

        try {

            System.out.println(
                    "JWT TOKEN RECEIVED"
            );

            Claims claims =
                    Jwts.parser()
                            .verifyWith(key)
                            .build()
                            .parseSignedClaims(token)
                            .getPayload();

            String email =
                    claims.getSubject();

            String role =
                    claims.get("role", String.class);

            System.out.println(
                    "JWT EMAIL: " + email
            );

            System.out.println(
                    "JWT ROLE: " + role
            );

            if (email == null || role == null) {

                System.out.println(
                        "EMAIL OR ROLE IS NULL"
                );

                filterChain.doFilter(request, response);
                return;
            }

            User user =
                    userRepository
                            .findByEmailIgnoreCase(email)
                            .orElse(null);

            if (user == null) {

                System.out.println(
                        "USER NOT FOUND IN DATABASE"
                );

                filterChain.doFilter(request, response);
                return;
            }

            System.out.println(
                    "USER FOUND: "
                            + user.getEmail()
            );

            String authorityName =
                    "ROLE_" + role;

            System.out.println(
                    "AUTHORITY: "
                            + authorityName
            );

            SimpleGrantedAuthority authority =
                    new SimpleGrantedAuthority(
                            authorityName
                    );

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            user,
                            null,
                            Collections.singletonList(authority)
                    );

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);

            System.out.println(
                    "AUTHENTICATION SET SUCCESSFULLY"
            );

        } catch (Exception e) {

            System.out.println(
                    "========== JWT ERROR =========="
            );

            System.out.println(
                    "JWT ERROR: "
                            + e.getMessage()
            );

            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }
}