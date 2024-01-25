package com.example.test_project.entities;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigInteger;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class CustomUserDetails extends org.springframework.security.core.userdetails.User {
    private final String nom;
    private final String prenom;
    private final String image;
    private final String id;
    private boolean validated;


    public CustomUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities, String nom, String prenom, String image, String id, boolean validated) {
        super(username, password, authorities);
        this.nom = nom;
        this.prenom = prenom;
        this.image = image;
        this.id = id;
        this.validated = validated;
    }



    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public String getImage() {
        return image;
    }

    public String getId() {
        return  id ;
    }
    public boolean isValidated() {
        return validated;
    }


}
