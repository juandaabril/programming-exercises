import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MockProxy, mock } from 'jest-mock-extended';
import { mockServer } from '../mock/MockServer';
import { MobileRechargeRepository } from '../../src/repository/MobileRechargeRepository';
import { ProductRepository } from '../../src/repository/ProductRepository';
import { SalesLimitRepository } from '../../src/repository/SalesLimitRepository';
import { SalesRepository } from '../../src/repository/SalesRepository';
import { MobileRechargeService } from '../../src/service/MobileRechargeService';
import { Product } from '../../src/entity/Product';
import { Sale } from '../../src/entity/Sale';

describe('MobileRechargeService', () => {
  let app: INestApplication;
  let mobileRechargeService: MobileRechargeService;
  let mobileRechargeRepository: MockProxy<MobileRechargeRepository>;
  let productRepository: MockProxy<ProductRepository>;
  let salesRepository: MockProxy<SalesRepository>;
  let salesLimitRepository: MockProxy<SalesLimitRepository>;

  beforeAll(() => mockServer.listen({ onUnhandledRequest: 'bypass' }));
  afterEach(() => mockServer.resetHandlers());
  afterAll(() => mockServer.close());
  afterAll(() => jest.resetAllMocks());

  beforeEach(async () => {
    productRepository = mock<ProductRepository>();
    salesRepository = mock<SalesRepository>();
    salesLimitRepository = mock<SalesLimitRepository>();
    mobileRechargeRepository = mock<MobileRechargeRepository>();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        MobileRechargeService,
        {
          provide: 'SalesLimitRepository',
          useValue: salesLimitRepository,
        },
        {
          provide: 'SalesRepository',
          useValue: salesRepository,
        },
        {
          provide: 'ProductRepository',
          useValue: productRepository,
        },
        {
          provide: 'MobileRechargeRepository',
          useValue: mobileRechargeRepository,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    mobileRechargeService = moduleRef.get<MobileRechargeService>(MobileRechargeService);

    await app.init();
  });

  test('should throw product not found', async () => {
    const userId = 1;
    const productId = 1;
    const operator = 'CLARO';
    const mobileNumber = '311-123-1234';
    const value = 10000;

    productRepository.findById.mockResolvedValue(null);

    await expect(async () => {
      await mobileRechargeService.sellRecharge(userId, productId, operator, mobileNumber, value);
    }).rejects.toThrow('Product not found');
  });

  test('should throw product not enable', async () => {
    const userId = 1;
    const productId = 1;
    const operator = 'CLARO';
    const mobileNumber = '311-123-1234';
    const value = 10000;

    const product = new Product();
    product.id = 1;
    product.name = 'Mobile Rechager';
    product.enable = false;

    productRepository.findById.mockResolvedValue(product);

    await expect(async () => {
      await mobileRechargeService.sellRecharge(userId, productId, operator, mobileNumber, value);
    }).rejects.toThrow('Product not enabled');
  });

  test('should throw exceeded the sales limit.', async () => {
    const userId = 1;
    const productId = 1;
    const operator = 'CLARO';
    const mobileNumber = '311-123-1234';
    const value = 10000;

    const product = new Product();
    product.id = 1;
    product.name = 'Mobile Rechager';
    product.enable = true;

    const salesLimit = 1000;
    const sale = new Sale();
    sale.amount = 1000;

    productRepository.findById.mockResolvedValue(product);
    salesLimitRepository.findByUserId.mockResolvedValue(salesLimit);
    salesRepository.findByUserIdAndDate.mockResolvedValue(sale);

    await expect(async () => {
      await mobileRechargeService.sellRecharge(userId, productId, operator, mobileNumber, value);
    }).rejects.toThrow('The user have exceeded the sales limit.');
  });

  test('should sell a mobile recharge.', async () => {
    const userId = 1;
    const productId = 1;
    const operator = 'CLARO';
    const mobileNumber = '311-123-1234';
    const value = 500;

    const product = new Product();
    product.id = 1;
    product.name = 'Mobile Rechager';
    product.enable = true;

    const salesLimit = 1000;
    const sale = new Sale();
    sale.amount = 100;

    productRepository.findById.mockResolvedValue(product);
    salesLimitRepository.findByUserId.mockResolvedValue(salesLimit);
    salesRepository.findByUserIdAndDate.mockResolvedValue(sale);

    await mobileRechargeService.sellRecharge(userId, productId, operator, mobileNumber, value);

    expect(salesRepository.save).toHaveBeenCalledTimes(1);
    expect(salesRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 600,
      }),
    );

    expect(mobileRechargeRepository.save).toHaveBeenCalledTimes(1);
    expect(mobileRechargeRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        mobileNumber: '311-123-1234',
        operator: 'CLARO',
        providerId: 1,
        userId: 1,
        value: 500,
      }),
    );
  });
});
