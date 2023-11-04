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

import com.group3.serverside.Entity.ContractEntity;
import com.group3.serverside.Exception.ResourceNotFoundException;
import com.group3.serverside.Repository.ContractRepo;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/")
public class ContractController {
    @Autowired
    private ContractRepo contractRepo;

    // get all contracts
    @GetMapping("/contracts")
    public List<ContractEntity> getAllContracts() {
        return contractRepo.findAll();
    }

    // Get by id
    @GetMapping("/contract/{id}")
    public ResponseEntity<ContractEntity> getContractById(@PathVariable Integer id) {
        ContractEntity contract = contractRepo.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Contract does not exist with id: " + id));
                        
        return ResponseEntity.ok(contract);
    }

    // Add contract
    @PostMapping("/addContract")
    public ContractEntity createContract(@RequestBody ContractEntity contract) {
        return contractRepo.save(contract);
    }

    // Update contract
    @PutMapping("/contract/update/{id}")
    public ResponseEntity<ContractEntity> updateContract(@PathVariable Integer id, @RequestBody ContractEntity contractDetails) {
        ContractEntity contract = contractRepo.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Contract does not exist with id: " + id));

        contract.setType(contractDetails.getType());
        contract.setStatus(contractDetails.getStatus());
        contract.setStart_date(contractDetails.getStart_date());
        contract.setEnd_date(contractDetails.getEnd_date());

        ContractEntity updatedContract = contractRepo.save(contract);
        return ResponseEntity.ok(updatedContract);
    }

    // Delete contract
    @DeleteMapping("/contract/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteContract(@PathVariable Integer id) {
        ContractEntity contract = contractRepo.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Contract does not exist with id: " + id));

        contractRepo.delete(contract);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
