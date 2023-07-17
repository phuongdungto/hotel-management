import { Module, forwardRef } from '@nestjs/common';
import { ServicePromotionDetailsResolver } from './service-promotion-details.resolver';
import { ServicePromotionModule } from '../service-promotion/service-promotion.module';
import { ServicesModule } from '../services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicePromotionDetails } from './service-promotion-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServicePromotionDetails]),
    forwardRef(() => ServicePromotionModule),
    forwardRef(() => ServicesModule),
  ],
  providers: [ServicePromotionDetailsResolver]
})
export class ServicePromotionDetailsModule { }
