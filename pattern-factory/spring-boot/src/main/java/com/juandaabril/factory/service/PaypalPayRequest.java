package com.juandaabril.factory.service;

import java.math.BigDecimal;

public class PaypalPayRequest {
  private BigDecimal amount;
  private Integer token;

  public PaypalPayRequest(BigDecimal amount, Integer token) {
    this.amount = amount;
    this.token = token;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public void setAmount(BigDecimal amount) {
    this.amount = amount;
  }

  public Integer getToken() {
    return token;
  }

  public void setToken(Integer token) {
    this.token = token;
  }

  @Override
  public String toString() {
    return "PaypalPayRequest{" + "amount=" + amount + ", token='" + token + '\'' + '}';
  }
}
