package com.example.test_project.entities;

import java.math.BigInteger;
import java.time.LocalDateTime;

public class ReservationResponseDTO {

    private String id;
    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    private String agence_depart_id;
    private String agence_retour_id;
    private String voiture_id;
    private String user_id;
    private String status;
    private String reservation;
    private double Prix_Total;


    public ReservationResponseDTO(String id, LocalDateTime dateDebut, LocalDateTime dateFin, String agence_depart_id, String agence_retour_id,
                                  String voiture_id, String user_id, String status, String reservation,  double Prix_Total) {
        this.id = id;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.agence_depart_id = agence_depart_id;
        this.agence_retour_id = agence_retour_id;
        this.voiture_id = voiture_id;
        this.user_id = user_id;
        this.status = status;
        this.reservation = reservation;
        this.Prix_Total=Prix_Total;
    }

    public double getPrix_Total() {
        return Prix_Total;
    }

    public String getId() {
        return id;
    }

    public LocalDateTime getDateDebut() {
        return dateDebut;
    }

    public LocalDateTime getDateFin() {
        return dateFin;
    }

    public String getAgence_depart_id() {
        return agence_depart_id;
    }

    public String getAgence_retour_id() {
        return agence_retour_id;
    }

    public String getVoiture_id() {
        return voiture_id;
    }

    public String getUser_id() {
        return user_id;
    }

    public String getStatus() {
        return status;
    }

    public String getReservation() {
        return reservation;
    }



}
