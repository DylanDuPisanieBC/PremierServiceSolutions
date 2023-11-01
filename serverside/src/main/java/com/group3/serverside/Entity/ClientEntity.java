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
@Table(name = "Clients")
@NoArgsConstructor
@AllArgsConstructor
public class ClientEntity {
    @Id
    @Column(name = "client_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int client_id;

    @Column(name = "alias")
    private String alias;

    @Column(name = "contract_id")
    private int contract_id;

    @Column(name = "contact_number")
    private String contact_number;

    @Column(name = "client_type")
    private String client_type;

    @Column(name = "address")
    private String address;

    @Column(name = "Email")
    private String email;

}
