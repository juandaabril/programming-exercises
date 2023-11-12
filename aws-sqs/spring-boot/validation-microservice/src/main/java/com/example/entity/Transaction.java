package com.example.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "transactions")
public class Transaction {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private UUID id;

  @Column(name = "transaction_id")
  private UUID transactionId;

  @Column(name = "transaction_date")
  private LocalDate transactionDate;

  @Column(name = "transaction_type")
  private String transactionType;

  @Column(name = "amount")
  private BigDecimal amount;

  @Column(name = "account_number")
  private String accountNumber;

  @Column(name = "description")
  private String description;

  @Column(name = "success")
  private boolean success;
}
