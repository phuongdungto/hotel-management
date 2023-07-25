import { Module, forwardRef } from '@nestjs/common';
import { ProvidersResolver } from './providers.resolver';
import { ProvidersService } from './providers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Providers } from './providers.entity';
import { PurchaseOrderModule } from '../purchase-order/purchase-order.module';

@Module({
  imports: [TypeOrmModule.forFeature([Providers]),
  forwardRef(() => PurchaseOrderModule)
  ],
  providers: [ProvidersResolver, ProvidersService],
  exports: [ProvidersService]
})
export class ProvidersModule { }
