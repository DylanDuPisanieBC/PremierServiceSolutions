package com.group3.serverside.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "Employees")
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeEntity {
    @Id
    @Column(name = "employee_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int employee_id;

    @Column(name = "full_name")
    private String full_name;

    @Column(name = "branch")
    private String branch;

    @Column(name = "phone_number")
    private String phone_number;

    @Column(name = "skills")
    private String skills;

    @Column(name = "type")
    private String type;

    @Column(name = "email")
    private String email;
}