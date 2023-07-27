import { Module } from '@nestjs/common';
import { CustomersResolver } from './customers.resolver';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers.entity';
import { RoomReservation } from '../room-reservation/room-reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, RoomReservation]),
  ],
  providers: [CustomersResolver, CustomersService],
  exports: [CustomersService]
})
export class CustomersModule { }
