export class PaypalTokenRequest {
    paypalEmail: string;
    paypalPassword: string;

    constructor(paypalEmail: string, paypalPassword: string) {
        this.paypalEmail = paypalEmail;
        this.paypalPassword = paypalPassword;
    }
}
