export class Payment {
  id: number;
  paymentMethod: string;
  amount: number;
  providerId: number;
  date: Date;

  constructor(id: number, paymentMethod: string, amount: number, providerId: number, date: Date) {
    this.id = id;
    this.paymentMethod = paymentMethod;
    this.amount = amount;
    this.providerId = providerId;
    this.date = date;
  }
}
