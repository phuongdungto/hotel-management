import { Module, forwardRef } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrderResolver } from './purchase-order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchasesOrder } from './purchase-order.entity';
import { PurchasesOrderDetail } from '../purchase-order-details/purchase-order-details.entity';
import { PurchaseOrderDetailsModule } from '../purchase-order-details/purchase-order-details.module';
import { ProvidersModule } from '../providers/providers.module';

@Module({
  imports: [TypeOrmModule.forFeature([PurchasesOrder, PurchasesOrderDetail]),
  forwardRef(() => ProvidersModule),
  forwardRef(() => PurchaseOrderDetailsModule)
  ],
  providers: [PurchaseOrderService, PurchaseOrderResolver],
  exports: [PurchaseOrderService]
})
export class PurchaseOrderModule { }
