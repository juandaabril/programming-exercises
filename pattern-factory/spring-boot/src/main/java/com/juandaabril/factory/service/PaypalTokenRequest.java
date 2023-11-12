package com.juandaabril.factory.service;

public class PaypalTokenRequest {
  private String paypalEmail;
  private String paypalPassword;

  public PaypalTokenRequest(String paypalEmail, String paypalPassword) {
    this.paypalEmail = paypalEmail;
    this.paypalPassword = paypalPassword;
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
}
