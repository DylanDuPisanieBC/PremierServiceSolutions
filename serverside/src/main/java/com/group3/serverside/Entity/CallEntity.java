package com.group3.serverside.Entity;

import java.time.*;

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
@Table(name = "calls")
@NoArgsConstructor
@AllArgsConstructor
public class CallEntity {
    @Id
    @Column(name = "call_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int call_id;

    @Column(name = "client_id")
    private int client_id;
    
    @Column(name = "call_start")
    private LocalDateTime call_start;

    @Column(name = "call_end")
    private LocalDateTime call_end;

}
