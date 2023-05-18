package com.juandaabril.entity;

public class CheckingAccount {
    private double balance;

    public CheckingAccount(double balance) {
        this.balance = balance;
    }

    public void deposit(double amount) {
        balance += amount;
    }

    public void withdraw(double amount) {
        if (balance < amount) {
            throw new RuntimeException("Insufficient balance to perform the transaction.");
        }
        balance -= amount;
    }

    public void writeCheck(double amount) {
        if (balance < amount) {
            throw new RuntimeException("Insufficient balance to perform the transaction.");
        }

        balance -= amount;
    }

    public double getBalance() {
        return balance;
    }
}
