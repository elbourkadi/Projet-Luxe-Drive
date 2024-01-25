package com.example.test_project.entities;


import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;


public class Insurance {
    private String code;
    private String societe;
    private LocalDateTime date;

    public Insurance() {
    }

    public Insurance(String code, String societe, LocalDateTime date) {
        this.code = code;
        this.societe = societe;
        this.date = date;
    }

    // Getters and setters for Insurance fields

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getSociete() {
        return societe;
    }

    public void setSociete(String societe) {
        this.societe = societe;
    }
}