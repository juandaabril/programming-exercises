import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PaymentService } from '../service/PaymentService';
import { PaymentRequest } from './PaymentRequest';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/payment')
  @HttpCode(200)
  async pay(@Body() request: PaymentRequest) {
    await this.paymentService.pay(
      request.method,
      request.amount,
      request.cardNumber,
      request.cardExpDate,
      request.cardCvv,
      request.paypalEmail,
      request.paypalPassword,
      request.bankAccountNumber,
      request.bankRoutingNumber,
    );
  }
}
