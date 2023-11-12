package com.juandaabril.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;

class SavingsAccountTest {

  @Test
  public void shouldCreateSavingsAccountWithZeroBalance() {
    SavingsAccount savingsAccount = new SavingsAccount(0, 0.5);

    assertThat(savingsAccount.getBalance()).isEqualTo(0);
    assertThat(savingsAccount.getInterestRate()).isEqualTo(0.5);
    assertThat(savingsAccount.calculateInterest()).isEqualTo(0);
  }

  @Test
  public void shouldCreateSavingsAccountWithSomeBalance() {
    SavingsAccount savingsAccount = new SavingsAccount(100, 0.5);

    assertThat(savingsAccount.getBalance()).isEqualTo(100);
    assertThat(savingsAccount.getInterestRate()).isEqualTo(0.5);
    assertThat(savingsAccount.calculateInterest()).isEqualTo(50);
  }

  @Test
  public void shouldAddDepositToTheAccount() {
    SavingsAccount savingsAccount = new SavingsAccount(100, 0.5);

    savingsAccount.deposit(100);

    assertThat(savingsAccount.getBalance()).isEqualTo(200);
  }

  @Test
  public void shouldWithDraw() {
    SavingsAccount savingsAccount = new SavingsAccount(100, 0.5);

    savingsAccount.withdraw(50);

    assertThat(savingsAccount.getBalance()).isEqualTo(50);
  }

  @Test
  public void shouldThrowAnErrorIfDontHaveSufficientBalance() {
    SavingsAccount savingsAccount = new SavingsAccount(100, 0.5);

    assertThatThrownBy(
            () -> {
              savingsAccount.withdraw(200);
            })
        .hasMessage("Insufficient balance to perform the transaction.");
  }
}
