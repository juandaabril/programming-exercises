export class Sale {
  id: number;
  userId: number;
  amount: number;
  date: Date;

  increase(amount: number) {
    this.amount += amount;
  }
}
