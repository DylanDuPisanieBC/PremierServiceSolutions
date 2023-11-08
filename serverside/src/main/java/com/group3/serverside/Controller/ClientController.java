package com.group3.serverside.Controller;

import java.util.*;

import com.group3.serverside.Services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group3.serverside.Entity.ClientEntity;
import com.group3.serverside.Exception.ResourceNotFoundException;
import com.group3.serverside.Repository.ClientRepo;


@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;

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
        ClientEntity newClient = new ClientEntity();
        if(clientType){ newClient.setAlias(name + " " + surname); newClient.setClient_type("Individual");}
        else{ newClient.setAlias(businessName); newClient.setClient_type("Business");}

        newClient.setContact_number(contactNumber);
        newClient.setAddress(address);
        newClient.setContract_id(contract_id);
        newClient.setEmail(email);

        System.out.println("Type: " + newClient.getClient_type());
        System.out.println("Alias: " + newClient.getAlias());
        System.out.println("Contact Number: " + newClient.getContact_number());
        System.out.println("Address: " + newClient.getAddress());
        System.out.println("Email: " + newClient.getEmail());
        System.out.println("Contract ID: " + newClient.getContract_id());

        try{
            clientService.createClientWithNotification(newClient);
            return 1;
        }catch(Exception e){
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
    public int updateClient(@PathVariable Integer id, @RequestParam boolean clientType, @RequestParam String name, @RequestParam String surname, @RequestParam String businessName, @RequestParam String contactNumber, @RequestParam String address, @RequestParam int contract_id, @RequestParam String email) {
        try{
        ClientEntity client = clientRepo.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Client does not exist with id: " + id));

        if(clientType){ client.setAlias(name + " " + surname); client.setClient_type("Individual");}
        else{ client.setAlias(businessName); client.setClient_type("Business");}

        client.setContract_id(contract_id);
        System.out.println(contract_id);
        client.setContact_number(contactNumber);
        client.setAddress(address);
        client.setEmail(email);

        clientRepo.save(client);
        return 1;

        }catch(Exception e){
            System.out.println(e.getMessage());
            return 0;
        }
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
