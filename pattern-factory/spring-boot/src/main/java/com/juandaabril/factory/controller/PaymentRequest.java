package com.juandaabril.factory.controller;

import java.math.BigDecimal;

public class PaymentRequest {
  private String method;
  private BigDecimal amount;
  private String cardNumber;
  private String cardExpDate;

  private String cardCvv;
  private String paypalEmail;
  private String paypalPassword;
  private String bankAccountNumber;
  private String bankRoutingNumber;

  public String getMethod() {
    return method;
  }

  public void setMethod(String method) {
    this.method = method;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public String getCardNumber() {
    return cardNumber;
  }

  public void setCardNumber(String cardNumber) {
    this.cardNumber = cardNumber;
  }

  public String getCardExpDate() {
    return cardExpDate;
  }

  public void setCardExpDate(String cardExpDate) {
    this.cardExpDate = cardExpDate;
  }

  public String getCardCvv() {
    return cardCvv;
  }

  public void setCardCvv(String cardCvv) {
    this.cardCvv = cardCvv;
  }

  public String getPaypalEmail() {
    return paypalEmail;
  }

  public void setPaypalEmail(String paypalEmail) {
    this.paypalEmail = paypalEmail;
  }

  public String getPaypalPassword() {
    return paypalPassword;
  }

  public void setPaypalPassword(String paypalPassword) {
    this.paypalPassword = paypalPassword;
  }

  public String getBankAccountNumber() {
    return bankAccountNumber;
  }

  public void setBankAccountNumber(String bankAccountNumber) {
    this.bankAccountNumber = bankAccountNumber;
  }

  public String getBankRoutingNumber() {
    return bankRoutingNumber;
  }

  public void setBankRoutingNumber(String bankRoutingNumber) {
    this.bankRoutingNumber = bankRoutingNumber;
  }
}
