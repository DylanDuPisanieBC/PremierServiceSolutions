package com.group3.serverside.Entity;

import java.time.*;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "calls")
@NoArgsConstructor
@AllArgsConstructor
public class CallEntity {
    @Id
    @Column(name = "call_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int call_id;

    //@ManyToOne
    //@JoinColumn(name = "Client_ID")
    //private ClientEntity client;

    @Column(name = "client_id")
    private int client_id;
    
    @Column(name = "call_start")
    private LocalDateTime call_start;

    @Column(name = "call_end")
    private LocalDateTime call_end;
    
    //@OneToMany(mappedBy = "call", cascade = CascadeType.ALL, orphanRemoval = true)
    //private List<JobEntity> jobs;

    //@JsonManagedReference
    //public List<JobEntity> getJobs(){
    //    return jobs;
    //}
}
