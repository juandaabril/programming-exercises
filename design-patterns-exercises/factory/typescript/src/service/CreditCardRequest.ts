export class CreditCardRequest {
    amount: number;
    cardNumber: string;
    cardExpDate: string;
    cardCvv: string;

    constructor(amount: number, cardNumber: string, cardExpDate: string, cardCvv: string) {
        this.amount = amount;
        this.cardNumber = cardNumber;
        this.cardExpDate = cardExpDate;
        this.cardCvv = cardCvv;
    }
}
