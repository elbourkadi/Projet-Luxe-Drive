package com.example.test_project.controller;


import com.example.test_project.entities.Agence;
import com.example.test_project.entities.AgenceResponseDTO;
import com.example.test_project.services.agenceservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController

public class AgenceController {

    private final agenceservice agenceService;

    @Autowired
    public AgenceController(agenceservice agenceService) {
        this.agenceService = agenceService;
    }

    @PostMapping("/addagence")
    public void addAgence(@RequestBody Agence agence){
        agenceService.saveAgence(agence);
    }

    @PutMapping("/updateagence/{id}")
    public ResponseEntity<String> updateAgence(@PathVariable BigInteger id, @RequestBody Agence updateAgence) {
        Agence existingAgence = agenceService.getAgenceById(id);

        if (existingAgence != null) {
            if (updateAgence.getNom() != null) {
                existingAgence.setNom(updateAgence.getNom());
            }

            if (updateAgence.getAdresse() != null) {
                existingAgence.setAdresse(updateAgence.getAdresse());
            }

            if (updateAgence.getTelephone() != null) {
                existingAgence.setTelephone(updateAgence.getTelephone());
            }

            if (updateAgence.getEmail() != null) {
                existingAgence.setEmail(updateAgence.getEmail());
            }

            if (updateAgence.getLocalisation() != null) {
                existingAgence.setLocalisation(updateAgence.getLocalisation());
            }
            if (updateAgence.getManager() != null) {
                existingAgence.setManager(updateAgence.getManager());
            }

            agenceService.saveAgence(existingAgence);

            String successMessage = "Agence updated successfully";
            return ResponseEntity.ok().body("{\"message\":\""+successMessage+"\"}");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/deleteagence/{id}")
    public void deleteAgence(@PathVariable BigInteger id) {
        agenceService.deleteAgence(id);
    }
    @GetMapping("/getallagences")
    public ResponseEntity<List<AgenceResponseDTO>> getAllAgences() {
        List<Agence> agences = agenceService.getAllAgences();
        List<AgenceResponseDTO> agenceDTOs = convertAgencesToResponseDTOs(agences);
        return ResponseEntity.ok(agenceDTOs);
    }

    @GetMapping("/getagence/{id}")
    public ResponseEntity<AgenceResponseDTO> getAgenceById(@PathVariable BigInteger id) {
        Agence agence = agenceService.getAgenceById(id);
        if (agence != null) {
            AgenceResponseDTO agenceDTO = convertAgenceToResponseDTO(agence);
            return ResponseEntity.ok(agenceDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    private AgenceResponseDTO convertAgenceToResponseDTO(Agence agence) {
        return new AgenceResponseDTO(
                agence.getId().toString(),
                agence.getNom_agence(),
                agence.getAdresse(),
                agence.getTelephone_agence(),
                agence.getEmail_agence(),
                agence.getLocalisation(),
                agence.getManager().toString()
        );
    }



    private List<AgenceResponseDTO> convertAgencesToResponseDTOs(List<Agence> agences) {
        return agences.stream()
                .map(this::convertAgenceToResponseDTO)
                .collect(Collectors.toList());
    }

}
