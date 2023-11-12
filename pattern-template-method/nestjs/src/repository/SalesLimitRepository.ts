export interface SalesLimitRepository {
  findByUserId(userId: number): Promise<number>;
}
