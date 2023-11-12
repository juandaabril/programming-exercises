package com.example.service;

import com.example.entity.Transaction;
import com.example.repository.TransactionRepository;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProcessService {

    private final ValidationService validationService;
    private final TransactionRepository transactionRepository;
    private final NotificationService notificationService;

    public void process(Resource resource) {
        List<Transaction> transactions = parseCsv(resource);

        for (Transaction transaction : transactions) {
            boolean result = validationService.validate(transaction);
            transaction.setSuccess(result);

            transactionRepository.save(transaction);

            if (!transaction.isSuccess()) {
                notificationService.notify(transaction);
            }
        }
    }

    @SneakyThrows
    private List<Transaction> parseCsv(Resource resource) {
        // Create a list to hold the transactions
        List<Transaction> transactions = new ArrayList<>();

        // Create a CSV reader
        try (BufferedReader reader =
                new BufferedReader(new InputStreamReader(resource.getInputStream()))) {

            // Read the header
            String header = reader.readLine();

            // Read the transactions
            String line;
            while ((line = reader.readLine()) != null) {
                // Split the line into columns
                String[] columns = line.split(",");

                // Create a transaction
                Transaction transaction = new Transaction();
                transaction.setId(UUID.randomUUID());
                transaction.setTransactionId(UUID.fromString(columns[0]));
                transaction.setTransactionDate(LocalDate.parse(columns[1]));
                transaction.setTransactionType(columns[2]);
                transaction.setAmount(new BigDecimal(columns[3]));
                transaction.setAccountNumber(columns[4]);
                transaction.setDescription(columns[5]);

                // Add the transaction to the list
                transactions.add(transaction);
            }
        }

        return transactions;
    }
}
