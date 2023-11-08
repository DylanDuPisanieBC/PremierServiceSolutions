package com.group3.serverside.Services;

import com.group3.serverside.Entity.ClientEntity;
import com.group3.serverside.Entity.JobEntity;

public interface ClientService {
   // ClientEntity saveClient(ClientEntity entity);
    void createClientWithNotification(ClientEntity entity);
}
