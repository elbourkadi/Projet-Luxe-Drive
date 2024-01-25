package com.example.test_project.services;



import com.example.test_project.entities.Agence;

import java.math.BigInteger;
import java.util.List;

public interface agenceservice {

    List<Agence> getAllAgences();

    Agence getAgenceById(BigInteger id);

    void saveAgence(Agence agence);

    void deleteAgence(BigInteger id);
    void updateAgence(BigInteger id);


}
