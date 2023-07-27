import { Module } from '@nestjs/common';
import { StatisticsResolver } from './statistics.resolver';
import { StatisticsService } from './statistics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from '../bills/bills.entity';
import { BillDetail } from '../bill-details/bill-detail.entity';
import { PurchasesOrder } from '../purchase-order/purchase-order.entity';
import { BillsModule } from '../bills/bills.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, BillDetail, PurchasesOrder]),
    BillsModule
  ],
  providers: [StatisticsResolver, StatisticsService]
})
export class StatisticsModule { }
