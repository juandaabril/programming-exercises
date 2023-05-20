import {Payment} from "../entity/Payment";

export interface PaymentRepository {
  save(payment:Payment): Promise<Payment>;
}