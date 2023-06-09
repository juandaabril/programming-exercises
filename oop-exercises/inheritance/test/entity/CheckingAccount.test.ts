import { CheckingAccount } from '../../src/entity/CheckingAccount';

describe('CheckingAccount', () => {
  test('should create CheckingAccount with zero balance', () => {
    const checkingAccount = new CheckingAccount(0);

    expect(checkingAccount.getBalance()).toEqual(0);
  });

  test('should create CheckingAccount with some balance', () => {
    const checkingAccount = new CheckingAccount(100);

    expect(checkingAccount.getBalance()).toEqual(100);
  });

  test('should add deposit to the account', () => {
    const checkingAccount = new CheckingAccount(100);

    checkingAccount.deposit(100);

    expect(checkingAccount.getBalance()).toEqual(200);
  });

  test('should withdraw', () => {
    const checkingAccount = new CheckingAccount(100);

    checkingAccount.withdraw(50);

    expect(checkingAccount.getBalance()).toEqual(50);
  });

  test("should throw an error if don't have sufficient balance", () => {
    const checkingAccount = new CheckingAccount(100);

    expect(() => {
      checkingAccount.withdraw(200);
    }).toThrowError('Insufficient balance to perform the transaction.');
  });

  test('should write check', () => {
    const checkingAccount = new CheckingAccount(100);

    checkingAccount.writeCheck(50);

    expect(checkingAccount.getBalance()).toEqual(50);
  });

  test("should throw an error if don't have sufficient balance when writing a check", () => {
    const checkingAccount = new CheckingAccount(100);

    expect(() => {
      checkingAccount.writeCheck(200);
    }).toThrowError('Insufficient balance to perform the transaction.');
  });
});
