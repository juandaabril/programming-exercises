import { Product } from 'src/entity/Product';

export interface ProductRepository {
  findById(productId: number): Promise<Product>;
}
