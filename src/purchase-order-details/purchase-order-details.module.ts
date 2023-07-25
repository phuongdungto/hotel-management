import { Module } from '@nestjs/common';
import { PurchaseOrderDetailsResolver } from './purchase-order-details.resolver';
import { PurchaseOrderDetailsService } from './purchase-order-details.service';

@Module({
  providers: [PurchaseOrderDetailsResolver, PurchaseOrderDetailsService]
})
export class PurchaseOrderDetailsModule {}
