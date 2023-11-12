import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PaymentController } from './controller/PaymentController';
import { PaymentService } from './service/PaymentService';

@Module({
  imports: [HttpModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class AppModule {}
