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

import com.group3.serverside.Entity.EmployeeEntity;
import com.group3.serverside.Repository.EmployeeRepo;

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
        EmployeeEntity employee = employeeRepo.findById(id).orElse(null);
        return ResponseEntity.ok(employee);
    }

    // Add employee
    @PostMapping("/addEmployee")
    public EmployeeEntity createEmployee(@RequestBody EmployeeEntity employee) {
        return employeeRepo.save(employee);
    }

    // Update employee
    @PutMapping("/employee/update/{id}")
    public ResponseEntity<EmployeeEntity> updateEmployee(@PathVariable Integer id, @RequestBody EmployeeEntity employeeDetails) {
        EmployeeEntity employee = employeeRepo.findById(id).orElse(null);

        employee.setFull_name(employeeDetails.getFull_name());
        employee.setBranch(employeeDetails.getBranch());
        employee.setPhone_number(employeeDetails.getPhone_number());
        employee.setSkills(employeeDetails.getSkills());
        employee.setType(employeeDetails.getSkills());
        employee.setEmail(employeeDetails.getEmail());

        EmployeeEntity updatedEmployee = employeeRepo.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    // Delete employee
    @DeleteMapping("/employee/delete/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Integer id) {
        EmployeeEntity employee = employeeRepo.findById(id).orElse(null);

        employeeRepo.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
