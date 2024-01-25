package com.example.test_project.services;


import com.example.test_project.entities.Message;

import java.math.BigInteger;
import java.util.List;

public interface messageservice {

    List<Message> getAllMessages();

    Message getMessageById(BigInteger id);

    void saveMessage(Message message);

    void deleteMessage(BigInteger id);

    void updateMessage(BigInteger id);
}
