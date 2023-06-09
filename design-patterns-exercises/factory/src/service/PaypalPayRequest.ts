export class PaypalPayRequest {
  amount: number;
  token: number;

  constructor(amount: number, token: number) {
    this.amount = amount;
    this.token = token;
  }
}
