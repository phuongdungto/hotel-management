import { Module } from '@nestjs/common';
import { ServicesResolver } from './services.resolver';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  providers: [ServicesResolver, ServicesService]
})
export class ServicesModule { }
