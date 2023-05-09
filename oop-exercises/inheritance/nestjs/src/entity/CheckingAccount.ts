export class CheckingAccount {
  private balance: number;

  constructor(balance: number) {
    this.balance = balance;
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

  public writeCheck(amount: number): void {
    if (this.balance < amount) {
      throw new Error("Insufficient balance to perform the transaction.");
    }
    this.balance -= amount;
  }

  public getBalance(): number {
    return this.balance;
  }
}
