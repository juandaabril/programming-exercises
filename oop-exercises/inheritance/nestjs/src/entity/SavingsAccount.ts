export class SavingsAccount {
  private balance: number;
  private interestRate: number;

  constructor(balance: number, interestRate: number) {
    this.balance = balance;
    this.interestRate = interestRate;
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }

  public withdraw(amount: number): void {
    if (this.balance < amount) {
      throw new Error("Insufficient balance to perform the transaction.");
    }
    this.balance -= amount;
  }

  public calculateInterest(): number {
    return this.balance * this.interestRate;
  }

  public getBalance(): number {
    return this.balance;
  }

  public getInterestRate(): number {
    return this.interestRate;
  }
}
