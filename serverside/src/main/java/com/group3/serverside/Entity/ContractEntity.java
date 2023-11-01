package com.group3.serverside.Entity;

import java.time.*;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "Contracts")
@NoArgsConstructor
@AllArgsConstructor
public class ContractEntity {
    @Id
    @Column(name = "contract_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int contract_id;

    @Column(name = "type")
    private String type;

    @Column(name = "status")
    private String status;

    @Column(name = "start_date")
    private LocalDateTime start_date;

    @Column(name = "end_date")
    private LocalDateTime end_date;

    //@OneToOne(mappedBy = "contract", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //private ClientEntity client;
}
