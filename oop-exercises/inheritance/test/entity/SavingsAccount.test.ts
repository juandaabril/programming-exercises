import { SavingsAccount } from '../../src/entity/SavingsAccount';

describe('SavingsAccount', () => {
  test('should create SavingsAccount with zero balance', () => {
    const savingsAccount = new SavingsAccount(0, 0.5);

    expect(savingsAccount.getBalance()).toBe(0);
    expect(savingsAccount.getInterestRate()).toBe(0.5);
    expect(savingsAccount.calculateInterest()).toBe(0);
  });

  test('should create SavingsAccount with some balance', () => {
    const savingsAccount = new SavingsAccount(100, 0.5);

    expect(savingsAccount.getBalance()).toBe(100);
    expect(savingsAccount.getInterestRate()).toBe(0.5);
    expect(savingsAccount.calculateInterest()).toBe(50);
  });

  test('should add deposit to the account', () => {
    const savingsAccount = new SavingsAccount(100, 0.5);

    savingsAccount.deposit(100);

    expect(savingsAccount.getBalance()).toBe(200);
  });

  test('should withdraw', () => {
    const savingsAccount = new SavingsAccount(100, 0.5);

    savingsAccount.withdraw(50);

    expect(savingsAccount.getBalance()).toBe(50);
  });

  test('should throw an error if dont have sufficient balance', () => {
    const savingsAccount = new SavingsAccount(100, 0.5);

    expect(() => savingsAccount.withdraw(200)).toThrow('Insufficient balance to perform the transaction.');
  });
});
