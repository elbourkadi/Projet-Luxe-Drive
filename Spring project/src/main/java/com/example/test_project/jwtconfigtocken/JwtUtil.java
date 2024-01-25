package com.example.test_project.jwtconfigtocken;


import com.example.test_project.entities.CustomUserDetails;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "adnanelhayanijwtadnanelhayanijwtadnanelhayanijwt"; // Clé secrète JWT



    public String generateToken(UserDetails userDetails) {
        CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", customUserDetails.getId()); // Ajouter l'ID de l'utilisateur
        claims.put("prenom", customUserDetails.getPrenom()); // Ajouter le prénom
        claims.put("nom", customUserDetails.getNom()); // Ajouter le nom
        claims.put("role", userDetails.getAuthorities().toString());

        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 heures d'expiration
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }


}


