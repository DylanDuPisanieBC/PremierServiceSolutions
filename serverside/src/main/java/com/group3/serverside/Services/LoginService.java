package com.group3.serverside.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group3.serverside.Entity.EmployeeEntity;
import com.group3.serverside.Repository.EmployeeRepo;

@Service
public class LoginService {
    
@Autowired
EmployeeRepo employeeRepo;


public int LoginEmployee(String username, String password){
    EmployeeEntity employee = employeeRepo.findByUsernameAndPassword(username, password);
    if(employee != null){
        return employee.getEmployee_id();
    }
    return 0;
}

public int CheckEmailStatus(String email){
    EmployeeEntity employee = employeeRepo.findByEmail(email);

    if(employee != null){
        if(employee.getPassword() != null){
            return 2;
        }else{
            return 3;
        }
    }else{
        return 1;
    }

}

public int CheckUsernameStatus(String username){
    EmployeeEntity employees = employeeRepo.findByUsername(username);

    if(employees != null){
        return 2;
    }else{
        return 1;
    }

}

public int RegisterUser(String email, String username, String password){

    try{
    EmployeeEntity employee = employeeRepo.findByEmail(email);

    employee.setUsername(username);
    employee.setPassword(password);
    employeeRepo.save(employee);
    return 1;
    }
    catch(Exception e){
        System.out.println(e.getMessage());
        return 0;
    }


}

}
