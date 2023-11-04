package com.group3.serverside.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group3.serverside.Services.LoginService;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {
    
    @Autowired
    LoginService loginService;

    @PostMapping("/sign_in")
    public int LoginEmployee(@RequestParam String username, @RequestParam String password) {
        return loginService.LoginEmployee(username, password);
    }

    @PostMapping("/register/check_email")
    public int CheckEmailStatus(@RequestParam String email) {
        return loginService.CheckEmailStatus(email);
    }

    @PostMapping("/register/check_username")
    public int CheckUsernameStatus(@RequestParam String username) {
        return loginService.CheckUsernameStatus(username);
    }

    @PostMapping("/register")
    public int RegisterUser(@RequestParam String email, @RequestParam String username, @RequestParam String password) {
        return loginService.RegisterUser(email, username, password);
    }

}
