import { Module } from '@nestjs/common';
import { ServicesResolver } from './services.resolver';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { ServicePromotionDetails } from '../service-promotion-details/service-promotion-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service, ServicePromotionDetails]),
  ],
  providers: [ServicesResolver, ServicesService],
  exports: [ServicesService]
})
export class ServicesModule { }
