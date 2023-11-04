package com.group3.serverside.Controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group3.serverside.Entity.ClientEntity;
import com.group3.serverside.Exception.ResourceNotFoundException;
import com.group3.serverside.Repository.ClientRepo;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/")
public class ClientController {
    
    @Autowired
    private ClientRepo clientRepo;

    // get all clients
    @GetMapping("/clients")
    public List<ClientEntity> getAllClients(){
        return clientRepo.findAll();
    }

    // Get by id
    @GetMapping("/client/{id}")
    public ResponseEntity<ClientEntity> getClientById(@PathVariable Integer id){
        ClientEntity client = clientRepo.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Client does not exist with id: " + id));

        return ResponseEntity.ok(client);
    }

    // Add client
    @PostMapping("/addClient")
    public ClientEntity createClient(@RequestBody ClientEntity client) {
        return clientRepo.save(client);
    }

    // Update client
    @PutMapping("/client/update/{id}")
    public ResponseEntity<ClientEntity> updateClient(@PathVariable Integer id, @RequestBody ClientEntity clientDetails) {
        ClientEntity client = clientRepo.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Client does not exist with id: " + id));

        client.setAlias(clientDetails.getAlias());
        client.setContract_id(clientDetails.getContract_id());
        client.setContact_number(clientDetails.getContact_number());
        client.setClient_type(clientDetails.getClient_type());
        client.setAddress(clientDetails.getAddress());
        client.setEmail(clientDetails.getAddress());

        ClientEntity updatedClient = clientRepo.save(client);
        return ResponseEntity.ok(updatedClient);
    }

    // Delete client
    @DeleteMapping("/client/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Integer id) {
        ClientEntity client = clientRepo.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Client does not exist with id: " + id));

        clientRepo.delete(client);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
