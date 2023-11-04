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

    @Column(name = "hours_allocated")
    private int hours_allocated;

    @Column(name = "charge_rate")
    private int charge_rate;

    @Column(name = "overtime_rate")
    private int overtime_rate;

}
