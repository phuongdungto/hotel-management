import { Module } from '@nestjs/common';
import { RoomPromotionResolver } from './room-promotion.resolver';
import { RoomPromotionService } from './room-promotion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomPromotion } from './room-promotion.entity';
import { RoomPromotionDetails } from '../room-promotion-detail/room-promotion-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomPromotion, RoomPromotionDetails])],
  providers: [RoomPromotionResolver, RoomPromotionService],
  exports: [RoomPromotionService]
})
export class RoomPromotionModule { }
