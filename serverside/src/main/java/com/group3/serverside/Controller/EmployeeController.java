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

import com.group3.serverside.Entity.EmployeeEntity;
import com.group3.serverside.Exception.ResourceNotFoundException;
import com.group3.serverside.Repository.EmployeeRepo;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
    
    @Autowired
    private EmployeeRepo employeeRepo;

    // get all employees
    @GetMapping("/employees")
    public List<EmployeeEntity> getAllEmployees(){
        return employeeRepo.findAll();
    }

    // Get by id
    @GetMapping("/employee/{id}")
    public ResponseEntity<EmployeeEntity> getEmployeeById(@PathVariable Integer id){
        EmployeeEntity employee = employeeRepo.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id: " + id));

        return ResponseEntity.ok(employee);
    }

    // Add employee
    @PostMapping("/employee/add")
    public int createEmployee(@RequestParam String full_name, @RequestParam String branch, @RequestParam String phone_number, @RequestParam String skills, @RequestParam String type, @RequestParam String email) {
        System.out.println("Api Call Received");
        EmployeeEntity newEmployee = new EmployeeEntity();

        newEmployee.setFull_name(full_name);
        newEmployee.setBranch(branch);
        newEmployee.setPhone_number(phone_number);
        newEmployee.setSkills(skills);
        newEmployee.setType(type);
        newEmployee.setEmail(email);


        try{
            System.out.println("Try To Save Employee");
            employeeRepo.save(newEmployee);
            return 1;
        }catch(Exception e){
            System.out.println("Could not save Employee");
            System.out.println(e.getMessage());
            return 0;
        }

    }

    @PostMapping("/employee/check_email")
    public boolean CheckEmail(@RequestParam String email) {
        
        EmployeeEntity dupe = employeeRepo.findByEmail(email);

        if(dupe == null){return true;}else{ return false;}

    }

    // Update employee
    @PutMapping("/employee/update/{id}")
    public int updateEmployee(@PathVariable Integer id, @RequestParam String full_name, @RequestParam String branch, @RequestParam String phone_number, @RequestParam String skills, @RequestParam String type, @RequestParam String email) {
        try{
            EmployeeEntity employee = employeeRepo.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id: " + id));

            employee.setFull_name(full_name);
            employee.setBranch(branch);
            employee.setPhone_number(phone_number);
            employee.setSkills(skills);
            employee.setType(type);
            employee.setEmail(email);

            employeeRepo.save(employee);
            return 1;
        }catch(Exception e){
            System.out.println(e.getMessage());
            return 0;
        }
    }

    // Delete employee
    @DeleteMapping("/employee/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Integer id) {
        EmployeeEntity employee = employeeRepo.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Employee does not exist with id: " + id));

        employeeRepo.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
