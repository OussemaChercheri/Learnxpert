package com.example.backend.services;



import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.backend.repositories.ClientFeedbackRepository;
import com.example.backend.dao.ClientFeedback;
import java.util.List;

@Service
public class ClientFeedbackService {

    @Autowired
    private ClientFeedbackRepository clientFeedbackRepository;

    public ClientFeedback createClientFeedback(ClientFeedback clientFeedback) {
        clientFeedback.setStatus("Unread");
        return clientFeedbackRepository.save(clientFeedback);
    }

    public List<ClientFeedback> getAllClientFeedback() {
        return clientFeedbackRepository.findAll();
    }

    public ClientFeedback getClientFeedbackById(Long id) {
        return clientFeedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Client feedback not found"));
    }

    public ClientFeedback updateClientFeedbackStatus(Long id) {
        ClientFeedback clientFeedback = getClientFeedbackById(id);
        clientFeedback.setStatus("Read");
        return clientFeedbackRepository.save(clientFeedback);
    }
}
