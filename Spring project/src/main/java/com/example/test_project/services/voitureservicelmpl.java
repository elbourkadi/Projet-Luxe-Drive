package com.example.test_project.services;


import com.example.test_project.entities.Voiture;
import com.example.test_project.reposiroty.VoitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@Service
    public class voitureservicelmpl implements voitureservice {

    private VoitureRepository voitureRepository;

    @Autowired
    public voitureservicelmpl(VoitureRepository voitureRepository) {
        this.voitureRepository = voitureRepository;
    }

    @Override
    public List<Voiture> getAllVoitures() {
        return voitureRepository.findAll();
    }

    @Override
    public Voiture getVoitureById(BigInteger id) {
        return voitureRepository.findById(id).orElse(null);
    }

    @Override
    public void saveVoiture(Voiture voiture) {
        voitureRepository.save(voiture);
    }

    @Override
    public void deleteVoiture(BigInteger id) {
        voitureRepository.deleteById(id);
    }

    @Override
    public void updateVoiture(BigInteger id) {

    }


}
