package com.example.test_project.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigInteger;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class AgenceResponseDTO {
//    @JsonProperty("id")
    private String id;
    private String nom_agence;
    private String adresse;
    private String telephone_agence;
    private String email_agence;
    @JsonProperty("localisation")
    private Localisation localisation;

    private String manager;


    // getters and setters

    public AgenceResponseDTO(String id, String nom_agence, String adresse, String telephone_agence, String email_agence,
                             Localisation localisation, String manager) {
        this.id = id;
        this.nom_agence = nom_agence;
        this.adresse = adresse;
        this.telephone_agence = telephone_agence;
        this.email_agence = email_agence;
        this.localisation = localisation;
        this.manager=manager;
    }

    public String getManager() {
        return manager;
    }

    public String getId() {
        return id;
    }

    public String getNom_agence() {
        return nom_agence;
    }

    public String getAdresse() {
        return adresse;
    }

    public String getTelephone_agence() {
        return telephone_agence;
    }

    public String getEmail_agence() {
        return email_agence;
    }

    public Localisation getLocalisation() {
        return localisation;
    }
}
