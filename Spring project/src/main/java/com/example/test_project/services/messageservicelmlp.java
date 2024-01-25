package com.example.test_project.services;


import com.example.test_project.entities.Message;
import com.example.test_project.reposiroty.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@Service
public class messageservicelmlp implements messageservice {

    private  MessageRepository messageRepository;

    @Autowired
    public messageservicelmlp(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    @Override
    public Message getMessageById(BigInteger id) {
        return messageRepository.findById(id).orElse(null);
    }

    @Override
    public void saveMessage(Message message) {
        messageRepository.save(message);
    }

    @Override
    public void deleteMessage(BigInteger id) {
        messageRepository.deleteById(id);
    }

    @Override
    public void updateMessage(BigInteger id) {

    }
}
