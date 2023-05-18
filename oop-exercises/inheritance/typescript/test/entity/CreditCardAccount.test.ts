import { CreditCardAccount } from "../../src/entity/CreditCardAccount";

describe('CreditCardAccount', () => {
  it('should create credit card account with zero balance', () => {
    const creditCardAccount = new CreditCardAccount(0, 0.5);

    expect(creditCardAccount.getBalance()).toEqual(0);
    expect(creditCardAccount.getInterestRate()).toEqual(0.5);
    expect(creditCardAccount.calculateInterest()).toEqual(0);
  });

  it('should create credit card account with some balance', () => {
    const creditCardAccount = new CreditCardAccount(100, 0.5);

    expect(creditCardAccount.getBalance()).toEqual(100);
    expect(creditCardAccount.getInterestRate()).toEqual(0.5);
    expect(creditCardAccount.calculateInterest()).toEqual(50);
  });

  it('should add deposit to the account', () => {
    const creditCardAccount = new CreditCardAccount(100, 0.5);

    creditCardAccount.deposit(100);

    expect(creditCardAccount.getBalance()).toEqual(200);
  });

  it('should withdraw', () => {
    const creditCardAccount = new CreditCardAccount(100, 0.5);

    creditCardAccount.withdraw(50);

    expect(creditCardAccount.getBalance()).toEqual(50);
  });

  it('should throw an error if dont have sufficient balance', () => {
    const creditCardAccount = new CreditCardAccount(100, 0.5);

    expect(() => {
      creditCardAccount.withdraw(200);
    }).toThrowError('Insufficient balance to perform the transaction.');
  });

  it('should charge', () => {
    const creditCardAccount = new CreditCardAccount(100, 0.5);

    creditCardAccount.charge(50);

    expect(creditCardAccount.getBalance()).toEqual(50);
  });

  it('should throw an error if dont have sufficient balance when charging', () => {
    const creditCardAccount = new CreditCardAccount(100, 0.5);

    expect(() => {
      creditCardAccount.charge(200);
    }).toThrowError('Insufficient balance to perform the transaction.');
  });
});
