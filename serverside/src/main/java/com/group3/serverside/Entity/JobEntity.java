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
@Table(name = "Jobs")
@NoArgsConstructor
@AllArgsConstructor
public class JobEntity {
    @Id
    @Column(name = "job_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int job_id;

    @Column(name = "status")
    private String status;

    @Column(name = "hoc_notes")
    private String hoc_notes;

    @Column(name = "employee_id")
    private int employee_id;

    @Column(name = "call_id")
    private int call_id;

    @Column(name = "required_skills")
    private String required_skills;

    @Column(name = "comments")
    private String comments;

    @Column(name = "priority")
    private String priority;
}
