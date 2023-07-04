import { Module } from '@nestjs/common';
import { ProvidersResolver } from './providers.resolver';
import { ProvidersService } from './providers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Providers } from './providers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Providers])],
  providers: [ProvidersResolver, ProvidersService]
})
export class ProvidersModule { }
