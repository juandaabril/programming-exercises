package com.example.service;

import com.example.entity.Transaction;
import lombok.extern.java.Log;
import org.springframework.stereotype.Service;

@Service
@Log
public class NotificationService {

    public void notify(Transaction transaction) {
        log.info("Send notification for:" + transaction);
    }
}
