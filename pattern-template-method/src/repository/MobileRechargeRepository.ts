import { MobileRecharge } from 'src/entity/MobileRecharge';

export interface MobileRechargeRepository {
  save(mobileRecharge: MobileRecharge): Promise<MobileRecharge>;
}
