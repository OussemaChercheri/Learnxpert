package com.tekup.backend.services;

import com.tekup.backend.dao.Client;
import com.tekup.backend.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.UUID;

@Service
public class ClientRegistrationService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private JavaMailSender emailSender;

    @Value("${spring.mail.username}")
    private String mailSender;

    public Client registerClient(Client client) {
        String verificationToken = UUID.randomUUID().toString();
        client.setVerificationToken(verificationToken);
        client.setEnabled(false);
        Client savedClient = clientRepository.save(client);

        sendVerificationEmail(client, verificationToken);

        return savedClient;
    }

    private void sendVerificationEmail(Client client, String verificationToken) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setTo(client.getEmail());
            helper.setSubject("Registration Confirmation");
            helper.setText("Please confirm your account by clicking the link: " +
                    "http://localhost:8080/api/v1/client/verify/" + verificationToken, true);
            helper.setFrom(mailSender);

            emailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}