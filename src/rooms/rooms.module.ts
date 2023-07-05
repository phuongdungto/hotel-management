import { Module, forwardRef } from '@nestjs/common';
import { RoomsResolver } from './rooms.resolver';
import { RoomsService } from './rooms.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from './rooms.entity';
import { RoomsStyleModule } from 'src/rooms-style/rooms-style.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rooms]),
    forwardRef(() => RoomsStyleModule)
  ],
  providers: [RoomsResolver, RoomsService],
  exports: [RoomsService]
})
export class RoomsModule { }
