import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TransferController } from './TransferController';

@Module({
  imports: [HttpModule],
  controllers: [TransferController],
})
export class AppModule {}
