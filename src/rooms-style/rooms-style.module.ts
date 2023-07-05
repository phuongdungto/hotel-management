import { Module, forwardRef } from '@nestjs/common';
import { RoomsStyleResolver } from './rooms-style.resolver';
import { RoomsStyleService } from './rooms-style.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsStyle } from './room-style.entity';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomsStyle]),
    forwardRef(() => RoomsModule)
  ],
  providers: [RoomsStyleResolver, RoomsStyleService],
  exports: [RoomsStyleService]
})
export class RoomsStyleModule { }
