import { Module, forwardRef } from '@nestjs/common';
import { RoomPromotionDetailResolver } from './room-promotion-detail.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomPromotionDetails } from './room-promotion-detail.entity';
import { RoomPromotionModule } from '../room-promotion/room-promotion.module';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomPromotionDetails]),
    forwardRef(() => RoomPromotionModule),
    forwardRef(() => RoomsModule),
  ],
  providers: [RoomPromotionDetailResolver]
})
export class RoomPromotionDetailModule { }
