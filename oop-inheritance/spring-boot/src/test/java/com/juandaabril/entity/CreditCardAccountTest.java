package com.juandaabril.entity;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;

class CreditCardAccountTest {

  @Test
  public void shouldCreateCreditCardAccountWithZeroBalance() {
    CreditCardAccount creditCardAccount = new CreditCardAccount(0, 0.5);

    assertThat(creditCardAccount.getBalance()).isEqualTo(0);
    assertThat(creditCardAccount.getInterestRate()).isEqualTo(0.5);
    assertThat(creditCardAccount.calculateInterest()).isEqualTo(0);
  }

  @Test
  public void shouldCreateCreditCardAccountWithSomeBalance() {
    CreditCardAccount creditCardAccount = new CreditCardAccount(100, 0.5);

    assertThat(creditCardAccount.getBalance()).isEqualTo(100);
    assertThat(creditCardAccount.getInterestRate()).isEqualTo(0.5);
    assertThat(creditCardAccount.calculateInterest()).isEqualTo(50);
  }

  @Test
  public void shouldAddDepositToTheAccount() {
    CreditCardAccount creditCardAccount = new CreditCardAccount(100, 0.5);

    creditCardAccount.deposit(100);

    assertThat(creditCardAccount.getBalance()).isEqualTo(200);
  }

  @Test
  public void shouldWithDraw() {
    CreditCardAccount creditCardAccount = new CreditCardAccount(100, 0.5);

    creditCardAccount.withdraw(50);

    assertThat(creditCardAccount.getBalance()).isEqualTo(50);
  }

  @Test
  public void shouldThrowAnErrorIfDontHaveSufficientBalance() {
    CreditCardAccount creditCardAccount = new CreditCardAccount(100, 0.5);

    assertThatThrownBy(
            () -> {
              creditCardAccount.withdraw(200);
            })
        .hasMessage("Insufficient balance to perform the transaction.");
  }

  public void shouldCharge() {
    CreditCardAccount creditCardAccount = new CreditCardAccount(100, 0.5);

    creditCardAccount.charge(50);

    assertThat(creditCardAccount.getBalance()).isEqualTo(50);
  }

  @Test
  public void shouldThrowAnErrorIfDontHaveSufficientBalanceWhenCharging() {
    CreditCardAccount creditCardAccount = new CreditCardAccount(100, 0.5);

    assertThatThrownBy(
            () -> {
              creditCardAccount.charge(200);
            })
        .hasMessage("Insufficient balance to perform the transaction.");
  }
}
