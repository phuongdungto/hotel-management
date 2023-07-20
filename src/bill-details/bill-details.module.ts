import { Module } from '@nestjs/common';
import { BillDetailsResolver } from './bill-details.resolver';
import { BillDetailsService } from './bill-details.service';

@Module({
  providers: [BillDetailsResolver, BillDetailsService]
})
export class BillDetailsModule {}
