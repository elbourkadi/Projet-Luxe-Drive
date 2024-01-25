package com.example.test_project.entities;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigInteger;

@Document(collection = "messages")
public class Message {

    @Id
    private BigInteger id;
    private String nom_env;
    private String prenom_env;
    private String email_env;
    private String telephone_env;
    private String objet;
    private String contenu;
    private boolean important;



    public Message() {
    }

    public Message(String nom_env, String prenom_env, String email_env, String telephone_env, String objet, String contenu,boolean important) {
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

    public void setImportant(boolean important) {
        this.important = important;
    }

    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public String getNom_env() {
        return nom_env;
    }

    public void setNom_env(String nom_env) {
        this.nom_env = nom_env;
    }

    public String getPrenom_env() {
        return prenom_env;
    }

    public void setPrenom_env(String prenom_env) {
        this.prenom_env = prenom_env;
    }

    public String getEmail_env() {
        return email_env;
    }

    public void setEmail_env(String email_env) {
        this.email_env = email_env;
    }

    public String getTelephone_env() {
        return telephone_env;
    }

    public void setTelephone_env(String telephone_env) {
        this.telephone_env = telephone_env;
    }

    public String getObjet() {
        return objet;
    }

    public void setObjet(String objet) {
        this.objet = objet;
    }

    public String getContenu() {
        return contenu;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }
}
