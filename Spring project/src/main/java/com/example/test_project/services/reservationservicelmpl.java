package com.example.test_project.services;

import com.example.test_project.entities.Agence;
import com.example.test_project.entities.Reservation;
import com.example.test_project.entities.User;
import com.example.test_project.entities.Voiture;
import com.example.test_project.reposiroty.AgenceRepository;
import com.example.test_project.reposiroty.ReservationRepository;
import com.example.test_project.reposiroty.VoitureRepository;
import com.example.test_project.reposiroty.userrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;



@Service
public class reservationservicelmpl implements reservationservice {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private userrepository UserRepository; // Assuming you have a UserRepository
    @Autowired
    private AgenceRepository agenceRepository;

    @Autowired
    private VoitureRepository voitureRepository;

    @Override
    public List<Reservation> getAllResevations() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation getReservationById(BigInteger id) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        return optionalReservation.orElse(null);
    }

    @Override
    public void saveReservation(Reservation reservation) {
        reservationRepository.save(reservation);
    }

    @Override
    public void deleteReservation(BigInteger id) {
        reservationRepository.deleteById(id);
    }

    @Override
    public void updateReservation(BigInteger id) {
        // Implement update logic if needed
    }

    @Override
    public List<Reservation> getReservationsByUserId(String userId) {
        return reservationRepository.findByUserId(userId);
    }

    @Override
    public String getUserEmailById(String userId) {
        Optional<User> optionalUser = UserRepository.findById(new BigInteger(userId));

        return optionalUser.map(User::getEmail).orElse(null);
    }
    @Override
    public String getUserPrenomById(BigInteger userId) {
        Optional<User> optionalUser = UserRepository.findById(userId);
        return optionalUser.map(User::getPrenom).orElse(null);
    }
    @Override
    public String getAgenceNomById(BigInteger agenceId) {
        Optional<Agence> optionalAgence = agenceRepository.findById(agenceId);
        return optionalAgence.map(Agence::getNom_agence).orElse(null);
    }
    @Override
    public String getAgenceNomouteurById(BigInteger agenceId) {
        Optional<Agence> optionalAgence = agenceRepository.findById(agenceId);
        return optionalAgence.map(Agence::getNom_agence).orElse(null);
    }


    @Override
    public String getVoitureModeleById(BigInteger voitureId) {
        Optional<Voiture> optionalVoiture = voitureRepository.findById(voitureId);
        return optionalVoiture.map(Voiture::getModele).orElse(null);
    }


}


