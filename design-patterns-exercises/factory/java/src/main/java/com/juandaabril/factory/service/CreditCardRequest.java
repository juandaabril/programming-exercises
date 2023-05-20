package com.juandaabril.factory.service;

import java.math.BigDecimal;

public class CreditCardRequest {
    private BigDecimal amount;
    private String cardNumber;
    private String cardExpDate;
    private String cardCvv;

    public CreditCardRequest(BigDecimal amount, String cardNumber, String cardExpDate, String cardCvv) {
        this.amount = amount;
        this.cardNumber = cardNumber;
        this.cardExpDate = cardExpDate;
        this.cardCvv = cardCvv;
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

    @Override
    public String toString() {
        return (
            "CreditCardRequest{" +
            "amount=" +
            amount +
            ", cardNumber='" +
            cardNumber +
            '\'' +
            ", cardExpDate='" +
            cardExpDate +
            '\'' +
            ", cardCvv='" +
            cardCvv +
            '\'' +
            '}'
        );
    }
}
