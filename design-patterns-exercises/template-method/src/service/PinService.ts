import { Inject, Injectable } from '@nestjs/common';
import { Pin } from '../entity/Pin';
import { PinRepository } from '../repository/PinRepository';
import { ProductRepository } from '../repository/ProductRepository';
import { SalesLimitRepository } from '../repository/SalesLimitRepository';
import { SalesRepository } from '../repository/SalesRepository';

@Injectable()
export class PinService {
  constructor(
    @Inject('ProductRepository') private productRepository: ProductRepository,
    @Inject('SalesRepository') private salesRepository: SalesRepository,
    @Inject('SalesLimitRepository') private salesLimitRepository: SalesLimitRepository,
    @Inject('PinRepository') private pinRepository: PinRepository,
  ) {}

  async sellPin(userId: number, productId: number, value: number): Promise<void> {
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

    const pinNumber = await this.pinRepository.createRandomPinNumber();
    const pin = new Pin();

    pin.userId = userId;
    pin.pinNumber = pinNumber;
    pin.date = date;
    pin.value = value;

    await this.salesRepository.save(sale);
    await this.pinRepository.save(pin);
  }
}
