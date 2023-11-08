package com.group3.serverside.Services.impl;

import com.group3.serverside.Entity.ClientEntity;
import com.group3.serverside.Entity.EmployeeEntity;
import com.group3.serverside.Entity.JobEntity;
import com.group3.serverside.Repository.ClientRepo;
import com.group3.serverside.Services.ClientService;
import com.group3.serverside.Services.TwilioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientServiceimpl implements ClientService{
    private final ClientRepo clientRepo;
    private final TwilioService twilioService;

    @Autowired
    public ClientServiceimpl(ClientRepo clientRepo, TwilioService twilioService) {
        this.clientRepo = clientRepo;
        this.twilioService = twilioService;
    }

    @Override
    public void createClientWithNotification(ClientEntity client) {
        ClientEntity savedClient = clientRepo.save(client);

        // Send a notification using Twilio
        String to = savedClient.getContact_number(); // Assuming contact_number contains the phone number
        String message = "Hello, "+ savedClient.getAlias()+ " Thank you for calling PremierService Solutions, a technician will be sent shortly ";
        twilioService.sendSms(to, message);
    }
}
