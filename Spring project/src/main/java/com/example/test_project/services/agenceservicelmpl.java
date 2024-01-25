package com.example.test_project.services;




import com.example.test_project.entities.Agence;
import com.example.test_project.reposiroty.AgenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@Service
public class agenceservicelmpl implements agenceservice {

    private AgenceRepository agenceRepository;

    @Autowired
    public agenceservicelmpl(AgenceRepository agenceRepository) {
        this.agenceRepository = agenceRepository;
    }

    public List<Agence> getAllAgences() {
        return agenceRepository.findAll();
    }

    public Agence getAgenceById(BigInteger id) {
        return agenceRepository.findById(id).orElse(null);
    }

    public void saveAgence(Agence agence) {
        agenceRepository.save(agence);
    }

    public void deleteAgence(BigInteger id) {
        agenceRepository.deleteById(id);
    }

    public void updateAgence(BigInteger id) {

    }
}