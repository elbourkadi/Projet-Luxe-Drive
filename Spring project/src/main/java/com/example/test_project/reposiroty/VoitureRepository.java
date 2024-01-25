package com.example.test_project.reposiroty;



import com.example.test_project.entities.Voiture;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;

public interface VoitureRepository extends MongoRepository<Voiture, BigInteger> {
}
