export class BankRequest {
    amount: number;
    bankAccountNumber: string;
    bankRoutingNumber: string;

    constructor(amount: number, bankAccountNumber: string, bankRoutingNumber: string) {
        this.amount = amount;
        this.bankAccountNumber = bankAccountNumber;
        this.bankRoutingNumber = bankRoutingNumber;
    }
}
