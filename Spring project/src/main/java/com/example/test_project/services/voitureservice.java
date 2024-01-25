package com.example.test_project.services;




import com.example.test_project.entities.Voiture;

import java.math.BigInteger;
import java.util.List;

public interface voitureservice {
    List<Voiture> getAllVoitures();

    Voiture getVoitureById(BigInteger id);

    void saveVoiture(Voiture voiture);

    void deleteVoiture(BigInteger id);

    void updateVoiture(BigInteger id);
}
