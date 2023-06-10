import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repository/ProductRepository';
import { SalesRepository } from 'src/repository/SalesRepository';
import { MobileRechargeRepository } from 'src/repository/MobileRechargeRepository';
import { SalesLimitRepository } from 'src/repository/SalesLimitRepository';
import { firstValueFrom } from 'rxjs';
import { MobileRecharge } from 'src/entity/MobileRecharge';

export const RECHARGE_API = 'https://www.claro.com/recharge';

@Injectable()
export class MobileRechargeService {
  constructor(
    @Inject('ProductRepository') private productRepository: ProductRepository,
    @Inject('SalesRepository') private salesRepository: SalesRepository,
    @Inject('SalesLimitRepository') private salesLimitRepository: SalesLimitRepository,
    @Inject('MobileRechargeRepository') private mobileRechargeRepository: MobileRechargeRepository,
    private httpService: HttpService,
  ) {}

  async sellRecharge(
    userId: number,
    productId: number,
    operator: string,
    mobileNumber: string,
    value: number,
  ): Promise<void> {
    const product = await this.productRepository.findById(productId);
    if (product == null) {
      throw new Error('Product not found');
    }

    if (!product.enable) {
      throw new Error('Product not enabled');
    }

    const date = new Date();
    const salesLimit = await this.salesLimitRepository.findByUserId(userId);
    const sale = await this.salesRepository.findByUserIdAndDate(userId, date);

    sale.increase(value);

    if (salesLimit > 0 && sale.amount > salesLimit) {
      throw new Error('The user have exceeded the sales limit.');
    }

    const request: RechargeRequest = {
      operator,
      mobileNumber,
      date,
      value,
    };

    const response = await firstValueFrom(this.httpService.post<RechargeReponse>(RECHARGE_API, request));

    const recharge = new MobileRecharge();
    recharge.userId = userId;
    recharge.operator = operator;
    recharge.mobileNumber = mobileNumber;
    recharge.date = date;
    recharge.value = value;
    recharge.providerId = response.data.providerId;

    await this.salesRepository.save(sale);
    await this.mobileRechargeRepository.save(recharge);
  }
}

type RechargeRequest = {
  operator: string;
  mobileNumber: string;
  date: Date;
  value: number;
};

type RechargeReponse = {
  providerId: number;
};
