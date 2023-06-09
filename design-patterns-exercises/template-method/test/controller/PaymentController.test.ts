import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PaymentRepository } from '../../src/repository/PaymentRepository';
import { PaymentController } from '../../src/controller/PaymentController';
import {
  CREDIT_BANK_API,
  CREDIT_CARD_API,
  CREDIT_PAYPAL_PAY_API,
  CREDIT_PAYPAL_TOKEN_API,
  PaymentService,
} from '../../src/service/PaymentService';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PaymentRequest } from '../../src/controller/PaymentRequest';
import { mockServer } from '../mock/MockServer';

describe('PaymentController (e2e)', () => {
  let app: INestApplication;
  let paymentRepository: PaymentRepository;
  let httpService: HttpService;

  beforeAll(() => mockServer.listen({ onUnhandledRequest: 'bypass' }));
  afterEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());
  afterAll(() => jest.resetAllMocks());

  beforeEach(async () => {
    paymentRepository = {
      save: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [PaymentController],
      providers: [
        PaymentService,
        {
          provide: 'PaymentRepository',
          useValue: paymentRepository,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();

    httpService = moduleRef.get<HttpService>(HttpService);

    await app.init();
  });

  it('should pay with creditCard', async () => {
    const httpServiceSpy = jest.spyOn(httpService, 'post');
    const paymentRequest = new PaymentRequest();
    paymentRequest.amount = 100000;
    paymentRequest.method = 'credit card';
    paymentRequest.cardNumber = '378282246310005';
    paymentRequest.cardCvv = '123';
    paymentRequest.cardExpDate = '01/01/2023';

    await request(app.getHttpServer()).post('/payment').send(paymentRequest).expect(200);

    expect(httpServiceSpy).toHaveBeenCalledWith(
      CREDIT_CARD_API,
      expect.objectContaining({
        amount: 100000,
        cardCvv: '123',
        cardExpDate: '01/01/2023',
        cardNumber: '378282246310005',
      }),
    );

    expect(paymentRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 100000,
        paymentMethod: 'credit card',
        providerId: 1,
      }),
    );
  });

  it('should pay with paypal', async () => {
    const httpServiceSpy = jest.spyOn(httpService, 'post');
    const paymentRequest = new PaymentRequest();
    paymentRequest.amount = 100000;
    paymentRequest.method = 'PayPal';
    paymentRequest.paypalEmail = 'jhon@gamil.com';
    paymentRequest.paypalPassword = '123456';

    await request(app.getHttpServer()).post('/payment').send(paymentRequest).expect(200);

    expect(httpServiceSpy).toHaveBeenNthCalledWith(
      1,
      CREDIT_PAYPAL_TOKEN_API,
      expect.objectContaining({ paypalEmail: 'jhon@gamil.com', paypalPassword: '123456' }),
    );

    expect(httpServiceSpy).toHaveBeenNthCalledWith(
      2,
      CREDIT_PAYPAL_PAY_API,
      expect.objectContaining({ amount: 100000, token: 1 }),
    );

    expect(paymentRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 100000,
        paymentMethod: 'PayPal',
        providerId: 1,
      }),
    );
  });

  it('should pay with bank transfer', async () => {
    const httpServiceSpy = jest.spyOn(httpService, 'post');
    const paymentRequest = new PaymentRequest();
    paymentRequest.amount = 100000;
    paymentRequest.method = 'bank transfer';
    paymentRequest.bankAccountNumber = '123456789';
    paymentRequest.bankRoutingNumber = '98765';

    await request(app.getHttpServer()).post('/payment').send(paymentRequest).expect(200);

    expect(httpServiceSpy).toHaveBeenCalledWith(
      CREDIT_BANK_API,
      expect.objectContaining({ amount: 100000, bankAccountNumber: '123456789', bankRoutingNumber: '98765' }),
    );

    expect(paymentRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 100000,
        paymentMethod: 'bank transfer',
        providerId: 1,
      }),
    );
  });

  it('should throw error when invalid method', async () => {
    const paymentRequest = new PaymentRequest();
    paymentRequest.amount = 100000;
    paymentRequest.method = 'Invalid Method';

    await request(app.getHttpServer()).post('/payment').send(paymentRequest).expect(500);

    expect(paymentRepository.save).not.toBeCalled();
  });
});
