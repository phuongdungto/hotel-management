import { Module } from '@nestjs/common';
import { BillDetailsResolver } from './bill-details.resolver';
import { BillDetailsService } from './bill-details.service';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [ServicesModule],
  providers: [BillDetailsResolver, BillDetailsService]
})
export class BillDetailsModule { }
