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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group3.serverside.Entity.ClientEntity;
import com.group3.serverside.Exception.ResourceNotFoundException;
import com.group3.serverside.Repository.ClientRepo;


@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:5173")
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
    @PostMapping("/client/add")
    public int createClient(@RequestParam boolean clientType, @RequestParam String name, @RequestParam String surname, @RequestParam String businessName, @RequestParam String contactNumber, @RequestParam String address, @RequestParam int contract_id, @RequestParam String email) {
        System.out.println("Api Call Received");
        ClientEntity newClient = new ClientEntity();

        System.out.println("Client Type: " + clientType);
        System.out.println("Client Name: " + name);
        System.out.println("Client Surname: " + surname);
        if(clientType){ System.out.println("Client Is Individual"); newClient.setAlias(name + " " + surname); newClient.setClient_type("Individual");}
        else{ System.out.println("Client Is Business"); newClient.setAlias(businessName); newClient.setClient_type("Business");}

        System.out.println("Client Alias: " + newClient.getAlias());

        newClient.setContact_number(contactNumber);
        newClient.setAddress(address);
        newClient.setContract_id(contract_id);
        newClient.setEmail(email);

        try{
            System.out.println("Try To Save Client");
            clientRepo.save(newClient);
            return 1;
        }catch(Exception e){
            System.out.println("Could not save Client");
            System.out.println(e.getMessage());
            return 0;
        }

    }

    @PostMapping("/client/check_email")
    public boolean CheckEmail(@RequestParam String email) {
        
        ClientEntity dupe = clientRepo.findByEmail(email);

        if(dupe == null){return true;}else{ return false;}

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
