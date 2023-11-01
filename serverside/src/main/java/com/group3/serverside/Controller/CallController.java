package com.group3.serverside.Controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group3.serverside.Entity.CallEntity;
import com.group3.serverside.Repository.CallRepo;

@RestController
@RequestMapping("/api/v1/")
public class CallController {
    
    @Autowired
    private CallRepo callRepo;

    // get all calls
    @GetMapping("/calls")
    public List<CallEntity> getAllCalls(){
        return callRepo.findAll();
    }

    // Get by id
    @GetMapping("/call/{id}")
    public ResponseEntity<CallEntity> getCallById(@PathVariable Integer id){
        CallEntity call = callRepo.findById(id).orElse(null);
        return ResponseEntity.ok(call);
    }

    // Add call
    @PostMapping("/addCall")
    public CallEntity createCall(@RequestBody CallEntity call) {
        return callRepo.save(call);
    }

    // Update call
    @PutMapping("/call/update/{id}")
    public ResponseEntity<CallEntity> updateCall(@PathVariable Integer id, @RequestBody CallEntity callDetails) {
        CallEntity call = callRepo.findById(id).orElse(null);

        call.setClient_id(callDetails.getClient_id());
        call.setCall_start(callDetails.getCall_start());
        call.setCall_end(callDetails.getCall_end());

        CallEntity updatedCall = callRepo.save(call);
        return ResponseEntity.ok(updatedCall);
    }

    // Delete call
    @DeleteMapping("/call/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCall(@PathVariable Integer id) {
        CallEntity call = callRepo.findById(id).orElse(null);

        callRepo.delete(call);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
