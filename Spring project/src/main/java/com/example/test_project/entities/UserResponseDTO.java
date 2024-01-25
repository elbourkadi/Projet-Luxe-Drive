package com.example.test_project.entities;


public class UserResponseDTO {

    private String id;
    private String nom;
    private String prenom;
    private String address;
    private String telephone;
    private String email;
    private String role;
    private String image;



    public UserResponseDTO(String id, String nom, String prenom, String address, String telephone, String email, String role, String image) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.address = address;
        this.telephone = telephone;
        this.email = email;
        this.role = role;
        this.image = image;
    }

    public String getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public String getAddress() {
        return address;
    }

    public String getTelephone() {
        return telephone;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getImage() {
        return image;
    }


}

