package com.example.controller;

import com.example.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TransactionController {

  private final TransactionService transactionService;

  @PostMapping("/transactions")
  public void exportTransactions() {
    transactionService.exportTransactionsAndValidate();
  }
}
