package com.example.test_project.reposiroty;

import com.example.test_project.entities.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigInteger;

public interface MessageRepository extends MongoRepository<Message, BigInteger> {
}
