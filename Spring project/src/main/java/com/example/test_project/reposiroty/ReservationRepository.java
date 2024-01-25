package com.example.test_project.reposiroty;

import com.example.test_project.entities.Agence;
import com.example.test_project.entities.Reservation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.math.BigInteger;
import java.util.List;

public interface ReservationRepository extends MongoRepository<Reservation, BigInteger> {

    @Query("{ 'user_id' : ?0 }")
    List<Reservation> findByUserId(String userId);

}
