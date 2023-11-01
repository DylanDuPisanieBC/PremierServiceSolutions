package com.group3.serverside.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group3.serverside.Entity.LoginEntity;
import com.group3.serverside.Repository.LoginRepo;

@RestController
@RequestMapping("/api/v1/")
public class LoginController {
    
    @Autowired
    private LoginRepo loginRepo;

    @PostMapping("/register")
    public LoginEntity registerUser(@RequestBody LoginEntity login) {
        return loginRepo.save(login);
    }
}
