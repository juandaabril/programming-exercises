package com.juandaabril.entity;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.Test;

class CheckingAccountTest {

  @Test
  public void shouldCreateCheckingAccountWithZeroBalance() {
    CheckingAccount checkingAccount = new CheckingAccount(0);

    assertThat(checkingAccount.getBalance()).isEqualTo(0);
  }

  @Test
  public void shouldCreateCheckingAccountWithSomeBalance() {
    CheckingAccount checkingAccount = new CheckingAccount(100);

    assertThat(checkingAccount.getBalance()).isEqualTo(100);
  }

  @Test
  public void shouldAddDepositToTheAccount() {
    CheckingAccount checkingAccount = new CheckingAccount(100);

    checkingAccount.deposit(100);

    assertThat(checkingAccount.getBalance()).isEqualTo(200);
  }

  @Test
  public void shouldWithDraw() {
    CheckingAccount checkingAccount = new CheckingAccount(100);

    checkingAccount.withdraw(50);

    assertThat(checkingAccount.getBalance()).isEqualTo(50);
  }

  @Test
  public void shouldThrowAnErrorIfDontHaveSufficientBalance() {
    CheckingAccount checkingAccount = new CheckingAccount(100);

    assertThatThrownBy(
            () -> {
              checkingAccount.withdraw(200);
            })
        .hasMessage("Insufficient balance to perform the transaction.");
  }

  @Test
  public void shouldWriteCheck() {
    CheckingAccount checkingAccount = new CheckingAccount(100);

    checkingAccount.writeCheck(50);

    assertThat(checkingAccount.getBalance()).isEqualTo(50);
  }

  @Test
  public void shouldThrowAnErrorIfDontHaveSufficientBalanceWhenWritingACheck() {
    CheckingAccount checkingAccount = new CheckingAccount(100);

    assertThatThrownBy(
            () -> {
              checkingAccount.writeCheck(200);
            })
        .hasMessage("Insufficient balance to perform the transaction.");
  }
}
