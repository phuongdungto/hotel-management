import { Module } from '@nestjs/common';
import { ServicePromotionResolver } from './service-promotion.resolver';
import { ServicePromotionService } from './service-promotion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicePromotion } from './service-promotion.entity';
import { ServicePromotionDetails } from '../service-promotion-details/service-promotion-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServicePromotion, ServicePromotionDetails])],
  providers: [ServicePromotionResolver, ServicePromotionService],
  exports: [ServicePromotionService]
})
export class ServicePromotionModule { }
