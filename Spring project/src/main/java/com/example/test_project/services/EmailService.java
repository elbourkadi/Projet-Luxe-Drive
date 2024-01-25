package com.example.test_project.services;

import com.example.test_project.entities.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {


        @Autowired
        private JavaMailSender javaMailSender;

        public void sendWelcomeEmail(String username, String email, String activationLink) {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Bienvenue, " + username + "!");
            message.setText("Cher(e) " + username + ",\n\n" +
                    "Bienvenue sur notre plateforme! \n" +
                    "Nous avons reçu une demande de création de votre compte. Afin de compléter le processus, veuillez utiliser le lien d'authentification ci-dessous :\n" +
                    "Lien d'authentification : " + activationLink +"\n\n"+
                    "Assurez-vous de ne partager ce lien avec personne et de ne l'utiliser que dans le cadre de l'activation de l'authentification à deux facteurs pour votre compte.\n"+
                     "Merci de nous avoir choisis chez LuxeDrive!");

            javaMailSender.send(message);
        }
    public void sendConfirmationEmailReservation(Reservation reservation, String userEmail, String userPrenom, String voitureModele, String agenceDepartNom,String agencerouteurtNom) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(userEmail);

        message.setSubject("Confirmation de réservation de voiture - Numéro de réservation " + reservation.getId().toString().substring(Math.max(0, reservation.getId().toString().length() - 5)));

        String body = "Cher(e) " + userPrenom + ",\n\n" +
                "Nous sommes ravis de vous informer que votre réservation de voiture a été confirmée avec succès. " +
                "Votre numéro de réservation est le " + reservation.getId().toString().substring(Math.max(0, reservation.getId().toString().length() - 5)) + ".\n\n" +
                "Détails de la réservation :\n" +
                "Date de début : " + reservation.getDateDebut() + "\n" +
                "Date de fin : " + reservation.getDateFin() + "\n" +
                "Modèle de voiture : " + voitureModele + "\n" +
                "Lieu de prise en charge : " + agenceDepartNom + "\n" +
                "Lieu de retour : " + agencerouteurtNom + "\n\n" +
                "Nous vous remercions de nous faire confiance pour votre location de voiture. " +
                "Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter.\n\n" +
                "Cordialement,\n\n" +
                "L'équipe de LuxeDrive";

        message.setText(body);

        // Replace the following line with the actual email sending logic
        javaMailSender.send(message);
    }

//    public void sendConfirmationEmailResercation(Reservation reservation, String userEmail) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(userEmail);
//
//        message.setSubject("Confirmation de réservation de voiture - Numéro de réservation " + reservation.getId().toString().substring(Math.max(0, reservation.getId().toString().length() - 5)));
//
//        String body = "Cher(e) " + reservation.getUser_id() + ",\n\n" +
//                "Nous sommes ravis de vous informer que votre réservation de voiture a été confirmée avec succès. " +
//                "Votre numéro de réservation est le " + reservation.getId().toString().substring(Math.max(0, reservation.getId().toString().length() - 5)) + ".\n\n" +
//                "Détails de la réservation :\n" +
//                "Date de début : " + reservation.getDateDebut() + "\n" +
//                "Date de fin : " + reservation.getDateFin() + "\n" +
//                "Modèle de voiture : " + reservation.getVoiture_id() + "\n" +
//                "Lieu de prise en charge : " + reservation.getAgence_depart_id() + "\n" +
//                "Lieu de retour : " + reservation.getAgence_retour_id() + "\n\n" +
//                "Nous vous remercions de nous faire confiance pour votre location de voiture. " +
//                "Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter.\n\n" +
//                "Cordialement,\n\n" +
//                "L'équipe de LuxeDrive";
//
//        message.setText(body);
//
//        // Replace the following line with the actual email sending logic
//        javaMailSender.send(message);
//    }

//    public void sendConfirmationEmailResercation(Reservation reservation,String email) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(email);
//
//        message.setSubject("Confirmation de réservation de voiture - Numéro de réservation " + reservation.getId());
//
//        String body = "Cher(e) " + reservation.getUser_id() + ",\n\n" +
//                "Nous sommes ravis de vous informer que votre réservation de voiture a été confirmée avec succès. " +
//                "Votre numéro de réservation est le " + reservation.getId() + ".\n\n" +
//                "Détails de la réservation :\n" +
//                "Date de début : " + reservation.getDateDebut() + "\n" +
//                "Date de fin : " + reservation.getDateFin() + "\n" +
//                "Modèle de voiture : " + reservation.getVoiture_id() + "\n" +
//                "Lieu de prise en charge : " + reservation.getAgence_depart_id() + "\n" +
//                "Lieu de retour : " + reservation.getAgence_retour_id() + "\n\n" +
//                "Nous vous remercions de nous faire confiance pour votre location de voiture. " +
//                "Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter.\n\n" +
//                "Cordialement,\n\n" +
//                "L'équipe de LuxeDrive";
//
//        message.setText(body);
//
//        // Replace the following line with the actual email sending logic
//        javaMailSender.send(message);
//    }




}
