package com.group3.serverside.Controller;

import java.time.LocalDateTime;
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

import com.group3.serverside.Entity.CallEntity;
import com.group3.serverside.Exception.ResourceNotFoundException;
import com.group3.serverside.Repository.CallRepo;

@CrossOrigin(origins = "http://localhost:5173")
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
        CallEntity call = callRepo.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Call does not exist with id: " + id));

        return ResponseEntity.ok(call);
    }

    // Add call
    @PostMapping("/addCall")
    public int createCall(@RequestParam int client_id, @RequestParam LocalDateTime call_start, @RequestParam LocalDateTime call_end) {
        
        try{
            System.out.println("Api Call Received");
            CallEntity newCall = new CallEntity();

            newCall.setClient_id(client_id);
            newCall.setCall_start(call_start);
            newCall.setCall_end(call_end);

            callRepo.save(newCall);
            return 1;
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
        return 0;
    }

    // Update call
    @PutMapping("/call/update/{id}")
    public ResponseEntity<CallEntity> updateCall(@PathVariable Integer id, @RequestBody CallEntity callDetails) {
        CallEntity call = callRepo.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Call does not exist with id: " + id));

        call.setClient_id(callDetails.getClient_id());
        call.setCall_start(callDetails.getCall_start());
        call.setCall_end(callDetails.getCall_end());

        CallEntity updatedCall = callRepo.save(call);
        return ResponseEntity.ok(updatedCall);
    }

    // Delete call
    @DeleteMapping("/call/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCall(@PathVariable Integer id) {
        CallEntity call = callRepo.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Call does not exist with id: " + id));

        callRepo.delete(call);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
