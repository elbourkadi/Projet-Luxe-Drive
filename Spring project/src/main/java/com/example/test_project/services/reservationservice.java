package com.example.test_project.services;

import com.example.test_project.entities.Agence;
import com.example.test_project.entities.Reservation;

import java.math.BigInteger;
import java.util.List;

public interface reservationservice {
    List<Reservation> getAllResevations();

    Reservation getReservationById(BigInteger id);

    List<Reservation> getReservationsByUserId(String userId);
    String getUserEmailById(String userId) ;

    void saveReservation(Reservation reservation);

    void deleteReservation(BigInteger id);
    void updateReservation(BigInteger id);
    String getUserPrenomById(BigInteger userId);
    String getAgenceNomById(BigInteger agenceId);
    String getVoitureModeleById(BigInteger voitureId);
    String getAgenceNomouteurById(BigInteger voitureId);

}