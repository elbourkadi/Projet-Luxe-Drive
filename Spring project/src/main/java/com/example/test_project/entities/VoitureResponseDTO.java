package com.example.test_project.entities;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.math.BigInteger;
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VoitureResponseDTO {
    //    @JsonProperty("id")
    private String id;
    private String matricule;
    private int quantite;
    private String marque;
    private String modele;
    private double prix;
    private int nb_personnes;
    private String carburant;
    private String img;
    private double consommation;
    private String status;

    private String manual_gearbox;
    @JsonProperty("assurance")
    private Insurance assurance;
    private String category;

    public VoitureResponseDTO(String id,String matricule, int quantite, String marque, String modele, double prix, int nb_personnes, String carburant, String img, double consommation, String status, Insurance assurance, String category,String manual_gearbox) {
        this.id = id;
        this.matricule=matricule;
        this.quantite = quantite;
        this.marque = marque;
        this.modele = modele;
        this.prix = prix;
        this.nb_personnes = nb_personnes;
        this.carburant = carburant;
        this.img = img;
        this.consommation = consommation;
        this.status = status;
        this.assurance = assurance;
        this.category = category;
        this.manual_gearbox=manual_gearbox;
    }

    public String getMatricule() {
        return matricule;
    }

    public String getManual_gearbox() {
        return manual_gearbox;
    }

    public String getId() {
        return id;
    }

    public int getQuantite() {
        return quantite;
    }

    public String getMarque() {
        return marque;
    }

    public String getModele() {
        return modele;
    }

    public double getPrix() {
        return prix;
    }

    public int getNb_personnes() {
        return nb_personnes;
    }

    public String getCarburant() {
        return carburant;
    }

    public String getImg() {
        return img;
    }

    public double getConsommation() {
        return consommation;
    }

    public String getStatus() {
        return status;
    }

    public Insurance getAssurance() {
        return assurance;
    }

    public String getCategory() {
        return category;
    }
}

