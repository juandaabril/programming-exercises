import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { MockProxy, mock } from 'jest-mock-extended';
import { mockServer } from '../mock/MockServer';
import { MobileRechargeRepository } from '../../src/repository/MobileRechargeRepository';
import { ProductRepository } from '../../src/repository/ProductRepository';
import { SalesLimitRepository } from '../../src/repository/SalesLimitRepository';
import { SalesRepository } from '../../src/repository/SalesRepository';
import { MobileRechargeService } from '../../src/service/MobileRechargeService';

describe('MobileRechargeService', () => {
  let app: INestApplication;
  let mobileRechargeService: MobileRechargeService;
  let httpService: HttpService;
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

    httpService = moduleRef.get<HttpService>(HttpService);
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
});
