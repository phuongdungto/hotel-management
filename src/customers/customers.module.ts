import { Module } from '@nestjs/common';
import { CustomersResolver } from './customers.resolver';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
  ],
  providers: [CustomersResolver, CustomersService]
})
export class CustomersModule { }
