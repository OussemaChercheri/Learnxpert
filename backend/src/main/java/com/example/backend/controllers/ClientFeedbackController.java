package com.example.backend.controllers;
import com.example.backend.dao.ClientFeedback;
import com.example.backend.services.ClientFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/client-feedback")
public class ClientFeedbackController {

    @Autowired
    private ClientFeedbackService clientFeedbackService;

    @PostMapping
    public ClientFeedback createClientFeedback(@RequestBody ClientFeedback clientFeedback) {
        return clientFeedbackService.createClientFeedback(clientFeedback);
    }

    @GetMapping
    public List<ClientFeedback> getAllClientFeedback() {
        return clientFeedbackService.getAllClientFeedback();
    }

    @GetMapping("/{id}")
    public ClientFeedback getClientFeedbackById(@PathVariable Long id) {
        return clientFeedbackService.getClientFeedbackById(id);
    }

    @PutMapping("/{id}")
    public ClientFeedback updateClientFeedbackStatus(@PathVariable Long id) {
        return clientFeedbackService.updateClientFeedbackStatus(id);
    }
}
