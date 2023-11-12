package com.juandaabril.factory.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Payment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private String paymentMethod;

  private BigDecimal amount;

  private Integer providerId;
  private LocalDate date;
  private LocalTime time;

  public Payment() {}

  public Payment(
      Integer id,
      String paymentMethod,
      BigDecimal amount,
      Integer providerId,
      LocalDate date,
      LocalTime time) {
    this.id = id;
    this.paymentMethod = paymentMethod;
    this.amount = amount;
    this.providerId = providerId;
    this.date = date;
    this.time = time;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getPaymentMethod() {
    return paymentMethod;
  }

  public void setPaymentMethod(String paymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public Integer getProviderId() {
    return providerId;
  }

  public void setProviderId(Integer providerId) {
    this.providerId = providerId;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public LocalTime getTime() {
    return time;
  }

  public void setTime(LocalTime time) {
    this.time = time;
  }
}
