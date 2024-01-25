package com.example.test_project.entities;

class Localisation {
    private String ville;
    private String adresse;

    public Localisation() {
    }

    public Localisation(String ville, String adresse) {
        this.ville = ville;
        this.adresse = adresse;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }
}
