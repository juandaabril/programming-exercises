import { Sale } from 'src/entity/Sale';

export interface SalesRepository {
  findByUserIdAndDate(userId: number, date: Date): Promise<Sale>;
  save(sale: Sale): Promise<Sale>;
}
