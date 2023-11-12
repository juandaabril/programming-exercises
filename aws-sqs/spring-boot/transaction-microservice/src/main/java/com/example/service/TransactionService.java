package com.example.service;

import com.example.entity.Transaction;
import com.example.repository.TransactionRepository;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransactionService {

  private final TransactionRepository transactionRepository;
  private final FileService fileService;

  @SneakyThrows
  public void exportTransactionsAndValidate() {
    List<Transaction> transactions = transactionRepository.findAll();

    // Create a CSV writer
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(outputStream));

    // Write the header
    bufferedWriter.write(
        "id,transaction_date,transaction_type,amount,account_number,description\n");

    // Write the transactions
    for (Transaction transaction : transactions) {
      bufferedWriter.write(
          String.format(
              "%s,%s,%s,%s,%s,%s\n",
              transaction.getId(),
              transaction.getTransactionDate(),
              transaction.getTransactionType(),
              transaction.getAmount(),
              transaction.getAccountNumber(),
              transaction.getDescription()));
    }

    // Close the writer
    bufferedWriter.close();

    Resource resource = new ByteArrayResource(outputStream.toByteArray());

    fileService.send(resource);
  }
}
