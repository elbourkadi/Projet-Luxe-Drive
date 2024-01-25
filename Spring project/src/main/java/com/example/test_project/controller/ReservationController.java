package com.example.test_project.controller;


import com.example.test_project.entities.Reservation;
import com.example.test_project.entities.ReservationResponseDTO;
import com.example.test_project.services.EmailService;
import com.example.test_project.services.reservationservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class ReservationController {

    private final reservationservice reservationService;

    private  EmailService emailService;


    @Autowired
    public ReservationController(reservationservice reservationService, EmailService emailService) {
        this.reservationService = reservationService;
        this.emailService = emailService;
    }




//    @PostMapping("/addreservation")
//    public ResponseEntity<String> addReservation(@RequestBody Reservation reservation) {
//        reservationService.saveReservation(reservation);
//
//        // Récupérez l'ID de la réservation après l'ajout
//        BigInteger reservationId = reservation.getId();
//
//        // Retrieve user email by user ID
//        String userId = reservation.getUser_id(); // Assuming userId is a string
//        String userEmail = reservationService.getUserEmailById(userId);
//
//        if (userEmail != null) {
//
//
//            // Send confirmation email
//            emailService.sendConfirmationEmailResercation(reservation,userEmail);
//
//            return ResponseEntity.ok().body("{\"message\":\"" + reservationId + "\"}");
//        } else {
//            // Handle the case where user email is not found
//            return ResponseEntity.badRequest().body("{\"error\":\"User email not found for user ID: " + userId + "\"}");
//        }
//    }
@PostMapping("/addreservation")
public ResponseEntity<String> addReservation(@RequestBody Reservation reservation) {
    reservationService.saveReservation(reservation);

    // Récupérer l'ID de la réservation après l'ajout
    BigInteger reservationId = reservation.getId();

    // Récupérer le prénom de l'utilisateur par son ID
    String userId = reservation.getUser_id();
    String userPrenom = reservationService.getUserPrenomById(new BigInteger(userId));

    // Récupérer le nom de l'agence par son ID
    BigInteger agenceId = new BigInteger(reservation.getAgence_depart_id());
    String agenceNom = reservationService.getAgenceNomById(agenceId);
    BigInteger agenceIdrouteur = new BigInteger(reservation.getAgence_retour_id());
    String agenceNomouteur = reservationService.getAgenceNomouteurById(agenceId);


    // Récupérer le modèle de la voiture par son ID
    BigInteger voitureId = new BigInteger(String.valueOf(reservation.getVoiture_id()));
    String voitureModele = reservationService.getVoitureModeleById(voitureId);

    // Vérifier si toutes les informations nécessaires ont été récupérées avec succès
    if (userPrenom != null && agenceNom != null && voitureModele != null) {
        // Récupérer l'e-mail de l'utilisateur
        String userEmail = reservationService.getUserEmailById(userId);

        if (userEmail != null) {
            // Envoyer l'e-mail de confirmation avec les détails supplémentaires
            emailService.sendConfirmationEmailReservation(reservation, userEmail, userPrenom, voitureModele, agenceNom,agenceNomouteur);

            return ResponseEntity.ok().body("{\"message\":\"" + reservationId + "\"}");
        } else {
            // Gérer le cas où l'e-mail de l'utilisateur n'est pas trouvé
            return ResponseEntity.badRequest().body("{\"error\":\"User email not found for user ID: " + userId + "\"}");
        }
    } else {
        // Gérer le cas où une des informations nécessaires n'est pas trouvée
        return ResponseEntity.badRequest().body("{\"error\":\"Unable to retrieve all necessary details for reservation ID: " + reservationId + "\"}");
    }
}





    @PutMapping("/updatereservation/{id}")
    public ResponseEntity<String> updateReservation(@PathVariable BigInteger id, @RequestBody Reservation updateReservation) {
        Reservation existingReservation = reservationService.getReservationById(id);

        if (existingReservation != null) {
            if (updateReservation.getDateDebut() != null) {
                existingReservation.setDateDebut((updateReservation.getDateDebut()));
            }

            if (updateReservation.getDateFin() != null) {
                existingReservation.setDateFin((updateReservation.getDateFin()));
            }

            if (updateReservation.getAgence_depart_id() != null) {
                existingReservation.setAgence_depart_id(updateReservation.getAgence_depart_id());
            }

            if (updateReservation.getAgence_retour_id() != null) {
                existingReservation.setAgence_retour_id(updateReservation.getAgence_retour_id());
            }

            if (updateReservation.getVoiture_id() != null) {
                existingReservation.setVoiture_id(updateReservation.getVoiture_id());
            }

            if (updateReservation.getUser_id() != null) {
                existingReservation.setUser_id(updateReservation.getUser_id());
            }

            if (updateReservation.getStatus() != null) {
                existingReservation.setStatus(updateReservation.getStatus());
            }

            if (updateReservation.getReservation() != null) {
                existingReservation.setReservation(updateReservation.getReservation());
            }
            if (updateReservation.getPrix_Total() != 0) {
                existingReservation.setPrix_Total(updateReservation.getPrix_Total());
            }



            reservationService.saveReservation(existingReservation);

            String successMessage = "Reservation updated successfully";
            return ResponseEntity.ok().body("{\"message\":\""+successMessage+"\"}");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/deletereservation/{id}")
    public void deleteReservation(@PathVariable BigInteger id) {
        reservationService.deleteReservation(id);
    }
    @GetMapping("/getallreservations")
    public ResponseEntity<List<ReservationResponseDTO>> getAllReservations() {
        List<Reservation> reservations = reservationService.getAllResevations();
        List<ReservationResponseDTO> reservationDTOs = convertReservationsToResponseDTOs(reservations);
        return ResponseEntity.ok(reservationDTOs);
    }
    @GetMapping("/getreservationsbyuser/{userId}")
    public ResponseEntity<List<ReservationResponseDTO>> getReservationsByUserId(@PathVariable String userId) {
        List<Reservation> reservations = reservationService.getReservationsByUserId(userId);

        if (reservations != null && !reservations.isEmpty()) {
            List<ReservationResponseDTO> reservationDTOs = convertReservationsToResponseDTOs(reservations);
            return ResponseEntity.ok(reservationDTOs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getreservation/{id}")
    public ResponseEntity<ReservationResponseDTO> getReservationById(@PathVariable BigInteger id) {
        Reservation reservation = reservationService.getReservationById(id);
        if (reservation != null) {
            ReservationResponseDTO reservationDTO = convertReservationToResponseDTO(reservation);
            return ResponseEntity.ok(reservationDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private ReservationResponseDTO convertReservationToResponseDTO(Reservation reservation) {
        return new ReservationResponseDTO(
                reservation.getId().toString(),
                reservation.getDateDebut(),
                reservation.getDateFin(),
                reservation.getAgence_depart_id(),
                reservation.getAgence_retour_id(),
                reservation.getVoiture_id().toString(),
                reservation.getUser_id(),
                reservation.getStatus(),
                reservation.getReservation(),
                reservation.getPrix_Total()
        );
    }

    private List<ReservationResponseDTO> convertReservationsToResponseDTOs(List<Reservation> reservations) {
        return reservations.stream()
                .map(this::convertReservationToResponseDTO)
                .collect(Collectors.toList());
    }
    @PatchMapping("/updatestatus/{id}")
    public ResponseEntity<String> updateStatus(@PathVariable String id){
        BigInteger reservationId = new BigInteger(id);
        Optional<Reservation> optionalReservation = Optional.ofNullable(reservationService.getReservationById(reservationId));

        if (optionalReservation.isPresent()) {
            Reservation reservation = optionalReservation.get();
            String newStatus = "Confirmée";
            reservation.setStatus(newStatus);
            reservationService.saveReservation(reservation);
            String successMessage = "Status updated successfully";
            return ResponseEntity.ok().body("{\"message\":\""+successMessage+"\"}");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PatchMapping("/updatechampreservation/{id}")
    public ResponseEntity<String> updatechampreservation(@PathVariable String id, @RequestBody Map<String, String> reservationMap){
        BigInteger reservationId = new BigInteger(id);
        Optional<Reservation> optionalReservation = Optional.ofNullable(reservationService.getReservationById(reservationId));

        if (optionalReservation.isPresent()) {
            Reservation reservation = optionalReservation.get();
            String newreservation = reservationMap.get("reservation");
            reservation.setReservation(newreservation);
            reservationService.saveReservation(reservation);
            String successMessage = "reservation updated successfully";
            return ResponseEntity.ok().body("{\"message\":\""+successMessage+"\"}");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
