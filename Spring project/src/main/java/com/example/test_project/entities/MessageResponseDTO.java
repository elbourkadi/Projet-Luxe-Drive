package com.example.test_project.entities;




public class MessageResponseDTO {

    private String id;
    private String nom_env;
    private String prenom_env;
    private String email_env;
    private String telephone_env;
    private String objet;
    private String contenu;
    private boolean  important;


    public MessageResponseDTO(String id, String nom_env, String prenom_env, String email_env, String telephone_env, String objet, String contenu,boolean important) {
        this.id = id;
        this.nom_env = nom_env;
        this.prenom_env = prenom_env;
        this.email_env = email_env;
        this.telephone_env = telephone_env;
        this.objet = objet;
        this.contenu = contenu;
        this.important=important;
    }

    public boolean isImportant() {
        return important;
    }

    public String getId() {
        return id;
    }

    public String getNom_env() {
        return nom_env;
    }

    public String getPrenom_env() {
        return prenom_env;
    }

    public String getEmail_env() {
        return email_env;
    }

    public String getTelephone_env() {
        return telephone_env;
    }

    public String getObjet() {
        return objet;
    }

    public String getContenu() {
        return contenu;
    }


}
