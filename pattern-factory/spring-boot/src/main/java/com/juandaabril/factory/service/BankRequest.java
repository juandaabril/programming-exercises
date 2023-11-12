package com.juandaabril.factory.service;

import java.math.BigDecimal;

public class BankRequest {
    private BigDecimal amount;
    private String bankAccountNumber;
    private String bankRoutingNumber;

    public BankRequest(BigDecimal amount, String bankAccountNumber, String bankRoutingNumber) {
        this.amount = amount;
        this.bankAccountNumber = bankAccountNumber;
        this.bankRoutingNumber = bankRoutingNumber;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
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

    @Override
    public String toString() {
        return (
            "BankRequest{" +
            "amount=" +
            amount +
            ", bankAccountNumber='" +
            bankAccountNumber +
            '\'' +
            ", bankRoutingNumber='" +
            bankRoutingNumber +
            '\'' +
            '}'
        );
    }
}
