import { Module, forwardRef } from '@nestjs/common';
import { RoomReservationResolver } from './room-reservation.resolver';
import { RoomReservationService } from './room-reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomReservation } from './room-reservation.entity';
import { RoomReservationDetail } from '../room-reservation-detail/room-reservation-detail.entity';
import { CustomersModule } from '../customers/customers.module';
import { Rooms } from '../rooms/rooms.entity';
import { BillsModule } from '../bills/bills.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomReservation, RoomReservationDetail, Rooms]),
    CustomersModule,
    forwardRef(() => BillsModule),
  ],
  providers: [RoomReservationResolver, RoomReservationService],
  exports: [RoomReservationService],
})
export class RoomReservationModule { }
