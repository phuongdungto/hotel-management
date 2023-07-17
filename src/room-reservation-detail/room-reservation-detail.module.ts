import { Module, forwardRef } from '@nestjs/common';
import { RoomReservationDetailResolver } from './room-reservation-detail.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomReservationDetail } from './room-reservation-detail.entity';
import { RoomsModule } from 'src/rooms/rooms.module';
import { RoomReservationModule } from 'src/room-reservation/room-reservation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomReservationDetail]),
    forwardRef(() => RoomsModule),
    forwardRef(() => RoomReservationModule),
  ],
  providers: [RoomReservationDetailResolver]
})
export class RoomReservationDetailModule { }
