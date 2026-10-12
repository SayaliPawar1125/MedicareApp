package com.itvedant.MedicareApp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        System.out.println(
                "========== MY SECURITY CONFIG IS LOADED =========="
        );

        http
                .csrf(AbstractHttpConfigurer::disable)

                .cors(cors -> {})

                .formLogin(AbstractHttpConfigurer::disable)

                .httpBasic(AbstractHttpConfigurer::disable)

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        // Allow CORS preflight requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**")
                        .permitAll()

                  
                        // Public authentication APIs
                        .requestMatchers(
                                "/api/auth/register",
                                "/api/auth/login"
                        ).permitAll()

                        // Admin dashboard and all admin APIs
                        .requestMatchers("/api/admin/**")
                        .hasRole("ADMIN")

                        // Orders: only ADMIN can view all orders
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/orders/getAllOrders"
                        ).hasRole("ADMIN")

                        // Individual order access
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/orders/getOrder/**"
                        ).hasAnyRole("USER", "ADMIN")

                        // Order cancellation
                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/orders/cancelorder/**"
                        ).hasAnyRole("USER", "ADMIN")

                        // Placing orders
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/orders/placeorder"
                        ).hasAnyRole("USER", "ADMIN")

                        // User APIs
                        .requestMatchers("/api/user/**")
                        .hasAnyRole("USER", "ADMIN")

                        // Cart APIs
                        .requestMatchers("/api/cart/**")
                        .hasAnyRole("USER", "ADMIN")

                        // Public doctor browsing
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/doctor/**"
                        ).permitAll()

                        // Doctor management: ADMIN only
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/doctor/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/doctor/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/doctor/**"
                        ).hasRole("ADMIN")

                        // Appointment status changes: ADMIN only
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/appointment/status/**"
                        ).hasRole("ADMIN")

                        // Other appointment APIs
                        .requestMatchers("/api/appointment/**")
                        .hasAnyRole("USER", "ADMIN")

                        // Everything else requires authentication
                        .anyRequest().authenticated()
                )
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}