package com.example.test_project.reposiroty;


import com.example.test_project.entities.Agence;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;

public interface AgenceRepository extends MongoRepository<Agence, BigInteger> {
}
