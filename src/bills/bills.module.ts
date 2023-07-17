import { Module } from '@nestjs/common';
import { BillsResolver } from './bills.resolver';
import { BillsService } from './bills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './bills.entity';
import { BillDetail } from '../bill-details/bill-detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Bill, BillDetail])],
  providers: [BillsResolver, BillsService]
})
export class BillsModule {}
