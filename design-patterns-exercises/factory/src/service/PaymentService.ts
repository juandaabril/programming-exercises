import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { PaymentRepository } from '../repository/PaymentRepository';
import { CreditCardRequest } from './CreditCardRequest';
import { CreditCardResponse } from './CreditCardResponse';
import { firstValueFrom } from 'rxjs';
import { PaypalTokenRequest } from './PaypalTokenRequest';
import { PaypalTokenResponse } from './PaypalTokenResponse';
import { PaypalPayRequest } from './PaypalPayRequest';
import { BankRequest } from './BankRequest';
import { Payment } from '../entity/Payment';
import { BankResponse } from './BankResponse';

export const CREDIT_CARD_API = 'https://payu/creditCard';
export const CREDIT_PAYPAL_TOKEN_API = 'https://payu/paypayl/token';
export const CREDIT_PAYPAL_PAY_API = 'https://payu/paypayl/pay';
export const CREDIT_BANK_API = 'https://payu/bank';

@Injectable()
export class PaymentService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('PaymentRepository') private readonly paymentRepository: PaymentRepository,
  ) {}

  async pay(
    method: string,
    amount: number,
    cardNumber: string,
    cardExpDate: string,
    cardCvv: string,
    paypalEmail: string,
    paypalPassword: string,
    bankAccountNumber: string,
    bankRoutingNumber: string,
  ): Promise<void> {
    let providerId = null;
    if (method === 'credit card') {
      const request = new CreditCardRequest(amount, cardNumber, cardExpDate, cardCvv);

      const response = await firstValueFrom(this.httpService.post<CreditCardResponse>(CREDIT_CARD_API, request));

      const creditCardResponse = response.data;
      providerId = creditCardResponse.id;
    } else if (method === 'PayPal') {
      const tokenRequest = new PaypalTokenRequest(paypalEmail, paypalPassword);

      const response = await firstValueFrom(
        this.httpService.post<PaypalTokenResponse>(CREDIT_PAYPAL_TOKEN_API, tokenRequest),
      );

      const tokenResponse = response.data;

      const payRequest = new PaypalPayRequest(amount, tokenResponse.id);
      const responsePay = await firstValueFrom(
        this.httpService.post<PaypalTokenResponse>(CREDIT_PAYPAL_PAY_API, payRequest),
      );

      providerId = responsePay.data.id;
    } else if (method === 'bank transfer') {
      const bankRequest = new BankRequest(amount, bankAccountNumber, bankRoutingNumber);

      const bankResponse = await firstValueFrom(this.httpService.post<BankResponse>(CREDIT_BANK_API, bankRequest));

      providerId = bankResponse.data.id;
    } else {
      throw new Error('Método de pago no válido');
    }

    const payment = new Payment(null, method, amount, providerId, new Date());

    await this.paymentRepository.save(payment);
  }
}
