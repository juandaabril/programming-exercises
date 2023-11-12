package com.example.service;

import com.example.entity.Transaction;
import java.util.Random;
import org.springframework.stereotype.Service;

@Service
public class ValidationService {

  public boolean validate(Transaction transaction) {
    veryComplexProcess();

    // Create a Random boolean
    return validateTransaction(transaction);
  }

  private void veryComplexProcess() {
    // Create a Random object
    Random random = new Random();

    // Generate a random number between 1 and 4 seconds
    int sleepTime = random.nextInt(4) + 1;

    // Convert the sleep time to milliseconds
    long sleepMillis = sleepTime * 1000;

    // Print the sleep time
    System.out.println("Sleeping for " + sleepMillis + " milliseconds");

    // Sleep the thread
    try {
      Thread.sleep(sleepMillis);
    } catch (InterruptedException e) {
      // Handle the exception
      e.printStackTrace();
    }

    // Print a message after waking up
    System.out.println("Woke up!");
  }

  private boolean validateTransaction(Transaction transaction) {
    Random random = new Random();

    System.out.println(transaction);

    return random.nextBoolean();
  }
}
