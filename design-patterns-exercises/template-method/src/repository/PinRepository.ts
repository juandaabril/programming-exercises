import { Pin } from 'src/entity/Pin';

export interface PinRepository {
  createRandomPinNumber(): Promise<string>;
  save(pin: Pin): Promise<Pin>;
}
