package com.example.test_project.controller;


import com.example.test_project.entities.Agence;
import com.example.test_project.entities.AgenceResponseDTO;
import com.example.test_project.entities.Voiture;
import com.example.test_project.entities.VoitureResponseDTO;
import com.example.test_project.services.voitureservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class VoitureController {

    @Autowired
    private voitureservice voitureService;

    @PostMapping("/addvoiture")
    public void addVoiture(@RequestBody Voiture voiture){
        voitureService.saveVoiture(voiture);
    }

    @PutMapping("/updatevoiture/{id}")
    public ResponseEntity<String> updateVoiture(@PathVariable BigInteger id, @RequestBody Voiture updateVoiture) {
        Voiture existingVoiture = voitureService.getVoitureById(id);

        if (existingVoiture != null) {
            if (updateVoiture.getMatricule() != null) {
                existingVoiture.setMatricule(updateVoiture.getMatricule());
            }
            if (updateVoiture.getQuantite() != 0) {
                existingVoiture.setQuantite(updateVoiture.getQuantite());
            }

            if (updateVoiture.getMarque() != null) {
                existingVoiture.setMarque(updateVoiture.getMarque());
            }

            if (updateVoiture.getModele() != null) {
                existingVoiture.setModèle(updateVoiture.getModele());
            }

            if (updateVoiture.getPrix() != 0) {
                existingVoiture.setPrix(updateVoiture.getPrix());
            }

            if (updateVoiture.getType() != null) {
                existingVoiture.setType(updateVoiture.getType());
            }

            if (updateVoiture.getNb_personnes() != 0) {
                existingVoiture.setNb_personnes(updateVoiture.getNb_personnes());
            }

            if (updateVoiture.getCarburant() != null) {
                existingVoiture.setCarburant(updateVoiture.getCarburant());
            }

            if (updateVoiture.getImg() != null) {
                existingVoiture.setImg(updateVoiture.getImg());
            }

            if (updateVoiture.getConsommation() != 0) {
                existingVoiture.setConsommation(updateVoiture.getConsommation());
            }

            if (updateVoiture.getAssurance() != null) {
                existingVoiture.setAssurance(updateVoiture.getAssurance());
            }
            if (updateVoiture.getStatus() != null) {
                existingVoiture.setStatus(updateVoiture.getStatus());
            }
            if (updateVoiture.getManual_gearbox() != null) {
                existingVoiture.setManual_gearbox(updateVoiture.getManual_gearbox());
            }

            voitureService.saveVoiture(existingVoiture);

            String successMessage = "Voiture updated successfully";
            return ResponseEntity.ok().body("{\"message\":\""+successMessage+"\"}");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deletevoiture/{id}")
    public void deleteVoiture(@PathVariable BigInteger id) {
        voitureService.deleteVoiture(id);
    }
    @GetMapping("/getallvoitures")
    public ResponseEntity<List<VoitureResponseDTO>> getAllVoitures() {
        List<Voiture> voitures = voitureService.getAllVoitures();
        List<VoitureResponseDTO> voitureDTOs = convertVoituresToResponseDTOs(voitures);
        return ResponseEntity.ok(voitureDTOs);
    }
    @GetMapping("/getvoiture/{id}")
    public ResponseEntity<VoitureResponseDTO> getVoitureById(@PathVariable BigInteger id) {
        Voiture voiture = voitureService.getVoitureById(id);
        if (voiture != null) {
            VoitureResponseDTO voitureDTO = convertVoitureToResponseDTO(voiture);
            return ResponseEntity.ok(voitureDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    private VoitureResponseDTO convertVoitureToResponseDTO(Voiture voiture) {
        return new VoitureResponseDTO(
                        voiture.getId().toString(),
                        voiture.getMatricule(),
                        voiture.getQuantite(),
                        voiture.getMarque(),
                        voiture.getModèle(),
                        voiture.getPrix(),
                voiture.getNb_personnes(),
                voiture.getCarburant(),
                voiture.getImg(),
                voiture.getConsommation(),
                voiture.getType(),
                voiture.getAssurance(),
                voiture.getStatus(),
                voiture.getManual_gearbox()
                );
    }


private List<VoitureResponseDTO> convertVoituresToResponseDTOs(List<Voiture> voiture) {
    return voiture.stream()
            .map(this::convertVoitureToResponseDTO)
            .collect(Collectors.toList());
}


}


