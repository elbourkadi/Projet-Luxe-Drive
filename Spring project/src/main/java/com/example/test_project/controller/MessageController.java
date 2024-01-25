package com.example.test_project.controller;


import com.example.test_project.entities.Message;
import com.example.test_project.entities.MessageResponseDTO;
import com.example.test_project.services.messageservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class MessageController {

    private final messageservice messageService;

    @Autowired
    public MessageController(messageservice messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/addmessage")
    public void addMessage(@RequestBody Message message) {
        messageService.saveMessage(message);
    }

    @PutMapping("/updatemessage/{id}")
    public ResponseEntity<String> updateMessage(@PathVariable BigInteger id, @RequestBody Message updateMessage) {
        Message existingMessage = messageService.getMessageById(id);

        if (existingMessage != null) {

            existingMessage.setNom_env(updateMessage.getNom_env());
            existingMessage.setPrenom_env(updateMessage.getPrenom_env());
            existingMessage.setEmail_env(updateMessage.getEmail_env());
            existingMessage.setTelephone_env(updateMessage.getTelephone_env());
            existingMessage.setObjet(updateMessage.getObjet());
            existingMessage.setContenu(updateMessage.getContenu());

            messageService.saveMessage(existingMessage);

            String successMessage = "Messsage updated successfully";
            return ResponseEntity.ok().body("{\"message\":\""+successMessage+"\"}");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deletemessage/{id}")
    public void deleteMessage(@PathVariable BigInteger id) {
        messageService.deleteMessage(id);
    }
    @GetMapping("/getallmessages")
    public ResponseEntity<List<MessageResponseDTO>> getAllMessages() {
        List<Message> messages = messageService.getAllMessages();
        List<MessageResponseDTO> messageDTOs = convertMessagesToResponseDTOs(messages);
        return ResponseEntity.ok(messageDTOs);
    }

    @GetMapping("/getmessage/{id}")
    public ResponseEntity<MessageResponseDTO> getMessageById(@PathVariable BigInteger id) {
        Message message = messageService.getMessageById(id);
        if (message != null) {
            MessageResponseDTO messageDTO = convertMessageToResponseDTO(message);
            return ResponseEntity.ok(messageDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/markasimportant/{id}")
    public ResponseEntity<String> markAsImportant(@PathVariable BigInteger id) {
        Message existingMessage = messageService.getMessageById(id);

        if (existingMessage != null) {
            existingMessage.setImportant(true);
            messageService.saveMessage(existingMessage);

            String successMessage = "Message marked as important";
            return ResponseEntity.ok().body("{\"message\":\"" + successMessage + "\"}");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private MessageResponseDTO convertMessageToResponseDTO(Message message) {
        return new MessageResponseDTO(
                message.getId().toString(),
                message.getNom_env(),
                message.getPrenom_env(),
                message.getEmail_env(),
                message.getTelephone_env(),
                message.getObjet(),
                message.getContenu(),
                message.isImportant()
        );
    }

    private List<MessageResponseDTO> convertMessagesToResponseDTOs(List<Message> messages) {
        return messages.stream()
                .map(this::convertMessageToResponseDTO)
                .collect(Collectors.toList());
    }

}
