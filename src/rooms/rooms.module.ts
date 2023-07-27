import { Module, forwardRef } from '@nestjs/common';
import { RoomsResolver } from './rooms.resolver';
import { RoomsService } from './rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from './rooms.entity';
import { RoomsStyleModule } from '../rooms-style/rooms-style.module';
import { RoomPromotionDetails } from '../room-promotion-detail/room-promotion-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rooms, RoomPromotionDetails]),
    forwardRef(() => RoomsStyleModule)
  ],
  providers: [RoomsResolver, RoomsService],
  exports: [RoomsService]
})
export class RoomsModule { }
