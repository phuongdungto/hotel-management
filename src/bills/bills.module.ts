import { Module, forwardRef } from '@nestjs/common';
import { BillsResolver } from './bills.resolver';
import { BillsService } from './bills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './bills.entity';
import { BillDetail } from '../bill-details/bill-detail.entity';
import { RoomReservation } from '../room-reservation/room-reservation.entity';
import { Rooms } from '../rooms/rooms.entity';
import { CustomersModule } from '../customers/customers.module';
import { RoomReservationModule } from '../room-reservation/room-reservation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, BillDetail, RoomReservation, Rooms]),
    CustomersModule,
  forwardRef(() => RoomReservationModule)
  ],
  providers: [BillsResolver, BillsService],
  exports: [BillsService]
})
export class BillsModule { }
