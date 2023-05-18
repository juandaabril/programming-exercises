package com.juandaabril.entity;

public class CreditCardAccount {
    private double balance;
    private double interestRate;

    public CreditCardAccount(double balance, double interestRate) {
        this.balance = balance;
        this.interestRate = interestRate;
    }

    public void deposit(double amount) {
        balance += amount;
    }

    public void charge(double amount) {
        if (balance < amount) {
            throw new RuntimeException("Insufficient balance to perform the transaction.");
        }
        balance -= amount;
    }

    public void withdraw(double amount) {
        if (balance < amount) {
            throw new RuntimeException("Insufficient balance to perform the transaction.");
        }
        balance -= amount;
    }

    public double calculateInterest() {
        return balance * interestRate;
    }

    public double getBalance() {
        return balance;
    }

    public double getInterestRate() {
        return interestRate;
    }
}
